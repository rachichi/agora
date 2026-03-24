export type FeedItem = {
  id: string;
  author: {
    initials: string;
    name: string;
    role: string;
  };
  headline: string;
  snippet: string;
  tags: string[];
  postedAt: string;
  commentCount: number;
};

export type ThreadDetail = FeedItem & {
  body: string[];
  sourceLink?: { label: string; href: string };
};

export type ThreadComment = {
  id: string;
  text: string;
  timeAgo: string;
};
