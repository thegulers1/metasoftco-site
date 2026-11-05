"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ai-photobooth.module.css";

export default function ProductGallery({
  images,
  video,
}: {
  images: { url: string; alt: string }[];
  video: string | null;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const youtube = video?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]+)/,
  )?.[1];
  if (!images.length) return null;
  return (
    <div className={styles.gallery}>
      <div className={styles.mainPhoto}>
        {playing && youtube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1`}
            title="AI Photobooth kullanım videosu"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => dialog.current?.showModal()}
            aria-label="Seçili görseli büyüt"
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              priority
              sizes="(max-width: 700px) 100vw, (max-width: 1150px) 48vw, 34vw"
            />
            <span>Görseli büyüt ↗</span>
          </button>
        )}
      </div>
      <div className={styles.thumbnails} aria-label="Ürün görselleri">
        {images.slice(0, 5).map((image, i) => (
          <button
            key={`${image.url}-${i}`}
            aria-label={`Görsel ${i + 1}`}
            aria-pressed={!playing && index === i}
            onClick={() => {
              setIndex(i);
              setPlaying(false);
            }}
          >
            <Image src={image.url} alt={image.alt} fill sizes="100px" />
          </button>
        ))}
        {youtube && (
          <button
            className={styles.videoThumb}
            aria-label="Kullanım videosunu oynat"
            aria-pressed={playing}
            onClick={() => setPlaying(true)}
          >
            ▶<span>Video</span>
          </button>
        )}
      </div>
      <p className={styles.mediaCaption}>
        Gerçek etkinlik ve uygulama görselleri · MetasoftCo
      </p>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label="AI Photobooth büyük görsel"
      >
        <form method="dialog">
          <button>Görseli kapat ×</button>
        </form>
        <div>
          <Image
            src={images[index].url}
            alt={images[index].alt}
            fill
            sizes="95vw"
          />
        </div>
      </dialog>
    </div>
  );
}
