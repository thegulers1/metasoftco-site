"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/** A failed CDN resize must not leave the selected gallery photo blank. */
export default function ServiceImage(props: ImageProps) {
  const [original, setOriginal] = useState<string | null>(null);
  const src = typeof props.src === "string" ? props.src : null;
  return (
    <Image
      {...props}
      alt={props.alt}
      unoptimized={props.unoptimized || (src !== null && original === src)}
      onError={(event) => {
        if (src) setOriginal(src);
        props.onError?.(event);
      }}
    />
  );
}
