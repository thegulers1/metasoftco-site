"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../ai-photobooth/ai-photobooth.module.css";
import extra from "./product-detail.module.css";

export default function ProductGallery({
  images,
  video,
  name,
  portrait = false,
}: {
  images: { url: string; alt: string }[];
  video: string | null;
  /** Product name used in the accessible labels. */
  name: string;
  /** 2:3 portrait photos: show the whole frame instead of a cropped cover. */
  portrait?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [warm, setWarm] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLIFrameElement>(null);
  const youtube = video?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]+)/,
  )?.[1];
  // Portrait galleries mount the player hidden once the page is idle, so the
  // video thumbnail starts playback instantly instead of loading YouTube on click.
  useEffect(() => {
    if (!portrait || !youtube) return;
    const id = window.setTimeout(() => setWarm(true), 1200);
    return () => window.clearTimeout(id);
  }, [portrait, youtube]);
  const command = (func: "playVideo" | "pauseVideo") =>
    player.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube-nocookie.com",
    );
  if (!images.length) return null;
  return (
    <div className={`${styles.gallery} ${portrait ? extra.portrait : ""}`}>
      <div className={styles.mainPhoto}>
        {portrait && youtube && (playing || warm) && (
          <iframe
            ref={player}
            onLoad={() => playing && command("playVideo")}
            className={playing ? extra.player : extra.playerHidden}
            src={`https://www.youtube-nocookie.com/embed/${youtube}?enablejsapi=1&playsinline=1`}
            title={`${name} kullanım videosu`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
        {playing && youtube && !portrait ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1`}
            title={`${name} kullanım videosu`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => dialog.current?.showModal()}
            aria-label="Seçili görseli büyüt"
          >
            {portrait ? (
              // Every frame is mounted up front so switching is instant.
              images.slice(0, 5).map((image, i) => (
                <Image
                  key={`${image.url}-${i}`}
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority={i === 0}
                  loading="eager"
                  data-active={i === index}
                  sizes="(max-width: 700px) 100vw, (max-width: 1150px) 48vw, 34vw"
                />
              ))
            ) : (
              <Image
                src={images[index].url}
                alt={images[index].alt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, (max-width: 1150px) 48vw, 34vw"
              />
            )}
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
              if (playing) command("pauseVideo");
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
            onClick={() => {
              setPlaying(true);
              if (portrait) {
                setWarm(true);
                command("playVideo");
              }
            }}
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
        aria-label={`${name} büyük görsel`}
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
