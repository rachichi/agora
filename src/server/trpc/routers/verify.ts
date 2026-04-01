import { z } from "zod";
import { publicProcedure, router } from "../init";
import { verifiedRespondent, notifyInterest } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { getCommunityBoardsForZip } from "@/lib/communityBoards";
import crypto from "crypto";

function hashAddress(address: string): string {
  return crypto
    .createHash("sha256")
    .update(address.toLowerCase().trim())
    .digest("hex");
}

export const verifyRouter = router({
  checkZip: publicProcedure
    .input(
      z.object({
        zip: z.string().length(5),
        postCommunityBoardCode: z.string(),
        postValidZipCodes: z.array(z.string()),
      })
    )
    .mutation(({ input }) => {
      const isValid = input.postValidZipCodes.includes(input.zip);
      const boards = getCommunityBoardsForZip(input.zip);

      if (isValid) {
        return { status: "valid" as const };
      }

      return {
        status: "invalid" as const,
        yourBoards: boards.map((b) => ({ code: b.code, name: b.name })),
      };
    }),

  registerRespondent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        address: z.string().min(1),
        zip: z.string().length(5),
        communityBoardCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const addrHash = hashAddress(input.address);

      const existing = await ctx.db
        .select()
        .from(verifiedRespondent)
        .where(
          and(
            eq(verifiedRespondent.email, input.email.toLowerCase()),
            eq(verifiedRespondent.addressHash, addrHash)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return { respondentId: existing[0].id, isReturning: true };
      }

      const [created] = await ctx.db
        .insert(verifiedRespondent)
        .values({
          email: input.email.toLowerCase(),
          addressHash: addrHash,
          zip: input.zip,
          communityBoardCode: input.communityBoardCode,
          emailVerified: false,
        })
        .returning();

      return { respondentId: created.id, isReturning: false };
    }),

  notifyMe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        zip: z.string().length(5),
        communityBoardCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notifyInterest).values({
        email: input.email.toLowerCase(),
        zip: input.zip,
        communityBoardCode: input.communityBoardCode,
      });
      return { success: true };
    }),
});
