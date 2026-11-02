/**
 * One casing standard for project and service names shown in listings:
 * capitalised words ("Rollic Summer Party × Şerit Foto"), whatever casing the
 * editpanel entry was typed in.
 *
 * - Names typed in capitals are converted word by word; names already in
 *   mixed case keep their casing, only brand spellings and the "x" joiner are
 *   unified.
 * - Acronyms and brand marks stay as they are (AI, TCMB, BSH, AME'28…).
 * - Turkish words use Turkish casing (ŞERİT → Şerit, DÜNYASI → Dünyası);
 *   English words use English casing (CABIN → Cabin, not "Cabın").
 */

/** Kept exactly as written. */
const KEEP = new Set([
    "AI", "AR", "VR", "QR", "GIF", "LED", "DJ", "TV", "3D", "360", "SL", "EVO", "TCMB", "BSH", "BUD", "BBVA", "TFB",
    "ODTÜ", "AME'28", "A101", "KVKK", "İK", "HR", "LCW", "TEB", "THY", "IBM", "BMW", "UEFA", "NBA", "F1",
]);

/** Brand spellings that override whatever casing was typed. */
const BRANDS: Record<string, string> = {
    defacto: "DeFacto",
    rollic: "Rollic",
    akbank: "Akbank",
    adidas: "Adidas",
    "ray-ban": "Ray-Ban",
};

/** Joiners written in lower case inside a name. */
const LOWER_TR = new Set(["ve", "ile", "için", "de", "da"]);
const LOWER_EN = new Set(["vs", "and", "of", "the", "for", "with", "in", "on"]);

const TURKISH_LETTERS = /[ÇĞÖŞÜçğöşü]/;

function capitalise(word: string, turkish: boolean): string {
    const locale = turkish ? "tr-TR" : "en-US";
    // Hyphenated words capitalise each part: TRY-ON -> Try-On.
    return word
        .split("-")
        .map((part) => {
            const lower = part.toLocaleLowerCase(locale);
            return lower.charAt(0).toLocaleUpperCase(locale) + lower.slice(1);
        })
        .join("-");
}

/** "Genç X" is Garanti BBVA's youth brand, not the "×" joiner. */
const isJoiner = (words: string[], index: number) => /^[xX×]$/.test(words[index]) && index > 0 && words[index - 1] !== "Genç" && words[index - 1] !== "GENÇ";

function convertWord(word: string, index: number, dottedI: boolean): string {
    if (KEEP.has(word)) return word;
    const bare = word.toLocaleLowerCase("tr-TR").replace(/ı/g, "i");
    if (BRANDS[bare]) return BRANDS[bare];
    if (index > 0 && LOWER_EN.has(word.toLowerCase())) return word.toLowerCase();
    if (index > 0 && LOWER_TR.has(word.toLocaleLowerCase("tr-TR"))) return word.toLocaleLowerCase("tr-TR");
    // A plain "I" is Turkish dotless ı when the word (or the name) is clearly Turkish.
    const turkish = word.includes("İ") || TURKISH_LETTERS.test(word) || (word.includes("I") && dottedI) || !word.includes("I");
    return capitalise(word, turkish);
}

/** True when the text has letters but none of them is lower case. */
function isShouting(text: string): boolean {
    return /\p{L}/u.test(text) && text === text.toLocaleUpperCase("tr-TR") && text !== text.toLocaleLowerCase("tr-TR");
}

export function displayTitle(text: string | null | undefined): string {
    const value = (text ?? "").replace(/\s+/g, " ").trim();
    if (!value) return value;
    const shouting = isShouting(value);
    // Typed with a real "İ" somewhere, so any plain "I" in the name is a dotless ı.
    const dottedI = value.includes("İ");
    const words = value.split(" ");
    return words
        .map((word, index) => {
            if (isJoiner(words, index)) return "×";
            if (shouting) return convertWord(word, index, dottedI);
            const bare = word.toLocaleLowerCase("tr-TR").replace(/ı/g, "i");
            if (BRANDS[bare]) return BRANDS[bare];
            // A single shouted word inside a mixed name ("AI GREENBOX", "ROLLIC"): only if it isn't an acronym.
            if (isShouting(word) && !KEEP.has(word) && word.replace(/[^\p{L}]/gu, "").length > 3) {
                return convertWord(word, index, dottedI);
            }
            return word;
        })
        .join(" ");
}
