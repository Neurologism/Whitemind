import {defineStore} from "pinia";

const apiServerURLs = {
    prod: "https://backmind.icinoxis.net",
    dev: "https://dev-backmind.icinoxis.net"
};



export const useSessionStore = defineStore({
    id: "sessionData",
    state: () => ({
        sessionData: {
            sessionStart: Date(),
            sessionID: "",
            user: {
                _id: "",
                brainet_tag: "",
                email: "",
                about_you: "",
                displayname: "",
                date_of_birth: 0,
                /**
                 * The visibility of the user's profile
                 * "private" - Only the user can see their profile
                 * "public" - Everyone can see the user's profile
                 * "" - not loaded yet
                 */
                visibility: "",
                followers: [] as string[],
                following: [] as string[],
                project_ids: [] as string[],
            }
        },
    }),
    getters: {
        doesSessionIdExist: (state) => {
            return state.sessionData.sessionID !== "";
        },
        // @ts-ignore somehow this is not recognized as a getter
        isProd: () => import.meta.env.PROD,
    },
    actions: {
        /**
         * Fetches a URL, adding the Authorization header with the session ID
         * @param url The URL to fetch
         * @param options The fetch options
         */
        async fetch(url: string | URL | globalThis.Request, options : RequestInit = {}) {
            if (url.toString().startsWith("/")) {
                if (this.isProd) {
                    url = new URL(url.toString(), apiServerURLs.prod);
                } else {
                    url = new URL(url.toString(), apiServerURLs.dev);
                }
            } else {
                console.warn(`Sending session based fetch request to specified API server : ${url.toString()}`);
            }

            const headers = {
                ...options.headers,
                Authorization: `Bearer ${this.sessionData.sessionID}`,
            };

            return await fetch(url, {
                ...options,
                headers,
            });
        },
        async loginWithSessionToken(token: string) {
            if (token == "" || token == undefined) {
                console.error("No token provided to login with.");
                navigateTo('/profile/login');
                return;
            }

            this.sessionData.sessionID = token;
            let response = await this.fetch("/api/user/get", {method: "POST"});
            if (response.status === 200) {
                let data = await response.json();
                console.log(data);
                this.sessionData.user = data.user;
                localStorage.setItem('sessionData', JSON.stringify(this.sessionData));
                navigateTo('/projects');
            } else {
                this.sessionData.sessionID = "";
                console.error("Failed to log in with session token. Rerouting user to login page.");
                navigateTo('/profile/login');
            }
        },
        /**
         * Checks if the session is still valid and navigates to the login page if it is not
         * @param redirectIfNotLoggedIn
         */
        async checkSession(redirectIfNotLoggedIn = true) {
            if (!this.doesSessionIdExist) return;

            let result = await this.fetch("/api/auth/check", {
                method: "POST",
            });

            if (result.status === 404) {
                console.warn('Session check not implemented on server jet.');
                return;
            }
            if (result.status == 401) {
                this.sessionData.sessionID = "";
                if (redirectIfNotLoggedIn) {
                    navigateTo('/profile/login');
                }
            }
        },
        async syncLocalSessionData() {
          if (!import.meta.client) return;
          const localSession = JSON.parse(localStorage.getItem('sessionData') || '{}');
          const currentSession = this.sessionData;

          if (!localSession.sessionID && !currentSession.sessionID) {
            console.warn('No session found in both local storage and current session data.');
            return;
          }

          if (localSession.sessionID && (!currentSession.sessionID || new Date(localSession.sessionStart) > new Date(currentSession.sessionStart))) {
            this.sessionData = localSession;
          } else if (currentSession.sessionID && (!localSession.sessionID || new Date(currentSession.sessionStart) > new Date(localSession.sessionStart))) {
            localStorage.setItem('sessionData', JSON.stringify(currentSession));
          }

          await this.checkSession();
        },
    },
});
