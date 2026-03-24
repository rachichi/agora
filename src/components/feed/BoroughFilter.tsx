"use client";

import type { Borough } from "@/lib/types";
import { useState } from "react";

const ITEMS: Borough[] = [
  "ALL NYC",
  "MANHATTAN",
  "BROOKLYN",
  "QUEENS",
  "THE BRONX",
  "STATEN ISLAND",
  "ROOSEVELT ISLAND",
];

export function BoroughFilter() {
  const [active, setActive] = useState<Borough>("ALL NYC");

  return (
    <nav
      className="border-b border-neutral-200 bg-white"
      aria-label="Borough filter"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <ul className="-mb-px flex gap-6 overflow-x-auto py-3 text-xs font-medium tracking-wide scrollbar-none sm:gap-8 sm:text-sm">
          {ITEMS.map((b) => {
            const isActive = active === b;
            return (
              <li key={b} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActive(b);
                  }}
                  className={`whitespace-nowrap border-b-2 pb-2 transition-colors ${
                    isActive
                      ? "border-agora-red font-bold text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {b}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
