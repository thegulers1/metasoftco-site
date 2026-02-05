import Image from "next/image";

const people = [
    {
        name: "Yapay Zeka",
        image: "/people/person-1.jpg",
    },
    {
        name: "İnteraktif",
        image: "/people/person-2.jpg",
    },
    {
        name: "Fotoğraf & Video",
        image: "/people/person-3.jpg",
    },
];

export default function HeroPeople() {
    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
            {people.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-black/10">
                        <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <span className="text-base font-medium text-black underline underline-offset-4 decoration-black/30">
                        {p.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
