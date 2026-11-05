export interface ServiceContentSection {
  heading: string | null;
  html: string;
}

interface HtmlBlock {
  start: number;
  end: number;
  html: string;
  tag: string;
}
const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
const plainText = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:nbsp|#160);/g, " ")
    .trim();

/** Balanced root blocks only. Never cut across an open list, table or wrapper. */
function rootBlocks(html: string): HtmlBlock[] | null {
  const stack: string[] = [];
  const blocks: HtmlBlock[] = [];
  const tokens =
    /<!--[\s\S]*?-->|<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)\s*>|<\/?[a-z][a-z0-9]*\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi;
  let start = 0;
  for (const token of html.matchAll(tokens)) {
    const tag = token[0];
    if (/^<!--|^<(?:script|style)\b/i.test(tag)) continue;
    const name = tag.match(/^<\/?([a-z0-9]+)/i)![1].toLowerCase();
    if (voidTags.has(name) || /\/\s*>$/.test(tag)) continue;
    if (tag.startsWith("</")) {
      if (stack.pop() !== name) return null;
      if (!stack.length) {
        const end = token.index! + tag.length;
        blocks.push({ start, end, html: html.slice(start, end), tag: name });
      }
    } else {
      if (!stack.length) start = token.index!;
      stack.push(name);
    }
  }
  return stack.length ? null : blocks;
}

function validTitle(inner: string) {
  const text = plainText(inner);
  return (
    text.length > 0 &&
    text.length <= 180 &&
    !/<\/?(?:p|div|ul|ol|li|h[1-6]|table|br)\b/i.test(inner)
  );
}

function headingBlock(block: HtmlBlock) {
  if (!/^h[1-6]$/.test(block.tag)) return null;
  const inner = block.html.replace(/^<h[1-6]\b[^>]*>|<\/h[1-6]>$/gi, "");
  return validTitle(inner)
    ? block.html.replace(/<(\/?)h[1-6](?=[\s>])/gi, "<$1h2")
    : null;
}

/** Only standalone bold paragraphs or clearly punctuated leading labels qualify. */
function paragraphTitle(
  block: HtmlBlock,
  allowUnpunctuated = false,
): { heading: string; body: string } | null {
  if (block.tag !== "p") return null;
  const match = block.html.match(
    /^<p([^>]*)>\s*<(strong|b)\b[^>]*>([\s\S]*?)<\/\2>([\s\S]*?)<\/p>$/i,
  );
  if (
    !match ||
    !validTitle(match[3]) ||
    /^\s*\d+[.)]\s/.test(plainText(match[3]))
  )
    return null;
  const remainder = match[4];
  if (plainText(remainder) && !/[?!:：]$/.test(plainText(match[3]))) {
    const title = plainText(match[3]);
    const body = plainText(remainder);
    if (
      !allowUnpunctuated ||
      title.split(/\s+/).length < 3 ||
      title.length > 100 ||
      !/^[\p{Lu}]/u.test(body)
    )
      return null;
  }
  // Two consecutive bold spans can be a promotional sentence, not a section title.
  if (/^\s*<(?:strong|b)\b/i.test(remainder)) return null;
  return {
    heading: `<h2${match[1]}>${match[3]}</h2>`,
    body:
      plainText(remainder) || /<(?:img|video|iframe)\b/i.test(remainder)
        ? `<p>${remainder}</p>`
        : remainder,
  };
}

/** A legacy feature list has an explicit bold title at the start of EVERY item. */
function featureList(block: HtmlBlock): ServiceContentSection[] | null {
  if (block.tag !== "ul") return null;
  const inner = block.html.replace(/^<ul\b[^>]*>|<\/ul>$/gi, "");
  const items = rootBlocks(inner);
  if (!items || items.length < 2 || items.some((item) => item.tag !== "li"))
    return null;
  // Do not discard text, comments or media between list items.
  if (
    inner.replace(/\s/g, "") !==
    items
      .map((item) => item.html)
      .join("")
      .replace(/\s/g, "")
  )
    return null;
  const result: ServiceContentSection[] = [];
  for (const item of items) {
    const match = item.html.match(
      /^<li\b[^>]*>\s*<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)<\/li>$/i,
    );
    if (
      !match ||
      !validTitle(match[2]) ||
      !/:$/.test(plainText(match[2])) ||
      /<(?:ul|ol|li)\b/i.test(match[3])
    )
      return null;
    result.push({
      heading: `<h2>${match[2]}</h2>`,
      html: `<div>${match[3]}</div>`,
    });
  }
  return result;
}

/**
 * Section editor copy using real headings and unambiguous legacy title markup.
 * Prose and links are preserved. Unbalanced HTML stays intact instead of being
 * split by a heading regex. This layout helper does not replace sanitization.
 */
export function serviceContentSections(html: string): ServiceContentSection[] {
  const fallback = [{ heading: null, html }];
  const blocks = rootBlocks(html);
  if (!blocks) return fallback;
  const realHeadings = blocks.filter((block) => headingBlock(block)).length;
  // Repeated, sentence-initial labels form an editor pattern. A lone bold
  // product name followed by running prose is never enough to create a heading.
  const repeatedLabels =
    blocks.filter((block) => {
      const candidate = paragraphTitle(block, true);
      return candidate && plainText(candidate.body);
    }).length >= 3;
  const result: ServiceContentSection[] = [];
  let current: ServiceContentSection = { heading: null, html: "" };
  const flush = () => {
    if (current.heading || current.html.trim()) result.push(current);
  };
  let cursor = 0;
  for (const block of blocks) {
    current.html += html.slice(cursor, block.start);
    const heading = headingBlock(block);
    const legacy =
      realHeadings < 2 ? paragraphTitle(block, repeatedLabels) : null;
    const features = realHeadings < 2 ? featureList(block) : null;
    if (heading || legacy) {
      flush();
      current = {
        heading: heading || legacy!.heading,
        html: legacy?.body || "",
      };
    } else if (features) {
      flush();
      result.push(...features);
      current = { heading: null, html: "" };
    } else current.html += block.html;
    cursor = block.end;
  }
  current.html += html.slice(cursor);
  flush();
  return result.length ? result : fallback;
}
