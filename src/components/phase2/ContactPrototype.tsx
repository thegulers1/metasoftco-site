"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { IconArrowRight as ArrowRight, IconClock as Clock, IconMail as Mail, IconMapPin as MapPin, IconPhone as Phone, IconSend as Send } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";
import { useChatStore } from "@/components/AIChat/useChatStore";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.contact;
    const form = copy.form;
    const { open: openChat } = useChatStore();

    const [status, setStatus] = useState<Status>("idle");

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");

        const data = new FormData(event.currentTarget);
        const value = (key: string) => String(data.get(key) ?? "").trim();

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: value("name"),
                    email: value("email"),
                    subject: `${form.company.replace(" *", "")}: ${value("company")}`,
                    message: value("brief"),
                }),
            });
            setStatus(response.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    }

    const submitLabel = status === "sending" ? form.submitting : status === "sent" ? form.submitted : form.submit;

    return (
        <article className="phase2 p2-screen p2-contact">
            <header className="p2-container p2-screen-hero">
                <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                <p>{copy.heroCopy}</p>
            </header>
            <section className="p2-container p2-contact-panel">
                <aside>
                    <h2>{copy.asideTitle}</h2>
                    <ul>
                        <li><Phone aria-hidden="true" /><a href="tel:+905342334051">+90 534 233 40 51</a></li>
                        <li><Mail aria-hidden="true" /><a href="mailto:info@metasoftco.com">info@metasoftco.com</a></li>
                        <li><MapPin aria-hidden="true" /><span>{copy.location}</span></li>
                        <li><Clock aria-hidden="true" /><span>{copy.replyTime}</span></li>
                    </ul>
                    <figure><Image src="/phase2/contact-producers-v2.png" alt={copy.figureAlt} fill sizes="330px" /></figure>
                </aside>
                <form onSubmit={submit}>
                    <div className="p2-field-grid">
                        <label>{form.name}<input required name="name" placeholder={form.namePlaceholder} /></label>
                        <label>{form.company}<input required name="company" placeholder={form.companyPlaceholder} /></label>
                    </div>
                    <label>{form.email}<input required type="email" name="email" placeholder={form.emailPlaceholder} /></label>
                    <label>{form.brief}<textarea required name="brief" maxLength={2000} placeholder={form.briefPlaceholder} /></label>
                    <button className="p2-screen-button" type="submit" disabled={status === "sending"}>{submitLabel}<ArrowRight aria-hidden="true" /></button>
                    {status === "sent" && <p className="p2-form-success" role="status">{form.success}</p>}
                    {status === "error" && <p className="p2-form-error" role="alert">{form.error}</p>}
                </form>
            </section>
            <section className="p2-container p2-next-steps">
                <h2>{copy.nextStepsTitle}</h2>
                <ol>{copy.nextSteps.map((step) => <li key={step.number}><span className="p2-gradient-number">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
            </section>
            <section className="p2-container p2-contact-lite">
                <Send aria-hidden="true" />
                <h2>{copy.liteTitle}</h2>
                <p>{copy.liteCopy}</p>
                <Link href="mailto:info@metasoftco.com">{copy.liteMailLabel} <ArrowRight aria-hidden="true" /></Link>
                <button type="button" onClick={() => openChat(locale)}>{copy.liteWorkLabel} <ArrowRight aria-hidden="true" /></button>
            </section>
            <section className="p2-contact-final">
                <Image src="/phase2/about-production-stage-v2.png" alt="" fill sizes="100vw" />
                <div>
                    <SignalHeading as="h2" solid={copy.finalSolid} outline={copy.finalOutline} />
                    <h2>{copy.finalTail}</h2>
                    <p>
                        <span><Phone aria-hidden="true" /> +90 534 233 40 51</span>
                        <span><Mail aria-hidden="true" /> info@metasoftco.com</span>
                        <span><MapPin aria-hidden="true" /> {copy.location}</span>
                    </p>
                </div>
            </section>
        </article>
    );
}
