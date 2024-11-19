import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
  args: {
    eventName: v.string(),
    eventDate: v.string(),
    eventType: v.string(),
    eventTeamMaxMembers: v.number(),
  },
  handler: async (ctx, args) => {
    const eventId = await ctx.db.insert("events", {
      eventName: args.eventName,
      eventImage: "",
      eventRules: [],
      eventDate: args.eventDate,
      eventType: args.eventType,
      eventTeamMaxMembers: args.eventTeamMaxMembers,
    });

    Array.from({ length: 100 }, (_, index) =>
      ctx.db.insert("slots", {
        slotMembers: [],
        slotNumber: index + 1,
        eventId: eventId,
      })
    );
    // cookieStore.set({
    //   name: "convex_user_id",
    //   value: userId,
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    // });

    return eventId;
  },
});

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").order("desc").collect();

    return events;
  },
});

export const getEventById = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);

    if (!event) return;

    return event;
  },
});
