import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

export const getFullSlots = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db.get(args.eventId);

    if (!events) return;

    // Fetch slots associated with the given event ID
    const fullSlots = await ctx.db
      .query("slots")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    if (!fullSlots || fullSlots.length === 0) return;

    // Flatten all member IDs into a single array
    const memberIds = fullSlots.flatMap((slot) => slot.slotMembers);

    // Fetch user details for each member ID
    const formattedData = await Promise.all(
      memberIds.map((id) =>
        ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), id))
          .first()
      )
    );

    // Ensure only valid user data is returned
    const validMembers = formattedData.filter((user) => user !== null);

    return {
      slots: fullSlots.map((slot) => ({
        slotId: slot._id,
        slotNumber: slot.slotNumber,
        members: validMembers.filter((user) =>
          slot.slotMembers.includes(user._id)
        ),
      })),
    };
  },
});
