import images from './images.json';
/** Editorial update for the existing DB record, never a runtime content override.
 * Sources and image review: docs/momento-ball-review.md.
 */
const project = '/projeler/defacto-x-momento-ball-photo';
const projectEn = '/en/projects/defacto-x-momento-ball-photo';
export const momentoBallUpdate = {
  title: 'Momento Ball Kiralama: Yılbaşı Fotoğraf Küresi',
  title_en: 'Momento Ball Rental: Personalised Photo Baubles',
  description: 'Yılbaşı etkinliğinizde çekilen fotoğraf, misafirinizin yanında götüreceği şeffaf bir fotoğraf küresine dönüşsün. Şirket partileri ve marka etkinlikleri için Momento Ball.',
  description_en: 'Turn a photo taken at your year-end event into a transparent photo bauble your guests can take home. Momento Ball for company parties and brand activations.',
  metaTitle: 'Momento Ball Kiralama | Yılbaşı Fotoğraf Küresi',
  metaTitle_en: 'Momento Ball Rental | Photo Baubles for Christmas Events',
  metaDescription: 'Yılbaşı etkinlikleri için Momento Ball kiralama: etkinlikte fotoğraf çekimi, baskı ve şeffaf fotoğraf küresi. Gerçek uygulamayı inceleyin, teklif alın.',
  metaDescription_en: 'Momento Ball rental for Christmas and year-end events: event photography, printed photos and transparent photo baubles. Explore the project and request a quote.',
  metaKeywords: 'momento ball kiralama, yılbaşı etkinlik aktivitesi, yılbaşı fotoğraf küresi, kurumsal yılbaşı etkinliği, fotoğraflı yılbaşı süsü',
  metaKeywords_en: 'momento ball rental, christmas photo bauble activation, corporate christmas party activity, year-end event photography',
  image: images[0].url,
  ogImage: images[0].url,
  gallery: JSON.stringify(images),
  dataCapture: false,
  // Physical output is explicit in the service and project; QR is also documented.
  outputType: 'print',
  specs: JSON.stringify([
    {label: 'Deneyim', value: 'Etkinlikte fotoğraf çekimi ve küre hazırlığı'},
    {label: 'Hatıra', value: 'İçinde katılımcının fotoğrafı bulunan şeffaf küre'},
    {label: 'Uyarlama', value: 'Marka logosu ve etkinlik tarihiyle fotoğraf tasarımı'},
  ]),
  specs_en: JSON.stringify([
    {label: 'Experience', value: 'On-site photography and bauble assembly'},
    {label: 'Keepsake', value: 'A transparent bauble containing the guest’s photo'},
    {label: 'Branding', value: 'Photo design with a brand logo and event date'},
  ]),
  content: `<h2>Yılbaşı etkinliğinden eve taşınan bir hatıra</h2>
<p>Momento Ball, etkinlikte çekilen fotoğrafı şeffaf bir kürenin içinde sunan fotoğraf aktivitesidir. Misafirleriniz yalnızca poz vermez; o güne ait kendi fotoğraflarını içeren fiziksel bir hatırayla ayrılır. Küre, yılbaşı ağacına asılabilen bir süs veya masa üzerinde sergilenebilen bir obje olarak kullanılabilir.</p>
<p>Kurumsal yılbaşı partileri, çalışan buluşmaları ve markaların sezon etkinlikleri için çekim deneyimi ile kişisel hediyeyi aynı noktada birleştirir. Fotoğrafın üzerinde marka logosu ve etkinlik tarihi kullanılabilir.</p>
<h2>Momento Ball nasıl hazırlanır?</h2>
<ol><li><strong>Fotoğraf çekimi:</strong> Katılımcı, etkinlik alanındaki çekim noktasında fotoğrafını çektirir.</li><li><strong>Baskı ve hazırlık:</strong> Fotoğraf basılır ve kürenin içine yerleştirilmeye hazırlanır.</li><li><strong>Küreye yerleştirme:</strong> Saha ekibi fotoğrafı şeffaf kürenin içine yerleştirir.</li><li><strong>Hatıranın teslimi:</strong> Katılımcı, fotoğraflı küresini etkinlikten yanında götürür. Çekim ve teslim akışı katılımcı sayısına göre planlanır.</li></ol>
<h2>Şirket yılbaşı partileri ve marka etkinlikleri için</h2>
<p>Şirketinizin yılbaşı partisinde bir fotoğraf köşesi, çalışan buluşmasında kişisel bir hatıra noktası veya mağaza etkinliğinde ziyaretçi aktivitesi olarak kurgulanabilir. Yılbaşı temalı fotoğraf tasarımı, marka logosu ve tarih detayları etkinlik kimliğine göre birlikte belirlenir.</p>
<p>Askı veya masaüstü kullanım tercihinizi teklif talebinde paylaşın. Küre adedi, sunum biçimi ve tasarım kapsamı etkinliğinizin ihtiyacına göre netleştirilir.</p>
<h2>Gerçek uygulama: DeFacto × Momento Ball</h2>
<p>DeFacto mağaza ve etkinlikleri için hazırlanan Momento Ball uygulamasında, katılımcıların fotoğrafları şeffaf kürelerin içinde fiziksel hatıralara dönüştürüldü. Proje, fotoğraf deneyimi ile markalı bir hatıranın nasıl bir araya geldiğini gösteriyor.</p>
<p><a href="${project}">DeFacto × Momento Ball projesini ve uygulama videosunu inceleyin →</a></p>
<h2>Yılbaşı etkinliğiniz için teklif planlaması</h2>
<p>Etkinlik tarihi, şehir ve mekân, etkinlik süresi, tahmini katılımcı sayısı ve istediğiniz küre adedini paylaşın. Çekim alanı, üretim ve teslim akışı ile marka tasarımı bu bilgiler üzerinden planlanır.</p>
<p>Küre adedi ve sunum detayları, ekip ve kurulum ihtiyaçları ile varsa dijital paylaşım talepleri teklifte ayrı ayrı netleştirilir. Katılımcı yoğunluğuna uygun bir akış için bu detayları etkinlik öncesinde birlikte belirleyelim.</p>
<p><a href="#teklif">Momento Ball için etkinliğinize özel teklif alın →</a></p>`,
  content_en: `<h2>A keepsake that goes home with your guests</h2>
<p>Momento Ball is a photo activation that presents an event photo inside a transparent bauble. Guests leave with a physical keepsake featuring their own photo. It can be hung on a Christmas tree or displayed on a desk.</p>
<p>For corporate Christmas parties, year-end celebrations and seasonal brand events, it brings an on-site photo experience and a personalised gift together. The photo design can include a brand logo and event date.</p>
<h2>How does Momento Ball work?</h2>
<ol><li><strong>Take a photo:</strong> Guests have their picture taken at the event’s photo station.</li><li><strong>Print and prepare:</strong> The photo is printed and prepared for assembly.</li><li><strong>Assemble the bauble:</strong> The on-site team places the photo inside a transparent bauble.</li><li><strong>Take it home:</strong> Guests collect their personal photo keepsake. Photography and collection are planned around expected attendance.</li></ol>
<h2>Corporate Christmas parties and brand activations</h2>
<p>Use Momento Ball as a photo corner at a company Christmas party, a keepsake station at an employee gathering or a visitor activity at a store event. A seasonal photo design, logo and date can be planned around your event identity.</p>
<p>Tell us whether you prefer hanging ornaments or desk display. Bauble quantities, presentation and design scope are agreed for your event.</p>
<h2>In practice: DeFacto × Momento Ball</h2>
<p>For DeFacto stores and events, participants’ photos were presented inside transparent baubles as physical keepsakes. The project illustrates how a photo experience can become a branded souvenir.</p>
<p><a href="${projectEn}">Explore the DeFacto × Momento Ball project and activation video →</a></p>
<h2>Plan your year-end event quote</h2>
<p>Share the date, city and venue, event duration, expected attendance and required bauble quantity. These details inform the photo area, production and collection flow, and brand design.</p>
<p>Bauble quantities, presentation, staffing and setup, plus any digital sharing requests, are confirmed in the quote. Throughput and waiting times depend on the event plan.</p>
<p><a href="#teklif">Request a Momento Ball quote for your event →</a></p>`,
  faq: JSON.stringify([
    {q: 'Momento Ball yılbaşı etkinliklerinde nasıl kullanılır?', a: 'Etkinlikte çekilen fotoğraf basılır ve şeffaf kürenin içine yerleştirilir. Katılımcı, fotoğraflı küresini hatıra olarak yanında götürür. Yılbaşı ağacına asma veya masaüstünde sergileme tercihi teklif aşamasında belirlenir.'},
    {q: 'Fotoğraf küresine marka logosu eklenebilir mi?', a: 'Evet. Fotoğraf tasarımı marka logosu ve etkinlik tarihiyle kişiselleştirilebilir. Tasarım ve sunum detayları etkinlik öncesinde birlikte netleştirilir.'},
    {q: 'Momento Ball kiralama fiyatı nasıl belirlenir?', a: 'Etkinlik tarihi, şehir ve mekân, süre, katılımcı sayısı, istenen küre adedi ve tasarım kapsamı üzerinden teklif hazırlanır. Küre adedi ile kurulum ve ekip kapsamı teklifte açıkça belirtilir.'},
    {q: 'Saatte kaç fotoğraf küresi hazırlanabilir?', a: 'Kapasite; çekim düzenine, ekip planına ve üretim akışına bağlıdır. Tahmini katılımcı sayısını ve etkinlik süresini paylaşın; üretim ve teslim akışını buna göre planlayalım.'},
    {q: 'Momento Ball daha önce nerede uygulandı?', a: 'DeFacto mağaza ve etkinlikleri için Momento Ball fotoğraf aktivasyonu gerçekleştirildi. Bu sayfadan bağlantı verilen DeFacto projesinde uygulama detaylarını ve videoyu inceleyebilirsiniz.'},
  ]),
  faq_en: JSON.stringify([
    {q: 'How does Momento Ball work at Christmas events?', a: 'An event photo is printed and placed inside a transparent bauble. Guests take their personal keepsake home. Hanging or desk-display presentation is agreed when planning the quote.'},
    {q: 'Can the photo include our brand logo?', a: 'Yes. The photo design can include a brand logo and event date. Design and presentation details are agreed before the event.'},
    {q: 'How is Momento Ball rental priced?', a: 'Quotes depend on the event date, city and venue, duration, attendance, bauble quantity and design scope. Bauble quantities, setup and staffing are specified in the quote.'},
    {q: 'How many photo baubles can be made per hour?', a: 'Capacity depends on the photography setup, staffing and production flow. Share your expected attendance and duration so that we can plan production and collection.'},
    {q: 'Where has Momento Ball been used?', a: 'Momento Ball was delivered for DeFacto stores and events. Follow the DeFacto project link on this page to explore the activation and its video.'},
  ]),
};
