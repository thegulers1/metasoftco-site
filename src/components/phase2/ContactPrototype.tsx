"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { IconArrowRight as ArrowRight, IconCamera as Camera, IconClock as Clock, IconDeviceGamepad2 as DeviceGamepad2, IconMail as Mail, IconMapPin as MapPin, IconPhoto as Photo, IconPhone as Phone, IconSend as Send, IconStack2 as Stack2 } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";

const experienceIcons = [Camera, Photo, DeviceGamepad2, Stack2] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.contact;
    const form = copy.form;

    const [selectedType, setSelectedType] = useState(form.experienceTypes[0]);
    const [status, setStatus] = useState<Status>("idle");

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");

        const data = new FormData(event.currentTarget);
        const value = (key: string) => String(data.get(key) ?? "").trim();

        // The brief is richer than the shared contact endpoint's schema, so the
        // extra fields are folded into the message body rather than dropped.
        const details = [
            [form.company, value("company")],
            [form.event, value("event")],
            [form.venue, value("venue")],
            [form.date, value("date")],
            [form.audience, value("audience")],
            [form.budget, value("budget")],
            [form.experienceLegend, selectedType],
        ]
            .map(([label, entry]) => `${label.replace(" *", "")}: ${entry || "—"}`)
            .join("\n");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: value("name"),
                    email: value("email"),
                    phone: value("phone"),
                    subject: `${selectedType} — ${value("event") || value("company")}`,
                    message: `${details}\n\n${value("brief")}`,
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
                        <label>{form.email}<input required type="email" name="email" placeholder={form.emailPlaceholder} /></label>
                        <label>{form.phone}<input required name="phone" placeholder={form.phonePlaceholder} /></label>
                    </div>
                    <label>{form.event}<input required name="event" placeholder={form.eventPlaceholder} /></label>
                    <label>{form.venue}<input required name="venue" placeholder={form.venuePlaceholder} /></label>
                    <div className="p2-field-grid">
                        <label>{form.date}<input required type="date" name="date" /></label>
                        <label>{form.audience}<input required type="number" name="audience" min="1" placeholder={form.audiencePlaceholder} /></label>
                    </div>
                    <label>{form.budget}<select required name="budget" defaultValue=""><option value="" disabled>{form.budgetPlaceholder}</option>{form.budgetOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                    <fieldset>
                        <legend>{form.experienceLegend}</legend>
                        <div>{form.experienceTypes.map((label, index) => { const Icon = experienceIcons[index]; return <button key={label} type="button" className={selectedType === label ? "is-selected" : ""} onClick={() => setSelectedType(label)} aria-pressed={selectedType === label}><Icon aria-hidden="true" /><span>{label}</span></button>; })}</div>
                        <input type="hidden" name="experienceType" value={selectedType} />
                    </fieldset>
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
                <Link href={dictionary.routes.work}>{copy.liteWorkLabel} <ArrowRight aria-hidden="true" /></Link>
            </section>
            <section className="p2-contact-final">
                <Image src="/phase2/about-production-stage-v2.png" alt="" fill sizes="100vw" />
                <div>
                    <SignalHeading as="h2" solid={copy.finalSolid} outline={copy.finalOutline} />
                    <h2>{copy.finalTail}</h2>
                    <p><Phone aria-hidden="true" /> +90 534 233 40 51 <Mail aria-hidden="true" /> info@metasoftco.com <MapPin aria-hidden="true" /> {copy.location}</p>
                </div>
            </section>
        </article>
    );
}
