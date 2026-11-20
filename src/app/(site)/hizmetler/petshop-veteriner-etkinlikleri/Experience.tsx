"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, PawPrint, Plus, Smartphone, QrCode, MoveHorizontal, Bone } from "lucide-react";
import { homeFontClassName } from "@/components/home/fonts";
import { getAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { activities, faqs, occasions } from "./content";
import styles from "./pet-events.module.css";

const media = "/images/pet-events/";

function ConceptImage({ name, alt, priority = false }: { name: string; alt: string; priority?: boolean }) {
  const wide = name.endsWith("-story");
  // Static, locally optimised concept images extracted from the supplied presentation.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${media}${name}-960.webp`}
      srcSet={`${media}${name}-480.webp 480w, ${media}${name}-960.webp 960w${wide ? `, ${media}${name}-1600.webp 1600w` : ""}`}
      sizes={wide ? "(max-width: 760px) 90vw, 50vw" : priority ? "(max-width: 760px) 88vw, 40vw" : "(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 30vw"}
      width={960}
      height={1280}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

export default function PetEventsExperience() {
  const [occasion, setOccasion] = useState(occasions[1]);
  const [selected, setSelected] = useState<string[]>([]);
  const [portraitMode, setPortraitMode] = useState<"portrait-story" | "hero-story">("portrait-story");
  const [filter, setFilter] = useState("Tümü");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const chosen = activities.filter(item => selected.includes(item.id));
  const visible = activities.filter(item => filter === "Tümü" || item.category === filter);
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const whatsappText = `Merhaba, ${occasion.name} için etkinlik planlamak istiyorum.${chosen.length ? ` İlgilendiğim aktiviteler: ${chosen.map(item => item.name).join(", ")}.` : ""}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    const notes = String(data.get("message") || "").trim();
    const message = [
      `${occasion.name} için aktivite talebi.`,
      `Aktiviteler: ${chosen.length ? chosen.map(item => item.name).join(", ") : "Birlikte öneri hazırlayalım"}.`,
      `Tahmini ziyaretçi: ${String(data.get("guests") || "Belirtilmedi")}.`,
      notes,
    ].filter(Boolean).join("\n");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
          company: data.get("company"), eventDate: data.get("eventDate"), city: data.get("city"),
          guests: data.get("guests"), product: chosen.map(item => item.name).join(", ") || "Petshop ve veteriner etkinlikleri",
          subject: `Pet temalı etkinlik talebi — ${occasion.name}`, message, attribution: getAttribution(),
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Talebiniz gönderilemedi. Yeniden deneyebilir veya WhatsApp’tan ulaşabilirsiniz.");
      }
      setStatus("success");
      trackEvent("generate_lead", { form_name: "pet_events", occasion: occasion.id, activity_count: chosen.length });
      form.reset();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Talebiniz gönderilemedi. Lütfen yeniden deneyin.");
      setStatus("error");
    }
  }

  return (
    <div className={`${styles.page} ${homeFontClassName}`}>
      <div>
        <section className={styles.hero} aria-labelledby="pet-title">
          <div className={styles.heroCopy}>
            <p className={styles.breadcrumb}><Link href="/hizmetler">Hizmetler</Link><span>/</span>Patili etkinlikler</p>
            <p className={styles.eyebrow}><PawPrint size={17} /> PATİLER BİR ARAYA GELİNCE</p>
            <h1 id="pet-title">Petshop ve veteriner etkinlikleri.<span>Patili dostlara,<br /><em>büyük anılar.</em></span></h1>
            <p className={styles.lede}>Petshop açılışından veteriner kongresine, Hayvanları Koruma Günü’nden marka buluşmalarına. Fotoğrafı sanata, kısa bir molayı oyuna, etkinliğinizi kişisel bir hatıraya dönüştürelim.</p>
            <div className={styles.heroActions}>
              <a className={styles.button} href="#aktiviteler">Deneyimleri keşfet <ArrowDown size={19} /></a>
              <a className={styles.textLink} href="#teklif">Etkinliğini anlat <ArrowUpRight size={19} /></a>
            </div>
            <div className={styles.heroNote}><span className={styles.smallPaw}><PawPrint size={20} /></span><p>Markanıza özel tasarım.<br />Kurulum ve saha desteğiyle.</p></div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroOrbit} aria-hidden="true" />
            <figure className={styles.heroPortrait}>
              <ConceptImage name="pati-portresi" alt="Katılımcı ve köpeğinin yağlı boya stilindeki AI Pati Portresi konsepti" priority />
              <figcaption>İki iyi dost. Bir sanat eseri.</figcaption>
            </figure>
            <div className={styles.pawStamp} aria-hidden="true"><PawPrint strokeWidth={1.5} /></div>
            <figure className={styles.miniPortrait}>
              <ConceptImage name="pati-superhero" alt="Pati amblemli süper kahramana dönüştürülen katılımcı için AI Photo konsepti" />
              <figcaption>Kahramanı sizsiniz.</figcaption>
            </figure>
            <p className={styles.conceptNote}>Örnek konsept görselleri</p>
          </div>
        </section>
        <div className={styles.ribbon}><span>Birlikte fotoğraf.</span><PawPrint /><span>Birlikte oyun.</span><PawPrint /><span>Birlikte hatıra.</span><PawPrint /></div>
        <section className={styles.occasionSection} id="etkinlik" aria-labelledby="occasion-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>HER BULUŞMANIN BİR HİKÂYESİ VAR</p>
            <h2 id="occasion-title">Sizin hikâyeniz<br /><em>nerede başlıyor?</em></h2>
            <p>Mağaza, klinik, kongre ya da bir farkındalık günü. Deneyimi etkinliğinizin alanına ve amacına göre birlikte kuralım.</p>
          </div>
          <div className={styles.occasionPanel}>
            <div className={styles.occasionTabs} aria-label="Etkinlik türünüz">
              {occasions.map(item => <button key={item.id} type="button" aria-pressed={occasion.id === item.id} onClick={() => setOccasion(item)}>{item.name}</button>)}
            </div>
            <div className={styles.occasionCopy} aria-live="polite">
              <PawPrint className={styles.outlinePaw} aria-hidden="true" />
              <h3>{occasion.heading}</h3><p>{occasion.copy}</p>
              <div className={styles.recommendations}>{occasion.selected.map(id => <span key={id}>{activities.find(item => item.id === id)?.name}</span>)}</div>
              <button type="button" className={styles.textLink} onClick={() => { setSelected(current => Array.from(new Set([...current, ...occasion.selected]))); setFilter("Tümü"); document.getElementById("aktiviteler")?.scrollIntoView({ behavior: "smooth" }); }}>Bu önerileri planıma ekle <Plus size={19} /></button>
            </div>
          </div>
        </section>
        <section className={styles.portraitFeature} aria-labelledby="portrait-title">
          <div className={styles.portraitIntro}>
            <p className={styles.eyebrow}>AI PHOTO + AI STYLE / PATİ PORTRESİ</p>
            <h2 id="portrait-title">Telefonunda bir pati.<br /><em>Elinde bir sanat eseri.</em></h2>
            <p>Birlikte gelmeniz gerekmiyor. Siz poz verin; patili dostunuz telefonunuzdaki fotoğrafıyla hikâyeye katılsın. Ya da tek başınıza kendi kahramanınıza dönüşün.</p>
            <div className={styles.portraitTabs} role="group" aria-label="Pati Portresi konseptleri">
              <button type="button" aria-pressed={portraitMode === "portrait-story"} onClick={() => setPortraitMode("portrait-story")}>Patili dostuyla</button>
              <button type="button" aria-pressed={portraitMode === "hero-story"} onClick={() => setPortraitMode("hero-story")}>Tek başına kahraman</button>
            </div>
            <div className={styles.styleChips}><span>Yağlı boya</span><span>Suluboya</span><span>Pop art</span><span>Süper kahraman</span><span>Markanıza özel tema</span></div>
            <button type="button" className={styles.button} onClick={() => toggle("ai-photo")}>{selected.includes("ai-photo") ? "Pati Portresi planımda" : "Pati Portresi’ni planıma ekle"}{selected.includes("ai-photo") ? <Check size={19} /> : <Plus size={19} />}</button>
          </div>
          <figure className={styles.portraitStory}>
            <a href={`${media}${portraitMode}-1600.webp`} target="_blank" rel="noopener noreferrer" aria-label="Pati Portresi önce ve sonra konseptini büyük aç">
              <ConceptImage name={portraitMode} alt={portraitMode === "portrait-story" ? "Katılımcı ve köpeğinin ayrı fotoğraflardan ortak yağlı boya portresine dönüşümü" : "Katılımcının fotoğrafından pati amblemli süper kahraman portresine dönüşümü"} />
              <span>Konsepti büyük incele <ArrowUpRight size={16} /></span>
            </a>
            <figcaption>Örnek konsept çalışması. Görsel dil ve tema markanıza göre hazırlanır.</figcaption>
          </figure>
          <div className={styles.takeaways}><div><span>01 / ÇEKİM</span><h3>Sizin fotoğrafınızla başlar.</h3><p>Tek başına katılım veya patili dost fotoğrafıyla ortak portre.</p></div><div><span>02 / TASARIM</span><h3>Markanızla şekillenir.</h3><p>Etkinliğinize özel tema, çerçeve ve görsel dünya.</p></div><div><span>03 / HATIRA</span><h3>Elde baskı, telefonda kopya.</h3><p>Seçilen kapsama göre yerinde baskı ve QR ile dijital teslim.</p></div></div>
        </section>
        <section className={styles.activitiesSection} id="aktiviteler" aria-labelledby="activities-title">
          <div className={styles.activityHeader}><div><p className={styles.eyebrow}>MARKANIZLA ŞEKİLLENEN DENEYİMLER</p><h2 id="activities-title">Biraz teknoloji.<br /><em>Bolca pati sevgisi.</em></h2></div><p>Fotoğraf çekilsin, sohbet başlasın, oyun oynansın.<br />Etkinliğinize yakıştırdıklarınızı planınıza ekleyin.</p></div>
          <div className={styles.filterBar}>
            <div aria-label="Aktivite kategorileri">{["Tümü", "Hatıra", "Etkileşim", "Oyun"].map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "Tümü" && <span>{activities.length}</span>}</button>)}</div>
            <p>Görseller örnek konseptleri gösterir.</p>
          </div>
          <div className={styles.activityGrid}>
            {visible.map(item => {
              const active = selected.includes(item.id);
              return <article key={item.id} className={styles.activityCard}>
                <div className={`${styles.cardImage} ${styles[item.id.replaceAll("-", "_")] || ""}`}>
                  {item.id === "mama-kabini-doldur" ? <div className={styles.phoneGame} aria-label="Telefonla kontrol edilen mama toplama oyununun örnek akışı"><p>TELEFONUN KUMANDAN.</p><div className={styles.gameScreen}><span><Bone size={23} /><Bone size={18} /><Bone size={27} /></span><PawPrint size={55} /><small>MAMA KABINI DOLDUR</small></div><div className={styles.phoneController}><Smartphone size={60} strokeWidth={1.3} /><MoveHorizontal size={25} /></div><span className={styles.qrStep}><QrCode size={19} /> QR ile bağlan. Hareket ettir. Topla.</span><small>Kontrol akışı / örnek kurgu</small></div> : <ConceptImage name={item.image} alt={item.alt} />}
                  <span className={styles.categoryTag}>{item.category}</span>
                  <button type="button" className={styles.addButton} aria-pressed={active} aria-label={`${item.name} ${active ? "planımdan çıkar" : "planıma ekle"}`} onClick={() => toggle(item.id)}>{active ? <Check size={21} /> : <Plus size={21} />}</button>
                </div>
                <div className={styles.cardCopy}><h3>{item.name}<span>{item.heading}</span></h3><p>{item.description}</p><p className={styles.output}>{item.output}</p><div className={styles.cardActions}><button type="button" aria-pressed={active} onClick={() => toggle(item.id)}>{active ? <><Check size={16} /> Planımda</> : <>Planıma ekle <Plus size={16} /></>}</button>{item.href && <Link href={item.href}>Hizmet detayları <ArrowUpRight size={15} /></Link>}</div></div>
              </article>;
            })}
          </div>
        </section>
        <section className={styles.gameFeature} aria-labelledby="basket-title">
          <div className={styles.gameIllustration}><ConceptImage name="pati-sepeti-event" alt="Pati Sepeti oyununu büyük ekran önünde vücut hareketleriyle oynayan katılımcı için örnek konsept" /><span className={styles.gameSticker}><PawPrint size={32} /> HAREKETE<br />GEÇ!</span></div>
          <div className={styles.gameCopy}><p className={styles.eyebrow}>PET BASKET / HAREKETLE OYNANAN OYUN</p><h2 id="basket-title">Düşen mamalar.<br />Yükselen <em>heyecan.</em></h2><p>Eller serbest, rekabet tatlı. Katılımcılar vücut hareketleriyle sepeti yönlendirir; mama ve ürünleri toplarken engellerden kaçınır. Mağazanızın ürünlerini oyunun bir parçasına dönüştürelim.</p><button type="button" className={styles.button} onClick={() => toggle("pet-basket")}>{selected.includes("pet-basket") ? "Pet Basket planımda" : "Pet Basket’i planıma ekle"}{selected.includes("pet-basket") ? <Check size={19} /> : <Plus size={19} />}</button></div>
        </section>
        <section className={styles.processSection} id="kurulum" aria-labelledby="process-title">
          <div className={styles.sectionHead}><p className={styles.eyebrow}>FİKİRDEN ETKİNLİK ALANINA</p><h2 id="process-title">Siz davet edin.<br /><em>Biz deneyimi kuralım.</em></h2></div>
          <div className={styles.processGrid}>{[
            ["Etkinliğinizi dinleyelim", "Tarih, şehir, mekân, alan ve beklenen ziyaretçi sayısıyla ihtiyaçları birlikte netleştirelim."],
            ["Markanıza göre tasarlayalım", "Fotoğraf sahnelerini, oyun görsellerini ve cihaz giydirmelerini kampanyanıza uyarlayalım."],
            ["Alanda buluşalım", "Kurulum, deneme ve saha desteğini planlayıp ziyaretçilerinize hazır bir deneyim sunalım."],
          ].map(([heading, copy]) => <div key={heading}><span className={styles.processDot}><PawPrint size={23} /></span><h3>{heading}</h3><p>{copy}</p></div>)}</div>
          <p className={styles.comfortNote}>Patili dostların rahatlığı da planın bir parçası. Evcil hayvanlı çekimleri mekânın koşullarına ve hayvan sahibinin tercihine göre düzenleyelim.</p>
        </section>
        <section className={styles.quoteSection} id="teklif" aria-labelledby="quote-title">
          <div className={styles.quoteIntro}><p className={styles.eyebrow}>BİRLİKTE PLANLAYALIM</p><h2 id="quote-title">Bir fikriniz var.<br /><em>Bir pati de bizden.</em></h2><p>Petshop açılışı, veteriner kongresi, klinik tanıtımı ya da Hayvanları Koruma Günü etkinliğiniz için ihtiyaçlarınıza uygun bir kurgu hazırlayalım.</p><div className={styles.selection}><p>Etkinlik planınız <span>{chosen.length} aktivite</span></p>{chosen.length ? <ul>{chosen.map(item => <li key={item.id}><span>{item.name}</span><button type="button" aria-label={`${item.name} planımdan çıkar`} onClick={() => toggle(item.id)}>Çıkar</button></li>)}</ul> : <p className={styles.empty}>Henüz aktivite seçmediniz. İsterseniz size birlikte öneri hazırlayalım.</p>}</div><a className={styles.whatsapp} href={`https://wa.me/905342334051?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer">WhatsApp’tan konuşalım <ArrowUpRight size={18} /></a></div>
          <div className={styles.formPanel}>
            {status === "success" ? <div className={styles.success} role="status"><Check size={38} /><h3>Talebiniz bize ulaştı.</h3><p>Etkinlik detaylarınızı değerlendirmek üzere sizinle iletişime geçeceğiz.</p><button type="button" className={styles.textLink} onClick={() => setStatus("idle")}>Yeni bir talep oluştur <ArrowUpRight size={18} /></button></div> : <form onSubmit={submit}>
              <h3>Etkinliğinizden biraz bahsedin.</h3>
              <div className={styles.formGrid}>
                <label>Ad soyad <input name="name" autoComplete="name" required maxLength={160} placeholder="Adınız soyadınız" /></label>
                <label>İşletme / marka <input name="company" autoComplete="organization" maxLength={200} placeholder="İşletmenizin adı" /></label>
                <label>E-posta <input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="ornek@firmaniz.com" /></label>
                <label>Telefon <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="05xx xxx xx xx" /></label>
                <label>Etkinlik tarihi <input name="eventDate" type="date" /></label>
                <label>Şehir / mekân <input name="city" maxLength={200} placeholder="İstanbul, mağaza önü…" /></label>
                <label>Etkinlik türü <select aria-label="Teklif için etkinlik türü" value={occasion.id} onChange={event => setOccasion(occasions.find(item => item.id === event.target.value)!)}>{occasions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
                <label>Tahmini ziyaretçi <input name="guests" type="number" min="1" max="1000000" placeholder="Örn. 150" /></label>
              </div>
              <label>Eklemek istediğiniz bir şey var mı? <textarea name="message" rows={3} maxLength={4000} placeholder="Alanınız, etkinliğinizin amacı, aklınızdaki fikir…" /></label>
              <p className={styles.privacy}>Talebinizi göndermeden önce <Link href="/gizlilik">gizlilik ve veri kullanımı bilgilerini</Link> inceleyebilirsiniz. İletişim bilgileriniz talebinize dönüş yapmak için kullanılır.</p>
              {status === "error" && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.button} type="submit" disabled={status === "sending"}>{status === "sending" ? "Gönderiliyor…" : "Etkinliğim için teklif iste"}<ArrowUpRight size={20} /></button>
            </form>}
          </div>
        </section>
        <section className={styles.faqSection} aria-labelledby="faq-title"><div className={styles.sectionHead}><p className={styles.eyebrow}>AKLINIZDA KALMASIN</p><h2 id="faq-title">Küçük sorular,<br /><em>net cevaplar.</em></h2></div><div className={styles.faqList}>{faqs.map(item => <details key={item.q}><summary>{item.q}<Plus size={19} /></summary><p>{item.a}</p></details>)}</div></section>
      </div>
      {selected.length > 0 && <a className={styles.planDock} href="#teklif" aria-live="polite"><PawPrint size={19} /><span>Planımda <strong>{selected.length} aktivite</strong></span><span>Teklif al <ArrowUpRight size={17} /></span></a>}
    </div>
  );
}
