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
      icon: isDark.value ? "i-heroicons-moon-solid" : "i-heroicons-sun-solid",
      click: () => isDark.value = !isDark.value,
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
          class="group-hover:text-primary relative hidden md:block first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white"
          >{{ link.label }}</span
        >
      </template>
    </UHorizontalNavigation>
  </ClientOnly>
</template>
