"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";
import { useServiceOptions } from "@/components/editpanel/ServicePicker";
import { draftToPayload, type Draft, type DraftKind, type DraftResult } from "@/lib/ai-draft-shared";

export const dynamic = "force-dynamic";

const input = "w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black";
const label = "block text-sm font-medium text-black/70 mb-2";
const card = "bg-white rounded-2xl p-6 shadow-sm";

/** Everything that differs between the three kinds of content. */
const KINDS: Record<DraftKind, {
    param: string;
    tab: string;
    prompt: string;
    hint: string;
    placeholder: string;
    noun: string;
    endpoint: string;
    editPath: (id: string) => string;
    nextStep: string;
    summaryLabel: string;
}> = {
    project: {
        param: "proje",
        tab: "Proje",
        prompt: "Ne yaptınız?",
        hint: "Hangi markaya hangi aktivitenin yapıldığını, yeri, tarihi ve varsa katılımcı sayısını yazın. Her marka için ayrı bir proje taslağı hazırlanır.",
        placeholder: "Örnek: Hafta sonu Büyükada'da Decathlon Büyükada Yarı Maratonu'nda Allianz için Magazine Cover ve mesaj kabini kurduk. Exotic markasına da vücut hareketleriyle sepeti yönetip meyve toplanan bir oyun yaptık. Yaklaşık 600 kişi katıldı.",
        noun: "proje",
        endpoint: "/api/projects",
        editPath: (id) => `/editpanel/projects/${id}/edit`,
        nextStep: "fotoğraf ekle",
        summaryLabel: "Kısa açıklama",
    },
    service: {
        param: "hizmet",
        tab: "Hizmet",
        prompt: "Yeni hizmet nedir, nasıl çalışıyor?",
        hint: "Katılımcının ne yaptığını, ne aldığını (baskı, QR, skor), gereken alanı ve saatte kaç kişiye hizmet verdiğini yazın. Yazmadığınız ölçü ve kapasite uydurulmaz.",
        placeholder: "Örnek: Mesaj Kabini diye yeni bir aktivitemiz var. Katılımcı kabine giriyor, ekrandaki soruya 30 saniyelik video mesaj bırakıyor, video QR ile telefonuna iniyor. 3 m² alan yetiyor, saatte 40 kişi kadar alıyor. Baskı yok.",
        noun: "hizmet",
        endpoint: "/api/services",
        editPath: (id) => `/editpanel/services/${id}/edit`,
        nextStep: "görsel ekle",
        summaryLabel: "Kısa açıklama",
    },
    blog: {
        param: "blog",
        tab: "Blog yazısı",
        prompt: "Yazı ne hakkında olsun?",
        hint: "Okurun sorusunu ve vermek istediğiniz bilgileri yazın. İstatistik ve fiyat eklenmez; yalnızca sitedeki doğrulanmış rakamlar kullanılır.",
        placeholder: "Örnek: 500 kişilik bir kurumsal etkinlik için kaç photobooth gerekir? Photobooth, Mirror Booth ve AI Photo'yu kapasiteye göre karşılaştıran bir rehber olsun. Etkinlik 4 saat sürüyor varsayalım.",
        noun: "yazı",
        endpoint: "/api/blog",
        editPath: (id) => `/editpanel/blog/${id}/edit`,
        nextStep: "kapak ekle",
        summaryLabel: "Özet",
    },
};

interface DraftState {
    draft: Draft;
    include: boolean;
    /** Set once the draft exists in the database. */
    savedId: string | null;
}

function AiDraftForm() {
    const { showToast } = useToast();
    const allServices = useServiceOptions();
    const requested = useSearchParams().get("tur");
    const initialKind = (Object.keys(KINDS) as DraftKind[]).find((key) => KINDS[key].param === requested) ?? "project";

    const [kind, setKind] = useState<DraftKind>(initialKind);
    const [brief, setBrief] = useState("");
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [result, setResult] = useState<DraftResult | null>(null);
    const [drafts, setDrafts] = useState<DraftState[]>([]);
    const [copied, setCopied] = useState(false);

    const config = KINDS[kind];
    // The preview belongs to the kind it was generated for, even if the tab changes afterwards.
    const resultConfig = result ? KINDS[result.kind] : config;

    const generate = async () => {
        setGenerating(true);
        try {
            const res = await fetch("/api/ai/draft", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kind, brief }),
            });
            const data = await res.json().catch(() => ({ error: "Sunucu yanıt vermedi (süre aşımı olabilir)." }));
            if (!res.ok) throw new Error(data.error || "Taslak oluşturulamadı");
            setResult(data);
            setDrafts((data as DraftResult).drafts.map((draft) => ({ draft, include: true, savedId: null })));
        } catch (error) {
            showToast(error instanceof Error ? error.message : "Taslak oluşturulamadı", "error");
        } finally {
            setGenerating(false);
        }
    };

    const patchState = (index: number, patch: Partial<DraftState>) => {
        setDrafts((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };
    const patchDraft = (index: number, patch: Partial<Draft>) => {
        setDrafts((current) => current.map((item, i) => (i === index ? { ...item, draft: { ...item.draft, ...patch } } : item)));
    };

    const save = async () => {
        if (!result) return;
        setSaving(true);
        for (const [index, item] of drafts.entries()) {
            if (!item.include || item.savedId) continue;
            const res = await fetch(resultConfig.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draftToPayload(result.kind, item.draft)),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                patchState(index, { savedId: data.id });
            } else {
                showToast(`"${item.draft.title}" kaydedilemedi: ${data.error || "bilinmeyen hata"}`, "error");
            }
        }
        setSaving(false);
    };

    const copyCaption = async () => {
        if (!result) return;
        await navigator.clipboard.writeText(result.instagramCaption);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const pending = drafts.filter((item) => item.include && !item.savedId).length;
    const serviceTitle = (id: string) => allServices.find((service) => service.id === id)?.title ?? "…";

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-black">AI ile Oluştur</h1>
                <p className="mt-1 text-sm text-black/50">
                    Ne oluşturacağınızı seçin ve anlatın. Taslak hazırlanır; görselleri ekleyip siz yayına alırsınız.
                </p>
            </div>

            <div className="mb-6 flex gap-2">
                {(Object.keys(KINDS) as DraftKind[]).map((key) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setKind(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${kind === key ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
                    >
                        {KINDS[key].tab}
                    </button>
                ))}
            </div>

            <div className={`${card} space-y-4`}>
                <label className={label} htmlFor="brief">{config.prompt}</label>
                <textarea
                    id="brief"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={7}
                    placeholder={config.placeholder}
                    className={input}
                />
                <p className="text-xs text-black/40">{config.hint} Eksik kalan bilgiler aşağıda soru olarak listelenir.</p>
                <button
                    type="button"
                    onClick={generate}
                    disabled={generating || brief.trim().length < 20}
                    className="px-5 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-40"
                >
                    {generating ? "Hazırlanıyor… (yaklaşık 1 dakika)" : result ? "Yeniden Oluştur" : "Taslağı Oluştur"}
                </button>
            </div>

            {result && (
                <div className="mt-6 space-y-6">
                    {(result.missing.length > 0 || result.unmatchedActivities.length > 0) && (
                        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
                            {result.missing.length > 0 && (
                                <>
                                    <h2 className="text-sm font-semibold text-black">Kontrol etmeniz gerekenler</h2>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70">
                                        {result.missing.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                    <p className="mt-3 text-xs text-black/50">
                                        Cevapları yukarıdaki metne ekleyip &quot;Yeniden Oluştur&quot; derseniz taslak güncellenir.
                                    </p>
                                </>
                            )}
                            {result.unmatchedActivities.length > 0 && (
                                <p className={`text-sm text-black/70 ${result.missing.length > 0 ? "mt-4" : ""}`}>
                                    <strong>Sitede karşılığı olmayan aktiviteler:</strong> {result.unmatchedActivities.join(", ")}.
                                    Bunlar hiçbir hizmete bağlanmadı.
                                </p>
                            )}
                        </div>
                    )}

                    {drafts.length === 0 && (
                        <div className={card}>
                            <p className="text-sm text-black/70">Taslak çıkmadı. Yukarıdaki notlara bakıp metni düzenleyin.</p>
                        </div>
                    )}

                    {drafts.map(({ draft, include, savedId }, index) => (
                        <div key={draft.slug} className={`${card} space-y-5 ${include ? "" : "opacity-50"}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                        {[resultConfig.tab, draft.client, draft.category ?? draft.categoryName].filter(Boolean).join(" · ")}
                                    </p>
                                    <p className="mt-1 text-xs text-black/40">…/{draft.slug}</p>
                                </div>
                                {savedId ? (
                                    <Link
                                        href={resultConfig.editPath(savedId)}
                                        className="flex-none rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                    >
                                        Kaydedildi — {resultConfig.nextStep} →
                                    </Link>
                                ) : (
                                    <label className="flex flex-none items-center gap-2 text-sm text-black/70">
                                        <input type="checkbox" checked={include} onChange={(e) => patchState(index, { include: e.target.checked })} />
                                        Kaydet
                                    </label>
                                )}
                            </div>

                            <div>
                                <label className={label}>Başlık</label>
                                <input className={input} value={draft.title} disabled={!!savedId} onChange={(e) => patchDraft(index, { title: e.target.value })} />
                            </div>
                            <div>
                                <label className={label}>{resultConfig.summaryLabel}</label>
                                <textarea className={input} rows={2} value={draft.summary} disabled={!!savedId} onChange={(e) => patchDraft(index, { summary: e.target.value })} />
                            </div>

                            {draft.serviceIds && (
                                <div>
                                    <span className={label}>{result.kind === "blog" ? "Önerilen hizmetler" : "İlgili hizmetler"}</span>
                                    {draft.serviceIds.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {draft.serviceIds.map((id) => (
                                                <span key={id} className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm text-black">
                                                    {serviceTitle(id)}
                                                    {!savedId && (
                                                        <button type="button" aria-label="Hizmeti çıkar" className="text-black/40 hover:text-red-600" onClick={() => patchDraft(index, { serviceIds: draft.serviceIds?.filter((item) => item !== id) })}>×</button>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-black/40">Eşleşen hizmet yok. Kaydettikten sonra düzenleme ekranından seçebilirsiniz.</p>
                                    )}
                                </div>
                            )}

                            <details className="rounded-lg border border-black/10">
                                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-black">İçerik önizlemesi (Türkçe)</summary>
                                <div className="prose prose-sm max-w-none border-t border-black/10 px-4 py-4" dangerouslySetInnerHTML={{ __html: draft.content }} />
                            </details>
                            <details className="rounded-lg border border-black/10">
                                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-black">İçerik önizlemesi (İngilizce)</summary>
                                <div className="border-t border-black/10 px-4 py-4">
                                    <p className="text-sm font-semibold text-black">{draft.title_en}</p>
                                    <div className="prose prose-sm mt-2 max-w-none" dangerouslySetInnerHTML={{ __html: draft.content_en }} />
                                </div>
                            </details>
                            <details className="rounded-lg border border-black/10">
                                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-black">SEO ve SSS</summary>
                                <dl className="space-y-3 border-t border-black/10 px-4 py-4 text-sm">
                                    <div><dt className="text-black/40">SEO başlığı</dt><dd className="text-black">{draft.metaTitle}</dd></div>
                                    <div><dt className="text-black/40">SEO açıklaması</dt><dd className="text-black">{draft.metaDescription}</dd></div>
                                    <div><dt className="text-black/40">Anahtar kelimeler</dt><dd className="text-black">{draft.metaKeywords}</dd></div>
                                    {draft.tags && <div><dt className="text-black/40">Etiketler</dt><dd className="text-black">{draft.tags.join(" · ")}</dd></div>}
                                    {draft.faq.map((item) => (
                                        <div key={item.q}><dt className="font-medium text-black">{item.q}</dt><dd className="text-black/70">{item.a}</dd></div>
                                    ))}
                                </dl>
                            </details>
                        </div>
                    ))}

                    {drafts.length > 0 && (
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={save}
                                disabled={saving || pending === 0}
                                className="px-5 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-40"
                            >
                                {saving ? "Kaydediliyor…" : pending > 0 ? `${pending} ${resultConfig.noun} taslak olarak kaydet` : "Hepsi kaydedildi"}
                            </button>
                            <p className="text-xs text-black/50">Taslaklar yayına girmez; düzenleme ekranından siz yayına alırsınız.</p>
                        </div>
                    )}

                    <div className={card}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-black">Instagram metni</h2>
                            <button type="button" onClick={copyCaption} className="rounded-lg bg-black/5 px-3 py-1.5 text-sm font-medium text-black hover:bg-black/10">
                                {copied ? "Kopyalandı" : "Kopyala"}
                            </button>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm text-black/80">{result.instagramCaption}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AiDraftPage() {
    return (
        <Suspense fallback={null}>
            <AiDraftForm />
        </Suspense>
    );
}
