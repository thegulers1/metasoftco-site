"use client";

import { MsVideo, isWideVideo } from "@/components/site-ms/interactive";
import styles from "./ai-photobooth.module.css";

export default function AiPhotoboothVideo({
  src,
  poster,
}: {
  src: string;
  poster: string | null;
}) {
  return (
    <div
      id="deneyim-videosu"
      className={`${styles.video} ${isWideVideo(src) ? styles.videoWide : styles.videoPortrait}`}
    >
      <MsVideo
        src={src}
        title="AI Photobooth etkinlik deneyimi videosu"
        poster={poster}
        fill
      />
    </div>
  );
}
