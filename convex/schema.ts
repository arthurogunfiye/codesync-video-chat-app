import { defineSchema, defineTable } from 'convex/server';
import { v as value } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: value.string(),
    email: value.string(),
    image: value.optional(value.string()),
    role: value.union(value.literal('candidate'), value.literal('interviewer')),
    clerkId: value.string()
  }).index('by_clerk_id', ['clerkId'])
});
