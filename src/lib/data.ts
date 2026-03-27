import type { FeedItem, ThreadComment, ThreadDetail } from "./types";

const CELESTINA_LEON = {
  initials: "CL",
  name: "Celestina Leon",
  title: "District Manager",
  organization: "Brooklyn Community Board 4",
  avatar: "/avatars/celestinaleon.jpg",
} as const;

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "ebike-red-light-summons",
    author: CELESTINA_LEON,
    headline: "Should e-bike and bicycle riders receive criminal court summonses or traffic tickets for running red lights?",
    snippet:
      "NYPD recently began issuing criminal court summonses to cyclists and e-bike riders for running red lights. We want to hear from you before we finalize our recommendation to the city.",
    tags: ["PUBLIC SAFETY", "TRANSPORTATION"],
    neighborhoods: "Bushwick, Williamsburg (11206, 11221, 11237)",
    postedAt: "Mar 27, 2026",
    commentCount: 0,
  },
  {
    id: "broadway-cannabis-dispensary",
    author: CELESTINA_LEON,
    headline: "Should a new cannabis dispensary open at 1271 Broadway?",
    snippet:
      "Adult-use retailer proposed for 1271 Broadway, hours 10am–9pm. Concerns raised about proximity to shelters and transitional housing. We want to hear from you before we finalize our decision.",
    tags: ["CANNABIS", "PUBLIC SAFETY", "ECONOMIC DEVELOPMENT"],
    neighborhoods: "Bushwick (11221, 11237)",
    postedAt: "Mar 27, 2026",
    commentCount: 0,
  },
  {
    id: "emerald-dispensary-permanent",
    author: CELESTINA_LEON,
    headline: "The Emerald Dispensary has operated on 85 Suydam for two years. Should their temporary license become permanent?",
    snippet:
      "Moving from provisional to permanent license with strong community support. Issue: proposed hours of 9am–2am and proximity to sensitive community sites. We want to hear from you before we finalize our decision.",
    tags: ["CANNABIS", "LICENSING"],
    neighborhoods: "Bushwick (11221, 11237)",
    postedAt: "Mar 27, 2026",
    commentCount: 0,
  },
  {
    id: "industrial-plan-bushwick",
    author: CELESTINA_LEON,
    headline: "The city's new Citywide Industrial Plan puts most of Bushwick's industrial land in a category that could allow nightlife, housing, and non-industrial development. Is that the right call?",
    snippet:
      "The City Council passed a comprehensive citywide industrial plan in 2024. The plan affects industrial zones across the city, including several in Bushwick. We want to hear from you before we finalize our recommendation.",
    tags: ["ZONING", "INDUSTRIAL", "JOBS", "HOUSING"],
    neighborhoods: "Bushwick, East Williamsburg (11206, 11221, 11237)",
    postedAt: "Mar 27, 2026",
    commentCount: 0,
  },
  {
    id: "cathedral-of-joy",
    author: CELESTINA_LEON,
    headline: "The Cathedral of Joy at Evergreen and George Knoll (the old Rheingold Brewery cafeteria, currently a church) may be sold. What should happen to the space?",
    snippet:
      "The congregation is shrinking and potentially selling the space, currently zoned M3-1 industrial. Concern that loss of this site would further erode remaining industrial spaces in Bushwick.",
    tags: ["HOUSING", "ZONING", "COMMUNITY SPACE"],
    neighborhoods: "Bushwick (11221, 11237)",
    postedAt: "Mar 27, 2026",
    commentCount: 0,
  },
];

export function getThreadById(id: string): ThreadDetail | undefined {
  const item = FEED_ITEMS.find((f) => f.id === id);
  if (!item) return undefined;

  const bodies: Record<string, string[]> = {
    "ebike-red-light-summons": [
      "NYPD recently began issuing criminal court summonses (instead of just traffic violations) to cyclists and e-bike riders for running red lights. Previously, such infractions were adjudicated in traffic court (similar to car drivers).",
      "We want to hear from you before we finalize our recommendation to the city.",
      "Do you think cyclists and e-bike riders should face criminal summonses or traffic tickets for running red lights? And who do you think should be held responsible when delivery riders behave recklessly?",
    ],
    "broadway-cannabis-dispensary": [
      "Adult-use retailer, hours 10am–9pm.",
      "Location concerns: Proximity to shelters and transitional housing; committee members raised issues about access by minors, safety, and potential advertising near shelters.",
      "Applicant's response: Committed to security, ID scanning, and limiting advertising.",
      "Arguments in favor: Provides legal, regulated alternative to illegal sales; contributes to economic development in corridors lacking businesses.",
      "We want to hear from you before we finalize our decision.",
      "Do you support a cannabis dispensary at this location? What conditions, if any, would make you more comfortable with it?",
    ],
    "emerald-dispensary-permanent": [
      "The Emerald Dispensary (not the same as the Broadway location) has operated on 85 Suydam for two years. They are moving from a provisional to a permanent license, with strong community support.",
      "Issue: Very long hours (9am–2am); need for cautious consideration because of proximity to sensitive community sites (shelters, youth centers).",
      "We want to hear from you before we finalize our decision.",
      "Do you support making the 85 Suydam Emerald Dispensary's license permanent? And what do you think about the proposed operating hours of 9am to 2am?",
    ],
    "industrial-plan-bushwick": [
      "The City Council passed a comprehensive citywide industrial plan in 2024, with the final version reportedly to be released the day after the board meeting.",
      "The plan affects industrial zones across the city, including several in Bushwick and neighboring districts. These zones would allow new uses (nightlife, housing, non-industrial uses), subject to conditions.",
      "We want to hear from you before we finalize our recommendation to the city.",
      "Do you think Bushwick's industrial land should be protected from nightlife, housing, and non-industrial development?",
    ],
    "cathedral-of-joy": [
      "The Cathedral of Joy at Evergreen and George Knoll (the old Rheingold Brewery cafeteria, currently a church) may be sold. The congregation is shrinking and potentially selling the space, which is currently zoned for heavy/intensive (M3-1) industrial use.",
      "Concern that loss of this site to non-industrial or residential development would further erode remaining industrial spaces in Bushwick.",
      "We want to hear from you before we finalize our recommendation to the city.",
      "What do you think should happen to the Cathedral of Joy building if the congregation sells? Should the community fight to preserve it for a particular usage, and if so, what kind?",
    ],
  };

  const meetingMinutes = { label: "Read our meeting minutes here", href: "https://www.nyc.gov/assets/brooklyncb4/downloads/pdf/minutes/2025/december-2025-minutes.pdf" };

  return {
    ...item,
    body: bodies[item.id] ?? [item.snippet],
    sourceLink: meetingMinutes,
  };
}

export function getCommentsForThread(_threadId: string): ThreadComment[] {
  return [];
}
