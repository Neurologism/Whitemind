import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from '~/types/user';

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    users: {} as Record<string, { data: User; fetchedAt: number }>,
  }),
  actions: {
    async fetchUser(brainetTag: string) {
      const sessionStore = useSessionStore();

      const response = await sessionStore.fetch('/api/user/get', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            brainetTag,
          },
        }),
      });

      if (response.ok) {
        const user = (await response.json()).user;
        this.users[brainetTag] = { data: user, fetchedAt: Date.now() };
        return user;
      } else {
        console.error('Failed to fetch user', response);
        return null;
      }
    },

    async getUserByBrainetTag(brainetTag: string) {
      const cached = this.users[brainetTag];
      const isStale = !cached || Date.now() - cached.fetchedAt > 60_000;
      if (isStale) return await this.fetchUser(brainetTag);
      return cached.data;
    },
  },
});
