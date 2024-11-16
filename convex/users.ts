import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    fullName: v.string(),
    registerNumber: v.string(),
    courseName: v.string(),
    courseYear: v.string(),
    phoneNumber: v.string(),
    clerkId: v.string(),
    clerkImageUrl: v.string(),
    prizesWon: v.number(),
    participations: v.number(),
  },
  handler: async (ctx, args) => {
    // const cookieStore = await cookies();
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) return existingUser._id;

    const userId = await ctx.db.insert("users", {
      fullName: args.fullName,
      registerNumber: args.registerNumber,
      courseName: args.courseName,
      courseYear: args.courseYear,
      phoneNumber: args.phoneNumber,
      clerkId: args.clerkId,
      clerkImageUrl: args.clerkImageUrl,
      roleType: "MEMBER",
      prizesWon: args.prizesWon,
      participations: args.participations,
    });

    // cookieStore.set({
    //   name: "convex_user_id",
    //   value: userId,
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    // });

    return userId;
  },
});

export const getUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) return;

    return user;
  },
});

export const getMembers = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("users").collect();

    return members;
  },
});

export const getMember = query({
  args: {
    convex_user_id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.convex_user_id);

    if (!member) return;

    return member;
  },
});

export const assignRoleType = mutation({
  args: {
    convex_user_id: v.id("users"),
    roleType: v.string(),
  },
  handler: async (ctx, args) => {
    const { convex_user_id } = args;

    const adminnedMember = await ctx.db.patch(convex_user_id, {
      roleType: args.roleType,
    });

    return adminnedMember;
  },
});

