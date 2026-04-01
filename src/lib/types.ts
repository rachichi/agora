export type FeedItem = {
  id: string;
  author: {
    initials: string;
    name: string;
    title: string;
    organization: string;
    avatar?: string;
  };
  headline: string;
  snippet: string;
  tags: string[];
  neighborhoods: string;
  communityBoardCode: string;
  validZipCodes: string[];
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
