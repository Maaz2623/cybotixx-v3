import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const announceWinner = mutation({
  args: {
    eventId: v.id("events"),
    memberId: v.id("users"),
    winnerPosition: v.number(),
  },
  handler: async (ctx, args) => {
    const winner = await ctx.db.insert("winners", {
      eventId: args.eventId,
      memberId: args.memberId,
      winnerPosition: args.winnerPosition,
    });

    // cookieStore.set({
    //   name: "convex_user_id",
    //   value: userId,
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    // });

    return winner;
  },
});

export const getWinnersByEventId = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const winners = await ctx.db
      .query("winners")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();
    if (!winners) return;

    const memberIds = winners.map((member) => member.memberId);

    if (!memberIds) return;

    const formattedWinners = await Promise.all(
      memberIds.map((id) =>
        ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), id))
          .first()
      )
    );

    if (!formattedWinners) return;

    return formattedWinners;
  },
});
