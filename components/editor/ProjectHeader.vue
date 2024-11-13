<script setup lang="ts">

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

const toggleColorMode = () => {
  isDark.value = !isDark.value;
};

const props = defineProps<{
  projectTitle: string;
  projectOwner: string;
}>();

const breadcrumbSettings = [
    {
    label: 'Whitemind',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: props.projectOwner,
    icon: 'i-heroicons-user',
    to: '/profile'
  }, {
    label: props.projectTitle,
    icon: 'i-heroicons-folder',
}];

</script>


<template>
  <ClientOnly>
    <div class="border-b border-gray-200 dark:border-gray-800 h-16 flex flex-row items-center select-none">
      <div class="ml-3">
        <div class="rounded dark:bg-slate-900 bg-slate-100 border hover:scale-105">
          <ULink to="/"
                 class="group-hover:text-primary hover:bg-blend relative hidden md:block first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white p-2"
          >Whitemind<span class="text-primary">Editor</span></ULink>
        </div>
      </div>
      <div class="lg:ml-10 flex lg:mr-5">
        <UBreadcrumb :links="breadcrumbSettings"></UBreadcrumb>
      </div>
      <div class="flex-1 mr-2 ml-2 lg:mr-10 lg:ml-5">
        <slot />
      </div>
      <div class="mr-3 items-center flex flex-row">
        <div class="p-2 hover:scale-110 dark:bg-slate-900 hover:bg-slate-100 hover:cursor-pointer rounded" @click="toggleColorMode">
          <UIcon
              name="fluent:dark-theme-20-filled"
          />
        </div>
        <UTooltip
            class="ml-3"
          :text="`Show profile (${props.projectOwner})`"
        >
          <ULink to="/profile">
            <UAvatar class="hover:scale-110" size="md" :alt="projectOwner" />
          </ULink>
        </UTooltip>
      </div>
    </div>
  </ClientOnly>
</template>
