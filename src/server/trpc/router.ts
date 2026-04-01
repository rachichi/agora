import { router } from "./init";
import { postRouter } from "./routers/post";
import { verifyRouter } from "./routers/verify";

export const appRouter = router({
  post: postRouter,
  verify: verifyRouter,
});

export type AppRouter = typeof appRouter;
