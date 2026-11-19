/**
 * Yılbaşı ürün sayfaları (/hizmetler/yilbasi-<urun>-kiralama), Kasım 2026.
 * Her giriş src/app/(site)/hizmetler/_new-year-product/NewYearProductPage.tsx
 * ile çizilir; her ürünün kendi ince page.tsx dosyası vardır, böylece rota
 * statik kalır ve [category] dinamik rotasıyla çakışmaz.
 *
 * Kurallar: rakamlar yalnızca ürünün kendi sayfasından ve src/lib/rental-ops.ts
 * içinden alınır; fiyat yazılmaz; referans olarak yalnızca doğrulanmış projeler
 * kullanılır (Tavuk Dünyası AI Photo 2026'ya girerken yılbaşı partisi; DeFacto
 * Momento Ball mağaza ve etkinlik uygulaması). İngilizce ürün adının yanına
 * aramada bulunsun diye Türkçe karşılığı (`trName`) yazılır.
 */

export interface NewYearProduct {
    slug: string;
    /** H1 ve breadcrumb: "Yılbaşı <Ürün> Kiralama". */
    h1: string;
    /** Ürünün Türkçe / piyasa karşılığı; başlıkta ve schema alternateName'de. */
    trName: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    /** İlk paragraf: ne olduğu ve kimin için olduğu. */
    lede: string;
    /** Ana ürün sayfası. */
    product: { href: string; label: string };
    image: { url: string; alt: string };
    angleTitle: string;
    angle: { title: string; body: string }[];
    facts: { term: string; value: string }[];
    flowTitle: string;
    flow: { title: string; copy: string }[];
    reference?: { title: string; body: string; href: string };
    faq: { q: string; a: string }[];
}

const OPS_SETUP = "Etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce; cihaz başına ortalama 30–40 dakika.";
const OPS_POWER = "Tek bir standart 220V priz; internet kendi 5G altyapımızla gelir.";
const OPS_CREW = "Etkinlik boyunca alanda en az 2 teknik personel.";

export const newYearProducts: NewYearProduct[] = [
    {
        slug: "yilbasi-ai-photobooth-kiralama",
        h1: "Yılbaşı AI Photobooth Kiralama",
        trName: "Yapay Zekâ Fotoğraf Kabini",
        metaTitle: "Yılbaşı AI Photobooth Kiralama | Yapay Zekâ Fotoğraf Kabini | MetasoftCo",
        metaDescription:
            "Kurumsal yılbaşı partisi için AI Photobooth: çalışanlar kar küresinde, Noel filminde ya da 2027 afişinde. Saatte 40–60 kişi, QR ile paylaşım, şirkete özel tema.",
        keywords: ["yılbaşı ai photobooth", "yılbaşı yapay zeka fotoğraf", "kurumsal yılbaşı partisi photobooth", "ai photo yılbaşı", "yapay zeka fotoğraf kabini kiralama"],
        lede:
            "Yılbaşı AI Photobooth, çalışanların fotoğrafını yapay zekâ ile kar küresine, Noel filmi sahnesine ya da 2027 afişine dönüştüren bir fotoğraf istasyonudur. Şirket içi yılbaşı partisi düzenleyen İK, iç iletişim ve etkinlik ekipleri için; herkesin aynı gece kendi yılbaşı karesiyle ayrılmasını isteyenler için kuruyoruz.",
        product: { href: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", label: "AI Photobooth ana sayfası" },
        image: { url: "/images/yilbasi/v/kiosk-event-hero.webp", alt: "Yılbaşı süslemeli AI Photo kiosku, katılımcı ve örnek yılbaşı portresi" },
        angleTitle: "Yılbaşı gecesinde neden AI fotoğraf?",
        angle: [
            { title: "Tema şirketinize göre yazılır", body: "Kar küresi, Noel filmi, retro yılbaşı kartı ya da 2027 afişi: yapay zekâ senaryosu ve görsel stil şirketinizin renklerine ve parti konseptine göre hazırlanır, onayınızdan sonra sahaya çıkar." },
            { title: "Ofiste konuşulan kare", body: "Klasik fotoğrafta çerçeve değişir; AI fotoğrafta kişi başka bir sahneye girer. Ertesi gün paylaşılan ve iç iletişimde kullanılan görsel çoğu zaman bu olur." },
            { title: "Kuyruk planı kişi sayısına göre", body: "Tek istasyon saatte ortalama 40–60 kişiye hizmet verir. Kalabalık partilerde istasyon sayısı artırılarak akış kişi sayısına göre planlanır." },
        ],
        facts: [
            { term: "Kapasite", value: "İstasyon başına saatte ortalama 40–60 kişi." },
            { term: "Çıktı", value: "QR ile telefona dijital teslim; istenirse markalı çerçeveyle anında baskı." },
            { term: "Enerji ve internet", value: OPS_POWER },
            { term: "Kurulum", value: OPS_SETUP },
            { term: "Saha ekibi", value: OPS_CREW },
        ],
        flowTitle: "Partide nasıl ilerler?",
        flow: [
            { title: "Tema seçimi", copy: "Yılbaşı temaları ve şirket logosu birlikte belirlenir; örnek çıktılar onaya sunulur." },
            { title: "Çekim", copy: "Çalışan ekrandan temasını seçer, fotoğrafını çektirir; yapay zekâ saniyeler içinde işler." },
            { title: "Teslim", copy: "Görsel QR kod ile telefona iner; baskı seçildiyse markalı çerçeveyle basılır." },
            { title: "Gece sonrası", copy: "Talep edilirse fotoğraflar en fazla 90 gün saklanıp belirlenen süreçle şirketinize iletilir; aksi hâlde etkinlik sonrasında silinir." },
        ],
        reference: {
            title: "Tavuk Dünyası × AI Photo",
            body: "Tavuk Dünyası'nın 2026'ya girerken düzenlediği yılbaşı partisinde AI Photo istasyonunu kurduk; katılımcılar markanın dünyasına uyarlanan yapay zekâ görselleriyle ayrıldı.",
            href: "/projeler/tavuk-dunyasi-x-ai-photo",
        },
        faq: [
            { q: "Yılbaşı AI Photobooth nedir?", a: "Çalışanların fotoğrafını yapay zekâ ile yılbaşı temalı sahnelere (kar küresi, Noel filmi, 2027 afişi gibi) dönüştüren bir fotoğraf istasyonudur. Görsel QR kod ile telefona iner; istenirse anında baskı da verilir." },
            { q: "Yılbaşı temalarını biz mi seçiyoruz?", a: "Evet. Tema listesi, görsel stil, logo ve renkler şirketinize ve parti konseptine göre hazırlanır. Örnek çıktılar onayınıza sunulduktan sonra sahaya çıkar." },
            { q: "Kaç kişilik bir parti için kaç istasyon gerekir?", a: "Tek istasyon saatte ortalama 40–60 kişiye hizmet verir. Katılımcı sayısını ve fotoğraf noktasının açık kalacağı süreyi paylaşın; istasyon sayısını buna göre öneririz." },
            { q: "Çalışan fotoğrafları nasıl saklanıyor?", a: "Şirketiniz etkinlik öncesinde talep ederse fotoğraflar en fazla 90 gün saklanır ve belirlenen süreçle iletilir. Böyle bir talep yoksa etkinlik sonrasında silinir. Veri sorumlulukları projenin kapsamına göre belirlenir." },
            { q: "Aralık için ne kadar önceden haber vermeliyiz?", a: "Teknik hazırlık için etkinlikten 3 gün önce haber vermeniz yeterli. Aralık yoğun bir dönem olduğu için tarih, şehir ve kişi sayısını erken paylaşmanızı öneririz; müsaitlik kontrol edildikten sonra rezervasyon netleşir." },
        ],
    },
    {
        slug: "yilbasi-mirror-booth-kiralama",
        h1: "Yılbaşı Mirror Booth Kiralama",
        trName: "Aynalı Fotoğraf Kabini",
        metaTitle: "Yılbaşı Mirror Booth Kiralama | Aynalı Fotoğraf Kabini | MetasoftCo",
        metaDescription:
            "Yılbaşı galası ve şirket partisi için Mirror Booth: boy aynası ekran, aynaya imza, anında baskı ve QR. 4 m² alan, saatte 60–80 kişi, pakete 750 baskı dahil.",
        keywords: ["yılbaşı mirror booth", "aynalı photobooth yılbaşı", "aynalı fotoğraf kabini kiralama", "yılbaşı gala photobooth", "kurumsal yılbaşı partisi fotoğraf"],
        lede:
            "Yılbaşı Mirror Booth, boy aynası görünümündeki dokunmatik ekranın arkasına kamera yerleştirilmiş, fotoğrafı saniyeler içinde basan bir fotoğraf kabinidir. Otel salonunda ya da şık bir mekânda yılbaşı galası, şirket yemeği veya ödül gecesi düzenleyen ve dekora yakışan bir fotoğraf noktası arayan ekipler için.",
        product: { href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/mirror-booth", label: "Mirror Booth ana sayfası" },
        image: { url: "/images/yilbasi/v/holiday-mirror-booth.webp", alt: "Işıklı yılbaşı ağacının yanında bordo Mirror Booth ve gala katılımcısı — örnek konsept" },
        angleTitle: "Gala gecesine uyan fotoğraf noktası",
        angle: [
            { title: "Salonun dekoruna karışır", body: "Kiosk değil boy aynası gibi durur; giydirmesi ve ekran animasyonları yılbaşı temasına ve şirket renklerine göre hazırlanır." },
            { title: "Aynaya imza, karta not", body: "Misafir çekimden sonra fotoğrafın üzerine doğrudan aynadan imza ya da yeni yıl notu ekler; baskı o notla çıkar." },
            { title: "Masaya konan hatıra", body: "Her fotoğraf saniyeler içinde basılır, aynı kare QR ile telefona da iner. Pakete 750 adet baskı dahildir." },
        ],
        facts: [
            { term: "Alan", value: "4 m² alan yeterli." },
            { term: "Kapasite", value: "Saatte ortalama 60–80 kişi." },
            { term: "Baskı", value: "Saniyeler içinde baskı; pakete 750 adet baskı dahil, ayrıca QR ile dijital paylaşım." },
            { term: "Enerji ve internet", value: OPS_POWER },
            { term: "Kurulum", value: OPS_SETUP },
        ],
        flowTitle: "Gecede nasıl ilerler?",
        flow: [
            { title: "Karşılama", copy: "Ayna, misafiri animasyon ve sesli yönlendirmeyle karşılar; poz için geri sayım başlar." },
            { title: "Çekim", copy: "Fotoğraf çekilir, ekranda yılbaşı çerçevesiyle gösterilir." },
            { title: "İmza", copy: "Misafir dilerse aynanın üzerinden fotoğrafa imza ya da not ekler." },
            { title: "Baskı ve QR", copy: "Baskı saniyeler içinde çıkar; dijital kopya QR kod ile telefona iner." },
        ],
        faq: [
            { q: "Yılbaşı partisinde Mirror Booth neden tercih ediliyor?", a: "Boy aynası görünümü gala ve yılbaşı yemeği gibi şıklığın öne çıktığı gecelerde salonun dekoruna uyar. Misafir aynaya bakarak poz verir, fotoğrafına imza atar ve basılı hatırasını alır." },
            { q: "Mirror Booth için ne kadar alan gerekir?", a: "4 m² alan yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G altyapımızla gelir." },
            { q: "Yılbaşı partisinde kaç kişiye yetişir?", a: "Mirror Booth saatte ortalama 60–80 kişiye hizmet verir. Katılımcı sayısı ve fotoğraf noktasının açık kalacağı süreye göre plan yapılır." },
            { q: "Kaç baskı dahil, çerçeveyi kim tasarlıyor?", a: "Pakete 750 adet baskı dahildir. Yılbaşı temalı baskı çerçevesi, karşılama ekranı ve kiosk giydirmesi şirket logonuz ve renklerinizle hazırlanır." },
            { q: "Mirror Booth ile klasik photobooth arasında nasıl seçim yapmalıyız?", a: "Alan dar, kişi sayısı yüksekse 2 m²'ye sığan klasik photobooth daha uygundur. Gala havası ve aynaya imza deneyimi isteniyorsa Mirror Booth öne çıkar. İkisi aynı gecede farklı noktalara da kurulabilir." },
        ],
    },
    {
        slug: "yilbasi-360-video-booth-kiralama",
        h1: "Yılbaşı 360 Video Booth Kiralama",
        trName: "360 Derece Video Platformu",
        metaTitle: "Yılbaşı 360 Video Booth Kiralama | 360 Derece Video Platformu | MetasoftCo",
        metaDescription:
            "Yılbaşı partisinin dans pistine 360 Video Booth: yavaş çekim, müzik ve şirket grafikleriyle kısa video, QR ile telefona. 3 m² alan, saatte 40–50 kişi.",
        keywords: ["yılbaşı 360 video booth", "360 derece video platformu kiralama", "yılbaşı partisi 360 video", "kurumsal yılbaşı video aktivasyonu", "slow motion video booth yılbaşı"],
        lede:
            "Yılbaşı 360 Video Booth, çalışanların yuvarlak bir platformda durduğu, kamera kolunun etraflarında dönerek yavaş çekim video kaydettiği bir video aktivasyonudur. Gecenin parti kısmını hareketli kılmak ve ekiplerin sosyal medyada paylaşacağı kısa videolar üretmek isteyen kurumsal yılbaşı partileri için.",
        product: { href: "/hizmetler/video/360-video-booth", label: "360 Video Booth ana sayfası" },
        image: { url: "/images/yilbasi/v/holiday-360-photo.webp", alt: "Yılbaşı dekoru önünde 360 video platformu ve katılımcı — örnek konsept" },
        angleTitle: "Gecenin parti kısmı için",
        angle: [
            { title: "Ekipçe çıkılan platform", body: "Departmanlar platforma birlikte çıkar; konfeti, kostüm aksesuarı ya da dans, dönen kamerayla yavaş çekim bir videoya dönüşür." },
            { title: "Yılbaşı kurgusu hazır", body: "Videonun giriş-çıkış ekranları, hareketli grafikleri ve müziği yılbaşı konseptine ve şirket kimliğine göre hazırlanır." },
            { title: "Baskı yok, video var", body: "Çıktı video olduğu için dijitaldir; QR ile telefona iner. Basılı hatıra da istenirse aynı geceye bir photobooth eklenir." },
        ],
        facts: [
            { term: "Alan", value: "3 m² alan yeterli." },
            { term: "Kapasite", value: "Saatte ortalama 40–50 kişi." },
            { term: "Çıktı", value: "Yavaş çekim kısa video; QR ile telefona dijital teslim, baskı verilmez." },
            { term: "Enerji ve internet", value: OPS_POWER },
            { term: "Saha ekibi", value: OPS_CREW },
        ],
        flowTitle: "Platformda neler oluyor?",
        flow: [
            { title: "Platforma çıkış", copy: "Çalışan ya da ekip platforma çıkar; operatör çekimi başlatır." },
            { title: "Dönüş", copy: "Kamera kolu etrafında döner, birkaç saniyelik poz ya da dans kaydedilir." },
            { title: "Kurgu", copy: "Yazılım yavaş çekim, hız rampası, müzik ve yılbaşı grafiklerini otomatik ekler." },
            { title: "Paylaşım", copy: "Video yandaki ekranda oynar ve QR kod ile telefona iner." },
        ],
        faq: [
            { q: "Yılbaşı 360 Video Booth nedir?", a: "Katılımcının bir platformda durduğu, kameranın etrafında dönerek 360 derece video çektiği bir aktivasyondur. Video yavaş çekim, müzik ve yılbaşı temalı grafiklerle kurgulanır, QR kod ile telefona iner." },
            { q: "Platforma aynı anda kaç kişi çıkabilir?", a: "Platform tek kişi ya da küçük grup çekimine uygundur. Grup büyüklüğü platform ve kamera kolunun çekim alanına göre kurulumda netleştirilir." },
            { q: "Kaç kişiye yetişir, ne kadar alan ister?", a: "360 Video Booth saatte ortalama 40–50 kişiye hizmet verir ve 3 m² alana kurulur. Tek bir standart 220V priz yeterlidir." },
            { q: "Basılı hatıra da istiyoruz, ne önerirsiniz?", a: "360 Video Booth baskı vermez. Basılı hatıra için aynı geceye Photobooth ya da Mirror Booth eklenebilir; ikisi farklı noktalarda birlikte çalışır." },
            { q: "Videolarda şirket logomuz yer alır mı?", a: "Evet. Videonun giriş-çıkış ekranları ve hareketli grafikleri şirket logosu ve yılbaşı konseptiyle hazırlanır; ekran arayüzü de markanıza göre tasarlanır." },
        ],
    },
    {
        slug: "yilbasi-photobooth-kiralama",
        h1: "Yılbaşı Photobooth Kiralama",
        trName: "Fotoğraf Kabini",
        metaTitle: "Yılbaşı Photobooth Kiralama | Fotoğraf Kabini | MetasoftCo",
        metaDescription:
            "Şirket yılbaşı partisi için photobooth (fotoğraf kabini): 2 m² alan, saatte 70–80 kişi, gruplarda 150'ye kadar. Yılbaşı çerçevesi, GIF, Boomerang ve 750 baskı dahil.",
        keywords: ["yılbaşı photobooth kiralama", "yılbaşı fotoğraf kabini", "şirket yılbaşı partisi photobooth", "yılbaşı fotoğraf köşesi", "kurumsal photobooth yılbaşı"],
        lede:
            "Yılbaşı Photobooth, çalışanların kendi fotoğrafını çekip yılbaşı çerçevesiyle saniyeler içinde baskı aldığı kompakt bir fotoğraf kabinidir. Ofiste, restoranda ya da otel salonunda yılbaşı partisi yapan ve az yer kaplayan, kalabalığa yetişen bir fotoğraf köşesi isteyen şirketler için.",
        product: { href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala", label: "Photobooth ana sayfası" },
        image: { url: "/images/yilbasi/v/holiday-photobooth.webp", alt: "Yılbaşı temalı fotoğraf kabini, katılımcılar ve fotoğraf şeridi — örnek konsept" },
        angleTitle: "Kalabalık partinin fotoğraf köşesi",
        angle: [
            { title: "Dar alana sığar", body: "2 m² alan yeterli. Ofis partisinde koridor köşesine, restoranda giriş alanına kurulabilir." },
            { title: "Gruplar hızlı geçer", body: "Saatte ortalama 70–80 kişiye hizmet verir; ekipler grup hâlinde çekildiğinde bu sayı 150 kişiye kadar çıkar." },
            { title: "Masaya giden baskı", body: "Fotoğraf yılbaşı çerçevesiyle saniyeler içinde basılır, QR ile telefona da iner. Pakete 750 adet baskı dahildir." },
        ],
        facts: [
            { term: "Alan", value: "2 m² alan yeterli." },
            { term: "Kapasite", value: "Saatte ortalama 70–80 kişi; grup çekimlerinde 150 kişiye kadar." },
            { term: "Modlar", value: "Fotoğraf, GIF ve Boomerang; sihirli arka plan (greenbox) ve filtreler." },
            { term: "Baskı", value: "Pakete 750 adet baskı dahil; ayrıca QR ile dijital paylaşım." },
            { term: "Kurulum", value: OPS_SETUP },
        ],
        flowTitle: "Köşede nasıl ilerler?",
        flow: [
            { title: "Mod seçimi", copy: "Çalışan ekrandan fotoğraf, GIF ya da Boomerang modunu seçer." },
            { title: "Yılbaşı arka planı", copy: "İstenirse sihirli arka planla karlı bir sahneye ya da şirketin yılbaşı görseline yerleşir." },
            { title: "Baskı", copy: "Fotoğraf markalı yılbaşı çerçevesiyle saniyeler içinde basılır." },
            { title: "Dijital kopya", copy: "Aynı kare QR kod ile telefona iner." },
        ],
        faq: [
            { q: "Yılbaşı photobooth nedir?", a: "Kamera, ekran ve baskı makinesinden oluşan kompakt bir fotoğraf kabinidir. Çalışan poz verir, fotoğraf yılbaşı temalı çerçeveyle saniyeler içinde basılır ve QR kod ile telefona da iner." },
            { q: "Ofisteki yılbaşı partisine sığar mı?", a: "Evet. Photobooth 2 m² alana kurulur ve tek bir standart 220V priz yeterlidir. İnterneti kendi 5G altyapımızla getirdiğimiz için ofis ağına ihtiyaç duymayız." },
            { q: "Yılbaşı partisinde kaç kişiye yetişir?", a: "Saatte ortalama 70–80 kişiye hizmet verir; misafirler gruplar hâlinde çekildiğinde bu sayı saatte 150 kişiye kadar çıkar." },
            { q: "Kaç baskı dahil?", a: "Pakete 750 adet baskı dahildir. Fotoğraflar ayrıca QR kod ile dijital olarak paylaşılır." },
            { q: "Yılbaşı çerçevesini ve arka planı kim hazırlıyor?", a: "Baskı çerçevesi, karşılama ekranı, sihirli arka plan görselleri ve kiosk kaplaması şirket logonuz ve yılbaşı konseptine göre ekibimiz tarafından hazırlanır ve onayınıza sunulur." },
        ],
    },
    {
        slug: "yilbasi-gif-kart-aktivasyonu",
        h1: "Yılbaşı GIF Kart Aktivasyonu Kiralama",
        trName: "Hareketli Fotoğraf Kartı",
        metaTitle: "Yılbaşı GIF Kart Aktivasyonu | Hareketli Fotoğraf Kartı | MetasoftCo",
        metaDescription:
            "Yılbaşı partisinde iki pozu tek kartta birleştiren hareketli fotoğraf kartı: kart eğildikçe kare değişir. Şirkete özel yılbaşı tasarımı, QR ile dijital GIF.",
        keywords: ["yılbaşı gif kart", "hareketli fotoğraf kartı", "yılbaşı hareketli fotoğraf", "motion photo kart yılbaşı", "kurumsal yılbaşı hatıra kartı"],
        lede:
            "Yılbaşı GIF Kart, çalışanın arka arkaya verdiği iki pozu optik lens yüzeyli tek bir kartta birleştiren fiziksel bir hatıradır; kart sağa sola eğildikçe iki kare arasında geçiş olur. Yılbaşı partisinde çalışanlara masalarında duracak, basılı ama hareketli bir yeni yıl kartı vermek isteyen şirketler için.",
        product: { href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/hareketli-fotograf-gif-kart-aktivasyonu-kiralama", label: "GIF Kart ana sayfası" },
        image: { url: "/images/yilbasi/v/holiday-gif-card.webp", alt: "Yılbaşı desenleriyle hazırlanmış hareketli fotoğraf kartı — örnek konsept" },
        angleTitle: "Yeni yıl kartının hareketli hâli",
        angle: [
            { title: "2026'dan 2027'ye", body: "İki poz iki yılı anlatabilir: ilk karede yorgun bir 2026 ifadesi, ikincisinde 2027 kutlaması. Kart eğildikçe hikâye değişir." },
            { title: "Masada kalan hatıra", body: "Ön yüzdeki çerçeve ve arka plan şirketinizin yılbaşı tasarımıyla hazırlanır; kart ofis masasında aylarca durur." },
            { title: "Dijital GIF de cebe", body: "Fiziksel kartın yanında iki karenin dijital GIF versiyonu QR ile telefona iner ve paylaşılabilir." },
        ],
        facts: [
            { term: "Çıktı", value: "Optik lens yüzeyli fiziksel kart; ayrıca QR ile dijital GIF." },
            { term: "Çekim", value: "Arka arkaya iki poz, tek görsel formatta birleştirilir." },
            { term: "Tasarım", value: "Kart çerçevesi ve arka planı şirkete ve yılbaşı konseptine özel." },
            { term: "Enerji ve internet", value: OPS_POWER },
            { term: "Kurulum", value: OPS_SETUP },
        ],
        flowTitle: "Kart nasıl hazırlanır?",
        flow: [
            { title: "İki poz", copy: "Çalışan arka arkaya iki farklı poz verir; örneğin önce şaşkın, sonra kutlayan." },
            { title: "Birleştirme", copy: "Yazılım iki kareyi geçişe uygun tek bir görsele dönüştürür." },
            { title: "Baskı", copy: "Görsel optik lens yüzeyine basılır; kart saniyeler içinde hazır olur." },
            { title: "Teslim", copy: "Çalışan kartını alır; isterse dijital GIF'i QR kod ile telefonuna indirir." },
        ],
        faq: [
            { q: "GIF kart nedir, nasıl hareket ediyor?", a: "İki farklı poz özel bir optik lens yüzeyine milimetrik olarak uygulanır. Kartın açısı değiştikçe göz iki kareden birini görür; böylece basılı bir GIF etkisi oluşur." },
            { q: "Yılbaşı partisinde nasıl kurgulanabilir?", a: "İki poz yılın geçişini anlatacak şekilde kurgulanabilir: 2026'ya veda ve 2027 kutlaması gibi. Kartın çerçevesi ve arka planı şirketinizin yılbaşı tasarımıyla hazırlanır." },
            { q: "Kart dışında dijital kopya veriliyor mu?", a: "Evet. İki karenin birleşiminden oluşan dijital GIF, ekrandaki QR kod ile telefona indirilip paylaşılabilir." },
            { q: "Kaç kart basılacağını nasıl planlıyoruz?", a: "Tahmini katılımcı sayısını ve etkinlik süresini paylaşın; kart adedi, çekim akışı ve ekip kapsamı teklifte netleştirilir." },
        ],
    },
    {
        slug: "yilbasi-dijital-carkifelek-kiralama",
        h1: "Yılbaşı Dijital Çarkıfelek Kiralama",
        trName: "Hediye Çarkı",
        metaTitle: "Yılbaşı Dijital Çarkıfelek Kiralama | Hediye Çarkı | MetasoftCo",
        metaDescription:
            "Yılbaşı partisinde hediye dağıtımı için dijital çarkıfelek: dokunmatik ekranda markalı çark, dilim ve hediyeleri siz belirlersiniz. Kurulum ve personel dahil.",
        keywords: ["yılbaşı çarkıfelek", "dijital çarkıfelek kiralama", "yılbaşı hediye çarkı", "yılbaşı çekilişi", "kurumsal yılbaşı hediye dağıtımı"],
        lede:
            "Yılbaşı Dijital Çarkıfelek, çalışanların dokunmatik ekrandaki çarkı çevirerek yılbaşı hediyesini kazandığı interaktif bir oyundur; çark durduğunda kazanılan hediye ekranda gösterilir. Yılbaşı partisinde hediyeleri sahnede ya da girişte, herkesin gözü önünde ve gösterili biçimde dağıtmak isteyen şirketler için.",
        product: { href: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", label: "Hediye Çarkı ana sayfası" },
        image: { url: "/images/yilbasi/v/holiday-gift-wheel.webp", alt: "Yılbaşı temalı dijital hediye çarkı ve katılımcı — örnek konsept" },
        angleTitle: "Hediye dağıtımını gösteriye çevirin",
        angle: [
            { title: "Kurallar önceden belli", body: "Dilim sayısı, hediye türleri ve her hediyenin çıkma oranı etkinlik öncesinde sizinle birlikte belirlenir; stok bitmeden dağıtım planlanır." },
            { title: "Herkesin gözü önünde", body: "Çark ses ve animasyonla döner, kazanılan hediye ekranda belirir. Sahnede kurulduğunda çekiliş anı salonun ortak anına dönüşür." },
            { title: "Fiziksel çarkın yükü yok", body: "Taşınacak ağır bir çark, kırılacak bir mekanizma yoktur; tek kiosk alanı ve bir priz yeterlidir." },
        ],
        facts: [
            { term: "Alan", value: "Tek bir kiosk alanı." },
            { term: "Enerji ve internet", value: OPS_POWER },
            { term: "Tasarım", value: "Çark dilimleri, arka plan, kazanma ekranı ve kiosk kaplaması yılbaşı temasıyla." },
            { term: "Kurulum", value: "Etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce." },
            { term: "Saha ekibi", value: OPS_CREW },
        ],
        flowTitle: "Çekiliş anı nasıl ilerler?",
        flow: [
            { title: "Hediye listesi", copy: "Hediyeler, adetleri ve dilimler etkinlik öncesinde birlikte belirlenir." },
            { title: "Çevirme", copy: "Çalışan ekrana dokunur; yılbaşı temalı çark ses ve animasyonla döner." },
            { title: "Kazanma ekranı", copy: "Çark durduğu dilimdeki hediye ekranda gösterilir." },
            { title: "Teslim", copy: "Ekibiniz hediyeyi teslim eder; istenirse katılım kayıtları raporlanır." },
        ],
        faq: [
            { q: "Dijital çarkıfelek ile hediye çarkı aynı şey mi?", a: "Evet. Dijital çarkıfelek, hediye çarkının piyasadaki adıdır: dokunmatik ekranda dönen, durduğu dilimdeki hediyeyi gösteren interaktif bir oyundur." },
            { q: "Yılbaşı hediyelerini ve dilimleri biz mi belirliyoruz?", a: "Evet. Dilim sayısı, hediye türleri ve çarkın tasarımı etkinlik öncesinde sizinle birlikte belirlenir; her hediyenin çıkma oranı arka planda ayarlanır." },
            { q: "Çark sahnede kullanılabilir mi?", a: "Evet. Kiosk sahneye ya da giriş alanına kurulabilir; sahnede kullanıldığında ekran görüntüsünün salon ekranlarına aktarılması mekânın teknik altyapısına göre planlanır." },
            { q: "Katılımcı kaydı alınabilir mi?", a: "İstenirse çarkı çevirmeden önce QR ile kısa bir form adımı eklenebilir. Kayıtlar KVKK onayıyla alınır, müşteri panelinden izlenir ve Excel/CSV olarak indirilir. Şirket içi partide bu adım çoğu zaman gerekmez." },
            { q: "Kurulum için ne gerekiyor?", a: "Tek bir kiosk alanı ve standart bir 220V priz yeterlidir. İnterneti kendi 5G altyapımızla sağlıyoruz; kurulum ve söküm ekibimiz tarafından yapılır." },
        ],
    },
    {
        slug: "yilbasi-momento-ball-kiralama",
        h1: "Yılbaşı Momento Ball Kiralama",
        trName: "Şeffaf Fotoğraf Küresi",
        metaTitle: "Yılbaşı Momento Ball Kiralama | Şeffaf Fotoğraf Küresi | MetasoftCo",
        metaDescription:
            "Kurumsal yılbaşı partisinde çekilen fotoğraf şeffaf bir küreye yerleşir; çalışan ağaca asılacak ya da masada duracak hatırasıyla ayrılır. Logo ve tarih tasarımı dahil.",
        keywords: ["yılbaşı momento ball", "şeffaf fotoğraf küresi", "yılbaşı fotoğraf küresi kiralama", "yılbaşı ağacı fotoğraf süsü", "kurumsal yılbaşı hediyesi fotoğraf"],
        lede:
            "Yılbaşı Momento Ball, partide çekilen fotoğrafın basılıp şeffaf bir kürenin içine yerleştirildiği bir fotoğraf aktivitesidir; küre yılbaşı ağacına asılan bir süs ya da masada duran bir obje olur. Çalışanlarına gecenin sonunda kendi fotoğrafını taşıyan kişisel bir yılbaşı hediyesi vermek isteyen şirketler için.",
        product: { href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/momento-ball", label: "Momento Ball ana sayfası" },
        image: { url: "/images/yilbasi/v/momento-ball.webp", alt: "Işıklı yılbaşı ağacına asılmış fotoğraflı şeffaf Momento Ball küresi" },
        angleTitle: "Fotoğraf köşesi ve hediye bir arada",
        angle: [
            { title: "Hediye çantasına giren fotoğraf", body: "Ayrı bir yılbaşı hediyesi düşünmek yerine, çalışanın o geceki fotoğrafı kürenin içinde kişisel bir hediyeye dönüşür." },
            { title: "Ağaçta ya da masada", body: "Askılı süs ya da masaüstü obje: kullanım biçimi teklif aşamasında seçilir, ofisteki yılbaşı ağacı da bu kürelerle süslenebilir." },
            { title: "Logo ve tarih", body: "Fotoğraf tasarımına şirket logosu ve etkinlik tarihi eklenir; yılbaşı teması birlikte belirlenir." },
        ],
        facts: [
            { term: "Çıktı", value: "Basılı fotoğraf, şeffaf kürenin içinde; katılımcı yanında götürür." },
            { term: "Kullanım", value: "Yılbaşı ağacına askılı süs ya da masaüstü obje." },
            { term: "Tasarım", value: "Şirket logosu, etkinlik tarihi ve yılbaşı teması." },
            { term: "Planlama", value: "Küre adedi, çekim ve teslim akışı katılımcı sayısına göre teklifte netleşir." },
        ],
        flowTitle: "Küre nasıl hazırlanır?",
        flow: [
            { title: "Çekim", copy: "Çalışan, partideki çekim noktasında fotoğrafını çektirir." },
            { title: "Baskı", copy: "Fotoğraf yılbaşı tasarımıyla basılır ve küreye hazırlanır." },
            { title: "Küreye yerleştirme", copy: "Saha ekibi fotoğrafı şeffaf kürenin içine yerleştirir." },
            { title: "Teslim", copy: "Çalışan fotoğraflı küresini gecenin hatırası olarak alır." },
        ],
        reference: {
            title: "DeFacto × Momento Ball",
            body: "DeFacto mağaza ve etkinlikleri için hazırladığımız Momento Ball uygulamasında katılımcıların fotoğrafları şeffaf kürelerin içinde fiziksel hatıralara dönüştü.",
            href: "/projeler/defacto-x-momento-ball-photo",
        },
        faq: [
            { q: "Yılbaşı Momento Ball nedir?", a: "Partide çekilen fotoğrafın basılıp şeffaf bir kürenin içine yerleştirildiği bir fotoğraf aktivitesidir. Katılımcı fotoğraflı küresini yılbaşı süsü ya da masaüstü obje olarak yanında götürür." },
            { q: "Kurumsal yılbaşı hediyesi olarak kullanılabilir mi?", a: "Evet. Her çalışan kendi fotoğrafını taşıyan bir küreyle ayrıldığı için Momento Ball fotoğraf köşesi ile kişisel hediyeyi aynı noktada birleştirir. Logo ve tarih tasarımı şirketinize göre hazırlanır." },
            { q: "Kaç küre hazırlanabilir?", a: "Kapasite çekim düzenine, ekip planına ve üretim akışına bağlıdır. Tahmini katılımcı sayısını ve etkinlik süresini paylaşın; küre adedi ve teslim akışını buna göre planlayalım." },
            { q: "Askılı mı masaüstü mü seçmeliyiz?", a: "Ofiste ya da salonda bir yılbaşı ağacı varsa askılı küre gecenin dekoruna da katılır; masaüstü küre ise yılbaşından sonra da masada durur. Tercih teklif aşamasında belirlenir." },
        ],
    },
];

export function getNewYearProduct(slug: string): NewYearProduct | undefined {
    return newYearProducts.find((item) => item.slug === slug);
}

export const newYearProductSlugs = newYearProducts.map((item) => item.slug);

/** The New Year page of a rental product (by its service slug), for a link from the product page. */
export function newYearPageForService(serviceSlug: string): { href: string; label: string } | undefined {
    const item = newYearProducts.find((entry) => entry.product.href.endsWith(`/${serviceSlug}`));
    return item ? { href: `/hizmetler/${item.slug}`, label: item.h1 } : undefined;
}
