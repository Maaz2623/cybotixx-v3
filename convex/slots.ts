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

    return slot._id;
  },
});

export const getFullSlots = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);

    if (!event) return; // If the event doesn't exist, return early

    // Fetch slots associated with the given event ID
    const allSlots = await ctx.db
      .query("slots")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    // Filter slots by the number of slot members
    const fullSlots = allSlots.filter(
      (slot) => slot.slotMembers.length === event.eventTeamMaxMembers
    );

    // Format the data, fetching member details asynchronously
    const formattedData = await Promise.all(
      fullSlots.map(async (slot) => {
        const fullSlotMembers = await Promise.all(
          slot.slotMembers.map(async (memberId) => {
            const fetchedMember = await ctx.db.get(memberId);
            return fetchedMember;
          })
        );

        return {
          slotId: slot._id,
          slotNumber: slot.slotNumber,
          slotMembers: fullSlotMembers,
        };
      })
    );

    return formattedData;
  },
});

export const getSlotByEventIdMemberId = query({
  args: {
    eventId: v.id("events"),
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const slots = await ctx.db
      .query("slots")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    if (!slots || slots.length === 0) return null; // If no slots found, return null

    const slot = slots.find((slot) => slot.slotMembers.includes(args.memberId));

    return slot;
  },
});
