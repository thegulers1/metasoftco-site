// Representative dashboard drawn in HTML/CSS until a real screenshot exists.
// Replace it by dropping public/data-capture/panel.(webp|png|jpg) in place.

const rows = [
    { name: "A*** Y***", company: "Kurumsal A.Ş.", time: "14:32", consent: true },
    { name: "M*** K***", company: "Perakende Ltd.", time: "14:29", consent: true },
    { name: "E*** D***", company: "Teknoloji A.Ş.", time: "14:27", consent: false },
    { name: "S*** A***", company: "Enerji Grubu", time: "14:21", consent: true },
    { name: "B*** T***", company: "Lojistik A.Ş.", time: "14:18", consent: false },
];

const bars = [22, 38, 30, 54, 72, 64, 88, 60, 46, 34];

export function PanelMockup() {
    return (
        <div className="p2-dc-panel" role="img" aria-label="Temsili müşteri paneli görseli">
            <div className="p2-dc-panel__bar">
                <span className="p2-dc-panel__live">Canlı</span>
                <span>Lansman · Data-Capture</span>
                <span className="p2-dc-panel__export">Excel / CSV ↓</span>
            </div>
            <dl className="p2-dc-panel__kpis">
                <div><dt>Toplam kayıt</dt><dd>1.284</dd></div>
                <div><dt>Pazarlama izni</dt><dd>%68</dd></div>
                <div><dt>Yoğun saat</dt><dd>14:00</dd></div>
            </dl>
            <div className="p2-dc-panel__chart" aria-hidden="true">
                {bars.map((height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                ))}
            </div>
            <div className="p2-dc-panel__ai">
                <b>AI özet</b> Kayıtların %41&apos;i 13:00–15:00 arasında geldi; en çok katılım perakende sektöründen.
            </div>
            <table className="p2-dc-panel__table">
                <thead>
                    <tr><th>Ad</th><th>Şirket</th><th>Saat</th><th>İzin</th></tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.name + row.time}>
                            <td>{row.name}</td>
                            <td>{row.company}</td>
                            <td>{row.time}</td>
                            <td>{row.consent ? "✓" : "–"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
