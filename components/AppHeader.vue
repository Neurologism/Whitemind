<script setup lang="ts">
import { routerKey } from "vue-router";

const emit = defineEmits(["click-theme", "click-profile"]);

const links = [
  [
    {
      label: "Whitemind",
      click: () => navigateTo("/home"),
    },
  ],
  [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/home",
    },
    {
      label: "Create",
      icon: "i-heroicons-plus",
      to: `/project`,
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
      icon: "i-heroicons-moon",
      click: () => emit("click-theme"),
    },
    {
      label: "Profile",
      avatar: {
        src: "/testpfp.jpg",
      },
      click: () => emit("click-profile"),
    },
  ],
];
</script>

<template>
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 dark:border-gray-800"
  />
</template>
