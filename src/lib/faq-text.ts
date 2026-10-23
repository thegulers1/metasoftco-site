/**
 * FAQ answers are plain text with one extra: a site link written as
 * [anchor text](/path). Pages render it as a link; schema gets the anchor text.
 * Only internal paths (starting with "/") are recognised.
 */
export const FAQ_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function faqPlainText(answer: string) {
    return answer.replace(FAQ_LINK, "$1");
}
