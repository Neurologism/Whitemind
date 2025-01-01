import { defineStore } from 'pinia';
import axios from 'axios';

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    loading: false,
    loadingText: 'Loading...',
    hasPfp: true,
    sessionData: ref({
      pinEditorSidebar: false,
      sessionStart: Date(),
      Authorization: '',
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
      return state.sessionData.Authorization !== '';
    },

    pfpUrl: (state) => {
      const backmindHost = useRuntimeConfig().public.backmindHost as string;
      return backmindHost + `/api/user/get-pfp/` + state.sessionData.user._id;
    },

    // @ts-ignore somehow this is not recognized as a getter
    isProd: () => import.meta.env.PROD,
  },
  actions: {
    showLoadingAnimation(text = '') {
      if (text) {
        this.loadingText = text;
      }
      this.loading = true;
    },

    async checkForPfp() {
      await axios
        .get(this.pfpUrl)
        .then((response) => (this.hasPfp = response.status === 200))
        .catch(() => (this.hasPfp = false));
    },

    saveSessionData() {
      localStorage.setItem('sessionData', JSON.stringify(this.sessionData));
    },

    async signOut() {
      const toast = useToast();

      this.sessionData.Authorization = '';
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
        Authorization: `Bearer ${this.sessionData.Authorization}`,
      };

      return fetch(url, {
        ...options,
        headers,
      });
    },

    async loginWithSessionToken(token: string) {
      if (token == '' || token == undefined) {
        console.error('No token provided to login with.');
        navigateTo('/login');
        return;
      }

      this.sessionData.Authorization = token;
      let response = await this.fetch('/api/user/get', { method: 'POST' });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        this.sessionData.user = data.user;
        this.saveSessionData();
        this.checkForPfp();
        // navigateTo('/projects');
      } else {
        this.sessionData.Authorization = '';
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

      let result = await this.fetch('/api/auth/check', {
        method: 'GET',
        cache: 'no-cache',
      });

      if (result.status === 404) {
        console.warn('Session check not implemented on server jet.');
        return;
      }
      if (result.status == 401 || (await result.json()).loggedIn == false) {
        this.sessionData.Authorization = '';
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
      await this.loginWithSessionToken(this.sessionData.Authorization);
    },

    async syncLocalSessionData() {
      if (!import.meta.client) return;
      const localSession = JSON.parse(
        localStorage.getItem('sessionData') || '{}'
      );
      const currentSession = this.sessionData;

      if (!localSession.Authorization && !currentSession.Authorization) {
        console.warn(
          'No session found in both local storage and current session data.'
        );
        return;
      }

      if (
        localSession.Authorization &&
        (!currentSession.Authorization ||
          new Date(localSession.sessionStart) >
            new Date(currentSession.sessionStart))
      ) {
        this.sessionData = localSession;
      } else if (
        currentSession.Authorization &&
        (!localSession.Authorization ||
          new Date(currentSession.sessionStart) >
            new Date(localSession.sessionStart))
      ) {
        this.saveSessionData();
      }

      await this.checkSession(false);
    },
  },
});
