"use client";

import { useRef, useState } from "react";
import Image from "./ServiceImage";
import { MsVideo } from "@/components/site-ms/interactive";
import styles from "../ai-photobooth/ai-photobooth.module.css";
import extra from "./service-detail.module.css";

function media(url: string) {
  const video =
    /\/video\/upload\//.test(url) || /\.(mp4|mov|webm)(\?|$)/i.test(url);
  return {
    video,
    poster: /\/video\/upload\//.test(url)
      ? url
          .replace("/video/upload/", "/video/upload/so_0/")
          .replace(/\.[a-z0-9]+$/i, ".jpg")
      : null,
  };
}

/** All editor-managed images remain reachable; video supports YouTube and direct uploads. */
export default function ServiceGallery({
  images,
  video,
  title,
  locale,
}: {
  images: { url: string; alt: string }[];
  video: string | null;
  title: string;
  locale: "tr" | "en";
}) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const en = locale === "en";
  const frames = [
    ...images.map((image) => ({ ...image, ...media(image.url) })),
    ...(video && !images.some((i) => i.url === video)
      ? [
          {
            url: video,
            alt: `${title} video`,
            video: true,
            poster:
              images[0] && !media(images[0].url).video ? images[0].url : null,
          },
        ]
      : []),
  ];
  const frame = frames[selected] || frames[0];
  if (!frame) return null;
  return (
    <div className={styles.gallery}>
      <div className={`${styles.mainPhoto} ${extra.media} ${!frame.video ? styles.imagePhoto : ""}`}>
        {frame.video ? (
          <MsVideo
            key={frame.url}
            src={
              /\/video\/upload\//.test(frame.url)
                ? frame.url.replace(/\.[a-z0-9]+$/i, ".mp4")
                : frame.url
            }
            title={frame.alt}
            poster={frame.poster}
            fill
          />
        ) : (
          <button
            onClick={() => dialog.current?.showModal()}
            aria-label={en ? "Enlarge selected image" : "Seçili görseli büyüt"}
          >
            <Image
              src={frame.url}
              alt={frame.alt}
              fill
              priority
              sizes="(max-width:700px) 100vw, (max-width:1150px) 48vw, 34vw"
            />
            <span>{en ? "Enlarge image ↗" : "Görseli büyüt ↗"}</span>
          </button>
        )}
      </div>
      {frames.length > 1 && (
        <div
          className={styles.thumbnails}
          aria-label={en ? "Product media" : "Ürün görselleri"}
        >
          {frames.map((item, i) => (
            <button
              key={`${item.url}-${i}`}
              aria-label={`${en ? "Media" : "Görsel"} ${i + 1}${item.video ? " · Video" : ""}`}
              aria-pressed={selected === i}
              className={item.video ? styles.videoThumb : undefined}
              onClick={() => setSelected(i)}
            >
              {item.video ? (
                "▶ Video"
              ) : (
                <Image src={item.url} alt={item.alt} fill sizes="90px" />
              )}
            </button>
          ))}
        </div>
      )}
      <dialog ref={dialog} className={styles.dialog} aria-label={frame.alt}>
        <form method="dialog">
          <button>{en ? "Close ×" : "Görseli kapat ×"}</button>
        </form>
        {!frame.video && (
          <div>
            <Image src={frame.url} alt={frame.alt} fill sizes="95vw" />
          </div>
        )}
      </dialog>
    </div>
  );
}
