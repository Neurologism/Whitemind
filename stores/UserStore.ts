import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      _id: "",
      brainet_tag: "",
      email: "",
      about_you: "",
      displayname: "",
      date_of_birth: 0,
      visibility: "",
      followers: [],
      following: [],
      project_ids: [],
    },
  }),
  getters: {
    isAdult(): boolean {
      return this.age >= 18;
    },
  },
  actions: {
    getSelf() {
      this.age++;
    },
  },
});
