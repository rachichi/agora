"use client";

import Link from "next/link";
import { SiteHeader } from "@rachichi/design";

export function Navbar() {
  return (
    <SiteHeader
      title="AGORA"
      titleHref="/"
      renderLink={({ href, ...props }) =>
        href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} {...props} />
      }
    />
  );
}
