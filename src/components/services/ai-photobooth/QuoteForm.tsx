"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { getAttribution } from "@/lib/attribution";
import styles from "./ai-photobooth.module.css";

export default function QuoteForm() {
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
          product: "AI Photo & AI Photobooth",
          message: "AI Photobooth kiralama teklif talebi.",
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
        <h3>Talebiniz alındı.</h3>
        <p>Etkinlik detaylarınız için sizinle iletişime geçeceğiz.</p>
        <button onClick={() => setStatus("idle")}>Yeni talep oluştur</button>
      </div>
    );
  return (
    <form onSubmit={submit} className={styles.form}>
      <label>
        Ad soyad *
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="Adınız ve soyadınız"
          maxLength={120}
        />
      </label>
      <label>
        E-posta *
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="ornek@sirket.com"
          maxLength={200}
        />
      </label>
      <label>
        Telefon *
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder="05xx xxx xx xx"
          maxLength={30}
        />
      </label>
      <details className={styles.formDetails}>
        <summary>
          Etkinlik detaylarını ekleyin <span>+</span>
        </summary>
        <label>
          Şirket
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label>
          Etkinlik tarihi
          <input type="date" name="eventDate" />
        </label>
        <label>
          Mekân ve şehir
          <input name="city" maxLength={200} />
        </label>
        <label>
          Tahmini katılımcı
          <select name="guests" defaultValue="">
            <option value="">Seçin</option>
            <option>0–200</option>
            <option>200–1.000</option>
            <option>1.000–5.000</option>
            <option>5.000+</option>
          </select>
        </label>
      </details>
      <p className={styles.privacy}>
        Bilgileriniz talebinize dönüş yapmak için kullanılır.{" "}
        <Link href="/gizlilik" target="_blank">
          Gizlilik politikası ↗
        </Link>
      </p>
      {status === "error" && (
        <p role="alert" className={styles.formError}>
          Talebiniz gönderilemedi. Yeniden deneyebilir veya telefonla
          ulaşabilirsiniz.
        </p>
      )}
      <button className={styles.primary} disabled={status === "sending"}>
        {status === "sending" ? "Gönderiliyor…" : "Teklif talebi gönder ↗"}
      </button>
    </form>
  );
}
