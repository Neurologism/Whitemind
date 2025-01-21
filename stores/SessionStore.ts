import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from '~/interfaces/user.interface';

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    loading: false,
    loadingText: 'Loading...',
    hasPfp: true,
    sessionData: ref({
      smoothEdges: false,
      pinEditorSidebar: true,
      sessionStart: Date(),
      authorizationToken: '',
      user: {
        _id: '' as string | null,
        brainetTag: '' as string | null,
        emails: [] as
          | {
              emailType: string;
              address: string;
              verified: boolean;
            }[]
          | null,
        aboutYou: '' as string | null,
        displayname: '' as string | null,
        dateOfBirth: '' as string | undefined,
        /**
         * The visibility of the user's profile
         * "private" - Only the user can see their profile
         * "public" - Everyone can see the user's profile
         * "" - not loaded yet
         */
        visibility: '' as string | null,
        followerIds: [] as string[] | null,
        followingIds: [] as string[] | null,
        projectIds: [] as string[] | null,
      },
    }),
  }),
  getters: {
    isAuthorized: (state) => {
      return state.sessionData.authorizationToken !== '';
    },

    pfpUrl: (state) => {
      const backmindHost = useRuntimeConfig().public.backmindHost as string;
      return backmindHost + `/users/${state.sessionData.user._id}/get-pfp`;
    },

    // @ts-ignore somehow this is not recognized as a getter
    isProd: () => import.meta.env.PROD,
  },
  actions: {
    async updateSecondaryEmail(secondaryEmail: string) {
      if (!this.sessionData.user.emails) {
        return false;
      }
      const result = await this.fetch(
        `/users/${this.sessionData.user._id}/emails`,
        {
          method: 'PATCH',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: { email: secondaryEmail, emailType: 'secondary' },
          }),
        }
      );
      if (result.ok) {
        for (const email of this.sessionData.user.emails) {
          if (email.emailType === 'secondary') {
            email.address = secondaryEmail;
            email.verified = false;
            return true;
          }
        }
        this.sessionData.user.emails?.push({
          emailType: 'secondary',
          address: secondaryEmail,
          verified: false,
        });
        return true;
      } else {
        console.error('Failed to update secondary email.');
        return false;
      }
    },

    getEmailByType(type: 'primary' | 'secondary') {
      return this.sessionData.user.emails?.find(
        (email) => email.emailType === type
      );
    },

    scorePassword(pass: string): number {
      let score = 0;
      if (!pass) return score;

      // Award points for length
      const lengthScore = Math.min(1, pass.length / 20);
      score += lengthScore;

      // Award points for containing numbers
      const numberScore = /\d/.test(pass) ? 0.1 : 0;
      score += numberScore;

      // Award points for containing special characters
      const specialCharScore = /[!@#$%^&*(),.?":{}|<>]/.test(pass) ? 0.1 : 0;
      score += specialCharScore;

      // Award points for containing both lowercase and uppercase letters
      const lowerUpperScore =
        /[a-z]/.test(pass) && /[A-Z]/.test(pass) ? 0.2 : 0;
      score += lowerUpperScore;

      // Normalize score to be between 0 and 1
      return Math.min(1, score);
    },

    getPasswordColor(score: number) {
      if (score < 0.3) return 'red';
      if (score < 0.5) return 'orange';
      if (score < 0.7) return 'yellow';
      return 'green';
    },

    async isUserTaken(brainetTag: string = '', email: string = '') {
      let user = {} as any;
      if (brainetTag) {
        user.brainetTag = brainetTag;
      }
      if (email) {
        user.email = email;
      }

      const queryParams = new URLSearchParams();
      if (brainetTag) queryParams.append('brainetTag', brainetTag);
      if (email) queryParams.append('email', email);

      const result = await this.fetch(
        `/users/is-taken?${queryParams.toString()}`,
        {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return !result.ok;
    },

    async modifyAccountData(user: any) {
      const result = await this.fetch(`/users/${this.sessionData.user._id}`, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      return result.ok;
    },

    async deleteAccount() {
      await this.fetch(`/users/${this.sessionData.user._id}`, {
        method: 'DELETE',
        cache: 'no-cache',
      });
    },

    showLoadingAnimation(text = '') {
      if (text) {
        this.loadingText = text;
      }
      this.loading = true;
    },

    saveSessionData() {
      localStorage.setItem('sessionData', JSON.stringify(this.sessionData));
    },

    async checkForPfp() {
      await axios
        .get(this.pfpUrl)
        .then((response) => (this.hasPfp = response.status === 200))
        .catch(() => (this.hasPfp = false));
    },

    async signOut() {
      const toast = useToast();

      this.sessionData.authorizationToken = '';
      this.sessionData.user = {
        _id: null,
        brainetTag: null,
        emails: null,
        aboutYou: null,
        displayname: null,
        dateOfBirth: undefined,
        visibility: null,
        followerIds: null,
        followingIds: null,
        projectIds: null,
      };
      this.saveSessionData();
      navigateTo('/');

      toast.add({
        title: 'Signed out',
      });
    },

    /**
     * Fetches a URL, adding the Authorization header with the session ID
     * @param url The URL to fetch
     * @param options The fetch options
     */
    async fetch(
      url: string | URL | globalThis.Request,
      options: RequestInit = {}
    ): Promise<Response> {
      const backmindHost = useRuntimeConfig().public.backmindHost as string;
      if (url.toString().startsWith('/')) {
        url = new URL(url.toString(), backmindHost);
      } else {
        console.warn(
          `Sending session based fetch request to specified API server : ${url.toString()}`
        );
      }

      const headers = {
        ...options.headers,
        Authorization: `Bearer ${this.sessionData.authorizationToken}`,
      };

      const result = await fetch(url, {
        ...options,
        headers,
      });
      if (result.status == 401) {
        this.$reset();
        navigateTo('/login');
      }
      return result;
    },

    async getUserByBrainetTag(brainetTag: string): Promise<User | null> {
      const response = await this.fetch(`/users/by-name/${brainetTag}`, {
        method: 'GET',
        cache: 'no-cache',
      });
      if (response.ok) {
        return (await response.json()).user as User;
      } else {
        return null;
      }
    },

    async loginWithSessionToken(token: string) {
      if (token == '' || token == undefined) {
        console.error('No token provided to login with.');
        navigateTo('/login');
        return;
      }

      this.sessionData.authorizationToken = token;
      const response = await this.fetch(`/users`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.sessionData.user = data.user;
        this.saveSessionData();
        this.checkForPfp();
      } else {
        this.sessionData.authorizationToken = '';
        console.error(
          'Failed to log in with session token. Rerouting user to login page.'
        );
        navigateTo('/login');
      }
    },

    /**
     * Checks if the session is still valid and navigates to the login page if it is not
     * @param redirectIfNotLoggedIn
     */
    async checkSession(redirectIfNotLoggedIn = true) {
      if (!this.isAuthorized) {
        if (redirectIfNotLoggedIn) {
          navigateTo('/login');
        }
        return;
      }

      let result = await this.fetch(`/users/${this.sessionData.user._id}`, {
        method: 'GET',
        cache: 'no-cache',
      });

      if (!result.ok) {
        this.sessionData.authorizationToken = '';
        this.sessionData.user = {
          _id: null,
          brainetTag: null,
          emails: null,
          aboutYou: null,
          displayname: null,
          dateOfBirth: undefined,
          visibility: null,
          followerIds: null,
          followingIds: null,
          projectIds: null,
        };
        if (redirectIfNotLoggedIn) {
          navigateTo('/login');
        }
      }
    },

    async refreshUserData() {
      await this.loginWithSessionToken(this.sessionData.authorizationToken);
    },

    async syncLocalSessionData() {
      if (!import.meta.client) return;

      const localSession = JSON.parse(
        localStorage.getItem('sessionData') || '{}'
      );
      const currentSession = this.sessionData;

      if (
        !localSession.authorizationToken &&
        !currentSession.authorizationToken
      )
        return;

      if (
        localSession.authorizationToken &&
        (!currentSession.authorizationToken ||
          new Date(localSession.sessionStart) >
            new Date(currentSession.sessionStart))
      ) {
        this.sessionData = localSession;
      } else if (
        currentSession.authorizationToken &&
        (!localSession.authorizationToken ||
          new Date(currentSession.sessionStart) >
            new Date(localSession.sessionStart))
      ) {
        this.saveSessionData();
      }

      await this.checkSession(false);
    },
  },
});
