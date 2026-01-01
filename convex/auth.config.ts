import { AuthConfig } from 'convex/server';

export default {
  providers: [
    {
      domain: 'https://living-scorpion-11.clerk.accounts.dev',
      applicationID: 'convex'
    }
  ]
} satisfies AuthConfig;
