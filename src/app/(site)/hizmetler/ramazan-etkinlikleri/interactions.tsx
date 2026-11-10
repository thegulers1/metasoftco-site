"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import {
  combinations,
  comparisons,
  games,
  memories,
  type Media,
} from "./content";
import styles from "./ramazan.module.css";

const activities = [...memories, ...games];
const source = "ramazan_etkinlikleri";
const selection = createContext<{
  ids: string[];
  toggle: (id: string) => void;
  choose: (id: string, activityIds: string[]) => void;
  combination: string;
  clear: () => void;
} | null>(null);

function useSelection() {
  const value = useContext(selection);
  if (!value) throw new Error("SelectionProvider is required");
  return value;
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [combination, setCombination] = useState("");
  function toggle(id: string) {
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  function choose(id: string, activityIds: string[]) {
    setIds((current) => [...new Set([...current, ...activityIds])]);
    setCombination(id);
    document.getElementById("teklif")?.focus();
  }
  function clear() {
    setIds([]);
    setCombination("");
  }
  return (
    <selection.Provider value={{ ids, toggle, choose, combination, clear }}>
      {children}
    </selection.Provider>
  );
}

export function AddActivity({ id, name }: { id: string; name: string }) {
  const { ids, toggle } = useSelection();
  const added = ids.includes(id);
  return (
    <button
      className={styles.add}
      type="button"
      aria-label={`${name} · Teklif seçimi`}
      aria-pressed={added}
      onClick={() => toggle(id)}
    >
      {added ? "✓ Teklife eklendi" : "+ Teklife ekle"}
    </button>
  );
}

export function ChooseCombination({ id, ids }: { id: string; ids: string[] }) {
  const { choose } = useSelection();
  return (
    <button
      className={styles.add}
      type="button"
      onClick={() => choose(id, ids)}
    >
      Bu kurguyla teklif al ↗
    </button>
  );
}

export function GalleryImage({
  media,
  sizes,
}: {
  media: Media;
  sizes: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={styles.imageButton}
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Görseli büyüt · ${media.alt}`}
      >
        <Image {...media} alt={media.alt} sizes={sizes} unoptimized />
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label="Konsept görseli"
      >
        <button
          autoFocus
          type="button"
          className="ms-pill ms-pill--line"
          onClick={() => dialog.current?.close()}
        >
          Kapat ×
        </button>
        <Image {...media} alt={media.alt} loading="lazy" unoptimized />
      </dialog>
    </>
  );
}

export function Comparison() {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <GalleryImage
        media={comparisons[index].image}
        sizes="(max-width: 760px) 92vw, 58vw"
      />
      <div
        className={styles.comparisonOptions}
        role="group"
        aria-label="AI Photo örnekleri"
      >
        {comparisons.map((item, i) => (
          <button
            key={item.label}
            className={styles.add}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const fields = [
  { name: "name", label: "Ad soyad", autoComplete: "name", required: true },
  {
    name: "company",
    label: "Belediye / kurum / organizasyon",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "E-posta",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    autoComplete: "tel",
    maxLength: 40,
  },
  { name: "city", label: "Şehir", autoComplete: "address-level2" },
  {
    name: "eventDate",
    label: "Etkinlik tarihi veya tarih aralığı",
    placeholder: "Örn. 5–12 Şubat",
  },
  { name: "duration", label: "Etkinlik süresi", placeholder: "Örn. 8 gün" },
  {
    name: "guests",
    label: "Tahmini ziyaretçi sayısı",
    inputMode: "numeric" as const,
  },
];

export function QuoteForm() {
  const { ids, toggle, combination, clear } = useSelection();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const sending = useRef(false);
  const combinationName = combinations.find(
    (item) => item.id === combination,
  )?.title;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const product = activities
      .filter((item) => ids.includes(item.id))
      .map((item) => item.title)
      .join(", ");
    const message = [
      "Ramazan etkinliği için kiralama ve müsaitlik talebi.",
      combinationName && `Örnek kurgu: ${combinationName}`,
      product && `Seçilen aktiviteler: ${product}`,
      value("duration") && `Etkinlik süresi: ${value("duration")}`,
      value("note"),
    ]
      .filter(Boolean)
      .join("\n");
    sending.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          company: value("company"),
          city: value("city"),
          eventDate: value("eventDate"),
          guests: value("guests"),
          product,
          message,
          subject: "Ramazan etkinliği teklif talebi",
          attribution: getAttribution(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error("Talep kabul edilmedi");
      form.reset();
      clear();
      setStatus("sent");
      trackEvent("generate_lead", {
        form_name: source,
        occasion: "ramazan-etkinlikleri",
        product,
        intent: "rent",
      });
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <p role="status">
        {status === "sent"
          ? "Talebiniz bize ulaştı. Ekibimiz sizinle iletişime geçecek."
          : status === "sending"
            ? "Talebiniz gönderiliyor…"
            : ""}
      </p>
      {status === "sent" ? (
        <button
          type="button"
          className="ms-pill ms-pill--line"
          onClick={() => setStatus("idle")}
        >
          Yeni talep oluştur ↗
        </button>
      ) : (
        <fieldset disabled={status === "sending"}>
          <p>Ad soyad ve e-posta zorunludur.</p>
          <div className={styles.fields}>
            {fields.map(({ label, ...props }) => (
              <label key={props.name}>
                {label}
                {props.required && " *"}
                <input maxLength={200} {...props} />
              </label>
            ))}
          </div>
          <fieldset className={styles.choices}>
            <legend>İlgilendiğiniz aktiviteler</legend>
            {combinationName && <p>Seçilen örnek kurgu · {combinationName}</p>}
            <div>
              {activities.map((item) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={ids.includes(item.id)}
                    onChange={() => toggle(item.id)}
                  />{" "}
                  {item.title}
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            Ek not
            <textarea name="note" rows={3} maxLength={2000} />
          </label>
          <p>
            Bilgileriniz teklif talebinize dönüş yapmak için kullanılır.{" "}
            <Link href="/gizlilik" target="_blank">
              Gizlilik politikası ↗
            </Link>
          </p>
          {status === "error" && (
            <p role="alert">
              Talebiniz gönderilemedi. Tekrar deneyebilir veya WhatsApp
              üzerinden ulaşabilirsiniz.
            </p>
          )}
          <button type="submit" className="ms-pill ms-pill--acc">
            {status === "sending"
              ? "Gönderiliyor…"
              : "Teklif Talebini Gönder ↗"}
          </button>
        </fieldset>
      )}
    </form>
  );
}

export function WhatsApp({ phone }: { phone: string }) {
  const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, Ramazan etkinliğimiz için aktiviteler hakkında bilgi almak istiyorum.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ms-pill ms-pill--line"
      onClick={() => trackEvent("whatsapp_click", { source })}
    >
      WhatsApp’tan konuşalım ↗
    </a>
  );
}
