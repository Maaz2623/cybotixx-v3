import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSlotsByEventId = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const slots = await ctx.db
      .query("slots")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    if (!slots) return;

    return slots;
  },
});

export const joinSlot = mutation({
  args: {
    eventId: v.id("events"),
    slotNumber: v.number(),
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);

    if (!event) return;

    const slot = await ctx.db
      .query("slots")
      .filter((q) => q.eq(q.field("slotNumber"), args.slotNumber))
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .first();

    if (!slot) return;

    const currentSlotMembers = slot.slotMembers;

    if (currentSlotMembers.length >= event.eventTeamMaxMembers) return;

    const updatedSlotMembers = [...currentSlotMembers, args.memberId];

    await ctx.db.insert("participants", {
      memberId: args.memberId,
      eventId: args.eventId,
    });

    await ctx.db.patch(slot._id, {
      slotMembers: updatedSlotMembers,
    });

    return slot.slotNumber;
  },
});
