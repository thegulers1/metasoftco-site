export interface SectorData {
    slug: string;
    name: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    heroSubtitle: string;
    intro: string;
    services: { name: string; desc: string; href: string }[];
    faqs: { question: string; answer: string }[];
    cta: string;
}

export const sectors: SectorData[] = [
    {
        slug: "tekstil-sektoru",
        name: "Tekstil & Moda",
        title: "Tekstil ve Moda Sektörü İçin İnteraktif Deneyimler",
        metaTitle: "Tekstil Sektörü İçin İnteraktif Etkinlik & Dijital Çözümler | MetasoftCo",
        metaDescription:
            "Tekstil ve moda markalarına özel photobooth, AI yüz değiştirme, marka aktivasyonu ve interaktif etkinlik teknolojileri. Koleksiyonlarınızı unutulmaz deneyimlere dönüştürün.",
        keywords: [
            "tekstil sektörü etkinlik",
            "moda markası aktivasyon",
            "tekstil photobooth",
            "koleksiyon lansmanı teknoloji",
            "moda etkinliği dijital deneyim",
            "tekstil için yazılım çözümleri",
        ],
        heroSubtitle: "Koleksiyon lansmanlarını unutulmaz deneyimlere dönüştürüyoruz.",
        intro:
            "Tekstil ve moda dünyasında fark yaratmak için etkinliklerinize interaktif teknoloji entegre ediyoruz. AI destekli photo booth'lardan marka aktivasyonuna kadar her dokunuşta markanızı öne çıkarıyoruz.",
        services: [
            {
                name: "AI Photo & Face Swap",
                desc: "Misafirleriniz koleksiyon karakterleriyle fotoğraf çektirsin, anında sosyal medyada paylaşsın.",
                href: "/hizmetler",
            },
            {
                name: "Photobooth Çözümleri",
                desc: "Marka kimliğinize özel tasarlanmış, koleksiyon temalı photobooth deneyimleri.",
                href: "/hizmetler",
            },
            {
                name: "Marka Aktivasyonu",
                desc: "Ticaret fuarları, showroom açılışları ve koleksiyon lansmanları için özel aktivasyon tasarımı.",
                href: "/hizmetler",
            },
            {
                name: "Özel Yazılım",
                desc: "Stok yönetimi, sipariş takibi ve müşteri portali gibi tekstil sektörüne özel yazılım geliştirme.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Tekstil markaları için hangi etkinlik teknolojileri önerilir?",
                answer:
                    "Koleksiyon lansmanları için AI destekli photo booth, moda fuarları için interaktif oyunlar ve marka aktivasyonu çözümleri en etkili sonuçları sağlar. MetasoftCo olarak bu teknolojilerin tamamını sunuyoruz.",
            },
            {
                question: "Photobooth çözümleri tekstil fuarlarında nasıl çalışır?",
                answer:
                    "Markanıza özel tasarlanmış dijital photobooth, misafirlerinizin koleksiyon ürünleriyle veya markalı arka planlarla fotoğraf çekmesini sağlar. Fotoğraflar anında e-posta veya SMS ile paylaşılır, sosyal medyada viral olur.",
            },
            {
                question: "MetasoftCo tekstil sektöründe hangi projelere imza attı?",
                answer:
                    "Kurumsal moda etkinliklerinden ticaret fuarlarına kadar pek çok projede interaktif deneyim tasarladık. Proje portföyümüzü görmek için Projeler sayfamızı ziyaret edebilirsiniz.",
            },
        ],
        cta: "Koleksiyon lansman etkinliğiniz için bizimle iletişime geçin",
    },
    {
        slug: "saglik-sektoru",
        name: "Sağlık & İlaç",
        title: "Sağlık Sektörü İçin Dijital Etkinlik & Yazılım Çözümleri",
        metaTitle: "Sağlık Sektörü İçin İnteraktif Etkinlik & Yazılım | MetasoftCo",
        metaDescription:
            "Sağlık ve ilaç sektörüne özel kongre teknolojileri, etkinlik yazılımları, interaktif sunum çözümleri ve özel uygulama geliştirme hizmetleri. GSYF ve medikal etkinliklerde öne çıkın.",
        keywords: [
            "sağlık sektörü etkinlik teknolojisi",
            "medikal kongre yazılımı",
            "ilaç sektörü aktivasyon",
            "sağlık etkinliği dijital çözüm",
            "medikal fuar teknolojisi",
            "sağlık yazılım geliştirme",
        ],
        heroSubtitle: "Medikal kongreleri ve sağlık fuarlarını interaktif deneyimlere dönüştürüyoruz.",
        intro:
            "Sağlık ve ilaç sektöründe etkinlikler güven ve uzmanlık iletmek zorundadır. Medikal kongrelerden ürün lansmanlarına kadar her etkinliğe teknoloji entegre ediyoruz.",
        services: [
            {
                name: "İnteraktif Sunum & Demo",
                desc: "Medikal ürün tanıtımlarını etkileşimli ekranlar ve gamification ile güçlendirin.",
                href: "/hizmetler",
            },
            {
                name: "Kongre Kayıt & Yönetim",
                desc: "Medikal kongreler için özel kayıt, rozet ve katılımcı yönetim yazılımları.",
                href: "/hizmetler",
            },
            {
                name: "Photobooth & Anı Köşesi",
                desc: "Sağlık etkinliklerinde markalı photobooth ile anlamlı katılımcı deneyimleri.",
                href: "/hizmetler",
            },
            {
                name: "Özel Yazılım Geliştirme",
                desc: "Hasta takip, randevu sistemi ve klinik yönetim yazılımları.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Medikal kongrelerde hangi teknoloji çözümleri kullanılabilir?",
                answer:
                    "Katılımcı kayıt sistemleri, interaktif soru-cevap uygulamaları, ürün demo kioskları ve anı köşeleri medikal kongre deneyimini zenginleştirir. MetasoftCo tüm bu çözümleri tek çatı altında sunar.",
            },
            {
                question: "Sağlık sektörüne özel yazılım geliştiriyor musunuz?",
                answer:
                    "Evet, hasta takip, randevu ve klinik yönetim sistemleri dahil sağlık sektörüne özel yazılım geliştiriyoruz. KVKK ve sağlık veri gizliliği standartlarına uygun çözümler üretiyoruz.",
            },
            {
                question: "İlaç şirketlerine yönelik etkinlik hizmetleriniz nelerdir?",
                answer:
                    "Ürün lansmanları, kongre sponsorluğu aktivasyonları, hekim buluşmaları ve medikal eğitim etkinlikleri için interaktif deneyim ve teknoloji çözümleri sunuyoruz.",
            },
        ],
        cta: "Medikal etkinliğiniz için ücretsiz danışmanlık alın",
    },
    {
        slug: "gida-sektoru",
        name: "Gıda & İçecek",
        title: "Gıda ve İçecek Sektörü İçin Marka Aktivasyonu & Etkinlik Teknolojisi",
        metaTitle: "Gıda Sektörü Marka Aktivasyonu & Etkinlik Teknolojisi | MetasoftCo",
        metaDescription:
            "Gıda ve içecek markalarına özel interaktif tadım etkinlikleri, photobooth, gamification ve dijital marka aktivasyonu. HORECA fuarları ve tüketici etkinliklerinde öne çıkın.",
        keywords: [
            "gıda sektörü marka aktivasyonu",
            "içecek etkinlik teknolojisi",
            "HORECA fuar çözümü",
            "gıda photobooth",
            "tüketici etkinliği gamification",
            "gıda markası dijital deneyim",
        ],
        heroSubtitle: "Tadım etkinliklerini dijital deneyimlere dönüştürüyoruz.",
        intro:
            "Gıda ve içecek sektöründe tüketicinin markayı deneyimlemesi satın alma kararını doğrudan etkiler. Marka aktivasyonlarınızı interaktif teknoloji ile güçlendiriyoruz.",
        services: [
            {
                name: "Gamification & Çekiliş",
                desc: "Tüketicileri ürünlerle buluşturan interaktif oyunlar ve anlık ödül sistemleri.",
                href: "/hizmetler",
            },
            {
                name: "AI Photo Booth",
                desc: "Ürün kutusuyla veya markalı background ile fotoğraf — viral sosyal medya paylaşımları.",
                href: "/hizmetler",
            },
            {
                name: "Fuar Stand Teknolojisi",
                desc: "HORECA ve Anuga gibi fuarlarda öne çıkan interaktif stand deneyimleri.",
                href: "/hizmetler",
            },
            {
                name: "Tüketici Veri Toplama",
                desc: "Etkinliklerde KVKK uyumlu dijital form ve veri toplama sistemleri.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Gıda markası aktivasyonlarında hangi teknoloji önerilir?",
                answer:
                    "Çekiliş ve gamification uygulamaları, markalı AI photo booth ve interaktif ürün deneyimi kioskları gıda sektöründe en yüksek katılımı ve marka hatırlanırlığını sağlayan çözümlerdir.",
            },
            {
                question: "HORECA fuarlarında MetasoftCo ne sunuyor?",
                answer:
                    "HORECA ve gıda fuarları için interaktif stand tasarımı, ziyaretçi etkileşim çözümleri, dijital katalog sistemleri ve lead toplama uygulamaları sunuyoruz.",
            },
            {
                question: "Tüketici etkinliklerinde veri toplama nasıl yapılır?",
                answer:
                    "Tablet veya kiosk üzerinden KVKK onaylı dijital form sistemi ile tüketici iletişim bilgileri, tercihler ve geri bildirimler toplanabilir. Toplanan veriler CRM entegrasyonuyla doğrudan pazarlama sistemlerinize aktarılabilir.",
            },
        ],
        cta: "Gıda markası aktivasyonunuz için teklif alın",
    },
    {
        slug: "otomotiv-sektoru",
        name: "Otomotiv",
        title: "Otomotiv Sektörü İçin İnteraktif Deneyim & Dijital Aktivasyon",
        metaTitle: "Otomotiv Sektörü İnteraktif Etkinlik & Dijital Aktivasyon | MetasoftCo",
        metaDescription:
            "Otomotiv markaları için araç tanıtım etkinlikleri, test drive aktivasyonları, interaktif showroom deneyimleri ve AI destekli marka aktivasyonu çözümleri. İstanbul ve Türkiye geneli.",
        keywords: [
            "otomotiv marka aktivasyonu",
            "araç tanıtım etkinliği teknolojisi",
            "otomotiv showroom dijital deneyim",
            "test drive aktivasyon",
            "otomotiv fuar teknolojisi",
            "araba tanıtım photobooth",
        ],
        heroSubtitle: "Araç lansmanlarını sürücü koltuktan deneyimlettirin.",
        intro:
            "Otomotiv sektöründe marka tercihi duygusal bağla şekillenir. Test drive etkinliklerinden showroom açılışlarına kadar her temas noktasını dijital deneyimle güçlendiriyoruz.",
        services: [
            {
                name: "AI Photo & Araç Aktivasyonu",
                desc: "Ziyaretçilerin tanıtılan araçla AI destekli fotoğraf çekip paylaşmasını sağlayın.",
                href: "/hizmetler",
            },
            {
                name: "İnteraktif Showroom",
                desc: "Showroom deneyimini büyük ekran, dokunmatik kiosk ve interaktif ürün konfigüratörü ile güçlendirin.",
                href: "/hizmetler",
            },
            {
                name: "Lead Toplama Sistemi",
                desc: "Test drive kayıt ve potansiyel müşteri bilgilerini dijital ortamda toplayın.",
                href: "/hizmetler",
            },
            {
                name: "Gamification",
                desc: "Yarışma, çekiliş ve puan sistemi ile showroom ziyaretlerini eğlenceli deneyimlere dönüştürün.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Otomotiv lansman etkinliklerinde hangi interaktif çözümler kullanılabilir?",
                answer:
                    "AI destekli fotoğraf çekimi, araç konfigurasyon kioskları, test drive kayıt sistemleri ve interaktif yarışmalar otomotiv lansmanlarında en yüksek katılımı sağlayan teknolojilerdir.",
            },
            {
                question: "Showroom deneyimini dijitalleştirmek ne kadar sürer?",
                answer:
                    "Projenin kapsamına göre değişmekle birlikte, standart interaktif showroom çözümleri 2-4 hafta içinde kuruluma hazır hale gelir. Özel yazılım geliştirme gerektiren projeler için süre uzayabilir.",
            },
            {
                question: "Otomotiv fuarlarında MetasoftCo hangi hizmetleri sunuyor?",
                answer:
                    "Fuar stand aktivasyonları, ziyaretçi kayıt sistemleri, markalı photo booth, dijital çekiliş platformları ve lead toplama uygulamaları ile otomotiv fuarlarında öne çıkmanızı sağlıyoruz.",
            },
        ],
        cta: "Araç lansman etkinliğiniz için proje görüşmesi yapın",
    },
    {
        slug: "perakende-sektoru",
        name: "Perakende & E-Ticaret",
        title: "Perakende Sektörü İçin Dijital Deneyim & Mağaza Teknolojisi",
        metaTitle: "Perakende Sektörü Dijital Deneyim & Mağaza Teknolojisi | MetasoftCo",
        metaDescription:
            "Perakende markalarına özel mağaza içi interaktif deneyimler, e-ticaret entegrasyonları, müşteri sadakat uygulamaları ve dijital aktivasyon çözümleri. Alışveriş deneyimini dönüştürün.",
        keywords: [
            "perakende dijital deneyim",
            "mağaza içi interaktif teknoloji",
            "retail aktivasyon",
            "e-ticaret entegrasyon",
            "müşteri sadakat uygulaması",
            "alışveriş merkezi etkinlik teknolojisi",
        ],
        heroSubtitle: "Mağaza deneyimini dijital çağa taşıyoruz.",
        intro:
            "Perakende sektöründe fiziksel ve dijital deneyimi birleştirmek müşteri sadakatini katlıyor. Mağaza içi aktivasyonlardan e-ticaret entegrasyonuna kadar kapsamlı çözümler sunuyoruz.",
        services: [
            {
                name: "Mağaza İçi Aktivasyon",
                desc: "Dijital ekranlar, interaktif kiosk ve gamification ile alışveriş deneyimini zenginleştirin.",
                href: "/hizmetler",
            },
            {
                name: "Photo Booth & Paylaşım",
                desc: "Müşterilerin mağazadan ürünlerle fotoğraf çekip sosyal medyada paylaşmasını sağlayın.",
                href: "/hizmetler",
            },
            {
                name: "Müşteri Veri Toplama",
                desc: "Fiziksel mağazada KVKK uyumlu dijital form ve sadakat programı kayıt sistemi.",
                href: "/hizmetler",
            },
            {
                name: "Özel Yazılım",
                desc: "Stok yönetimi, sadakat puanı sistemi ve müşteri CRM entegrasyonları.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Perakende mağazalarında hangi interaktif teknolojiler uygulanabilir?",
                answer:
                    "Dijital tabela sistemleri, self-servis kiosk, AI destekli photo booth ve gamification uygulamaları perakende mağazalarında müşteri deneyimini önemli ölçüde iyileştirir ve ortalama sepet değerini artırır.",
            },
            {
                question: "Alışveriş merkezi etkinliklerinde ne gibi çözümler sunuyorsunuz?",
                answer:
                    "AVM bünyesindeki etkinlikler için fotoğraf aktivasyonları, interaktif yarışmalar, çekiliş platformları ve marka stand teknolojileri sunuyoruz. Hem marka hem de AVM için ziyaretçi trafiğini artıran çözümler geliştiriyoruz.",
            },
            {
                question: "E-ticaret platformuyla fiziksel mağaza entegrasyonu yapılabilir mi?",
                answer:
                    "Evet. Fiziksel mağazada toplanan müşteri verilerini e-ticaret CRM'inize aktarabiliyor, sadakat puanlarını hem online hem offline kanalda kullanılabilir hale getirebiliyoruz.",
            },
        ],
        cta: "Mağaza deneyiminizi dijitalleştirmek için görüşme talep edin",
    },
    {
        slug: "finans-sektoru",
        name: "Finans & Sigorta",
        title: "Finans ve Sigorta Sektörü İçin Kurumsal Etkinlik & Yazılım Çözümleri",
        metaTitle: "Finans Sektörü Kurumsal Etkinlik & Yazılım Çözümleri | MetasoftCo",
        metaDescription:
            "Finans ve sigorta şirketlerine özel kurumsal etkinlik teknolojileri, çalışan deneyimi aktivasyonları ve özel yazılım geliştirme hizmetleri. Güvenilir ve ölçülebilir çözümler.",
        keywords: [
            "finans sektörü kurumsal etkinlik",
            "banka etkinlik teknolojisi",
            "sigorta aktivasyon çözümü",
            "finans yazılım geliştirme",
            "kurumsal çalışan etkinliği",
            "investor relations etkinlik",
        ],
        heroSubtitle: "Kurumsal etkinlikleri ölçülebilir deneyimlere dönüştürüyoruz.",
        intro:
            "Finans sektöründe etkinlikler güven ve profesyonellik mesajını taşımalıdır. Yıllık toplantılardan çalışan deneyimi programlarına kadar kurumsal standartta çözümler sunuyoruz.",
        services: [
            {
                name: "Kurumsal Etkinlik Yazılımı",
                desc: "Genel kurul, yönetim toplantısı ve investor day etkinlikleri için özel yazılım çözümleri.",
                href: "/hizmetler",
            },
            {
                name: "Çalışan Deneyimi & Gamification",
                desc: "Şirket içi ödül, motivasyon ve team building etkinlikleri için interaktif platform.",
                href: "/hizmetler",
            },
            {
                name: "Dijital İletişim Materyali",
                desc: "Müşteri toplantıları ve etkinlikleri için dijital sunumlar ve interaktif demo çözümleri.",
                href: "/hizmetler",
            },
            {
                name: "Özel Yazılım Geliştirme",
                desc: "Fintech, sigorta hesaplama ve müşteri portali gibi sektöre özel yazılım projeleri.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Finans şirketleri için hangi etkinlik teknolojileri önerilir?",
                answer:
                    "Genel kurul yönetim sistemleri, dijital oylama platformları, kurumsal fotoğraf çözümleri ve çalışan bağlılık uygulamaları finans sektöründe tercih edilen teknolojilerdir.",
            },
            {
                question: "Fintech alanında yazılım geliştirme yapıyor musunuz?",
                answer:
                    "Evet, ödeme sistemleri, müşteri portali ve sigorta hesaplama uygulamaları dahil fintech alanında özel yazılım geliştiriyoruz. Güvenlik standartları ve BDDK uyumluluğuna önem veriyoruz.",
            },
            {
                question: "Çalışan motivasyon etkinlikleri için ne gibi çözümler sunuyorsunuz?",
                answer:
                    "Gamification tabanlı ödül sistemleri, interaktif team building oyunları, dijital çekiliş platformları ve markalı photo booth çözümleri çalışan katılımını ve memnuniyetini artıran araçlarımız arasındadır.",
            },
        ],
        cta: "Kurumsal etkinlik projeniz için görüşme talep edin",
    },
    {
        slug: "kurumsal-etkinlik",
        name: "Kurumsal Etkinlik",
        title: "Kurumsal Etkinlikler İçin İnteraktif Teknoloji & Aktivasyon Çözümleri",
        metaTitle: "Kurumsal Etkinlik Teknolojisi & İnteraktif Aktivasyon | MetasoftCo",
        metaDescription:
            "Şirket etkinlikleri, yıl sonu toplantıları, team building ve çalışan deneyimi programları için interaktif photobooth, gamification ve etkinlik yazılımı. İstanbul merkezli, Türkiye geneli hizmet.",
        keywords: [
            "kurumsal etkinlik teknolojisi",
            "şirket etkinliği interaktif",
            "yıl sonu partisi photobooth",
            "team building dijital",
            "çalışan deneyimi aktivasyon",
            "kurumsal aktivasyon istanbul",
        ],
        heroSubtitle: "Şirket etkinliklerini çalışanların unutamayacağı deneyimlere dönüştürüyoruz.",
        intro:
            "Kurumsal etkinlikler çalışan bağlılığı ve marka kültürünü pekiştirir. Yıl sonu partilerinden ürün lansmanlarına, team building'den kongrelere kadar her formatı interaktif teknoloji ile güçlendiriyoruz.",
        services: [
            {
                name: "Photobooth & AI Fotoğraf",
                desc: "Şirket etkinliklerine özel markalı photobooth ve AI destekli fotoğraf paylaşım sistemi.",
                href: "/hizmetler",
            },
            {
                name: "Gamification & Yarışmalar",
                desc: "Çalışanları birbirine bağlayan interaktif oyunlar, bilgi yarışmaları ve anlık liderlik tabloları.",
                href: "/hizmetler",
            },
            {
                name: "Etkinlik Kayıt Sistemi",
                desc: "QR kod tabanlı check-in, rozet baskı ve katılımcı takip sistemleri.",
                href: "/hizmetler",
            },
            {
                name: "Canlı Anket & Feedback",
                desc: "Etkinlik içi anlık anket, oylama ve soru-cevap platformları.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Kurumsal etkinlikler için photobooth kiralamak mümkün mü?",
                answer:
                    "Evet. Şirketinizin logo ve renk paletine göre özelleştirilmiş dijital photobooth çözümleri günlük, haftalık veya uzun dönem kiralama seçenekleriyle sunuyoruz. Tekniker desteği dahildir.",
            },
            {
                question: "Team building etkinlikleri için hangi interaktif çözümler sunuyorsunuz?",
                answer:
                    "Takım bazlı dijital yarışmalar, QR kod avı (scavenger hunt), anlık skor tablosu olan bilgi oyunları ve interaktif sahne aktivasyonları kurumsal team building programlarımız arasındadır.",
            },
            {
                question: "Kaç kişilik etkinliklere hizmet veriyorsunuz?",
                answer:
                    "50 kişilik departman buluşmasından 5000 kişilik galaya kadar her ölçekte kurumsal etkinliğe çözüm üretiyoruz. Sistem kapasitesi etkinlik büyüklüğüne göre ölçeklenir.",
            },
        ],
        cta: "Kurumsal etkinliğiniz için ücretsiz keşif görüşmesi yapın",
    },
    {
        slug: "teknoloji-sektoru",
        name: "Teknoloji & SaaS",
        title: "Teknoloji Şirketleri İçin Etkinlik Aktivasyonu & Özel Yazılım",
        metaTitle: "Teknoloji Şirketi Etkinlik Aktivasyonu & Yazılım Geliştirme | MetasoftCo",
        metaDescription:
            "SaaS, yazılım ve teknoloji şirketleri için ürün lansmanı etkinlikleri, hackathon organizasyonları, kullanıcı konferansları ve özel yazılım geliştirme hizmetleri.",
        keywords: [
            "teknoloji şirketi etkinlik aktivasyonu",
            "SaaS ürün lansmanı",
            "hackathon organizasyon",
            "developer konferansı teknoloji",
            "startup etkinlik çözümü",
            "tech şirketi yazılım geliştirme",
        ],
        heroSubtitle: "Teknoloji lansmanlarını viral etkinlik deneyimlerine dönüştürüyoruz.",
        intro:
            "Teknoloji şirketleri için etkinlikler hem ürünü tanıtmalı hem de community oluşturmalıdır. Ürün lansmanlarından hackathonlara, kullanıcı konferanslarından meetup'lara kadar her formatı tasarlıyoruz.",
        services: [
            {
                name: "Ürün Lansmanı Aktivasyonu",
                desc: "Yeni ürün veya özellik lansmanlarını interaktif demo deneyimleri ve AI photo booth ile öne çıkarın.",
                href: "/hizmetler",
            },
            {
                name: "Konferans & Hackathon",
                desc: "Katılımcı kayıt, rozet, oturum yönetimi ve canlı oylama sistemleri.",
                href: "/hizmetler",
            },
            {
                name: "Gamification & Çekiliş",
                desc: "Community etkinliklerinde engagement yaratan interaktif oyunlar ve anlık ödül sistemleri.",
                href: "/hizmetler",
            },
            {
                name: "Özel Yazılım & Entegrasyon",
                desc: "API entegrasyonları, otomasyon araçları ve SaaS ürününüze özel ek modüller.",
                href: "/hizmetler",
            },
        ],
        faqs: [
            {
                question: "Teknoloji şirketleri için ürün lansmanı etkinliğinde ne önerilir?",
                answer:
                    "Canlı ürün demo kioskları, interaktif soru-cevap platformları, AI destekli fotoğraf aktivasyonu ve anlık sosyal medya paylaşım sistemleri teknoloji lansmanlarında en yüksek buzz yaratır.",
            },
            {
                question: "Hackathon organizasyonu için ne gibi teknoloji altyapısı sunuyorsunuz?",
                answer:
                    "Katılımcı kayıt ve takım oluşturma sistemi, proje submission platformu, jüri puanlama arayüzü, canlı skor tablosu ve ödül teslim sistemi dahil uçtan uca hackathon yazılımı geliştiriyoruz.",
            },
            {
                question: "SaaS şirketi olarak MetasoftCo ile nasıl çalışabiliriz?",
                answer:
                    "Ürününüzü tanıtmak istediğiniz etkinlikler için aktivasyon tasarımından, ürününüzde eksik olan modüller için yazılım geliştirmeye kadar geniş bir yelpazede hizmet sunuyoruz. Önce ihtiyacınızı anlayıp öneriler geliştiriyoruz.",
            },
        ],
        cta: "Ürün lansmanı veya konferansınız için görüşme talep edin",
    },
];

export function getSectorBySlug(slug: string): SectorData | undefined {
    return sectors.find((s) => s.slug === slug);
}
