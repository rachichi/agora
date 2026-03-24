import type { ActiveOfficial, Borough, FeedItem, RecentDecision, ThreadComment, ThreadDetail } from "./types";

const astoriaBody = [
  "Community Board 4 voted 14–9 against it last Tuesday, but the final call rests with City Council. Before I vote, I want to hear from Queens residents directly.",
  "The board's resolution notes that the project would fund two new ferry landings, expand waterfront public access, and require 30% permanently affordable housing in adjacent rezoned parcels.",
  "Mayor Mamdani's office posted the discussion summary from the March 22 meeting so residents can review what was said before the City Council hearing next month.",
];

export const BOROUGHS: Borough[] = [
  "ALL NYC",
  "MANHATTAN",
  "BROOKLYN",
  "QUEENS",
  "THE BRONX",
  "STATEN ISLAND",
  "ROOSEVELT ISLAND",
];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "astoria-casino",
    accent: "blue",
    badge: "official",
    fromMinutes: true,
    author: { initials: "ZM", name: "Zohran Mamdani", role: "NYC Mayor" },
    headline: "Should the city approve the Astoria waterfront casino proposal?",
    snippet:
      "CB4 voted 14–9 against it last Tuesday, but the final call rests with City Council. Before I vote, I want to hear from Queens reside…",
    tags: ["QUEENS", "ZONING"],
    responses: 2841,
    comments: 847,
    sentimentSummary: "41% oppose",
    sentiment: [
      { label: "Support", percent: 38, tone: "support" },
      { label: "Neutral", percent: 21, tone: "neutral" },
      { label: "Oppose", percent: 41, tone: "oppose" },
    ],
    daysLeft: 3,
    boroughs: ["ALL NYC", "QUEENS"],
  },
  {
    id: "mta-bus-cuts",
    accent: "blue",
    badge: "official",
    fromMinutes: false,
    author: { initials: "LR", name: "Linda Rosenthal", role: "NY Assembly, D67" },
    headline: "The MTA wants to cut 6 bus routes in upper Manhattan. Should Albany intervene?",
    snippet:
      "These routes serve some of the lowest-income riders in the city. I'm exploring a legislative fix — tell me if you rely on the M11, M…",
    tags: ["MANHATTAN", "TRANSIT"],
    responses: 1203,
    comments: 412,
    sentimentSummary: "78% oppose cuts",
    sentiment: [
      { label: "Support", percent: 12, tone: "support" },
      { label: "Neutral", percent: 10, tone: "neutral" },
      { label: "Oppose", percent: 78, tone: "oppose" },
    ],
    daysLeft: 6,
    boroughs: ["ALL NYC", "MANHATTAN"],
  },
  {
    id: "gowanus-housing",
    accent: "green",
    badge: "board",
    fromMinutes: true,
    author: { initials: "CB6", name: "Brooklyn Community Board 6", role: "" },
    headline: "We approved 240 units in Gowanus Phase 2 — with 30% affordable. Is that enough?",
    snippet:
      "Passed 18–6 at Tuesday's full board meeting. We're opening this thread so residents can weigh in before Phase 3 negotiations b…",
    tags: ["BROOKLYN", "HOUSING"],
    responses: 634,
    comments: 189,
    sentimentSummary: "53% want more",
    sentiment: [
      { label: "Support", percent: 30, tone: "support" },
      { label: "Neutral", percent: 17, tone: "neutral" },
      { label: "Oppose", percent: 53, tone: "oppose" },
    ],
    daysLeft: 21,
    boroughs: ["ALL NYC", "BROOKLYN"],
  },
  {
    id: "pfizer-site",
    accent: "blue",
    badge: "official",
    fromMinutes: false,
    author: { initials: "SN", name: "Sandy Nurse", role: "NYC Council, D37" },
    headline: "Should we convert the former Pfizer site in Bushwick into mixed-income housing or a manufacturing hub?",
    snippet:
      "The site has been vacant for 11 years. Two proposals are on the table — I want the community to weigh in before the land use c…",
    tags: ["BROOKLYN", "LAND USE"],
    responses: 891,
    comments: 303,
    sentimentSummary: "54% housing",
    sentiment: [
      { label: "Support", percent: 54, tone: "support" },
      { label: "Neutral", percent: 16, tone: "neutral" },
      { label: "Oppose", percent: 30, tone: "oppose" },
    ],
    daysLeft: 11,
    boroughs: ["ALL NYC", "BROOKLYN"],
  },
  {
    id: "casino-revisit",
    accent: "amber",
    badge: "board",
    fromMinutes: true,
    author: { initials: "CB4", name: "Queens Community Board 4", role: "" },
    headline: "We rejected the casino 14–9 — but should we revisit in 90 days as the motion allows?",
    snippet:
      "Several members want to reopen the question with revised traffic and addiction impact studies in hand. What does the communi…",
    tags: ["QUEENS", "ZONING"],
    responses: 522,
    comments: 211,
    sentimentSummary: "47% say no revisit",
    sentiment: [
      { label: "Support", percent: 34, tone: "support" },
      { label: "Neutral", percent: 19, tone: "neutral" },
      { label: "Oppose", percent: 47, tone: "oppose" },
    ],
    daysLeft: 14,
    boroughs: ["ALL NYC", "QUEENS"],
  },
  {
    id: "eviction-protections",
    accent: "blue",
    badge: "official",
    fromMinutes: false,
    author: { initials: "JS", name: "Julia Salazar", role: "NY Senate, D18" },
    headline: "Good cause eviction protections are expiring in June. Should Albany renew and expand them?",
    snippet:
      "The current law covers roughly 400,000 NYC tenants. Landlord groups are pushing hard against renewal. Tenants — I need to h…",
    tags: ["BROOKLYN", "HOUSING", "TENANT RIGHTS"],
    responses: 1740,
    comments: 598,
    sentimentSummary: "71% support renewal",
    sentiment: [
      { label: "Support", percent: 71, tone: "support" },
      { label: "Neutral", percent: 11, tone: "neutral" },
      { label: "Oppose", percent: 18, tone: "oppose" },
    ],
    daysLeft: 2,
    boroughs: ["ALL NYC", "BROOKLYN"],
  },
  {
    id: "red-hook-resilience",
    accent: "blue",
    badge: "official",
    fromMinutes: false,
    author: { initials: "AA", name: "Alexa Avilés", role: "NYC Council, D38" },
    headline: "Should Red Hook get priority status for the city's coastal resilience funding?",
    snippet:
      "The neighborhood flooded twice in 18 months. I'm pushing for a dedicated allocation in the capital budget — but I need commun…",
    tags: ["BROOKLYN", "CLIMATE"],
    responses: 477,
    comments: 142,
    sentimentSummary: "82% support",
    sentiment: [
      { label: "Support", percent: 82, tone: "support" },
      { label: "Neutral", percent: 9, tone: "neutral" },
      { label: "Oppose", percent: 9, tone: "oppose" },
    ],
    daysLeft: 18,
    boroughs: ["ALL NYC", "BROOKLYN"],
  },
];

export const ACTIVE_OFFICIALS: ActiveOfficial[] = [
  { initials: "ZM", name: "Zohran Mamdani", role: "NYC Mayor", topics: 3 },
  { initials: "LR", name: "Linda Rosenthal", role: "NY Assembly, D67", topics: 1 },
  { initials: "SN", name: "Sandy Nurse", role: "NYC Council, D37", topics: 1 },
  { initials: "JS", name: "Julia Salazar", role: "NY Senate, D18", topics: 1 },
  { initials: "AA", name: "Alexa Avilés", role: "NYC Council, D38", topics: 1 },
];

export const RECENT_DECISIONS: RecentDecision[] = [
  { id: "gowanus-housing", title: "Gowanus Phase 2 — 240 units approved", board: "Brooklyn CB6", date: "Mar 19" },
  { id: "casino-revisit", title: "Astoria casino rejected 14–9", board: "Queens CB4", date: "Mar 18" },
  { id: "pfizer-site", title: "Bushwick land-use hearing scheduled", board: "Brooklyn CB4", date: "Mar 15" },
];

function feedToThread(item: FeedItem): ThreadDetail {
  if (item.id === "astoria-casino") {
    return {
      ...item,
      postedAt: "Mar 22, 2026",
      openUntil: "Open for 3 more days",
      body: astoriaBody,
      minutesLink: {
        label: "Read the full CB4 meeting minutes from Mar 22",
        href: "https://www.nyc.gov/site/planning/index.page",
      },
      zipStats: [
        { code: "11102", share: 100 },
        { code: "11103", share: 88 },
        { code: "11106", share: 72 },
        { code: "11101", share: 54 },
        { code: "11105", share: 40 },
      ],
      related: [
        { id: "casino-revisit", title: "CB4 casino revisit motion", meta: "Queens CB4 · 522 responses" },
        { id: "mta-bus-cuts", title: "MTA bus route cuts", meta: "Manhattan · 1,203 responses" },
        { id: "gowanus-housing", title: "Gowanus Phase 2 affordability", meta: "Brooklyn CB6 · 634 responses" },
      ],
      sourceDoc: {
        title: "CB4 Meeting Minutes",
        date: "March 22, 2026",
        location: "Astoria, Queens",
        resolution: "The board voted to recommend approval pending Council review of the community benefits agreement.",
        href: "https://opendata.cityofnewyork.us/",
      },
    };
  }

  return {
    ...item,
    postedAt: "Mar 20, 2026",
    openUntil: `Open for ${item.daysLeft} more days`,
    body: [
      item.snippet,
      "Additional context from meeting notes will appear here as it is verified and published.",
    ],
    minutesLink: {
      label: "View related meeting materials",
      href: "https://www.nyc.gov/",
    },
    zipStats: [
      { code: "11201", share: 70 },
      { code: "10001", share: 55 },
      { code: "10451", share: 40 },
    ],
    related: FEED_ITEMS.filter((f) => f.id !== item.id).slice(0, 3).map((f) => ({
      id: f.id,
      title: f.headline.replace(/\?$/, ""),
      meta: `${f.tags[0]} · ${f.responses.toLocaleString()} responses`,
    })),
    sourceDoc: {
      title: "Meeting minutes (summary)",
      date: "2026",
      location: "NYC",
      resolution: "See full minutes for the official record.",
      href: "https://opendata.cityofnewyork.us/",
    },
  };
}

export function getThreadById(id: string): ThreadDetail | undefined {
  const item = FEED_ITEMS.find((f) => f.id === id);
  if (!item) {
    return undefined;
  }
  return feedToThread(item);
}

export const THREAD_COMMENTS: ThreadComment[] = [
  {
    id: "c1",
    anonLabel: "Anon #1",
    residentMeta: "Astoria resident, 14 years",
    stance: "Opposes",
    timeAgo: "2h ago",
    text: "The traffic study doesn't account for weekend gridlock near the Triboro. We need guarantees on mitigation before any vote.",
    upvotes: 214,
    officialReply: {
      author: "Zohran Mamdani",
      text: "Thanks — DOT will publish an updated weekend model before the hearing. I've asked the agency to hold a walkthrough on 31st St.",
    },
  },
  {
    id: "c2",
    anonLabel: "Anon #2",
    residentMeta: "Long Island City, 11101",
    stance: "Supports",
    timeAgo: "5h ago",
    text: "The community benefits package funds two schools and the ferry landings. That's more than we usually get from waterfront deals.",
    upvotes: 98,
  },
  {
    id: "c3",
    anonLabel: "Anon #3",
    residentMeta: "Ditmars, 11105",
    stance: "Undecided",
    timeAgo: "1d ago",
    text: "I want to see binding affordability numbers on the adjacent parcels, not just the headline 30%.",
    upvotes: 76,
  },
];
