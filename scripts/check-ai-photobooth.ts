import assert from "node:assert/strict";
import {
  AI_PHOTOBOOTH_CASES,
  aiPhotoboothFaq,
  isAiPhotoboothPage,
  parseAiPhotoboothSpecs,
} from "../src/lib/ai-photobooth";
import { mergeRentalFaq, toRentalOutput } from "../src/lib/rental-ops";
import { dataCaptureCopy } from "../src/lib/data-capture";

assert.equal(
  isAiPhotoboothPage("yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"),
  true,
);
for (const [category, slug] of [
  ["ai-event-solutions", "ai-photobooth"],
  ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kurumsal-satis"],
  ["other-category", "ai-photobooth-kirala"],
  ["yapay-zeka-etkinlik-cozumleri", "ai-fashion-mirror-akilli-ayna"],
])
  assert.equal(isAiPhotoboothPage(category, slug), false);

assert.deepEqual(
  AI_PHOTOBOOTH_CASES.map((item) => item.slug),
  [
    "tavuk-dunyasi-x-ai-photo",
    "castrol-edge-x-ai-photo-kiosk-yapay-zek-fotograf-deneyimi",
  ],
);
assert.match(AI_PHOTOBOOTH_CASES[1].format, /satışı/);

// The new FAQ source must preserve the old service + rental + optional capture
// composition for every output flag. Both schema and visible FAQ consume it.
for (const outputType of ["none", "digital", "print", "instant"]) {
  for (const dataCapture of [false, true]) {
    const own = [
      {
        q: "Markaya özel kişiselleştirme yapıyor musunuz?",
        a: "Etkinliğe özel cevap.",
      },
    ];
    const service = {
      title: "AI Photo & AI Photobooth Kiralama | Etkinlik Aktivasyonları",
      faq: JSON.stringify(own),
      outputType,
      dataCapture,
    };
    const expected = [
      ...mergeRentalFaq(own, service.title, "tr", toRentalOutput(outputType)),
      ...(dataCapture ? dataCaptureCopy("tr", outputType === "none").faq : []),
    ];
    assert.deepEqual(aiPhotoboothFaq(service), expected);
    assert.equal(expected.filter((item) => item.q === own[0].q).length, 1);
  }
}
assert.doesNotThrow(() =>
  aiPhotoboothFaq({
    title: "AI Photo",
    faq: "broken JSON",
    outputType: "print",
    dataCapture: true,
  }),
);
assert.deepEqual(parseAiPhotoboothSpecs("broken JSON"), []);
assert.deepEqual(
  parseAiPhotoboothSpecs(
    '[null,{"label":"Kapasite","value":"40–60"},{"label":42}]',
  ),
  [{ label: "Kapasite", value: "40–60" }],
);
const legacy = [
  {
    q: "Fotoğraflar ne kadar sürede hazırlanır ve saatte kaç kişiye hizmet verebilir?",
    a: "Kuyruk oluşmasını engelliyoruz.",
  },
  { q: "AI Photobooth nasıl çalışır?", a: "Baskı daima dahil." },
  {
    q: "Detaylar?",
    a: "[Face swap](/blog/yapay-zeka-yuz-degistirme-face-swap-nasil-calisir)",
  },
];
const reviewed = aiPhotoboothFaq({
  title: "AI Photo",
  faq: JSON.stringify(legacy),
  outputType: "print",
  dataCapture: false,
});
assert.deepEqual(
  reviewed.slice(0, 3).map((item) => item.q),
  legacy.map((item) => item.q),
);
assert.match(reviewed[0].a, /40–60/);
assert.doesNotMatch(reviewed[0].a, /kuyruk|engelliyoruz/i);
assert.match(reviewed[1].a, /talep edilirse/);
assert.doesNotMatch(reviewed[1].a, /daima|750/);
assert.equal(reviewed[2].a, legacy[2].a);
console.log(
  "AI Photobooth: route isolation, curated references, FAQ composition (8 variants), reviewed answers, malformed JSON and specs checks passed.",
);
