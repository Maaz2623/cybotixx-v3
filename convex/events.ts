import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
    args: {
      eventName: v.string(),
    },
    handler: async (ctx, args) => {
      const eventId = await ctx.db.insert("events", {
        eventName: args.eventName,
      });
  
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
    const events = await ctx.db.query("events").order("desc").collect()


    return events
  }
})