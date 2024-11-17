import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createParticipant = mutation({
  args: {
    eventId: v.id("events"),
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const participantId = await ctx.db.insert("participants", {
      memberId: args.memberId,
      eventId: args.eventId,
    });

    // cookieStore.set({
    //   name: "convex_user_id",
    //   value: userId,
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    // });

    return participantId;
  },
});

export const getParticipantByMemberId = query({
  args: {
    convex_user_id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const participant = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("memberId"), args.convex_user_id))
      .first();

    if (!participant) return;

    return participant;
  },
});
