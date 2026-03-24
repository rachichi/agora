# Agora — MVP

A minimal civic forum where verified officials post topics from local government meetings and the public responds anonymously.

## MVP features

1. **Feed** — A simple list of official posts (hardcoded). Each card shows the author, headline, tags, comment count, and date.
2. **Thread** — Click into a topic to read the full post and leave an anonymous comment.
3. **Email verification** — Before responding, users verify their email via a magic-link flow to prevent spam. (Demo includes a shortcut button to simulate verification.)

## Tech stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Framework | Next.js 15 (App Router)        |
| Language  | TypeScript                     |
| Styling   | Tailwind CSS 3                 |
| Font      | Inter via `next/font`          |
| Data      | Hardcoded in `src/lib/data.ts` |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Feed page
│   ├── thread/[id]/page.tsx     # Thread page
│   ├── not-found.tsx            # 404
│   ├── layout.tsx               # Root layout + Navbar
│   └── globals.css              # Tailwind base
├── components/
│   ├── feed/
│   │   └── FeedCard.tsx         # Feed item card
│   ├── thread/
│   │   ├── VerifyEmail.tsx      # Email magic-link gate
│   │   ├── CommentForm.tsx      # Anonymous comment (post-verification)
│   │   └── CommentList.tsx      # Comment list
│   └── layout/
│       └── Navbar.tsx           # Minimal top bar
└── lib/
    ├── data.ts                  # Mock data
    └── types.ts                 # TypeScript types
```

## What's not in the MVP

- Borough filtering, sentiment bars, sidebar panels, voting buttons
- Real email delivery / magic-link backend
- Database persistence
- User accounts or profiles

These are scoped for the future-state branch (`20260323-futurestate`).

## License

MIT
