import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DIRECT_URL veya DATABASE_URL tanımlı değil.");
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type ProjectInput = {
    title: string;
    title_en: string;
    slug: string;
    slug_en: string;
    client: string;
    category: string;
    description: string;
    description_en: string;
    content: string;
    content_en: string;
    image: string;
    technologies: string[];
    order: number;
};

const projects: ProjectInput[] = [
    {
        title: "BSH × AI Draw",
        title_en: "BSH × AI Draw",
        slug: "bsh-x-ai-draw",
        slug_en: "bsh-x-ai-draw",
        client: "BSH",
        category: "Yapay Zeka",
        description: "BSH'nin etkinlik alanında katılımcılar yapay zeka destekli çizim deneyimiyle kendi özgün tasarımlarını oluşturdu.",
        description_en: "At BSH's event area, participants created their own original designs through an AI-powered drawing experience.",
        content: "<h2>Bir Anıdan Kişisel Bir Tasarıma</h2><p>BSH için hazırladığımız AI Draw deneyiminde, klasik etkinlik fotoğrafını katılımcının bizzat parçası olduğu yaratıcı bir üretim sürecine dönüştürdük. Marka alanına yerleştirilen deneyim noktası, ziyaretçileri yalnızca poz veren konuklar olmaktan çıkarıp kendi görsel hikâyelerinin merkezine taşıdı.</p><p>Katılımcıdan alınan fotoğraf, yapay zeka destekli çizim akışına dâhil edilerek özgün bir görsel yoruma dönüştürüldü. Böylece her çıktı, BSH etkinliğinin atmosferini taşıyan ama aynı zamanda sahibine ait olan kişisel bir hatıra haline geldi.</p><h3>AI Draw Deneyimi Nasıl İşledi?</h3><p>Deneyim; kolay anlaşılır, kısa ve etkinlik temposuna uyumlu bir akışla kurgulandı. Katılımcılar çekimden sonra oluşturulan görseli ekranda inceledi; portre, dijital çizim estetiğiyle yeniden yorumlanarak markalı deneyimin parçası oldu.</p><p>Bu yaklaşım, üretim sürecini görünür kıldığı için katılımcılara sıradan bir fotoğraf çekiminden daha fazlasını sundu: Kendi anlarının nasıl özgün bir tasarıma dönüştüğünü anlık olarak deneyimleme fırsatı verdi.</p><h3>Fiziksel ve Dijital Bir Marka Hatırası</h3><p>AI Draw çıktıları, katılımcıların etkinlikten yanında götürebileceği kişisel bir hatıraya dönüştürüldü. BSH'nin güçlü ve modern görsel dünyasıyla uyumlu bu deneyim, teknoloji, tasarım ve insan hikâyesini aynı temas noktasında buluşturdu.</p><p>MetasoftCo olarak bu projede, yapay zeka destekli portre üretiminin kurumsal etkinliklerde nasıl sıcak, paylaşılabilir ve markaya özgü bir deneyime dönüşebileceğini gösterdik.</p>",
        content_en: "<h2>From a Moment to a Personal Design</h2><p>For BSH, we turned a classic event photo into a creative production process in which each participant played the leading role. The experience point placed in the brand area moved visitors beyond simply posing and put them at the centre of their own visual story.</p><p>Each participant photo entered an AI-assisted illustration flow and was reinterpreted as an original visual. The result carried the atmosphere of the BSH event while becoming a personal keepsake for its owner.</p><h3>How the AI Draw Experience Worked</h3><p>The experience was designed as an intuitive, quick flow that could keep pace with the event. After the capture, participants viewed their result on screen as their portrait was reimagined through a digital illustration aesthetic.</p><p>Making the creation process visible offered more than a standard photo moment: it let participants experience how their own moment became an original design in real time.</p><h3>A Physical and Digital Brand Keepsake</h3><p>AI Draw outputs became personal mementos participants could take away from the event. Aligned with BSH's bold, contemporary visual world, the experience brought technology, design and individual stories together at one touchpoint.</p><p>With this project, MetasoftCo demonstrated how AI-assisted portrait creation can become a warm, shareable and brand-specific corporate event experience.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705135/metasoftco/projects/presentation/bsh-ai-draw.jpg",
        technologies: ["AI Draw", "Kişiselleştirilmiş çıktı"],
        order: 9,
    },
    {
        title: "Akmerkez × AI Football Card",
        title_en: "Akmerkez × AI Football Card",
        slug: "akmerkez-x-ai-football-card",
        slug_en: "akmerkez-x-ai-football-card",
        client: "Akmerkez",
        category: "Yapay Zeka",
        description: "EURO 2024 ruhunu taşıyan deneyimde ziyaretçiler, kendi isimleri ve fotoğraflarıyla kişiselleştirilmiş futbol kartlarına dönüştü.",
        description_en: "In an experience carrying the spirit of EURO 2024, visitors became personalized football cards with their own names and photos.",
        content: "<h2>EURO 2024 Heyecanını Kişiselleştiren Deneyim</h2><p>Akmerkez için hazırladığımız AI Football Card aktivasyonunda, futbol turnuvasının enerjisini ziyaretçilerin başrolde olduğu dijital bir oyuna dönüştürdük. EURO 2024 temasıyla tasarlanan deneyim, etkinlik alanındaki heyecanı herkesin kendi oyuncu kartını oluşturabildiği kişisel bir ana taşıdı.</p><p>Katılımcılar kendi fotoğrafları ve isimleriyle hazırlanan kartlarda bir futbolcu gibi konumlandı. Turnuva estetiğini taşıyan tasarım dili; forma, kart bilgileri ve saha atmosferi gibi detaylarla birleşerek, markanın etkinlik alanında güçlü bir görsel deneyim yarattı.</p><h3>Kendi Oyuncu Kartını Oluştur</h3><p>Akış, ziyaretçinin fotoğrafının alınmasıyla başladı. Ardından görsel, futbol kartı konseptine uyarlanarak kişiselleştirilmiş dijital tasarıma dönüştürüldü. Her çıktı, katılımcının sosyal çevresiyle paylaşmak isteyeceği eğlenceli ve özgün bir turnuva hatırası olarak kurgulandı.</p><p>Bu kurgu sayesinde etkinlik ziyaretçileri yalnızca futbol gündemini takip etmedi; o gündemin aktif bir parçası haline geldi.</p><h3>Akmerkez'de Paylaşılabilir Turnuva Anısı</h3><p>AI Football Card, sporun rekabetçi ve kolektif enerjisini erişilebilir bir marka deneyimine dönüştürdü. Kısa sürede üretilen kişiselleştirilmiş kartlar, ziyaretçilerin etkinlik alanında tekrar tekrar dönmek isteyeceği dikkat çekici bir etkileşim noktası yarattı.</p><p>MetasoftCo olarak bu projede güncel bir kültürel anı, yapay zeka destekli kişiselleştirme ile birleştirerek alışveriş merkezi deneyimine dijital bir oyun katmanı ekledik.</p>",
        content_en: "<h2>A Personalized Experience for the Energy of EURO 2024</h2><p>For Akmerkez, we turned the energy of the football tournament into a digital game in which visitors took the lead. Designed around the EURO 2024 theme, the experience translated the excitement of the event area into a personal moment where everyone could create their own player card.</p><p>Participants appeared as footballers on cards made with their own photos and names. The tournament-inspired visual language combined with elements such as kit, card data and stadium atmosphere to create a strong visual experience in the brand space.</p><h3>Create Your Own Player Card</h3><p>The flow began with a visitor photo. It was then adapted to the football-card concept and transformed into a personalized digital design. Each result was designed as a playful, original tournament memory participants would want to share with their social circle.</p><p>As a result, visitors did not simply follow the football conversation; they became an active part of it.</p><h3>A Shareable Tournament Memory at Akmerkez</h3><p>AI Football Card turned the collective, competitive energy of sport into an accessible brand experience. The personalized cards created quickly became an eye-catching touchpoint that visitors wanted to return to in the event area.</p><p>With this project, MetasoftCo combined a timely cultural moment with AI-assisted personalization and added a digital play layer to the shopping-centre experience.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1787058648/metasoftco/projects/presentation/akmerkez-ai-football-card.jpg",
        technologies: ["AI Football Card", "Kişiselleştirilmiş görsel"],
        order: 11,
    },
    {
        title: "Nesquik × AI Photo Child",
        title_en: "Nesquik × AI Photo Child",
        slug: "nesquik-x-ai-photo-child",
        slug_en: "nesquik-x-ai-photo-child",
        client: "Nesquik",
        category: "Yapay Zeka",
        description: "Nesquik için geliştirilen AI Photo Child deneyimi, çocukların fotoğraflarını eğlenceli ve kişiselleştirilmiş karakter görsellerine dönüştürdü.",
        description_en: "The AI Photo Child experience created for Nesquik transformed children's photos into playful, personalized character visuals.",
        content: "<h2>Çocukların Hayal Gücünü Görselleştiren AI Deneyimi</h2><p>Nesquik için geliştirdiğimiz AI Photo Child deneyiminde, çocukların enerjisini ve merak duygusunu yapay zeka destekli kişisel karakter görselleriyle bir araya getirdik. Standart bir fotoğraf çekiminden yola çıkan aktivasyon, her çocuğun kendisini eğlenceli bir hikâyenin içinde görmesini sağladı.</p><p>Markanın neşeli ve oyunbaz dünyasına uyarlanan görsel dil, çocukların fotoğraflarını özgün karakter portrelerine dönüştürdü. Böylece deneyim hem çocuklar hem de aileleri için ekranda izlenen, konuşulan ve hatırlanan özel bir ana dönüştü.</p><h3>Fotoğraftan Karakter Portresine</h3><p>Katılımcının fotoğrafı alındıktan sonra yapay zeka destekli üretim akışı devreye girdi. Görsel, yüz ifadesini ve kişisel özellikleri koruyan karakter estetiğiyle yeniden yorumlandı; sonuçta Nesquik dünyasına ait ama her katılımcıya özel bir portre ortaya çıktı.</p><p>Bu süreç, çocuklara teknolojiyi uzaktan izlenen bir araç olarak değil, yaratıcılıklarını besleyen bir oyun alanı olarak deneyimleme imkânı sundu.</p><h3>Aileler İçin Paylaşılabilir, Çocuklar İçin Unutulmaz</h3><p>Ortaya çıkan kişiselleştirilmiş görseller, ailelerin saklamak ve paylaşmak isteyeceği sıcak bir marka hatırası yarattı. Aktivasyon alanı, fotoğraf çekiminin ötesinde çocukların sıraya girip kendi karakterlerini merakla beklediği canlı bir deneyim noktasına dönüştü.</p><p>MetasoftCo olarak bu projede çocuk odaklı bir marka iletişimini, güvenli ve eğlenceli bir yapay zeka görsel deneyimiyle buluşturduk.</p>",
        content_en: "<h2>An AI Experience That Visualizes Children's Imaginations</h2><p>For Nesquik, we brought together children's energy and curiosity with AI-assisted personal character visuals. Starting with a simple photo moment, the activation let every child see themselves inside a playful story.</p><p>A visual language tailored to the brand's cheerful, playful world transformed each photo into an original character portrait. The result became a special moment that children and their families could watch, talk about and remember.</p><h3>From Photo to Character Portrait</h3><p>Once a participant photo was captured, the AI-assisted generation flow began. The visual was reinterpreted in a character aesthetic that retained expression and individual traits, producing a portrait that belonged to the Nesquik world while remaining unique to every participant.</p><p>The process gave children a way to experience technology not as something observed from afar, but as a playground for creativity.</p><h3>Shareable for Families, Unforgettable for Children</h3><p>The personalized visuals created a warm brand keepsake that families could keep and share. The activation became a lively experience point where children eagerly waited to discover their own character.</p><p>With this project, MetasoftCo brought a child-focused brand message together with a safe, playful AI visual experience.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705140/metasoftco/projects/presentation/nesquik-ai-photo-child.png",
        technologies: ["AI Photo Child", "Kişiselleştirilmiş portre"],
        order: 12,
    },
    {
        title: "Allianz × AI Greenbox",
        title_en: "Allianz × AI Greenbox",
        slug: "allianz-x-ai-greenbox",
        slug_en: "allianz-x-ai-greenbox",
        client: "Allianz",
        category: "Yapay Zeka",
        description: "Allianz'ın “Ada'nın Yıldızı” deneyiminde katılımcılar, markaya özel görsel dünyada kişiselleştirilmiş portrelerini oluşturdu.",
        description_en: "In Allianz's “Star of the Island” experience, participants created personalized portraits in a brand-specific visual world.",
        content: "<h2>Markanın Görsel Dünyasında Kişisel Bir Başrol</h2><p>Allianz'ın “Ada'nın Yıldızı” kurgusu için hazırladığımız AI Greenbox deneyiminde, katılımcıları markaya özel tasarlanmış güçlü bir görsel dünyanın içine taşıdık. Aktivasyon, sıradan bir arka plan değişiminden çok daha fazlası olarak kurgulandı; her ziyaretçiye kendi hikâyesinin yıldızı olma hissini yaşatan kişiselleştirilmiş bir portre deneyimi sundu.</p><p>Allianz'ın mavi tonları, yıldız detayları ve deneyimin kampanya dili bir araya getirilerek tutarlı bir sahne oluşturuldu. Katılımcının portresi bu sahneye yapay zeka destekli olarak yerleştirildiğinde, ortaya hem marka karakterini hem de kişinin kendisini taşıyan özel bir görsel çıktı.</p><h3>AI Greenbox ile Anında Dönüşüm</h3><p>Deneyim alanında alınan katılımcı fotoğrafı, markaya özel görsel dünya ile birleştirildi. Yapay zeka destekli kompozisyon, kişiyi yapay bir kolajın içinde kaybetmeden, sahnenin doğal bir parçası haline getirecek şekilde kurgulandı.</p><p>Bu akış sayesinde ziyaretçiler kendi kişiselleştirilmiş sonuçlarını kısa sürede görüntüledi; teknoloji arka planda çalışırken deneyimin odağında katılımcının kendisi kaldı.</p><h3>Paylaşılabilir Kampanya Anısı</h3><p>“Ada'nın Yıldızı” deneyimi, kampanya temasını tek yönlü bir iletişim olmaktan çıkararak ziyaretçinin dâhil olduğu bir marka hikâyesine dönüştürdü. Üretilen portreler, etkinlik sonrasında da paylaşılabilen ve hatırlanabilen bir temas yarattı.</p><p>MetasoftCo olarak bu projede AI Greenbox teknolojisini Allianz'ın görsel kimliğiyle birleştirerek, kampanya iletişimini insan odaklı dijital bir deneyime dönüştürdük.</p>",
        content_en: "<h2>A Personal Leading Role in the Brand's Visual World</h2><p>For Allianz's “Star of the Island” concept, we used AI Greenbox to take participants into a powerful visual world designed specifically for the brand. The activation was conceived as more than a background replacement: it offered a personalized portrait experience that made every visitor feel like the star of their own story.</p><p>Allianz blue, star details and the campaign language were brought together to create a coherent stage. When a participant's portrait was placed in this scene through AI-assisted composition, the outcome carried both the brand character and the individual.</p><h3>Instant Transformation with AI Greenbox</h3><p>A participant photo taken in the experience area was combined with the brand's bespoke visual world. The AI-assisted composition was designed to make the person feel like a natural part of the scene rather than lost in an artificial collage.</p><p>Visitors saw their personalized result quickly; while technology worked in the background, the participant remained at the centre of the experience.</p><h3>A Shareable Campaign Memory</h3><p>“Star of the Island” transformed the campaign theme from one-way communication into a brand story that visitors could join. The generated portraits created a touchpoint that could be shared and remembered after the event.</p><p>With this project, MetasoftCo combined AI Greenbox technology with Allianz's visual identity to turn campaign communication into a people-centred digital experience.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705143/metasoftco/projects/presentation/allianz-ai-greenbox.png",
        technologies: ["AI Greenbox", "Markaya özel arka plan"],
        order: 13,
    },
    {
        title: "Ray-Ban × Strip Photo",
        title_en: "Ray-Ban × Strip Photo",
        slug: "ray-ban-x-strip-photo",
        slug_en: "ray-ban-x-strip-photo",
        client: "Ray-Ban",
        category: "Fotoğraf Aktiviteleri",
        description: "Ray-Ban etkinliğinde katılımcılar, marka atmosferine uyarlanan şerit fotoğraf formatıyla anılarını yanlarında taşıdı.",
        description_en: "At the Ray-Ban event, participants took their memories with them in a photo-strip format tailored to the brand atmosphere.",
        content: "<h2>Ray-Ban Ruhunu Taşıyan Şerit Fotoğraf Deneyimi</h2><p>Ray-Ban etkinliği için hazırladığımız Strip Photo aktivasyonunda, markanın cesur ve sosyal enerjisini klasik fotoğraf şeridi formatıyla buluşturduk. Katılımcılar, etkinliğin atmosferini yansıtan bir sahnede arkadaşlarıyla birlikte poz verirken, her çekim Ray-Ban dünyasına ait bir hatıraya dönüştü.</p><p>Kompakt ve anında anlaşılabilen format sayesinde Strip Photo alanı, etkinliğin doğal buluşma noktalarından biri oldu. Birden fazla kareden oluşan şeritler, katılımcılara tek bir poz yerine o anın enerjisini ve arkadaşlık duygusunu taşıyan kısa bir görsel seri sundu.</p><h3>Markaya Özel Fotoğraf Akışı</h3><p>Çekim deneyimi, Ray-Ban'in görsel diliyle uyumlu alan ve baskı tasarımıyla desteklendi. Katılımcılar fotoğraf serilerini oluştururken markanın etkinlikteki görünürlüğü, doğrudan katılımcının ürettiği içerikle bütünleşti.</p><p>Şerit formatı, fiziksel çıktının paylaşılması ve saklanması için pratik bir hatıra sunarken; etkinlik alanında tekrar tekrar deneyimlenmek istenen eğlenceli bir ritim yarattı.</p><h3>Etkinlikten Yanında Götürülen Stil</h3><p>Strip Photo, fotoğrafı yalnızca kaydedilen bir an olmaktan çıkarıp stil sahibi bir etkinlik objesine dönüştürdü. Katılımcılar, markayla kurdukları teması fiziksel olarak yanlarında taşıyabilecekleri bir formatta deneyimledi.</p><p>MetasoftCo olarak bu projede zamansız photobooth formatını Ray-Ban'in karakterine uyarlayarak, yüksek etkileşimli ve doğal biçimde paylaşılabilir bir marka anısı tasarladık.</p>",
        content_en: "<h2>A Photo-Strip Experience with Ray-Ban Spirit</h2><p>For the Ray-Ban event, we paired the brand's bold, social energy with the classic photo-strip format. Participants posed with friends on a setting that reflected the event atmosphere, and every capture became a keepsake belonging to the Ray-Ban world.</p><p>Its compact, immediately understandable format made the Strip Photo area a natural meeting point at the event. Instead of a single pose, the multi-frame strips captured the energy of the moment and the feeling of being together as a short visual series.</p><h3>A Brand-Specific Photo Flow</h3><p>The capture experience was supported by an event space and print design aligned with Ray-Ban's visual language. As participants made their photo series, brand visibility became part of the content created by the participants themselves.</p><p>While the strip format offered a practical physical keepsake to share and keep, it also created a playful rhythm people wanted to experience again and again in the event area.</p><h3>Style to Take Away from the Event</h3><p>Strip Photo turned photography from a recorded moment into a stylish event object. Participants experienced their connection with the brand in a format they could physically carry away.</p><p>With this project, MetasoftCo adapted a timeless photobooth format to Ray-Ban's character and designed a highly engaging, naturally shareable brand memory.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705144/metasoftco/projects/presentation/ray-ban-strip-photo.jpg",
        technologies: ["Strip Photo", "Anında baskı"],
        order: 14,
    },
    {
        title: "Corny × Photobooth",
        title_en: "Corny × Photobooth",
        slug: "corny-x-photobooth",
        slug_en: "corny-x-photobooth",
        client: "Corny",
        category: "Fotoğraf Aktiviteleri",
        description: "Corny'nin açık hava etkinliğinde, markaya özel kurulan photobooth alanı katılımcıların eğlenceli anlarını fotoğraf hatırasına dönüştürdü.",
        description_en: "At Corny's outdoor event, a custom photobooth area turned participants' fun moments into photo keepsakes.",
        content: "<h2>Açık Havada Markalı Bir Buluşma Noktası</h2><p>Corny'nin açık hava etkinliği için kurduğumuz photobooth alanında, markanın enerjisini katılımcıların birlikte ürettiği anılara dönüştürdük. Etkinliğin sosyal temposuna uyum sağlayan deneyim noktası, ziyaretçilerin arkadaşlarıyla buluştuğu, poz verdiği ve etkinliğin enerjisini fotoğrafa taşıdığı görünür bir alan yarattı.</p><p>Markaya özel sahne tasarımı, çekim anını yalnızca teknik bir fotoğraf üretimi olmaktan çıkararak Corny dünyasının içinden bir deneyime dönüştürdü. Renkler, arka plan ve alan kurgusu katılımcıların karelerinde doğal biçimde yer alırken, marka her paylaşımın bir parçası oldu.</p><h3>Photobooth ile Kolay ve Akıcı Deneyim</h3><p>Katılımcılar çekim alanına geldiklerinde, kısa ve anlaşılır bir akışla kendi fotoğraflarını oluşturdu. Grup çekimlerine uygun düzen, etkinliğin spontan yapısını destekledi; arkadaş gruplarının aynı deneyim çevresinde bir araya gelmesini sağladı.</p><p>Bu yaklaşım, yüksek tempolu açık hava etkinliklerinde bile herkesin zahmetsizce dâhil olabileceği erişilebilir bir etkileşim modeli sundu.</p><h3>Marka Görünürlüğünü Hatıraya Dönüştürmek</h3><p>Ortaya çıkan fotoğraflar, katılımcılar için etkinliğin sıcak bir hatırası olurken Corny için de deneyim üzerinden kurulan doğal bir görünürlük yarattı. Marka, izlenen bir mesaj yerine katılımcıların kendilerinin ürettiği içerikte yer aldı.</p><p>MetasoftCo olarak bu projede açık hava aktivasyonunun enerjisini, markalı sahne tasarımı ve photobooth deneyimiyle birleştirerek canlı, paylaşılabilir ve insani bir temas noktası oluşturduk.</p>",
        content_en: "<h2>A Branded Outdoor Meeting Point</h2><p>For Corny's outdoor event, we turned the brand's energy into memories created together by participants. Built for the social rhythm of the event, the experience point created a visible space where visitors met friends, posed and carried the event energy into photos.</p><p>The bespoke set design made the capture more than a technical photo production and turned it into an experience from inside the Corny world. Colour, backdrop and spatial design appeared naturally in participant images, making the brand part of every share.</p><h3>An Easy, Fluid Photobooth Experience</h3><p>When participants arrived at the photo area, they created their own shots through a quick, intuitive flow. A setup suitable for group photos supported the spontaneous nature of the event and brought friend groups together around the same experience.</p><p>This approach offered an accessible interaction model that people could join effortlessly, even in the fast pace of an outdoor event.</p><h3>Turning Brand Visibility into a Keepsake</h3><p>The resulting photos became warm memories of the event for participants while creating natural, experience-led visibility for Corny. The brand appeared in content made by participants themselves rather than in a message simply viewed by them.</p><p>With this project, MetasoftCo combined the energy of an outdoor activation with branded set design and a photobooth experience to create a lively, shareable, human touchpoint.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705146/metasoftco/projects/presentation/corny-photobooth.jpg",
        technologies: ["Photobooth", "Markalı sahne tasarımı"],
        order: 15,
    },
    {
        title: "AME'28 × Glow Box",
        title_en: "AME'28 × Glow Box",
        slug: "ame28-x-glow-box",
        slug_en: "ame28-x-glow-box",
        client: "AME'28",
        category: "Fotoğraf Aktiviteleri",
        description: "Işık tüneli estetiğiyle tasarlanan Glow Box deneyimi, AME'28 katılımcılarına güçlü bir sahne ve anında fotoğraf çıktısı sundu.",
        description_en: "Designed with a light-tunnel aesthetic, the Glow Box experience gave AME'28 participants a striking setting and instant photo prints.",
        content: "<h2>Işıkla Tasarlanan Etkinlik Portresi</h2><p>AME'28 için hazırladığımız Glow Box deneyiminde, ışık çizgileriyle çevrelenen derinlikli bir fotoğraf sahnesi kurduk. Bu sahne, katılımcıları yalnızca fotoğrafı çekilen kişiler olmaktan çıkarıp etkinliğin güçlü görsel dilinin bir parçası haline getirdi.</p><p>Siyah zemin üzerinde uzayan ışık perspektifi, her kareye sahne etkisi kazandırdı. Işığın yarattığı derinlik ve kontrast, deneyimin hem fiziksel alanını hem de katılımcıların aldığı fotoğraf çıktısını daha çarpıcı hale getirdi.</p><h3>Glow Box Sahnesinde Katılımcı Deneyimi</h3><p>Katılımcılar ışık tüneli estetiğine sahip bu özel alanda tek başına veya arkadaşlarıyla fotoğraf çektirdi. Minimal ama güçlü sahne tasarımı sayesinde, farklı pozlar ve grup kareleri tutarlı bir görsel kaliteyle buluştu.</p><p>Alan, etkinlik içindeki akışa uyum sağlayacak şekilde tasarlandı; katılımcılar deneyimi kolayca anlayıp kısa sürede kendi karelerini oluşturabildi.</p><h3>Anında Baskıyla Tamamlanan Hatıra</h3><p>Çekimler, AME'28 tasarımıyla tamamlanan fiziksel fotoğraf çıktısına dönüştürüldü. Böylece dijital görsel deneyim, etkinlikten sonra da saklanabilecek somut bir hatırayla tamamlandı.</p><p>MetasoftCo olarak Glow Box ile etkinlik mekânını bir fotoğraf stüdyosuna dönüştürürken, ışık ve baskı teknolojisini bir araya getirerek güçlü, premium ve paylaşılabilir bir marka deneyimi kurguladık.</p>",
        content_en: "<h2>An Event Portrait Designed with Light</h2><p>For AME'28, we built a dimensional photo scene surrounded by lines of light with our Glow Box experience. The setting moved participants beyond simply having their photo taken and made them part of the event's strong visual language.</p><p>The extending light perspective over a black background gave every frame a staged quality. Its depth and contrast made both the physical experience area and the final photo output more striking.</p><h3>The Participant Experience on the Glow Box Set</h3><p>Participants had their photos taken alone or with friends in this custom area inspired by a light-tunnel aesthetic. The minimal yet powerful set design enabled different poses and group shots to achieve a consistent visual quality.</p><p>The area was designed to fit the rhythm of the event, so visitors could understand the experience easily and create their own shots in a short time.</p><h3>A Keepsake Completed with Instant Print</h3><p>Captures were transformed into physical photo outputs finished with AME'28 design. The digital visual experience was therefore completed with a tangible keepsake that could live on after the event.</p><p>With Glow Box, MetasoftCo turned the event venue into a photo studio and combined light with print technology to create a strong, premium and shareable brand experience.</p>",
        image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1786705147/metasoftco/projects/presentation/ame28-glow-box.png",
        technologies: ["Glow Box", "Anında fotoğraf baskısı"],
        order: 16,
    },
];

async function main() {
    for (const project of projects) {
        const data = {
            ...project,
            technologies: JSON.stringify(project.technologies),
            gallery: JSON.stringify([{ url: project.image, alt: project.title }]),
            metaTitle: `${project.title} | MetasoftCo`,
            metaDescription: project.description,
            metaTitle_en: `${project.title_en} | MetasoftCo`,
            metaDescription_en: project.description_en,
            published: true,
        };

        await prisma.project.upsert({
            where: { slug: project.slug },
            create: data,
            update: data,
        });
        console.log(`✓ ${project.title}`);
    }
}

main()
    .then(async () => {
        await pool.end();
        console.log(`\n${projects.length} sunum projesi eklendi/güncellendi.`);
    })
    .catch(async (error) => {
        await pool.end();
        console.error(error);
        process.exit(1);
    });
