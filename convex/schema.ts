import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    fullName: v.string(),
    registerNumber: v.string(),
    courseName: v.string(),
    courseYear: v.string(),
    phoneNumber: v.string(),
    clerkId: v.string(),
    clerkImageUrl: v.string(),
    roleType: v.string(),
    prizesWon: v.number(),
    participations: v.number(),
  }),
  participants: defineTable({
    eventId: v.id("events"),
    memberId: v.id("users"),
  }),
  winners: defineTable({
    eventId: v.id("events"),
    memberId: v.id("users"),
    winnerPosition: v.number(),
  }),
  events: defineTable({
    eventName: v.string(),
    eventImage: v.string(),
    eventRules: v.array(v.string()),
    eventDate: v.string(),
    eventType: v.string(),
    eventTeamMaxMembers: v.number(),
    eventRegistrationOpen: v.boolean(),
    eventComplete: v.boolean(),
  }),
  slots: defineTable({
    slotMembers: v.array(v.id("users")),
    eventId: v.id("events"),
    slotNumber: v.number(),
  }),
});
