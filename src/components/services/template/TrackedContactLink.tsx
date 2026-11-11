"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function TrackedContactLink({
  href,
  ...props
}: Omit<ComponentPropsWithoutRef<"a">, "onClick"> & { href: string }) {
  return (
    <a
      {...props}
      href={href}
      onClick={() =>
        trackEvent(href.startsWith("tel:") ? "phone_click" : "whatsapp_click", {
          location: "service_detail",
        })
      }
    />
  );
}
