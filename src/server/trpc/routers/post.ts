import { z } from "zod";
import { publicProcedure, router } from "../init";
import { post, tag, comment, user, district } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export const postRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db
      .select()
      .from(post)
      .orderBy(desc(post.createdAt));

    return Promise.all(
      posts.map(async (p) => {
        const tags = await ctx.db
          .select({ name: tag.name })
          .from(tag)
          .where(eq(tag.postId, p.id));

        const [creator] = await ctx.db
          .select({
            name: user.name,
            position: user.position,
            profilePicUrl: user.profilePicUrl,
            districtId: user.districtId,
          })
          .from(user)
          .where(eq(user.id, p.creatorId))
          .limit(1);

        let organization = "";
        if (creator?.districtId) {
          const [d] = await ctx.db
            .select({ name: district.name })
            .from(district)
            .where(eq(district.id, creator.districtId))
            .limit(1);
          organization = d?.name ?? "";
        }

        const commentCount = await ctx.db
          .select({ id: comment.id })
          .from(comment)
          .where(eq(comment.postId, p.id));

        const initials = (creator?.name ?? "")
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase();

        return {
          id: p.slug,
          author: {
            initials,
            name: creator?.name ?? "",
            title: creator?.position ?? "",
            organization,
            avatar: creator?.profilePicUrl ?? undefined,
          },
          headline: p.title,
          snippet: p.snippet,
          tags: tags.map((t) => t.name),
          neighborhoods: p.neighborhoods,
          communityBoardCode: p.communityBoardCode,
          validZipCodes: p.validZipCodes,
          postedAt: p.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          commentCount: commentCount.length,
        };
      })
    );
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [found] = await ctx.db
        .select()
        .from(post)
        .where(eq(post.slug, input.slug))
        .limit(1);
      if (!found) return null;

      const tags = await ctx.db
        .select({ name: tag.name })
        .from(tag)
        .where(eq(tag.postId, found.id));

      const [creator] = await ctx.db
        .select({
          name: user.name,
          position: user.position,
          profilePicUrl: user.profilePicUrl,
          districtId: user.districtId,
        })
        .from(user)
        .where(eq(user.id, found.creatorId))
        .limit(1);

      let organization = "";
      if (creator?.districtId) {
        const [d] = await ctx.db
          .select({ name: district.name })
          .from(district)
          .where(eq(district.id, creator.districtId))
          .limit(1);
        organization = d?.name ?? "";
      }

      const comments = await ctx.db
        .select()
        .from(comment)
        .where(eq(comment.postId, found.id))
        .orderBy(desc(comment.createdAt));

      const initials = (creator?.name ?? "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();

      return {
        id: found.slug,
        postUuid: found.id,
        author: {
          initials,
          name: creator?.name ?? "",
          title: creator?.position ?? "",
          organization,
          avatar: creator?.profilePicUrl ?? undefined,
        },
        headline: found.title,
        snippet: found.snippet,
        body: found.body,
        tags: tags.map((t) => t.name),
        neighborhoods: found.neighborhoods,
        communityBoardCode: found.communityBoardCode,
        validZipCodes: found.validZipCodes,
        sourceLink: found.sourceUrl
          ? { label: found.sourceLabel ?? "", href: found.sourceUrl }
          : undefined,
        postedAt: found.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        commentCount: comments.length,
        comments: comments.map((c) => ({
          id: c.id,
          text: c.body,
          timeAgo: getTimeAgo(c.createdAt),
        })),
      };
    }),

  addComment: publicProcedure
    .input(
      z.object({
        postSlug: z.string(),
        body: z.string().min(1).max(2000),
        respondentId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [found] = await ctx.db
        .select({ id: post.id })
        .from(post)
        .where(eq(post.slug, input.postSlug))
        .limit(1);
      if (!found) throw new Error("Post not found");

      const [newComment] = await ctx.db
        .insert(comment)
        .values({
          body: input.body,
          postId: found.id,
          respondentId: input.respondentId ?? null,
        })
        .returning();
      return newComment;
    }),
});

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
