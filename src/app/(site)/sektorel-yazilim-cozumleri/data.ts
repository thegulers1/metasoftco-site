export interface SectorData {
    slug: string;
    slug_en: string;
    name: string;
    name_en: string;
    title: string;
    title_en: string;
    metaTitle: string;
    metaTitle_en: string;
    metaDescription: string;
    metaDescription_en: string;
    keywords: string[];
    keywords_en: string[];
    heroSubtitle: string;
    intro: string;
    intro_en: string;
    services: { name: string; desc: string; href: string }[];
    services_en: { name: string; desc: string; href: string }[];
    faqs: { question: string; answer: string }[];
    faqs_en: { question: string; answer: string }[];
    cta: string;
    cta_en: string;
}

export const sectors: SectorData[] = [
    {
        slug: "tekstil-sektoru-dijital-donusum",
        slug_en: "textile-fashion",
        name: "Tekstil & Moda",
        name_en: "Textile & Fashion",
        title: "Tekstil Sektörü İçin Dijital Dönüşüm ve Yazılım Çözümleri",
        title_en: "Digital Transformation & Software Solutions for the Textile Industry",
        metaTitle: "Tekstil Sektörü İçin Dijital Dönüşüm ve Yazılım Çözümleri | MetasoftCo",
        metaTitle_en: "Textile Industry Digital Transformation & Software Solutions | MetasoftCo",
        metaDescription:
            "Tekstil ve moda markalarına özel photobooth, AI yüz değiştirme, marka aktivasyonu ve interaktif etkinlik teknolojileri. Koleksiyonlarınızı unutulmaz deneyimlere dönüştürün.",
        metaDescription_en:
            "Interactive event technologies and software solutions for textile and fashion brands. AI face swap, photobooth, brand activation — transform your collection launches into unforgettable experiences.",
        keywords: [
            "tekstil sektörü etkinlik",
            "moda markası aktivasyon",
            "tekstil photobooth",
            "koleksiyon lansmanı teknoloji",
            "moda etkinliği dijital deneyim",
            "tekstil için yazılım çözümleri",
        ],
        keywords_en: [
            "textile industry event",
            "fashion brand activation",
            "textile photobooth",
            "collection launch technology",
            "fashion event digital experience",
            "software solutions for textile",
        ],
        heroSubtitle: "Koleksiyon lansmanlarını unutulmaz deneyimlere dönüştürüyoruz.",
        intro:
            "Tekstil ve moda dünyasında fark yaratmak için etkinliklerinize interaktif teknoloji entegre ediyoruz. AI destekli photo booth'lardan marka aktivasyonuna kadar her dokunuşta markanızı öne çıkarıyoruz.",
        intro_en:
            "We integrate interactive technology into your events to make a difference in the textile and fashion world. From AI-powered photo booths to brand activations, we put your brand front and center at every touchpoint.",
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
        services_en: [
            {
                name: "AI Photo & Face Swap",
                desc: "Let your guests take photos with collection characters and share instantly on social media.",
                href: "/en/services",
            },
            {
                name: "Photobooth Solutions",
                desc: "Collection-themed photobooth experiences designed to match your brand identity.",
                href: "/en/services",
            },
            {
                name: "Brand Activation",
                desc: "Custom activation design for trade fairs, showroom openings, and collection launches.",
                href: "/en/services",
            },
            {
                name: "Custom Software",
                desc: "Textile-specific software development including stock management, order tracking, and customer portals.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What event technologies are recommended for textile brands?",
                answer:
                    "AI-powered photo booths for collection launches, interactive games for fashion fairs, and brand activation solutions deliver the best results. MetasoftCo offers all of these technologies.",
            },
            {
                question: "How do photobooth solutions work at textile trade fairs?",
                answer:
                    "A digital photobooth custom-designed for your brand lets guests take photos with collection products or branded backgrounds. Photos are shared instantly via email or SMS and go viral on social media.",
            },
            {
                question: "What projects has MetasoftCo completed in the textile industry?",
                answer:
                    "We have designed interactive experiences for everything from corporate fashion events to trade fairs. Visit our Projects page to see our portfolio.",
            },
        ],
        cta: "Koleksiyon lansman etkinliğiniz için bizimle iletişime geçin",
        cta_en: "Contact us for your collection launch event",
    },
    {
        slug: "saglik-sektoru",
        slug_en: "healthcare",
        name: "Sağlık & İlaç",
        name_en: "Healthcare & Pharma",
        title: "Sağlık Sektörü İçin Dijital Etkinlik & Yazılım Çözümleri",
        title_en: "Digital Event & Software Solutions for the Healthcare Industry",
        metaTitle: "Sağlık Sektörü İçin İnteraktif Etkinlik & Yazılım | MetasoftCo",
        metaTitle_en: "Healthcare Industry Interactive Events & Software | MetasoftCo",
        metaDescription:
            "Sağlık ve ilaç sektörüne özel kongre teknolojileri, etkinlik yazılımları, interaktif sunum çözümleri ve özel uygulama geliştirme hizmetleri. GSYF ve medikal etkinliklerde öne çıkın.",
        metaDescription_en:
            "Congress technologies, event software, interactive presentation solutions, and custom app development for the healthcare and pharmaceutical sector. Stand out at medical events.",
        keywords: [
            "sağlık sektörü etkinlik teknolojisi",
            "medikal kongre yazılımı",
            "ilaç sektörü aktivasyon",
            "sağlık etkinliği dijital çözüm",
            "medikal fuar teknolojisi",
            "sağlık yazılım geliştirme",
        ],
        keywords_en: [
            "healthcare event technology",
            "medical congress software",
            "pharma sector activation",
            "healthcare event digital solution",
            "medical fair technology",
            "healthcare software development",
        ],
        heroSubtitle: "Medikal kongreleri ve sağlık fuarlarını interaktif deneyimlere dönüştürüyoruz.",
        intro:
            "Sağlık ve ilaç sektöründe etkinlikler güven ve uzmanlık iletmek zorundadır. Medikal kongrelerden ürün lansmanlarına kadar her etkinliğe teknoloji entegre ediyoruz.",
        intro_en:
            "Events in the healthcare and pharmaceutical sector must communicate trust and expertise. We integrate technology into every event — from medical congresses to product launches.",
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
        services_en: [
            {
                name: "Interactive Presentation & Demo",
                desc: "Enhance medical product presentations with interactive displays and gamification.",
                href: "/en/services",
            },
            {
                name: "Congress Registration & Management",
                desc: "Custom registration, badge printing, and attendee management software for medical congresses.",
                href: "/en/services",
            },
            {
                name: "Photobooth & Memory Corner",
                desc: "Create meaningful attendee experiences with branded photobooths at healthcare events.",
                href: "/en/services",
            },
            {
                name: "Custom Software Development",
                desc: "Patient tracking, appointment systems, and clinic management software.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What technology solutions can be used at medical congresses?",
                answer:
                    "Attendee registration systems, interactive Q&A apps, product demo kiosks, and photo corners enrich the medical congress experience. MetasoftCo provides all these solutions under one roof.",
            },
            {
                question: "Do you develop software specifically for the healthcare sector?",
                answer:
                    "Yes, we develop healthcare-specific software including patient tracking, appointment, and clinic management systems — all compliant with data privacy standards.",
            },
            {
                question: "What event services do you offer for pharmaceutical companies?",
                answer:
                    "We provide interactive experience and technology solutions for product launches, congress sponsorship activations, physician gatherings, and medical training events.",
            },
        ],
        cta: "Medikal etkinliğiniz için ücretsiz danışmanlık alın",
        cta_en: "Get a free consultation for your medical event",
    },
    {
        slug: "gida-sektoru",
        slug_en: "food-beverage",
        name: "Gıda & İçecek",
        name_en: "Food & Beverage",
        title: "Gıda ve İçecek Sektörü İçin Marka Aktivasyonu & Etkinlik Teknolojisi",
        title_en: "Brand Activation & Event Technology for the Food & Beverage Industry",
        metaTitle: "Gıda Sektörü Marka Aktivasyonu & Etkinlik Teknolojisi | MetasoftCo",
        metaTitle_en: "Food Industry Brand Activation & Event Technology | MetasoftCo",
        metaDescription:
            "Gıda ve içecek markalarına özel interaktif tadım etkinlikleri, photobooth, gamification ve dijital marka aktivasyonu. HORECA fuarları ve tüketici etkinliklerinde öne çıkın.",
        metaDescription_en:
            "Interactive tasting events, photobooth, gamification, and digital brand activations for food and beverage brands. Stand out at HORECA fairs and consumer events.",
        keywords: [
            "gıda sektörü marka aktivasyonu",
            "içecek etkinlik teknolojisi",
            "HORECA fuar çözümü",
            "gıda photobooth",
            "tüketici etkinliği gamification",
            "gıda markası dijital deneyim",
        ],
        keywords_en: [
            "food industry brand activation",
            "beverage event technology",
            "HORECA fair solution",
            "food photobooth",
            "consumer event gamification",
            "food brand digital experience",
        ],
        heroSubtitle: "Tadım etkinliklerini dijital deneyimlere dönüştürüyoruz.",
        intro:
            "Gıda ve içecek sektöründe tüketicinin markayı deneyimlemesi satın alma kararını doğrudan etkiler. Marka aktivasyonlarınızı interaktif teknoloji ile güçlendiriyoruz.",
        intro_en:
            "In the food and beverage sector, letting consumers experience your brand directly influences purchase decisions. We power your brand activations with interactive technology.",
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
        services_en: [
            {
                name: "Gamification & Giveaways",
                desc: "Interactive games and instant reward systems that connect consumers with your products.",
                href: "/en/services",
            },
            {
                name: "AI Photo Booth",
                desc: "Photos with your product packaging or branded backgrounds — creating viral social media content.",
                href: "/en/services",
            },
            {
                name: "Trade Fair Stand Technology",
                desc: "Interactive stand experiences that stand out at HORECA and similar fairs.",
                href: "/en/services",
            },
            {
                name: "Consumer Data Collection",
                desc: "GDPR-compliant digital form and data collection systems at events.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What technology is recommended for food brand activations?",
                answer:
                    "Giveaway and gamification apps, branded AI photo booths, and interactive product experience kiosks are the solutions that deliver the highest engagement and brand recall in the food sector.",
            },
            {
                question: "What does MetasoftCo offer at HORECA fairs?",
                answer:
                    "We provide interactive stand design, visitor engagement solutions, digital catalog systems, and lead capture apps for HORECA and food fairs.",
            },
            {
                question: "How is data collection done at consumer events?",
                answer:
                    "Using GDPR-compliant digital forms on tablets or kiosks, consumer contact information, preferences, and feedback can be collected and pushed directly to your CRM via integration.",
            },
        ],
        cta: "Gıda markası aktivasyonunuz için teklif alın",
        cta_en: "Get a quote for your food brand activation",
    },
    {
        slug: "otomotiv-sektoru",
        slug_en: "automotive",
        name: "Otomotiv",
        name_en: "Automotive",
        title: "Otomotiv Sektörü İçin İnteraktif Deneyim & Dijital Aktivasyon",
        title_en: "Interactive Experiences & Digital Activations for the Automotive Industry",
        metaTitle: "Otomotiv Sektörü İnteraktif Etkinlik & Dijital Aktivasyon | MetasoftCo",
        metaTitle_en: "Automotive Industry Interactive Events & Digital Activation | MetasoftCo",
        metaDescription:
            "Otomotiv markaları için araç tanıtım etkinlikleri, test drive aktivasyonları, interaktif showroom deneyimleri ve AI destekli marka aktivasyonu çözümleri. İstanbul ve Türkiye geneli.",
        metaDescription_en:
            "AI-powered brand activations, interactive showroom experiences, and test drive event solutions for automotive brands. Serving Istanbul and all of Turkey.",
        keywords: [
            "otomotiv marka aktivasyonu",
            "araç tanıtım etkinliği teknolojisi",
            "otomotiv showroom dijital deneyim",
            "test drive aktivasyon",
            "otomotiv fuar teknolojisi",
            "araba tanıtım photobooth",
        ],
        keywords_en: [
            "automotive brand activation",
            "vehicle launch event technology",
            "automotive showroom digital experience",
            "test drive activation",
            "automotive fair technology",
            "car launch photobooth",
        ],
        heroSubtitle: "Araç lansmanlarını sürücü koltuktan deneyimlettirin.",
        intro:
            "Otomotiv sektöründe marka tercihi duygusal bağla şekillenir. Test drive etkinliklerinden showroom açılışlarına kadar her temas noktasını dijital deneyimle güçlendiriyoruz.",
        intro_en:
            "In the automotive sector, brand preference is shaped by emotional connection. We enhance every touchpoint with digital experiences — from test drive events to showroom openings.",
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
        services_en: [
            {
                name: "AI Photo & Vehicle Activation",
                desc: "Let visitors take AI-powered photos with the featured vehicle and share them instantly.",
                href: "/en/services",
            },
            {
                name: "Interactive Showroom",
                desc: "Enhance the showroom experience with large screens, touchscreen kiosks, and interactive product configurators.",
                href: "/en/services",
            },
            {
                name: "Lead Capture System",
                desc: "Collect test drive registrations and potential customer information digitally.",
                href: "/en/services",
            },
            {
                name: "Gamification",
                desc: "Turn showroom visits into fun experiences with competitions, giveaways, and point systems.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What interactive solutions can be used at automotive launch events?",
                answer:
                    "AI-powered photo shoots, vehicle configuration kiosks, test drive registration systems, and interactive competitions are the technologies that generate the highest engagement at automotive launches.",
            },
            {
                question: "How long does it take to digitize the showroom experience?",
                answer:
                    "Depending on the project scope, standard interactive showroom solutions are ready for installation within 2–4 weeks. Projects requiring custom software development may take longer.",
            },
            {
                question: "What services does MetasoftCo offer at automotive fairs?",
                answer:
                    "We help you stand out at automotive fairs with fair stand activations, visitor registration systems, branded photo booths, digital giveaway platforms, and lead capture apps.",
            },
        ],
        cta: "Araç lansman etkinliğiniz için proje görüşmesi yapın",
        cta_en: "Schedule a project meeting for your vehicle launch event",
    },
    {
        slug: "perakende-sektoru",
        slug_en: "retail-ecommerce",
        name: "Perakende & E-Ticaret",
        name_en: "Retail & E-Commerce",
        title: "Perakende Sektörü İçin Dijital Deneyim & Mağaza Teknolojisi",
        title_en: "Digital Experiences & In-Store Technology for the Retail Sector",
        metaTitle: "Perakende Sektörü Dijital Deneyim & Mağaza Teknolojisi | MetasoftCo",
        metaTitle_en: "Retail Sector Digital Experience & In-Store Technology | MetasoftCo",
        metaDescription:
            "Perakende markalarına özel mağaza içi interaktif deneyimler, e-ticaret entegrasyonları, müşteri sadakat uygulamaları ve dijital aktivasyon çözümleri. Alışveriş deneyimini dönüştürün.",
        metaDescription_en:
            "Interactive in-store experiences, e-commerce integrations, customer loyalty apps, and digital activation solutions for retail brands. Transform the shopping experience.",
        keywords: [
            "perakende dijital deneyim",
            "mağaza içi interaktif teknoloji",
            "retail aktivasyon",
            "e-ticaret entegrasyon",
            "müşteri sadakat uygulaması",
            "alışveriş merkezi etkinlik teknolojisi",
        ],
        keywords_en: [
            "retail digital experience",
            "in-store interactive technology",
            "retail activation",
            "e-commerce integration",
            "customer loyalty app",
            "shopping center event technology",
        ],
        heroSubtitle: "Mağaza deneyimini dijital çağa taşıyoruz.",
        intro:
            "Perakende sektöründe fiziksel ve dijital deneyimi birleştirmek müşteri sadakatini katlıyor. Mağaza içi aktivasyonlardan e-ticaret entegrasyonuna kadar kapsamlı çözümler sunuyoruz.",
        intro_en:
            "Combining physical and digital experiences in the retail sector multiplies customer loyalty. We offer end-to-end solutions from in-store activations to e-commerce integrations.",
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
        services_en: [
            {
                name: "In-Store Activation",
                desc: "Enrich the shopping experience with digital displays, interactive kiosks, and gamification.",
                href: "/en/services",
            },
            {
                name: "Photo Booth & Sharing",
                desc: "Let customers take photos with products in-store and share them on social media.",
                href: "/en/services",
            },
            {
                name: "Customer Data Collection",
                desc: "GDPR-compliant digital forms and loyalty program registration systems for physical stores.",
                href: "/en/services",
            },
            {
                name: "Custom Software",
                desc: "Stock management, loyalty point systems, and customer CRM integrations.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What interactive technologies can be implemented in retail stores?",
                answer:
                    "Digital signage systems, self-service kiosks, AI-powered photo booths, and gamification apps significantly improve the customer experience in retail stores and increase average basket value.",
            },
            {
                question: "What solutions do you offer for shopping center events?",
                answer:
                    "For in-mall events, we provide photo activations, interactive competitions, giveaway platforms, and brand stand technology — increasing visitor traffic for both the brand and the mall.",
            },
            {
                question: "Can physical store and e-commerce platform integration be done?",
                answer:
                    "Yes. We can transfer customer data collected in physical stores to your e-commerce CRM and make loyalty points usable across both online and offline channels.",
            },
        ],
        cta: "Mağaza deneyiminizi dijitalleştirmek için görüşme talep edin",
        cta_en: "Request a meeting to digitize your store experience",
    },
    {
        slug: "finans-sektoru",
        slug_en: "finance-insurance",
        name: "Finans & Sigorta",
        name_en: "Finance & Insurance",
        title: "Finans ve Sigorta Sektörü İçin Kurumsal Etkinlik & Yazılım Çözümleri",
        title_en: "Corporate Event & Software Solutions for the Finance & Insurance Sector",
        metaTitle: "Finans Sektörü Kurumsal Etkinlik & Yazılım Çözümleri | MetasoftCo",
        metaTitle_en: "Finance Sector Corporate Events & Software Solutions | MetasoftCo",
        metaDescription:
            "Finans ve sigorta şirketlerine özel kurumsal etkinlik teknolojileri, çalışan deneyimi aktivasyonları ve özel yazılım geliştirme hizmetleri. Güvenilir ve ölçülebilir çözümler.",
        metaDescription_en:
            "Corporate event technologies, employee experience activations, and custom software development for finance and insurance companies. Reliable and measurable solutions.",
        keywords: [
            "finans sektörü kurumsal etkinlik",
            "banka etkinlik teknolojisi",
            "sigorta aktivasyon çözümü",
            "finans yazılım geliştirme",
            "kurumsal çalışan etkinliği",
            "investor relations etkinlik",
        ],
        keywords_en: [
            "finance sector corporate event",
            "bank event technology",
            "insurance activation solution",
            "finance software development",
            "corporate employee event",
            "investor relations event",
        ],
        heroSubtitle: "Kurumsal etkinlikleri ölçülebilir deneyimlere dönüştürüyoruz.",
        intro:
            "Finans sektöründe etkinlikler güven ve profesyonellik mesajını taşımalıdır. Yıllık toplantılardan çalışan deneyimi programlarına kadar kurumsal standartta çözümler sunuyoruz.",
        intro_en:
            "Events in the finance sector must convey trust and professionalism. We provide corporate-grade solutions for everything from annual meetings to employee experience programs.",
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
        services_en: [
            {
                name: "Corporate Event Software",
                desc: "Custom software solutions for general assemblies, management meetings, and investor day events.",
                href: "/en/services",
            },
            {
                name: "Employee Experience & Gamification",
                desc: "Interactive platform for in-house reward, motivation, and team building events.",
                href: "/en/services",
            },
            {
                name: "Digital Communication Materials",
                desc: "Digital presentations and interactive demo solutions for client meetings and events.",
                href: "/en/services",
            },
            {
                name: "Custom Software Development",
                desc: "Industry-specific software projects such as fintech, insurance calculators, and customer portals.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What event technologies are recommended for finance companies?",
                answer:
                    "General assembly management systems, digital voting platforms, corporate photo solutions, and employee engagement apps are the preferred technologies in the finance sector.",
            },
            {
                question: "Do you develop software in the fintech space?",
                answer:
                    "Yes, we develop custom software in the fintech space, including payment systems, customer portals, and insurance calculation apps — with a strong focus on security standards and regulatory compliance.",
            },
            {
                question: "What solutions do you offer for employee motivation events?",
                answer:
                    "Gamification-based reward systems, interactive team building games, digital giveaway platforms, and branded photo booth solutions are among our tools that increase employee engagement and satisfaction.",
            },
        ],
        cta: "Kurumsal etkinlik projeniz için görüşme talep edin",
        cta_en: "Request a meeting for your corporate event project",
    },
    {
        slug: "kurumsal-etkinlik",
        slug_en: "corporate-events",
        name: "Kurumsal Etkinlik",
        name_en: "Corporate Events",
        title: "Kurumsal Etkinlikler İçin İnteraktif Teknoloji & Aktivasyon Çözümleri",
        title_en: "Interactive Technology & Activation Solutions for Corporate Events",
        metaTitle: "Kurumsal Etkinlik Teknolojisi & İnteraktif Aktivasyon | MetasoftCo",
        metaTitle_en: "Corporate Event Technology & Interactive Activation | MetasoftCo",
        metaDescription:
            "Şirket etkinlikleri, yıl sonu toplantıları, team building ve çalışan deneyimi programları için interaktif photobooth, gamification ve etkinlik yazılımı. İstanbul merkezli, Türkiye geneli hizmet.",
        metaDescription_en:
            "Interactive photobooth, gamification, and event software for company events, year-end parties, team building, and employee experience programs. Istanbul-based, serving all of Turkey.",
        keywords: [
            "kurumsal etkinlik teknolojisi",
            "şirket etkinliği interaktif",
            "yıl sonu partisi photobooth",
            "team building dijital",
            "çalışan deneyimi aktivasyon",
            "kurumsal aktivasyon istanbul",
        ],
        keywords_en: [
            "corporate event technology",
            "company event interactive",
            "year-end party photobooth",
            "team building digital",
            "employee experience activation",
            "corporate activation istanbul",
        ],
        heroSubtitle: "Şirket etkinliklerini çalışanların unutamayacağı deneyimlere dönüştürüyoruz.",
        intro:
            "Kurumsal etkinlikler çalışan bağlılığı ve marka kültürünü pekiştirir. Yıl sonu partilerinden ürün lansmanlarına, team building'den kongrelere kadar her formatı interaktif teknoloji ile güçlendiriyoruz.",
        intro_en:
            "Corporate events reinforce employee engagement and brand culture. We power every format — from year-end parties to product launches, team building to conferences — with interactive technology.",
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
        services_en: [
            {
                name: "Photobooth & AI Photos",
                desc: "Branded photobooth and AI-powered photo sharing system tailored for corporate events.",
                href: "/en/services",
            },
            {
                name: "Gamification & Competitions",
                desc: "Interactive games, trivia contests, and live leaderboards that connect employees.",
                href: "/en/services",
            },
            {
                name: "Event Registration System",
                desc: "QR code-based check-in, badge printing, and attendee tracking systems.",
                href: "/en/services",
            },
            {
                name: "Live Polling & Feedback",
                desc: "Real-time in-event polling, voting, and Q&A platforms.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "Is it possible to rent a photobooth for corporate events?",
                answer:
                    "Yes. We offer digital photobooth solutions customized with your company's logo and color palette on daily, weekly, or long-term rental options. Technician support is included.",
            },
            {
                question: "What interactive solutions do you offer for team building events?",
                answer:
                    "Team-based digital competitions, QR code scavenger hunts, trivia games with live scoreboards, and interactive stage activations are among our corporate team building programs.",
            },
            {
                question: "What size events do you serve?",
                answer:
                    "We deliver solutions for corporate events of every scale — from a 50-person department gathering to a 5,000-person gala. System capacity scales to match the event size.",
            },
        ],
        cta: "Kurumsal etkinliğiniz için ücretsiz keşif görüşmesi yapın",
        cta_en: "Schedule a free discovery call for your corporate event",
    },
    {
        slug: "teknoloji-sektoru",
        slug_en: "technology-saas",
        name: "Teknoloji & SaaS",
        name_en: "Technology & SaaS",
        title: "Teknoloji Şirketleri İçin Etkinlik Aktivasyonu & Özel Yazılım",
        title_en: "Event Activations & Custom Software for Technology Companies",
        metaTitle: "Teknoloji Şirketi Etkinlik Aktivasyonu & Yazılım Geliştirme | MetasoftCo",
        metaTitle_en: "Tech Company Event Activation & Software Development | MetasoftCo",
        metaDescription:
            "SaaS, yazılım ve teknoloji şirketleri için ürün lansmanı etkinlikleri, hackathon organizasyonları, kullanıcı konferansları ve özel yazılım geliştirme hizmetleri.",
        metaDescription_en:
            "Product launch events, hackathon organizations, user conferences, and custom software development for SaaS, software, and technology companies.",
        keywords: [
            "teknoloji şirketi etkinlik aktivasyonu",
            "SaaS ürün lansmanı",
            "hackathon organizasyon",
            "developer konferansı teknoloji",
            "startup etkinlik çözümü",
            "tech şirketi yazılım geliştirme",
        ],
        keywords_en: [
            "tech company event activation",
            "SaaS product launch",
            "hackathon organization",
            "developer conference technology",
            "startup event solution",
            "tech company software development",
        ],
        heroSubtitle: "Teknoloji lansmanlarını viral etkinlik deneyimlerine dönüştürüyoruz.",
        intro:
            "Teknoloji şirketleri için etkinlikler hem ürünü tanıtmalı hem de community oluşturmalıdır. Ürün lansmanlarından hackathonlara, kullanıcı konferanslarından meetup'lara kadar her formatı tasarlıyoruz.",
        intro_en:
            "Events for technology companies must both showcase the product and build community. We design every format — from product launches to hackathons, user conferences to meetups.",
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
        services_en: [
            {
                name: "Product Launch Activation",
                desc: "Highlight new product or feature launches with interactive demo experiences and AI photo booths.",
                href: "/en/services",
            },
            {
                name: "Conference & Hackathon",
                desc: "Attendee registration, badges, session management, and live voting systems.",
                href: "/en/services",
            },
            {
                name: "Gamification & Giveaways",
                desc: "Interactive games and instant reward systems that drive engagement at community events.",
                href: "/en/services",
            },
            {
                name: "Custom Software & Integrations",
                desc: "API integrations, automation tools, and custom modules for your SaaS product.",
                href: "/en/services",
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
        faqs_en: [
            {
                question: "What is recommended for a technology company's product launch event?",
                answer:
                    "Live product demo kiosks, interactive Q&A platforms, AI-powered photo activations, and real-time social media sharing systems generate the highest buzz at tech launches.",
            },
            {
                question: "What technology infrastructure do you provide for hackathon organization?",
                answer:
                    "We develop end-to-end hackathon software including attendee registration and team formation, project submission platform, jury scoring interface, live scoreboard, and prize distribution system.",
            },
            {
                question: "How can we work with MetasoftCo as a SaaS company?",
                answer:
                    "We offer a wide range of services — from activation design for events where you want to showcase your product, to software development for features your product is missing. We start by understanding your needs and developing tailored recommendations.",
            },
        ],
        cta: "Ürün lansmanı veya konferansınız için görüşme talep edin",
        cta_en: "Request a meeting for your product launch or conference",
    },
];

export function getSectorBySlug(slug: string): SectorData | undefined {
    return sectors.find((s) => s.slug === slug);
}

export function getSectorBySlugEn(slug: string): SectorData | undefined {
    return sectors.find((s) => s.slug_en === slug);
}
