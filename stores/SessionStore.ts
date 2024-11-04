import {defineStore} from "pinia";

const apiServerURL = "http://localhost:3000";



export const useSessionStore = defineStore({
    id: "sessionData",
    state: () => ({
        sessionData: {
            sessionStart: Date(),
            sessionID: "",
            user: {
                _id: "" as string | null,
                brainet_tag: "" as string | null,
                email: "" as string | null,
                about_you: "" as string | null,
                displayname: "" as string | null,
                date_of_birth: 0,
                /**
                 * The visibility of the user's profile
                 * "private" - Only the user can see their profile
                 * "public" - Everyone can see the user's profile
                 * "" - not loaded yet
                 */
                visibility: "" as string | null,
                followers: [] as string[] | null,
                following: [] as string[] | null,
                project_ids: [] as string[] | null,
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
        async fetch(url: string | URL | globalThis.Request, options : RequestInit = {}) : Promise<Response> {
            if (url.toString().startsWith("/")) {
                url = new URL(url.toString(), apiServerURL);
            } else {
                console.warn(`Sending session based fetch request to specified API server : ${url.toString()}`);
            }

            const headers = {
                ...options.headers,
                Authorization: `Bearer ${this.sessionData.sessionID}`,
            };

            return fetch(url, {
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
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                this.sessionData.user = data.user;
                localStorage.setItem('sessionData', JSON.stringify(this.sessionData));
                //navigateTo('/projects');
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
                method: "GET",
                cache: "no-cache",
            });

            if (result.status === 404) {
                console.warn('Session check not implemented on server jet.');
                return;
            }
            if (result.status == 401 || (await result.json()).loggedIn == false) {
                this.sessionData.sessionID = "";
                this.sessionData.user = {
                    _id: null,
                    brainet_tag: null,
                    email: null,
                    about_you: null,
                    displayname: null,
                    date_of_birth: 0,
                    visibility: null,
                    followers: null,
                    following: null,
                    project_ids: null,
                };
                if (redirectIfNotLoggedIn) {
                    navigateTo('/profile/login');
                }
            }
        },
        async refreshUserData() {
            await this.loginWithSessionToken(this.sessionData.sessionID);
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

          await this.checkSession(false);
        },
    },
});
