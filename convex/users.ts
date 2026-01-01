import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', q => q.eq('clerkId', args.clerkId))
      .unique();

    if (existingUser) return;

    return await ctx.db.insert('users', {
      ...args,
      role: 'candidate'
    });
  }
});
