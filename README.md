# Agora

A civic forum that publishes verified local government decisions and opens them for anonymous public input. Topics come directly from meeting minutes and town hall notes posted by elected officials and community boards.

## Features

- **Feed** — Browse open topics from NYC officials and community boards, filtered by borough. Each card shows the author, verification badge, sentiment bar, response count, and time remaining.
- **Thread** — Read the full context behind a decision, weigh in anonymously (support / oppose / undecided), and browse community comments sorted by popularity or stance.
- **Sidebar** — Active officials, recent decisions, top responding zip codes, related topics, and source documents linked to NYC OpenData.
- **Anonymous input** — Residents submit responses tied to a zip code with no account required.

## Tech stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 15 (App Router)             |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS 3                      |
| Fonts     | Inter (UI) + Source Serif 4 (body)  |
| Data      | Static mock data in `src/lib/data.ts` (swap for an API) |

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the feed.

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Feed page
│   ├── thread/[id]/page.tsx     # Thread page
│   ├── not-found.tsx            # 404 page
│   ├── layout.tsx               # Root layout with Navbar
│   └── globals.css              # Tailwind base styles
├── components/
│   ├── feed/
│   │   ├── BoroughFilter.tsx    # Borough tab navigation
│   │   ├── FeedCard.tsx         # Individual feed item
│   │   ├── FeedSidebar.tsx      # Right sidebar (officials, decisions, links)
│   │   └── InfoBanner.tsx       # "How Local works" banner
│   ├── thread/
│   │   ├── ThreadArticle.tsx    # Full post content
│   │   ├── WeighInBox.tsx       # Anonymous voting + comment form
│   │   ├── CommentThread.tsx    # Comment list with sorting tabs
│   │   └── ThreadSidebar.tsx    # Stats, zip codes, related topics
│   ├── layout/
│   │   └── Navbar.tsx           # Top navigation bar
│   └── ui/
│       └── SentimentBar.tsx     # Reusable sentiment progress bar
├── lib/
│   ├── data.ts                  # Mock feed items, comments, sidebar data
│   └── types.ts                 # TypeScript type definitions
└── reference/
    ├── Feed.png                 # Figma design reference
    └── Thread.png               # Figma design reference
```

## Design reference

The UI follows two Figma screens located in `src/reference/`:

- **Feed.png** — Borough filter, info banner, feed cards with sentiment bars, right sidebar with active officials, recent decisions, and footer links.
- **Thread.png** — Two-column layout with the full post, anonymous weigh-in module, labeled sentiment bar, threaded comments with official replies, and a data sidebar.

## License

MIT
