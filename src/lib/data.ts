import type { Borough, FeedItem, ThreadComment, ThreadDetail } from "./types";

const astoriaBody = [
  "Community Board 4 voted 28–8 to recommend approval of the Astoria waterfront casino proposal, citing projected job creation and infrastructure investments tied to the development agreement.",
  "The board’s resolution notes that the project would fund two new ferry landings, expand waterfront public access, and require 30% permanently affordable housing in adjacent rezoned parcels.",
  "Mayor Mamdani’s office posted the discussion summary from the March 22 meeting so residents can review what was said before the City Council hearing next month.",
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
    author: {
      initials: "ZM",
      name: "Zohran Mamdani",
      role: "NYC Mayor",
    },
    headline: "Should the city approve the Astoria waterfront casino proposal?",
    snippet:
      "Community Board 4 voted 28–8 to recommend approval, citing jobs and infrastructure. Read the summary from the March 22 meeting before the Council hearing…",
    tags: ["QUEENS", "ZONING", "DEVELOPMENT"],
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
    id: "bus-lane-cuts",
    accent: "green",
    author: {
      initials: "ZM",
      name: "Zohran Mamdani",
      role: "NYC Mayor",
    },
    headline: "Should the city roll back 24/7 bus lane enforcement on 5 corridors?",
    snippet:
      "DOT presented options to limit camera hours on select routes. Meeting notes include community feedback from Brooklyn and Manhattan stakeholders…",
    tags: ["BROOKLYN", "MANHATTAN", "TRANSIT"],
    responses: 1922,
    comments: 412,
    sentimentSummary: "78% oppose cuts",
    sentiment: [
      { label: "Support", percent: 12, tone: "support" },
      { label: "Neutral", percent: 10, tone: "neutral" },
      { label: "Oppose", percent: 78, tone: "oppose" },
    ],
    daysLeft: 21,
    boroughs: ["ALL NYC", "BROOKLYN", "MANHATTAN"],
  },
  {
    id: "open-streets",
    accent: "amber",
    author: {
      initials: "ER",
      name: "Erica Richardson",
      role: "Queens Borough President",
    },
    headline: "Extend Open Streets on 34th Ave through winter weekends?",
    snippet:
      "CB3 requested a pilot extension with traffic mitigation on cross streets. Notes from the town hall include merchant concerns and parent survey results…",
    tags: ["QUEENS", "STREETS", "TRANSIT"],
    responses: 756,
    comments: 203,
    sentimentSummary: "56% support",
    sentiment: [
      { label: "Support", percent: 56, tone: "support" },
      { label: "Neutral", percent: 18, tone: "neutral" },
      { label: "Oppose", percent: 26, tone: "oppose" },
    ],
    daysLeft: 9,
    boroughs: ["ALL NYC", "QUEENS"],
  },
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
        {
          id: "bus-lane-cuts",
          title: "24/7 bus lane enforcement rollback",
          meta: "Brooklyn CB6 · 1,922 responses",
        },
        {
          id: "open-streets",
          title: "34th Ave Open Streets winter pilot",
          meta: "Queens CB3 · 756 responses",
        },
        {
          id: "bus-lane-cuts",
          title: "Cross-Hudson transit coordination",
          meta: "Manhattan CB4 · 340 responses",
        },
      ],
      sourceDoc: {
        title: "CB4 Meeting Minutes",
        date: "March 22, 2026",
        location: "Astoria, Queens",
        resolution:
          "The board voted to recommend approval pending Council review of the community benefits agreement.",
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
    text: "The traffic study doesn’t account for weekend gridlock near the Triboro. We need guarantees on mitigation before any vote.",
    upvotes: 214,
    officialReply: {
      author: "Zohran Mamdani",
      text: "Thanks — DOT will publish an updated weekend model before the hearing. I’ve asked the agency to hold a walkthrough on 31st St.",
    },
  },
  {
    id: "c2",
    anonLabel: "Anon #2",
    residentMeta: "Long Island City, 11101",
    stance: "Supports",
    timeAgo: "5h ago",
    text: "The community benefits package funds two schools and the ferry landings. That’s more than we usually get from waterfront deals.",
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
