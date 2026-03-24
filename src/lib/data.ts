import type { FeedItem, ThreadComment, ThreadDetail } from "./types";

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "bushwick-inlet-park",
    author: { initials: "CB4", name: "Brooklyn Community Board 4", role: "" },
    headline: "Should Bushwick Inlet Park Phase 4 prioritize active recreation or green space?",
    snippet:
      "The city released two design options for the remaining 4 acres. We want to hear from neighbors before our parks committee votes next month.",
    tags: ["BROOKLYN", "PARKS"],
    postedAt: "Mar 22, 2026",
    commentCount: 0,
  },
  {
    id: "east-harlem-rezoning",
    author: { initials: "CB11", name: "Manhattan Community Board 11", role: "" },
    headline: "East Harlem rezoning update: should the board push for deeper affordability in new developments?",
    snippet:
      "Developers are proposing 350 units at 125th and Lex with 25% affordable. The board is considering whether to negotiate for 30% or more before the ULURP deadline.",
    tags: ["MANHATTAN", "HOUSING"],
    postedAt: "Mar 21, 2026",
    commentCount: 0,
  },
  {
    id: "knickerbocker-bike-lane",
    author: { initials: "JG", name: "Jennifer Gutiérrez", role: "City Council, D34", avatar: "/avatars/jengutierrez.jpg" },
    headline: "Knickerbocker Ave protected bike lane — should we fast-track installation?",
    snippet:
      "DOT proposed a protected lane from Flushing Ave to Myrtle Ave. I want to hear from residents and business owners before I push for accelerated construction.",
    tags: ["BROOKLYN", "TRANSIT"],
    postedAt: "Mar 20, 2026",
    commentCount: 0,
  },
  {
    id: "ues-school-overcrowding",
    author: { initials: "AB", name: "Alex Bores", role: "Assembly, D73", avatar: "/avatars/alexbores.jpg" },
    headline: "UES school overcrowding: should Albany fund a new K–5 facility or expand existing buildings?",
    snippet:
      "Three elementary schools in the district are over 110% capacity. I'm drafting a capital funding request and need parent and community input on the best path forward.",
    tags: ["MANHATTAN", "EDUCATION"],
    postedAt: "Mar 19, 2026",
    commentCount: 0,
  },
];

export function getThreadById(id: string): ThreadDetail | undefined {
  const item = FEED_ITEMS.find((f) => f.id === id);
  if (!item) return undefined;

  const bodies: Record<string, string[]> = {
    "bushwick-inlet-park": [
      "The city released two design concepts for the remaining 4 acres of Bushwick Inlet Park — one focused on sports fields and active recreation, the other on passive green space with native plantings.",
      "Our parks committee will vote on a recommendation next month. Before we do, we want to hear from the community about what you actually need from this space.",
      "Drop your thoughts below. All responses are anonymous.",
    ],
    "east-harlem-rezoning": [
      "A developer is proposing 350 units at 125th St and Lexington Ave with 25% set aside as permanently affordable housing.",
      "The board is weighing whether to negotiate for 30% or higher before the ULURP deadline. We need to hear from East Harlem residents — what level of affordability would make this project acceptable?",
      "This thread is open for community input ahead of our next land use committee meeting.",
    ],
    "knickerbocker-bike-lane": [
      "DOT has proposed a protected bike lane on Knickerbocker Ave running from Flushing Ave to Myrtle Ave. The design would remove one side of street parking and add physical barriers.",
      "I've heard strong feelings on both sides — cyclists who need safer routes and business owners worried about losing customer parking.",
      "I want to hear directly from District 34 residents before I weigh in with DOT. Your response is anonymous.",
    ],
    "ues-school-overcrowding": [
      "Three elementary schools in the 73rd Assembly District are operating above 110% capacity. Class sizes are growing and families are being waitlisted.",
      "I'm preparing a capital funding request for Albany. The two main options are building a new K–5 facility or expanding existing school buildings.",
      "Parents, teachers, and community members — I need your input on which approach makes more sense for the neighborhood.",
    ],
  };

  return {
    ...item,
    body: bodies[item.id] ?? [item.snippet],
    sourceLink: item.id === "bushwick-inlet-park"
      ? { label: "View the CB4 parks committee agenda", href: "https://www.nyc.gov/site/brooklyncb4/index.page" }
      : item.id === "east-harlem-rezoning"
        ? { label: "View the ULURP application materials", href: "https://www.nyc.gov/site/planning/applicants/applicant-portal/step5-702-ulurp.page" }
        : undefined,
  };
}

export function getCommentsForThread(_threadId: string): ThreadComment[] {
  return [];
}
