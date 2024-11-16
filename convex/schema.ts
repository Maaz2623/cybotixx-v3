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
    participantId: v.id("users")
  }),
  winners: defineTable({
    eventId: v.id("events"),
    winnerPosition: v.number(),
  }),
  events: defineTable({
    eventName: v.string(),
  })
});


