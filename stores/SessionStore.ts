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

        },
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.sessionData.sessionID !== "";
        },
        isProd: () => import.meta.env.MODE === "production",
    },
    actions: {
        /**
         * Fetches a URL, adding the Authorization header with the session ID
         * @param url The URL to fetch
         * @param options The fetch options
         */
        async fetch(url: string | URL | globalThis.Request, options : RequestInit = {}) {
            if (url.toString().startsWith("/") && !noAPIServer) {
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
        async checkSession(redirectIfNotLoggedIn = true) {
            if (!this.isLoggedIn) return;

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
                    this.$router.push("/login");
                }
            }
        },
    },
});
