import Container from "@/components/site/Container";

export default function BlogPage() {
    return (
        <section className="py-32 bg-white min-h-screen">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6">
                        BLOG
                    </h1>
                    <p className="text-lg text-black/60 max-w-2xl">
                        Teknoloji, tasarım ve inovasyon üzerine düşüncelerimiz, güncel haberler ve rehberler.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black/5 rounded-3xl">
                    <p className="text-black/40 font-medium italic">
                        Yakında burada çok özel içerikler paylaşacağız. Takipte kalın!
                    </p>
                </div>
            </Container>
        </section>
    );
}
