import Container from "./site/Container";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-black/10">
            <Container>
                <div className="flex flex-col gap-3 py-10 text-sm text-black/70">
                    <div className="flex items-center justify-between">
                        <span>© {new Date().getFullYear()} MetasoftCo</span>
                        <span>İstanbul</span>
                    </div>
                    <p className="max-w-2xl">
                        Etkinlik deneyimleri, photobooth çözümleri, interaktif oyunlar ve yapay
                        zeka tabanlı içerik üretimi.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
