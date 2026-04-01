import { z } from "zod";
import { publicProcedure, router } from "../init";
import { post, tag, comment, user } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export const postRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db
      .select()
      .from(post)
      .orderBy(desc(post.createdAt));

    const postsWithTags = await Promise.all(
      posts.map(async (p) => {
        const tags = await ctx.db
          .select()
          .from(tag)
          .where(eq(tag.postId, p.id));
        const creator = await ctx.db
          .select()
          .from(user)
          .where(eq(user.id, p.creatorId))
          .limit(1);
        return {
          ...p,
          tags: tags.map((t) => t.name),
          author: creator[0] ?? null,
        };
      })
    );

    return postsWithTags;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [found] = await ctx.db
        .select()
        .from(post)
        .where(eq(post.id, input.id))
        .limit(1);
      if (!found) return null;

      const tags = await ctx.db
        .select()
        .from(tag)
        .where(eq(tag.postId, found.id));
      const creator = await ctx.db
        .select()
        .from(user)
        .where(eq(user.id, found.creatorId))
        .limit(1);
      const comments = await ctx.db
        .select()
        .from(comment)
        .where(eq(comment.postId, found.id))
        .orderBy(desc(comment.createdAt));

      return {
        ...found,
        tags: tags.map((t) => t.name),
        author: creator[0] ?? null,
        comments,
      };
    }),

  addComment: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        body: z.string().min(1).max(2000),
        respondingTo: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [newComment] = await ctx.db
        .insert(comment)
        .values({
          body: input.body,
          postId: input.postId,
          respondingTo: input.respondingTo ?? null,
        })
        .returning();
      return newComment;
    }),
});
