// Creates the "Yazılım Geliştirme" service category, its five services and
// four software projects. Services and projects are created UNPUBLISHED so
// they can be reviewed in the editpanel first. Re-running only fills in
// records that do not exist yet; --sync also refreshes the copy of records
// the editor has not touched. Editor changes are never overwritten.
// Usage: npx tsx scripts/seed-software.ts [--sync] [--apply]
import "dotenv/config";
import { prisma } from "@/lib/db";
import { SOFTWARE_CATEGORY_SLUG } from "@/lib/software";

const BECOME_HACKER_URL = "https://apps.apple.com/us/app/become-hacker/id6753705802";
const ZEKAI_URL = "https://apps.apple.com/us/app/zekai-5-logic-puzzles/id6756515513";
const BECOME_HACKER_PLAY_URL = "https://play.google.com/store/apps/details?id=com.sixsensely.becomehacker";
const ZEKAI_PLAY_URL = "https://play.google.com/store/apps/details?id=com.sixsensely.zekai";
const MYSTICSIP_PLAY_URL = "https://play.google.com/store/apps/details?id=com.sixsenselyapp.mysticsip";

const SUPPORT = "İlk yıl bakım ücretsiz";

const category = {
    name: "Yazılım Geliştirme",
    slug: SOFTWARE_CATEGORY_SLUG,
    order: 20,
    heroTitle: "Markanıza Özel Yazılım Geliştirme",
    heroContent:
        "Mobil uygulama, web paneli, şirket içi süreç yazılımı ve yapay zeka entegrasyonu. İstanbul Üniversitesi Teknopark'taki ekibimiz, etkinliklerde binlerce kullanıcıyla sahada test edilen yazılım tecrübesini kurumsal projelerinize taşıyor.",
    metaTitle: "Özel Yazılım Geliştirme İstanbul | Mobil Uygulama & Web | MetasoftCo",
    metaDescription:
        "Mobil uygulama, web paneli, süreç yazılımı ve yapay zeka entegrasyonu. Fikirden yayına uçtan uca geliştirme, ilk yıl ücretsiz bakım ve NDA ile çalışma.",
    metaKeywords:
        "özel yazılım geliştirme, yazılım firması istanbul, mobil uygulama geliştirme, web uygulaması geliştirme, kurumsal yazılım, yapay zeka entegrasyonu",
    content: `<h2>Fikirden yayına uçtan uca yazılım</h2>
<p>Sahada gördüğünüz yapay zeka deneyimlerini, müşteri panellerini ve oyunları kendi ekibimiz geliştiriyor. Aynı ekip; mobil uygulamadan şirket içi süreç yazılımlarına kadar markanıza özel projeleri, küçük ya da büyük ölçek fark etmeksizin fikir aşamasından yayına kadar üstleniyor.</p>
<h3>Nasıl çalışıyoruz?</h3>
<ol>
<li><strong>Keşif:</strong> İhtiyaçlarınızı, kullanıcılarınızı ve hedeflerinizi birlikte netleştiriyoruz. Talep etmeniz halinde bu aşamadan önce gizlilik sözleşmesi (NDA) imzalıyoruz.</li>
<li><strong>Tasarım:</strong> Kullanıcı akışlarını ve arayüz tasarımını hazırlayıp onayınıza sunuyoruz.</li>
<li><strong>Geliştirme:</strong> Onaylanan tasarım üzerine yazılımı geliştiriyor, ilerlemeyi düzenli olarak sizinle paylaşıyoruz.</li>
<li><strong>Test:</strong> Yazılımı farklı cihaz ve senaryolarda test ediyoruz.</li>
<li><strong>Yayın:</strong> App Store ve Google Play yayınını yönetiyor ya da yazılımı sunucunuza kuruyoruz.</li>
<li><strong>Bakım:</strong> İlk yıl bakım ücretsiz; sonrasında yıllık bakım anlaşmasıyla süresiz destek veriyoruz.</li>
</ol>
<h3>Teknolojiler</h3>
<p>Python, Next.js, Node.js, .NET MVC, Unity ve React Native ile çalışıyoruz. Her projede teknolojiyi ihtiyaca, ölçeğe ve mevcut altyapınıza göre seçiyoruz.</p>
<h3>Kaynak kod, barındırma ve gizlilik</h3>
<p>Kaynak kodu talep halinde teslim ediyor, yazılımı kendi sunucularınıza kuruyoruz. Dilerseniz yazılım bizim altyapımızda çalışır. Bu detaylar proje sözleşmesinde birlikte belirlenir.</p>
<h3>Yaptığımız işlerden</h3>
<ul>
<li><a href="/projeler/enerjisa-quiz-uygulamasi">Enerjisa Quiz Uygulaması</a>: 400–500 kullanıcıya ulaşan cross-platform bilgi yarışması.</li>
<li><a href="/projeler/become-hacker">Become Hacker</a>: App Store ve Google Play'de yayında olan siber güvenlik eğitim uygulamamız.</li>
<li><a href="/projeler/zekai">ZekAI</a>: iOS ve Android'de 25 dilde yayında olan, beş mantık oyununu bir araya getiren mobil oyunumuz.</li>
<li><a href="/projeler/mysticsip">MysticSip</a>: Fincan fotoğrafını görüntü işlemeyle yorumlayan, Google Play'de yayında olan yapay zeka uygulamamız.</li>
<li><a href="/hizmetler/data-capture-crm">Data-Capture CRM ve müşteri paneli</a>: Etkinliklerde lead toplayan kendi CRM altyapımız.</li>
</ul>`,
    faq: [
        {
            q: "Hangi tür yazılım projeleri geliştiriyorsunuz?",
            a: "Mobil uygulamalar, web uygulamaları ve yönetim panelleri, şirket içi süreç yazılımları, yapay zeka entegrasyonları, oyun ve eğitim uygulamaları geliştiriyoruz. Projenin ölçeği ne olursa olsun fikir aşamasından yayına kadar üstleniyoruz.",
        },
        {
            q: "Hangi platform ve teknolojilerle çalışıyorsunuz?",
            a: "iOS ve Android için React Native ile cross-platform uygulamalar, web için Next.js, Node.js ve .NET MVC, yapay zeka için Python, oyunlar için Unity kullanıyoruz.",
        },
        {
            q: "Proje fiyatı nasıl belirlenir?",
            a: "Fiyat; kapsam, platform sayısı, entegrasyonlar ve tasarım ihtiyacına göre belirlenir. Keşif görüşmesinin ardından kapsamı netleştirip detaylı bir teklif sunuyoruz.",
        },
        {
            q: "Yayın sonrası bakım ve destek veriyor musunuz?",
            a: "Evet. Tüm projelerimizde ilk yıl bakım ücretsizdir. Sonrasında yıllık bakım anlaşmasıyla süresiz destek sunuyoruz.",
        },
        {
            q: "Kaynak kod bize teslim ediliyor mu?",
            a: "Talep halinde kaynak kodu teslim ediyor ve yazılımı kendi sunucularınıza kuruyoruz. Dilerseniz yazılım bizim altyapımızda çalışır. Detaylar proje sözleşmesinde belirlenir.",
        },
        {
            q: "Gizlilik sözleşmesi (NDA) imzalıyor musunuz?",
            a: "Evet. Talep etmeniz halinde, proje detaylarını paylaşmadan önce gizlilik sözleşmesi imzalıyoruz.",
        },
    ],
};

type ServiceSeed = {
    title: string;
    slug: string;
    order: number;
    description: string;
    content: string;
    specs: { label: string; value: string }[];
    faq: { q: string; a: string }[];
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
};

const services: ServiceSeed[] = [
    {
        title: "Mobil Uygulama Geliştirme",
        slug: "mobil-uygulama-gelistirme",
        order: 1,
        description:
            "iOS ve Android için tek kod tabanıyla cross-platform mobil uygulamalar: tasarımdan App Store ve Google Play yayınına kadar.",
        content: `<h2>Markanıza özel mobil uygulama</h2>
<p>Çalışanlarınız, müşterileriniz ya da etkinlik katılımcılarınız için iOS ve Android'de çalışan mobil uygulamalar geliştiriyoruz. Tasarım, geliştirme, mağaza yayını ve bakım tek ekipten ilerliyor.</p>
<h3>Neler geliştiriyoruz?</h3>
<ul>
<li>Kurumsal ve çalışan uygulamaları</li>
<li>Müşteri ve sadakat uygulamaları</li>
<li>Eğitim, quiz ve bilgi yarışması uygulamaları</li>
<li>Mobil oyunlar</li>
</ul>
<h3>Cross-platform yaklaşım</h3>
<p>React Native ile tek kod tabanından hem iOS hem Android uygulaması çıkarıyoruz. Böylece iki platform aynı anda yayına çıkar, sonraki güncellemeler de iki platforma birlikte ulaşır.</p>
<h3>Yayın ve sonrası</h3>
<p>App Store ve Google Play yayın süreçlerini yönetiyoruz. İhtiyaca göre içerik ve kullanıcı yönetimi için web tabanlı bir yönetim paneli de geliştiriyoruz. İlk yıl bakım ücretsiz.</p>
<h3>Yayında olan uygulamalarımız</h3>
<p><a href="/projeler/become-hacker">Become Hacker</a> ve <a href="/projeler/zekai">ZekAI</a>, ekibimizin geliştirip hem App Store'da hem Google Play'de yayınladığı cross-platform uygulamalardır. <a href="/projeler/mysticsip">MysticSip</a> ise Google Play'de yayında.</p>`,
        specs: [
            { label: "Platform", value: "iOS · Android" },
            { label: "Teknoloji", value: "React Native (cross-platform)" },
            { label: "Yayın", value: "App Store · Google Play" },
            { label: "Destek", value: SUPPORT },
        ],
        faq: [
            {
                q: "iOS ve Android için ayrı ayrı uygulama mı geliştiriliyor?",
                a: "Hayır. React Native ile tek kod tabanından iki platform için uygulama geliştiriyoruz; güncellemeler de iki platforma birlikte ulaşır.",
            },
            {
                q: "Uygulamanın mağazalarda yayınlanmasını siz mi yapıyorsunuz?",
                a: "Evet. App Store ve Google Play yayın süreçlerini yönetiyoruz. Kendi uygulamalarımızı da her iki mağazada yayınladık.",
            },
            {
                q: "Uygulama için yönetim paneli de geliştiriyor musunuz?",
                a: "Evet. İhtiyaca göre içerik, kullanıcı ve bildirim yönetimi için web tabanlı bir yönetim paneli geliştiriyoruz.",
            },
        ],
        metaTitle: "Mobil Uygulama Geliştirme İstanbul | iOS & Android | MetasoftCo",
        metaDescription:
            "React Native ile iOS ve Android için cross-platform mobil uygulama geliştirme. Tasarım, App Store ve Google Play yayını, ilk yıl ücretsiz bakım.",
        metaKeywords: "mobil uygulama geliştirme, ios uygulama geliştirme, android uygulama geliştirme, react native, cross platform uygulama",
    },
    {
        title: "Web Uygulaması ve Yönetim Paneli Geliştirme",
        slug: "web-uygulamasi-ve-yonetim-paneli-gelistirme",
        order: 2,
        description:
            "Yönetim panelleri, müşteri portalları ve kuruma özel CRM çözümleri: Next.js, Node.js ve .NET MVC ile web uygulamaları.",
        content: `<h2>İşinize göre şekillenen web uygulamaları</h2>
<p>Hazır yazılımların karşılamadığı ihtiyaçlar için kuruma özel web uygulamaları geliştiriyoruz. Tarayıcıdan çalışan, farklı yetki seviyelerine sahip kullanıcıların birlikte kullanabildiği sistemler kuruyoruz.</p>
<h3>Neler geliştiriyoruz?</h3>
<ul>
<li>Yönetim panelleri ve dashboard'lar</li>
<li>Müşteri, bayi ve çalışan portalları</li>
<li>Kuruma özel CRM ve lead yönetimi</li>
<li>Başvuru, rezervasyon ve kayıt sistemleri</li>
<li>Raporlama ve veri görselleştirme ekranları</li>
</ul>
<h3>Örnek: Data-Capture müşteri paneli</h3>
<p>Etkinliklerde toplanan kayıtları müşterilerimizin canlı takip ettiği, filtrelediği, Excel/CSV olarak indirdiği ve yapay zeka ile istatistik ürettiği paneli kendi ekibimiz geliştirdi. <a href="/hizmetler/data-capture-crm">Detaylı bilgi</a></p>
<h3>Teknoloji ve barındırma</h3>
<p>Next.js, Node.js ve .NET MVC ile geliştiriyoruz. Yazılım sizin sunucularınıza kurulabilir ya da bizim altyapımızda çalışabilir; kaynak kod talep halinde teslim edilir.</p>`,
        specs: [
            { label: "Teknoloji", value: "Next.js · Node.js · .NET MVC" },
            { label: "Barındırma", value: "Sunucunuz veya altyapımız" },
            { label: "Kaynak kod", value: "Talep halinde teslim" },
            { label: "Destek", value: SUPPORT },
        ],
        faq: [
            {
                q: "Web uygulaması hangi sunucuda çalışır?",
                a: "Tercihinize göre kendi sunucularınıza kuruyoruz ya da yazılım bizim altyapımızda çalışıyor. Bu seçim proje sözleşmesinde belirlenir.",
            },
            {
                q: "Mevcut sistemlerimizle entegre olabilir mi?",
                a: "Evet. Mevcut sistemlerinizin sunduğu entegrasyon imkanlarına göre veri alışverişi kuruyoruz; keşif aşamasında bunu birlikte netleştiriyoruz.",
            },
            {
                q: "Farklı kullanıcı yetkileri tanımlanabilir mi?",
                a: "Evet. Yönetici, editör ve görüntüleyici gibi rollerle her kullanıcının neyi görüp düzenleyebileceğini belirleyebilirsiniz.",
            },
        ],
        metaTitle: "Web Uygulaması & Yönetim Paneli Geliştirme | MetasoftCo",
        metaDescription:
            "Yönetim paneli, müşteri portalı ve kuruma özel CRM geliştirme. Next.js, Node.js ve .NET MVC; sunucunuza kurulum veya bizim altyapımız.",
        metaKeywords: "web uygulaması geliştirme, yönetim paneli geliştirme, özel crm yazılımı, kurumsal web portalı, next.js",
    },
    {
        title: "Kurumsal Süreç Yazılımları",
        slug: "kurumsal-surec-yazilimlari",
        order: 3,
        description:
            "Excel ve e-postayla yürüyen iş süreçlerinizi talep, onay, iş akışı ve raporlama yazılımlarıyla dijitale taşıyoruz.",
        content: `<h2>Süreçlerinize göre yazılan yazılım</h2>
<p>Tablolar, e-postalar ve kağıt formlarla yürüyen iş süreçleri büyüdükçe takip etmesi zorlaşır. Bu süreçleri şirketinize özel bir yazılıma taşıyarak herkesin aynı güncel veriyle çalışmasını sağlıyoruz.</p>
<h3>Neler geliştiriyoruz?</h3>
<ul>
<li>Talep, onay ve iş akışı sistemleri</li>
<li>Saha, stok ve operasyon takibi</li>
<li>Çalışan portalları ve iç iletişim araçları</li>
<li>Raporlama ve yönetim ekranları</li>
</ul>
<h3>Nasıl ilerliyoruz?</h3>
<p>Önce mevcut sürecinizi ekiplerinizle birlikte analiz ediyor, ardından yazılımı bu sürece göre tasarlıyoruz. Yazılım sizin sunucularınıza kurulabilir ya da bizim altyapımızda çalışabilir. Talep halinde proje başlamadan gizlilik sözleşmesi (NDA) imzalıyoruz.</p>`,
        specs: [
            { label: "Kapsam", value: "Analizden kuruluma" },
            { label: "Kurulum", value: "Sunucunuz veya altyapımız" },
            { label: "Gizlilik", value: "Talep halinde NDA" },
            { label: "Destek", value: SUPPORT },
        ],
        faq: [
            {
                q: "Hazır bir yazılım yerine neden özel yazılım?",
                a: "Hazır yazılımlar sizi kendi işleyişlerine uymaya zorlar. Özel yazılım ise sizin sürecinize göre tasarlanır ve ihtiyaçlarınız değiştikçe geliştirilebilir.",
            },
            {
                q: "Süreç analizi nasıl yapılıyor?",
                a: "Süreci kullanan ekiplerle görüşerek mevcut adımları, sorunları ve beklentileri çıkarıyor; yazılımın kapsamını buna göre belirliyoruz.",
            },
            {
                q: "Verilerimiz nerede tutuluyor?",
                a: "Tercihinize göre kendi sunucularınızda ya da bizim altyapımızda. Bu seçim proje sözleşmesinde belirlenir.",
            },
        ],
        metaTitle: "Kurumsal Süreç Yazılımı Geliştirme | İş Akışı & Onay | MetasoftCo",
        metaDescription:
            "Talep, onay, iş akışı ve raporlama süreçleriniz için şirketinize özel yazılım. Süreç analizi, sunucunuza kurulum, NDA ile çalışma.",
        metaKeywords: "kurumsal süreç yazılımı, iş akışı yazılımı, onay sistemi yazılımı, şirkete özel yazılım, dijital dönüşüm",
    },
    {
        title: "Yapay Zeka Entegrasyonu",
        slug: "yapay-zeka-entegrasyonu",
        order: 4,
        description:
            "Görüntü işleme, üretken yapay zeka ve otomasyon: Python tabanlı yapay zeka çözümlerini ürünlerinize ve iş süreçlerinize entegre ediyoruz.",
        content: `<h2>Sahada test edilmiş yapay zeka tecrübesi</h2>
<p>Etkinliklerde katılımcıların fotoğraflarını saniyeler içinde yapay zeka ile dönüştüren sistemlerimizi kendi ekibimiz geliştiriyor ve yoğun kalabalıklar önünde canlı çalıştırıyor. Bu tecrübeyi ürünlerinize ve iş süreçlerinize taşıyoruz.</p>
<p>Aynı tecrübeyle geliştirdiğimiz <a href="/projeler/mysticsip">MysticSip</a>, kullanıcının yüklediği fincan fotoğrafını görüntü işlemeyle analiz edip yapay zeka ile kişiye özel yorum üretiyor.</p>
<h3>Neler yapabiliriz?</h3>
<ul>
<li>Görüntü işleme ve üretken görsel çözümleri</li>
<li>Metin ve doküman işleme, yapay zeka asistanları</li>
<li>Veri analizi ve otomatik raporlama</li>
<li>Tekrarlayan işlerin otomasyonu</li>
</ul>
<h3>Nasıl ilerliyoruz?</h3>
<p>Yapay zekanın gerçekten fark yaratacağı noktayı birlikte belirliyor, küçük bir prototiple doğruluyor ve ardından mevcut yazılımlarınıza entegre ediyoruz. Python ile geliştiriyoruz.</p>`,
        specs: [
            { label: "Teknoloji", value: "Python" },
            { label: "Alanlar", value: "Görüntü · Metin · Veri" },
            { label: "Yaklaşım", value: "Prototip ile doğrulama" },
            { label: "Destek", value: SUPPORT },
        ],
        faq: [
            {
                q: "Yapay zekayı mevcut yazılımımıza ekleyebilir misiniz?",
                a: "Evet. Yapay zeka çözümünü mevcut yazılımınızın yanında çalışacak şekilde geliştirip entegre ediyoruz.",
            },
            {
                q: "Hangi işlerde yapay zeka kullanmak mantıklı?",
                a: "Görüntü ve doküman işleme, tekrarlayan işler ve büyük veriden özet çıkarma gibi alanlarda. Keşif aşamasında sizin için en çok fark yaratacak kullanımı birlikte belirliyoruz.",
            },
            {
                q: "Etkinliklerde kullandığınız yapay zeka sistemleri de sizin mi?",
                a: "Evet. Etkinliklerde çalışan yapay zeka fotoğraf ve görüntü işleme sistemlerini kendi ekibimiz geliştiriyor.",
            },
        ],
        metaTitle: "Yapay Zeka Entegrasyonu | Görüntü İşleme & Otomasyon | MetasoftCo",
        metaDescription:
            "Görüntü işleme, üretken yapay zeka, doküman işleme ve otomasyon çözümlerini ürünlerinize entegre ediyoruz. Python ile, prototipten canlıya.",
        metaKeywords: "yapay zeka entegrasyonu, yapay zeka yazılım geliştirme, görüntü işleme yazılımı, ai otomasyon, python yapay zeka",
    },
    {
        title: "Oyun ve Eğitim Uygulamaları",
        slug: "oyun-ve-egitim-uygulamalari",
        order: 5,
        description:
            "Unity ve React Native ile mobil oyunlar, quiz ve oyunlaştırılmış eğitim uygulamaları: çalışan eğitiminden marka oyunlarına.",
        content: `<h2>Öğreten ve bağlayan uygulamalar</h2>
<p>Oyun mekanikleri, bilgiyi akılda kalıcı hale getirir ve kullanıcıyı uygulamaya geri döndürür. Çalışan eğitimleri, marka oyunları ve bilgi yarışmaları için oyunlaştırılmış uygulamalar geliştiriyoruz.</p>
<h3>Yaptığımız işlerden</h3>
<ul>
<li><a href="/projeler/enerjisa-quiz-uygulamasi">Enerjisa Quiz Uygulaması</a>: 400–500 kullanıcıya ulaşan cross-platform bilgi yarışması.</li>
<li><a href="/projeler/become-hacker">Become Hacker</a>: Quiz ve derslerle siber güvenlik öğreten, XP ve seviye sistemli eğitim uygulaması.</li>
<li><a href="/projeler/zekai">ZekAI</a>: 20.000'den fazla bölüm, günlük görevler ve başarımlarla beş mantık oyunu.</li>
</ul>
<h3>Neler geliştiriyoruz?</h3>
<ul>
<li>Çalışan eğitimi ve uyum eğitimi uygulamaları</li>
<li>Quiz ve bilgi yarışması uygulamaları</li>
<li>Marka oyunları ve mobil oyunlar</li>
</ul>
<p>Oyunları Unity, uygulamaları React Native ile geliştiriyoruz.</p>`,
        specs: [
            { label: "Teknoloji", value: "Unity · React Native" },
            { label: "Platform", value: "iOS · Android · Web" },
            { label: "Mekanikler", value: "XP · Seviye · Günlük görev" },
            { label: "Destek", value: SUPPORT },
        ],
        faq: [
            {
                q: "Çalışan eğitimlerimizi oyunlaştırabilir misiniz?",
                a: "Evet. Eğitim içeriklerinizi quiz, ders, XP ve seviye gibi mekaniklerle çalışanların gönüllü olarak tamamladığı bir uygulamaya dönüştürüyoruz.",
            },
            {
                q: "Markamıza özel bir mobil oyun geliştirebilir misiniz?",
                a: "Evet. Unity ile markanıza özel mobil oyunlar geliştiriyor, App Store ve Google Play yayınını yönetiyoruz.",
            },
            {
                q: "Etkinlikteki quiz oyununu kalıcı bir uygulamaya dönüştürebilir miyiz?",
                a: "Evet. Etkinlikte kullandığınız oyun veya quiz deneyimini çalışanlarınızın ya da müşterilerinizin her zaman kullanabileceği bir uygulamaya dönüştürebiliriz.",
            },
        ],
        metaTitle: "Oyun & Eğitim Uygulaması Geliştirme | Unity, Quiz | MetasoftCo",
        metaDescription:
            "Mobil oyun, quiz ve oyunlaştırılmış eğitim uygulaması geliştirme. Unity ve React Native ile; Enerjisa, Become Hacker ve ZekAI tecrübesi.",
        metaKeywords: "oyun geliştirme, mobil oyun geliştirme, eğitim uygulaması geliştirme, gamification, quiz uygulaması, unity",
    },
];

const projects = [
    {
        title: "Enerjisa Quiz Uygulaması",
        slug: "enerjisa-quiz-uygulamasi",
        client: "Enerjisa",
        technologies: JSON.stringify(["Cross-platform"]),
        projectUrl: null as string | null,
        description: "Enerjisa için geliştirdiğimiz cross-platform bilgi yarışması uygulaması 400–500 kullanıcıya ulaştı.",
        content: `<p>Enerjisa için farklı cihazlarda aynı deneyimi sunan, cross-platform bir bilgi yarışması uygulaması geliştirdik. Uygulamayı 400–500 kişi kullandı.</p>
<h3>Ne yaptık?</h3>
<p>Uygulamanın tasarımını ve geliştirmesini üstlendik; tek kod tabanıyla farklı platformlarda çalışan bir yapı kurduk.</p>`,
        metaTitle: "Enerjisa Quiz Uygulaması | Yazılım Projesi | MetasoftCo",
        metaDescription: "Enerjisa için geliştirdiğimiz cross-platform bilgi yarışması uygulaması 400–500 kullanıcıya ulaştı.",
    },
    {
        title: "Become Hacker: Siber Güvenlik Eğitim Uygulaması",
        slug: "become-hacker",
        client: "Kendi ürünümüz",
        technologies: null as string | null,
        projectUrl: BECOME_HACKER_URL,
        description:
            "Quiz ve derslerle siber güvenlik öğreten, XP ve seviye sistemiyle kullanıcıyı ilerleten eğitim uygulamamız App Store ve Google Play'de yayında.",
        content: `<p>Become Hacker, kullanıcılara bir hacker gibi düşünmeyi öğreterek siber güvenlik farkındalığı kazandıran bir eğitim uygulaması. Ekibimiz tarafından cross-platform olarak geliştirildi; iOS ve Android'de yayında.</p>
<h3>Öne çıkanlar</h3>
<ul>
<li>Quiz ve derslerle adım adım siber güvenlik eğitimi</li>
<li>XP kazanma ve seviye atlama ile oyunlaştırılmış ilerleme</li>
<li>Uygulama içi premium abonelik</li>
<li>Android, iPhone, iPad, Mac ve Apple Vision Pro desteği</li>
</ul>
<p>Aynı yaklaşımı kurumların çalışan eğitimleri için de uyguluyoruz.</p>
<p><a href="${BECOME_HACKER_URL}" target="_blank" rel="noopener noreferrer">App Store</a> · <a href="${BECOME_HACKER_PLAY_URL}" target="_blank" rel="noopener noreferrer">Google Play</a></p>`,
        metaTitle: "Become Hacker | Siber Güvenlik Eğitim Uygulaması | MetasoftCo",
        metaDescription:
            "Quiz ve derslerle siber güvenlik öğreten, XP ve seviye sistemli eğitim uygulamamız Become Hacker App Store ve Google Play'de.",
    },
    {
        title: "ZekAI: 5 Mantık Oyunu",
        slug: "zekai",
        client: "Kendi ürünümüz",
        technologies: null as string | null,
        projectUrl: ZEKAI_URL,
        description:
            "Sudoku, Kelime Avı, Queens, Tango ve Zip'i 20.000'den fazla bölümle bir araya getiren mobil oyunumuz 25 dilde iOS ve Android'de yayında.",
        content: `<p>ZekAI, beş mantık oyununu tek uygulamada toplayan bir mobil oyun. Ekibimiz tarafından cross-platform olarak geliştirildi; 25 dilde App Store ve Google Play'de yayında.</p>
<h3>Öne çıkanlar</h3>
<ul>
<li>Beş oyun: Sudoku (5 zorlukta 5.000 bölüm), Kelime Avı, Queens, Tango ve Zip</li>
<li>20.000'den fazla bölüm</li>
<li>Günlük görevler, seri takibi, XP ve başarımlar</li>
<li>Çevrimdışı oynama ve karanlık mod</li>
<li>Abonelik ve tek seferlik premium seçenekleri</li>
</ul>
<p>Aynı oyun ve ilerleme mekaniklerini markalara özel oyunlarda da kullanıyoruz.</p>
<p><a href="${ZEKAI_URL}" target="_blank" rel="noopener noreferrer">App Store</a> · <a href="${ZEKAI_PLAY_URL}" target="_blank" rel="noopener noreferrer">Google Play</a></p>`,
        metaTitle: "ZekAI: 5 Mantık Oyunu | Mobil Oyun Projesi | MetasoftCo",
        metaDescription:
            "Sudoku, Kelime Avı, Queens, Tango ve Zip'i 20.000'den fazla bölümle bir araya getiren mobil oyunumuz ZekAI 25 dilde yayında.",
    },
    {
        title: "MysticSip: Yapay Zeka Falı",
        slug: "mysticsip",
        client: "Kendi ürünümüz",
        technologies: JSON.stringify(["Yapay zeka", "Görüntü işleme"]),
        projectUrl: MYSTICSIP_PLAY_URL,
        description:
            "Fincan fotoğrafını görüntü işlemeyle analiz edip yapay zeka ile kişiye özel yorum üreten mobil uygulamamız Google Play'de yayında.",
        content: `<p>MysticSip, kahve falı, tarot ve rüya tabirini yapay zeka ile kişiselleştiren bir mobil uygulama. Ekibimiz tarafından geliştirildi ve Google Play'de yayında.</p>
<h3>Öne çıkanlar</h3>
<ul>
<li>Kullanıcının yüklediği fincan fotoğraflarını görüntü işlemeyle analiz eden yapay zeka kahve falı</li>
<li>Animasyonlu, interaktif tarot deneyimi</li>
<li>Anlatılan rüyayı yorumlayan yapay zeka rüya tabiri</li>
<li>Doğum tarihi ve profile göre kişiselleştirilmiş yorumlar, fal geçmişi</li>
<li>9 dil desteği; reklam izleyerek coin kazanma modeli</li>
</ul>
<p>Görüntü işleme ile üretken yapay zekayı tüketici ürününde bir araya getirdiğimiz bu yaklaşımı, markalara özel yapay zeka çözümlerinde de kullanıyoruz.</p>`,
        metaTitle: "MysticSip: Yapay Zeka Falı | Mobil Uygulama Projesi | MetasoftCo",
        metaDescription:
            "Fincan fotoğrafını görüntü işlemeyle analiz edip yapay zeka ile kişiye özel yorum üreten mobil uygulamamız MysticSip Google Play'de yayında.",
    },
];

/** A record the editor has not touched since the script created it. */
function untouched(record: { createdAt: Date; updatedAt: Date }) {
    return record.updatedAt.getTime() - record.createdAt.getTime() < 5_000;
}

async function main() {
    const apply = process.argv.includes("--apply");
    // --sync also rewrites the copy of records nobody has edited yet.
    const sync = process.argv.includes("--sync");
    const log = (msg: string) => console.log(`${apply ? "" : "[dry run] "}${msg}`);

    let cat = await prisma.serviceCategory.findUnique({ where: { slug: category.slug } });
    if (cat && sync && untouched(cat)) {
        log(`sync category: ${category.slug}`);
        if (apply) await prisma.serviceCategory.update({ where: { id: cat.id }, data: { content: category.content } });
    } else if (cat) {
        log(`category exists: ${category.slug}`);
    } else {
        log(`create category: ${category.slug}`);
        if (apply) {
            cat = await prisma.serviceCategory.create({
                data: { ...category, faq: JSON.stringify(category.faq) },
            });
        }
    }

    for (const service of services) {
        const exists = cat && (await prisma.service.findFirst({ where: { categoryId: cat.id, slug: service.slug } }));
        if (exists && sync && untouched(exists)) {
            log(`sync service: ${service.slug}`);
            if (apply) {
                await prisma.service.update({
                    where: { id: exists.id },
                    data: { content: service.content, faq: JSON.stringify(service.faq) },
                });
            }
            continue;
        }
        if (exists) {
            log(`service exists: ${service.slug}`);
            continue;
        }
        log(`create service (unpublished): ${service.slug}`);
        if (apply && cat) {
            await prisma.service.create({
                data: {
                    ...service,
                    specs: JSON.stringify(service.specs),
                    faq: JSON.stringify(service.faq),
                    categoryId: cat.id,
                    type: "RENTAL",
                    published: false,
                },
            });
        }
    }

    for (const [index, project] of projects.entries()) {
        const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
        if (existing && sync && untouched(existing)) {
            log(`sync project: ${project.slug}`);
            if (apply) {
                const { description, content, metaDescription, technologies, projectUrl } = project;
                await prisma.project.update({
                    where: { id: existing.id },
                    data: { description, content, metaDescription, technologies, projectUrl },
                });
            }
            continue;
        }
        if (existing) {
            log(`project exists: ${project.slug}`);
            continue;
        }
        log(`create project (unpublished): ${project.slug}`);
        if (apply) {
            await prisma.project.create({
                data: { ...project, category: "Yazılım", published: false, featured: false, order: 100 + index },
            });
        }
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
