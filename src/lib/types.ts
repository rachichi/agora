export type Borough =
  | "ALL NYC"
  | "MANHATTAN"
  | "BROOKLYN"
  | "QUEENS"
  | "THE BRONX"
  | "STATEN ISLAND"
  | "ROOSEVELT ISLAND";

export type SentimentSlice = {
  label: string;
  percent: number;
  tone: "support" | "neutral" | "oppose";
};

export type BadgeType = "official" | "board";

export type FeedItem = {
  id: string;
  accent: "blue" | "green" | "amber";
  badge: BadgeType;
  fromMinutes: boolean;
  author: {
    initials: string;
    name: string;
    role: string;
  };
  headline: string;
  snippet: string;
  tags: string[];
  responses: number;
  comments: number;
  sentimentSummary: string;
  sentiment: SentimentSlice[];
  daysLeft: number;
  boroughs: Borough[];
};

export type ActiveOfficial = {
  initials: string;
  name: string;
  role: string;
  topics: number;
};

export type RecentDecision = {
  id: string;
  title: string;
  board: string;
  date: string;
};

export type ThreadDetail = FeedItem & {
  postedAt: string;
  openUntil: string;
  body: string[];
  minutesLink: { label: string; href: string };
  zipStats: { code: string; share: number }[];
  related: { id: string; title: string; meta: string }[];
  sourceDoc: {
    title: string;
    date: string;
    location: string;
    resolution: string;
    href: string;
  };
};

export type CommentStance = "Opposes" | "Supports" | "Undecided";

export type ThreadComment = {
  id: string;
  anonLabel: string;
  residentMeta: string;
  stance: CommentStance;
  timeAgo: string;
  text: string;
  upvotes: number;
  officialReply?: {
    author: string;
    text: string;
  };
};
