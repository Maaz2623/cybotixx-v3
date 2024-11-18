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

    const member = await ctx.db.get(args.memberId);

    if (!member) return;

    const updatedParticipations = member.participations + 1;

    await ctx.db.patch(member._id, {
      participations: updatedParticipations,
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
    convex_user_id: v.optional(v.id("users")),
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const participant = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("memberId"), args.convex_user_id))
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .first();

    if (!participant) return;

    return participant;
  },
});

export const getParticipants = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const participants = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    if (!participants) return;

    const memberIds = participants.map((member) => member.memberId);

    if (!memberIds) return;

    const members = await Promise.all(
      memberIds.map((id) =>
        ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), id))
          .first()
      )
    );

    if (!members) return;

    return members.reverse();
  },
});
