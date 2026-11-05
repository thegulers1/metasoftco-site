import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import type { Service, ServiceCategory } from "@prisma/client";
import { serviceContentSections } from "../src/lib/service-template/content-sections";
import { isEnglishServicePublishable } from "../src/lib/publication";

type Row = Service & { category: ServiceCategory };
async function main() {
  const snapshot = process.argv[2];
  if (!snapshot)
    throw new Error("Pass a read-only public service snapshot JSON path.");
  const rows: Row[] = JSON.parse(await readFile(snapshot, "utf8"));
  const results: {
    slug: string;
    locale: string;
    sections: number;
    preserved: boolean;
    path: string;
    status?: number;
    h1?: number;
    error?: string;
  }[] = [];
  const text = (html: string) =>
    html.replace(/<[^>]*>/g, "").replace(/\s/g, "");
  for (const row of rows)
    for (const locale of ["tr", "en"] as const) {
      const raw = locale === "tr" ? row.content : row.content_en;
      if (!raw) continue;
      const html = raw.replace(/&nbsp;/g, " ");
      const sections = serviceContentSections(html);
      const preserved =
        text(
          sections
            .map((section) => (section.heading || "") + section.html)
            .join(""),
        ) === text(html);
      assert.ok(preserved, `${row.slug} ${locale}: text loss`);
      assert.ok(
        sections.length > 1,
        `${row.slug} ${locale}: unsectioned content`,
      );
      const path =
        locale === "tr"
          ? row.type === "SALE"
            ? `/urunler/${row.slug}`
            : `/hizmetler/${row.category.slug}/${row.slug}`
          : row.type === "SALE"
            ? `/en/products/${row.slug_en}`
            : `/en/services/${row.category.slug_en}/${row.slug_en}`;
      if (locale === "en" && !isEnglishServicePublishable(row, row.category))
        continue;
      results.push({
        slug: row.slug,
        locale,
        sections: sections.length,
        preserved,
        path,
      });
    }
  const base = process.argv[3];
  if (base) {
    let cursor = 0;
    await Promise.all(
      [0, 1].map(async () => {
        while (cursor < results.length) {
          const item = results[cursor++];
          try {
            const response = await fetch(new URL(item.path, base), {
              redirect: "manual",
              signal: AbortSignal.timeout(45000),
            });
            const html = await response.text();
            item.status = response.status;
            item.h1 = [...html.matchAll(/<h1(?=[\s>])/g)].length;
            if (
              response.status !== 200 ||
              item.h1 !== 1 ||
              !html.includes('rel="canonical"')
            )
              item.error = "Status, H1 or canonical check failed";
          } catch (error) {
            item.error = String(error);
          }
          if (cursor % 20 === 0)
            console.log(`Checked ${cursor}/${results.length} routes`);
        }
      }),
    );
  }
  await writeFile(
    "output/service-template/all-services-audit.json",
    JSON.stringify(
      {
        services: rows.length,
        checked: results.length,
        failed: results.filter((item) => item.error),
        results,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        services: rows.length,
        checked: results.length,
        failed: results.filter((item) => item.error),
      },
      null,
      2,
    ),
  );
  assert.ok(
    results.every((item) => !item.error),
    "Some service routes failed; see audit JSON.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
