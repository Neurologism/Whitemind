<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
const sessionStore = useSessionStore();

const emit = defineEmits(["click-theme"]);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const links = [
  [
    {
      label: "Whitemind",
      click: () => navigateTo("/"),
    },
  ],
  [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Tutorials",
      icon: "i-heroicons-academic-cap",
      to: "/tutorials",
    },
    {
      label: "Projects",
      icon: "i-heroicons-folder",
      to: "/projects",
    },
  ],
  [
    {
      label: "",
      icon: "fluent:dark-theme-20-filled",
      click: () => (isDark.value = !isDark.value),
    },
    {
      label: "USERNAME",
      avatar: {
        alt: sessionStore.sessionData.user.displayname ?? "Login",
      },
      click: () => {
        if (sessionStore.doesSessionIdExist) {
          navigateTo("/profile");
        } else {
          navigateTo("/profile/login");
        }
      },
    },
  ],
];
</script>

<template>
  <ClientOnly>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    >
      <template #default="{ link }">
        <span
          class="hover:scale-105 group-hover:text-primary relative hidden md:block first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white"
          >{{
            link.label === "USERNAME"
              ? (sessionStore.sessionData.user.displayname ?? "Login")
              : link.label
          }}</span
        >
      </template>
    </UHorizontalNavigation>
  </ClientOnly>
</template>
