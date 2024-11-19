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

    const member = await ctx.db.get(args.memberId);

    if (!member) return;

    const updatedPrizesWon = member.prizesWon + 1;

    await ctx.db.patch(member._id, {
      prizesWon: updatedPrizesWon,
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
    // Fetch winners for the given eventId
    const winners = await ctx.db
      .query("winners")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    if (!winners || winners.length === 0) return { winners: [] };

    // Map over the winners to fetch corresponding user data
    const formattedWinners = await Promise.all(
      winners.map(async (winner) => {
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), winner.memberId))
          .first();

        if (user) {
          return {
            ...user,
            winnerPosition: winner.winnerPosition, // Add position from the "winners" collection
          };
        }

        return null; // Handle cases where user is not found
      })
    );

    // Filter out any null values
    const validWinners = formattedWinners.filter((winner) => winner !== null);

    const positionPriority = [1, 2, 3];

    validWinners.sort((a, b) => {
      const roleAIndex = positionPriority.indexOf(a.winnerPosition);
      const roleBIndex = positionPriority.indexOf(b.winnerPosition);
      return roleAIndex - roleBIndex;
    });

    return { winners: validWinners };
  },
});
