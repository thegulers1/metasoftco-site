"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { getAttribution } from "@/lib/attribution";
import styles from "../ai-photobooth/ai-photobooth.module.css";

export default function ProductQuoteForm({
  product,
  message,
  locale = "tr",
  eventRental = true,
}: {
  product: string;
  message: string;
  locale?: "tr" | "en";
  eventRental?: boolean;
}) {
  const en = locale === "en";
  const t = (tr: string, english: string) => (en ? english : tr);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || "").trim();
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
          eventDate: value("eventDate"),
          city: value("city"),
          guests: value("guests"),
          product,
          message,
          attribution: getAttribution(),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent")
    return (
      <div role="status" className={styles.formSuccess}>
        <h3>{t("Talebiniz alındı.", "Request received.")}</h3>
        <p>
          {t(
            "Talebinizle ilgili sizinle iletişime geçeceğiz.",
            "We will contact you about your request.",
          )}
        </p>
        <button onClick={() => setStatus("idle")}>
          {t("Yeni talep oluştur", "Send another request")}
        </button>
      </div>
    );
  return (
    <form onSubmit={submit} className={styles.form}>
      <label>
        {t("Ad soyad *", "Full name *")}
        <input
          name="name"
          autoComplete="name"
          required
          placeholder={t("Adınız ve soyadınız", "Your full name")}
          maxLength={120}
        />
      </label>
      <label>
        {t("E-posta *", "Email *")}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={t("ornek@sirket.com", "you@company.com")}
          maxLength={200}
        />
      </label>
      <label>
        {t("Telefon *", "Phone *")}
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder={t("05xx xxx xx xx", "+44 …")}
          maxLength={30}
        />
      </label>
      <details className={styles.formDetails}>
        <summary>
          {eventRental
            ? t("Etkinlik detaylarını ekleyin", "Add event details")
            : t("Talep detaylarını ekleyin", "Add request details")}{" "}
          <span>+</span>
        </summary>
        <label>
          {t("Şirket", "Company")}
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        {eventRental && (
          <label>
            {t("Etkinlik tarihi", "Event date")}
            <input type="date" name="eventDate" />
          </label>
        )}
        <label>
          {t("Mekân ve şehir", "Location and city")}
          <input name="city" maxLength={200} />
        </label>
        {eventRental && (
          <label>
            {t("Tahmini katılımcı", "Estimated attendees")}
            <select name="guests" defaultValue="">
              <option value="">{t("Seçin", "Select")}</option>
              <option>0–200</option>
              <option>200–1.000</option>
              <option>1.000–5.000</option>
              <option>5.000+</option>
            </select>
          </label>
        )}
      </details>
      <p className={styles.privacy}>
        {t(
          "Bilgileriniz talebinize dönüş yapmak için kullanılır.",
          "We use your details to respond to your request.",
        )}{" "}
        <Link href="/gizlilik" target="_blank">
          {t("Gizlilik politikası ↗", "Privacy policy ↗")}
        </Link>
      </p>
      {status === "error" && (
        <p role="alert" className={styles.formError}>
          {t(
            "Talebiniz gönderilemedi. Yeniden deneyebilir veya telefonla ulaşabilirsiniz.",
            "Your request could not be sent. Please try again or call us.",
          )}
        </p>
      )}
      <button className={styles.primary} disabled={status === "sending"}>
        {status === "sending"
          ? t("Gönderiliyor…", "Sending…")
          : t("Teklif talebi gönder ↗", "Request a quote ↗")}
      </button>
    </form>
  );
}
