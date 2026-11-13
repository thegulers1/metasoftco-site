#!/usr/bin/env python3
"""
Cuts a tiny Turkish subset (Ğ ğ İ Ş ş, ~3 KB) out of the latin-ext font files
and registers it in src/app/fonts.css.

Why: Turkish pages need only those five letters from latin-ext (ı already
lives in the latin file), but the browser fetched the whole latin-ext file
for them: 90 KB for Inter Tight, 118 KB for Unbounded. On a phone that
download competed with the hero image of every page.

Run after scripts/fetch-fonts.mjs (which regenerates fonts.css from scratch):

    pip install fonttools brotli
    python3 scripts/make-turkish-font-subsets.py

Idempotent: running it twice changes nothing.
"""
import os
import re
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "public", "fonts")
CSS = os.path.join(ROOT, "src", "app", "fonts.css")

TURKISH = [0x011E, 0x011F, 0x0130, 0x015E, 0x015F]
TURKISH_RANGE = "U+011E-011F, U+0130, U+015E-015F"
# Google's latin-ext range with the five Turkish letters cut out.
EXT_OLD = "U+0100-02BA, "
EXT_NEW = "U+0100-011D, U+0120-012F, U+0132-015D, U+0160-02BA, "

# Families whose latin-ext file is large or preloaded.
FAMILIES = {
    "Inter Tight": "inter-tight-300-900-normal",
    "Unbounded": "unbounded-500-900-normal",
    "Geist": "geist-400-600-normal",
    "Geist Mono": "geist-mono-400-500-normal",
}


def cut(base: str) -> int:
    font = TTFont(os.path.join(FONTS, f"{base}-latin-ext.woff2"))
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.notdef_outline = True
    options.name_IDs = ["*"]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=TURKISH)
    subsetter.subset(font)
    font.flavor = "woff2"
    out = os.path.join(FONTS, f"{base}-turkish.woff2")
    font.save(out)
    return os.path.getsize(out)


def main() -> None:
    css = open(CSS, encoding="utf-8").read()
    blocks = re.split(r"(?=/\* )", css)
    result = []
    for block in blocks:
        match = re.match(r"/\* (.+?) · latin-ext \*/", block)
        family = match.group(1) if match else None
        if family not in FAMILIES:
            result.append(block)
            continue
        base = FAMILIES[family]
        print(f"{family}: {cut(base)} bytes")
        if EXT_OLD not in block:  # already patched
            result.append(block)
            continue
        weight = re.search(r"font-weight: ([^;]+);", block).group(1)
        result.append(block.replace(EXT_OLD, EXT_NEW))
        result.append(
            f"/* {family} · turkish — Ğ ğ İ Ş ş alone (≈3 KB), so Turkish pages do not pull the whole latin-ext file */\n"
            "@font-face {\n"
            f"  font-family: '{family}';\n"
            "  font-style: normal;\n"
            f"  font-weight: {weight};\n"
            "  font-display: swap;\n"
            f"  src: url(/fonts/{base}-turkish.woff2) format(\"woff2\");\n"
            f"  unicode-range: {TURKISH_RANGE};\n"
            "}\n\n"
        )
    open(CSS, "w", encoding="utf-8").write("".join(result))


if __name__ == "__main__":
    main()
