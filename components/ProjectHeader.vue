<script setup lang="ts">
const emit = defineEmits(["click-theme", "click-profile"]);

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
      click: () => navigateTo("/home"),
    },
    {
      label: "Editor",
      icon: "i-heroicons-document",
      to: "/project/editor",
    },
    {
      label: "Train",
      icon: "solar:dumbbell-outline",
      to: "/project/train",
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/project/settings",
    },
  ],
  [
    {
      label: "",
      icon: 'fluent:dark-theme-20-filled',
      click: () => (isDark.value = !isDark.value),
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
  <ClientOnly>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    >
      <template #default="{ link }">
        <span
          class="group-hover:text-primary relative hidden md:block first:text-lg first:font-semibold first:dark:text-white first:dark:group-hover:text-white"
          >{{ link.label }}</span
        >
      </template>
    </UHorizontalNavigation>
  </ClientOnly>
</template>
