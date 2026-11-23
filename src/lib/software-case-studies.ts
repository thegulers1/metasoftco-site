/** Summaries of the existing published case copy; no inferred commercial results. */
export const softwareCaseStudies: Record<string, {
    need: string;
    solution: string;
    evidence: string;
    services: string[];
}> = {
    'become-hacker': {
        need: 'Siber güvenlik eğitimini kısa dersler ve katılımcıyı ilerleten bir öğrenme akışıyla sunmak.',
        solution: 'Quiz, ders, XP ve seviye mekaniklerini birleştiren cross-platform mobil uygulama geliştirdik.',
        evidence: 'iOS ve Android için geliştirilen uygulamanın mağaza bağlantılarını aşağıda inceleyebilirsiniz. Yayıncı hesabı iş ortağımıza ait.',
        services: ['mobil-uygulama-gelistirme', 'oyun-ve-egitim-uygulamalari'],
    },
    zekai: {
        need: 'Farklı mantık oyunlarını tek uygulamada, ortak bir ilerleme deneyimiyle bir araya getirmek.',
        solution: 'Sudoku, Kelime Avı, Queens, Tango ve Zip oyunlarını; günlük görevler, XP ve başarımlarla birlikte geliştirdik.',
        evidence: 'iOS ve Android sürümleri, ortak oyun ve ilerleme akışını sunuyor. Mağaza bağlantıları aşağıda; yayıncı hesabı iş ortağımıza ait.',
        services: ['oyun-ve-egitim-uygulamalari', 'mobil-uygulama-gelistirme'],
    },
    mysticsip: {
        need: 'Fotoğraf ve kullanıcı girdilerini kişiselleştirilmiş bir mobil yapay zekâ deneyimine dönüştürmek.',
        solution: 'Fincan fotoğrafı analizi, interaktif tarot ve rüya yorumunu aynı mobil uygulamada birleştirdik.',
        evidence: 'Fotoğraf analizi ve kişiselleştirilmiş yorum üretimi aynı kullanıcı akışında çalışıyor. Uygulama iş ortağımızın geliştirici hesabından yayımlanıyor.',
        services: ['yapay-zeka-entegrasyonu', 'mobil-uygulama-gelistirme'],
    },
    'enerjisa-quiz-uygulamasi': {
        need: 'Etkinlik katılımcılarına tercihlerine uygun bir deneyim ve kişiselleştirilmiş program sunmak.',
        solution: 'Kayıt formu, sekiz soruluk profilleme akışı, persona eşleştirmesi ve yönetim paneli geliştirdik.',
        evidence: 'Proje kapsamındaki panel, katılımcı yanıtlarını takip etmeyi ve Excel çıktısı almayı sağlıyor.',
        services: ['web-uygulamasi-ve-yonetim-paneli-gelistirme', 'kurumsal-surec-yazilimlari'],
    },
};
