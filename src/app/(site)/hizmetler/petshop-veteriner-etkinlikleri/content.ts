export const path = "/hizmetler/petshop-veteriner-etkinlikleri";
export const title = "Petshop ve Veteriner Etkinlikleri | İnteraktif Aktiviteler";
export const description = "Petshop açılışı, veteriner kliniği etkinlikleri ve Hayvanları Koruma Günü için AI fotoğraf, interaktif oyun ve markaya özel aktiviteler. Kurulum ve saha desteği.";

export type Activity = {
  id: string;
  name: string;
  heading: string;
  category: "Hatıra" | "Etkileşim" | "Oyun";
  description: string;
  output: string;
  image: string;
  alt: string;
  href?: string;
};
export const activities: Activity[] = [
  {
    id: "ai-photo", name: "AI Photo", heading: "Birlikte, bambaşka bir dünyada.", category: "Hatıra",
    description: "Katılımcının fotoğrafını pet temalı karakterlere ve markanıza özel görsel dünyalara dönüştürelim. Etkinlikten geriye, paylaşılacak bir fotoğraf kalsın.",
    output: "Fotoğraf baskısı + QR ile dijital paylaşım", image: "ai-photo",
    alt: "Pati desenli mavi fonda kedisiyle poz veren katılımcı için AI Photo konsepti",
    href: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala",
  },
  {
    id: "ai-greenbox", name: "AI Greenbox", heading: "Patili dostuyla bir hayal yolculuğu.", category: "Hatıra",
    description: "Katılımcıyı ve patili dostunu seçilen dijital arka plana taşıyan fotoğraf deneyimi. Fantastik bir orman ya da kampanyanıza özel bir sahneyle kendi hikâyenizi kuralım.",
    output: "Markaya özel sahne + baskı + QR paylaşımı", image: "ai-greenbox",
    alt: "Köpeğiyle fantastik bir uzay sahnesine taşınan katılımcı için AI Greenbox konsepti",
    href: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama",
  },
  {
    id: "ai-pet-assistant", name: "AI Pet Assistant", heading: "Ekranın öte yanında bir pati var.", category: "Etkileşim",
    description: "Ekrandaki sevimli dijital karakterle mikrofon üzerinden sohbet. Markanızın diline göre hazırlanan eğlenceli yanıtlarla ziyaretçilere konuşacak bir sebep verelim.",
    output: "Mikrofonla etkileşim + markaya özel karakter", image: "ai-pet-assistant",
    alt: "Petshop girişinde dijital köpek karakteriyle sohbet edilen AI Pet Assistant kiosku konsepti",
  },
  {
    id: "cabin-photo", name: "Cabin Photo", heading: "Küçük bir kabin, bolca hatıra.", category: "Hatıra",
    description: "Katılımcılar tek başlarına ya da dostlarıyla kabine girer, üç farklı poz verir. Fotoğraflar hem basılı hem dijital olarak teslim edilir.",
    output: "Üç poz + basılı ve dijital fotoğraf", image: "cabin-photo",
    alt: "Petshop için pati desenleriyle giydirilmiş kapalı fotoğraf kabini konsepti",
    href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/cabin-photo",
  },
  {
    id: "message-wall", name: "Message Wall", heading: "Onlara söyleyecek çok şeyimiz var.", category: "Etkileşim",
    description: "Ziyaretçi ekrana günün duygusunu ya da patili dostuna mesajını yazar. Bu sırada kaydedilen 15–20 saniyelik video, QR kodla kişisel bir hatıraya dönüşür.",
    output: "Kişisel mesaj videosu + QR ile teslim", image: "message-wall",
    alt: "Patili dostuyla petshop temalı mesaj duvarına yazı yazan katılımcı konsepti",
  },
  {
    id: "magazine-foto", name: "Magazine Foto", heading: "Kapağın yıldızı belli.", category: "Hatıra",
    description: "Logonuz, sloganınız ve kampanya mesajınızla hazırlanan cam kabinde dergi kapağı çekimi. Ziyaretçileriniz kendi kapak fotoğraflarıyla etkinlikten ayrılsın.",
    output: "Dergi kapağı konsepti + baskı + dijital fotoğraf", image: "magazine-foto",
    alt: "Sevimli Pati Dostları yazılı dergi kapağı kabininde köpeğiyle poz veren katılımcı konsepti",
    href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/magazine-cover",
  },
  {
    id: "pet-basket", name: "Pet Basket", heading: "Mamaları topla. Patileri sevindir.", category: "Oyun",
    description: "Katılımcı, vücut hareketleriyle dijital sepeti sağa sola yönlendirir. Düşen mama ve ürünleri toplar, engellerden kaçınır ve yüksek skor için yarışır.",
    output: "Hareketle kontrol + mama ve ürün toplama oyunu", image: "pet-basket",
    alt: "Pati Sepeti oyununda mama ve oyuncakların dijital sepette toplandığı ekran konsepti",
  },
];
export const occasions = [
  { id: "petshop", name: "Petshop açılışı", heading: "Yeni komşuluğa patili bir merhaba.", copy: "Mağaza girişinde dikkat çeken bir dijital karakter, içeride fotoğraf hatırası, kapanışta küçük bir oyun. Açılış alanınızın akışına uygun bir deneyim seçelim.", selected: ["ai-pet-assistant", "ai-photo", "pet-basket"] },
  { id: "veteriner", name: "Veteriner kliniği", heading: "Kliniğinizle sıcak bir ilk tanışma.", copy: "Klinik açılışı ve tanıtım günlerinde sakin bir fotoğraf köşesiyle ziyaretçileri karşılayın. Fotoğraf ve mesaj deneyimini alanınıza göre birlikte planlayalım.", selected: ["ai-greenbox", "cabin-photo", "message-wall"] },
  { id: "hayvanlar-gunu", name: "Hayvanları Koruma Günü", heading: "Bir günün heyecanı, birlikte bir hatıra.", copy: "4 Ekim Hayvanları Koruma Günü, AVM etkinlikleri ve pet markası buluşmalarında fotoğrafı, oyunu ve katılımcı mesajlarını aynı temada buluşturun.", selected: ["magazine-foto", "message-wall", "pet-basket"] },
];
export const faqs = [
  { q: "Petshop açılışı için hangi aktiviteler uygundur?", a: "AI Pet Assistant ziyaretçileri dijital karakterle karşılayabilir. AI Photo, Cabin Photo veya Magazine Foto bir fotoğraf hatırası sunar. Pet Basket ise vücut hareketleriyle oynanan ürün toplama oyunudur. Seçim, mağazanın alanı ve ziyaretçi akışına göre yapılır." },
  { q: "Veteriner kliniği açılışında etkinlik yapılabilir mi?", a: "Evet. Klinik açılışı ve tanıtım günleri için fotoğraf ve mesaj deneyimleri planlanabilir. Bekleme, muayene ve giriş alanlarının kullanımı klinik ekibiyle birlikte belirlenir; çekim köşesi buna göre yerleştirilir." },
  { q: "Hayvanları Koruma Günü için konsept hazırlanabilir mi?", a: "4 Ekim Hayvanları Koruma Günü için pati temalı fotoğraf arka planları, katılımcı mesajları, dergi kapağı ve mama toplama oyunu aynı kampanya görsel diliyle hazırlanabilir. AVM, mağaza ve marka etkinliğinin kapsamına göre aktiviteler seçilir." },
  { q: "Aktiviteler markamıza göre tasarlanabilir mi?", a: "Ekran arayüzleri, fotoğraf çerçeveleri, dijital sahneler ve cihaz giydirmeleri proje kapsamına göre logo, renk ve kampanya mesajlarıyla uyarlanır. Pet Basket oyunundaki ürün görselleri ve AI Pet Assistant karakterinin dili de hazırlık aşamasında görüşülür." },
  { q: "Canlı hayvanların katılması gerekiyor mu?", a: "Gerekmiyor. Ziyaretçiler fotoğraf, mesaj, dijital karakter ve oyun deneyimlerine tek başlarına da katılabilir. Evcil hayvanlı çekimler mekânın kabul koşulları, hayvan sahibinin tercihi ve dostumuzun rahatlığına göre planlanır." },
  { q: "AI Pet Assistant hayvan sağlığı konusunda danışmanlık verir mi?", a: "Bu sayfadaki AI Pet Assistant, etkinliğe özel eğlenceli sohbet için tasarlanan bir dijital karakter deneyimidir. Karakterin konuşma kapsamı etkinlik öncesinde belirlenir. Sağlıkla ilgili sorular veteriner hekime yönlendirilir." },
  { q: "Kurulum ve teklif süreci nasıl ilerliyor?", a: "Etkinliğin türünü, tarihini, şehrini, mekânını ve tahmini ziyaretçi sayısını paylaşın. Seçtiğiniz aktiviteler için alan, süre, baskı ve tasarım ihtiyaçlarını netleştirerek kurulum ve saha desteğini içeren projeye özel teklif hazırlayalım." },
];
