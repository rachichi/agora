import type { FeedItem, ThreadComment, ThreadDetail } from "./types";

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "astoria-casino",
    author: { initials: "ZM", name: "Zohran Mamdani", role: "NYC Mayor" },
    headline: "Should the city approve the Astoria waterfront casino proposal?",
    snippet:
      "CB4 voted 14–9 against it last Tuesday, but the final call rests with City Council. Before I vote, I want to hear from Queens residents.",
    tags: ["QUEENS", "ZONING"],
    postedAt: "Mar 22, 2026",
    commentCount: 847,
  },
  {
    id: "mta-bus-cuts",
    author: { initials: "LR", name: "Linda Rosenthal", role: "NY Assembly, D67" },
    headline: "The MTA wants to cut 6 bus routes in upper Manhattan. Should Albany intervene?",
    snippet:
      "These routes serve some of the lowest-income riders in the city. I'm exploring a legislative fix — tell me if you rely on the M11.",
    tags: ["MANHATTAN", "TRANSIT"],
    postedAt: "Mar 21, 2026",
    commentCount: 412,
  },
  {
    id: "gowanus-housing",
    author: { initials: "CB6", name: "Brooklyn Community Board 6", role: "" },
    headline: "We approved 240 units in Gowanus Phase 2 — with 30% affordable. Is that enough?",
    snippet:
      "Passed 18–6 at Tuesday's full board meeting. We're opening this thread so residents can weigh in before Phase 3 negotiations begin.",
    tags: ["BROOKLYN", "HOUSING"],
    postedAt: "Mar 19, 2026",
    commentCount: 189,
  },
  {
    id: "eviction-protections",
    author: { initials: "JS", name: "Julia Salazar", role: "NY Senate, D18" },
    headline: "Good cause eviction protections are expiring in June. Should Albany renew and expand them?",
    snippet:
      "The current law covers roughly 400,000 NYC tenants. Landlord groups are pushing hard against renewal. Tenants — I need to hear from you.",
    tags: ["BROOKLYN", "HOUSING", "TENANT RIGHTS"],
    postedAt: "Mar 18, 2026",
    commentCount: 598,
  },
];

export function getThreadById(id: string): ThreadDetail | undefined {
  const item = FEED_ITEMS.find((f) => f.id === id);
  if (!item) return undefined;

  const bodies: Record<string, string[]> = {
    "astoria-casino": [
      "Community Board 4 voted 14–9 against the proposal last Tuesday, but the final call rests with City Council.",
      "The project would fund two new ferry landings, expand waterfront public access, and require 30% permanently affordable housing in adjacent rezoned parcels.",
      "I'm posting this so Queens residents can share their perspective before the Council hearing next month.",
    ],
    "mta-bus-cuts": [
      "The MTA is proposing cuts to 6 bus routes in upper Manhattan, including the M11 and M4.",
      "These routes serve some of the lowest-income riders in the city. I'm exploring a legislative fix at the state level.",
      "Tell me if you rely on these routes and what the impact would be.",
    ],
    "gowanus-housing": [
      "The board voted 18–6 to approve 240 units in Phase 2 of the Gowanus rezoning, with 30% set aside as permanently affordable.",
      "We're opening this thread so residents can weigh in before Phase 3 negotiations begin.",
    ],
    "eviction-protections": [
      "Good cause eviction protections cover roughly 400,000 NYC tenants and are set to expire in June.",
      "Landlord groups are pushing hard against renewal. I need to hear directly from tenants and community members before the vote.",
    ],
  };

  return {
    ...item,
    body: bodies[item.id] ?? [item.snippet],
    sourceLink: item.id === "astoria-casino"
      ? { label: "Read the full CB4 meeting minutes from Mar 22", href: "https://www.nyc.gov/site/planning/index.page" }
      : undefined,
  };
}

export function getCommentsForThread(threadId: string): ThreadComment[] {
  const comments: Record<string, ThreadComment[]> = {
    "astoria-casino": [
      { id: "c1", text: "The traffic study doesn't account for weekend gridlock near the Triboro. We need guarantees on mitigation before any vote.", timeAgo: "2h ago" },
      { id: "c2", text: "The community benefits package funds two schools and the ferry landings. That's more than we usually get from waterfront deals.", timeAgo: "5h ago" },
      { id: "c3", text: "I want to see binding affordability numbers on the adjacent parcels, not just the headline 30%.", timeAgo: "1d ago" },
    ],
  };
  return comments[threadId] ?? [];
}
