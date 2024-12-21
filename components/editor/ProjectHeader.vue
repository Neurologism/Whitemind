<script setup lang="ts">
const emit = defineEmits(['click-theme']);

const isOpen = ref(false);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const toggleColorMode = () => {
  isDark.value = !isDark.value;
};

const props = defineProps<{
  projectTitle: string;
  projectOwner: string;
}>();

const breadcrumbSettings = computed(() => [
  {
    label: 'WhiteMind',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: props.projectOwner,
    icon: 'i-heroicons-user',
    to: '/profile',
  },
  {
    label: props.projectTitle,
    icon: 'i-heroicons-folder',
  },
]);
</script>

<template>
  <ClientOnly>
    <div
      class="bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 h-16 flex flex-row items-center select-none"
    >
      <div class="ml-3">
        <div class="rounded dark:bg-slate-900 bg-slate-100 border">
          <ULink
            to="/"
            class="group-hover:text-primary hover:bg-blend relative hidden md:block first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white p-2"
            >WhiteMind<span class="text-primary">Editor</span></ULink
          >
        </div>
      </div>
      <div class="lg:ml-10 flex lg:mr-5">
        <UBreadcrumb :links="breadcrumbSettings"></UBreadcrumb>
      </div>
      <div class="flex-1 mr-2 ml-2 lg:mr-10 lg:ml-5">
        <slot />
      </div>
      <div class="mr-3 items-center flex flex-row">
        <div class="p-2 hover:cursor-pointer rounded" @click="toggleColorMode">
          <UIcon name="fluent:dark-theme-20-filled" />
        </div>
        <UTooltip class="ml-3" :text="`Show profile (${props.projectOwner})`">
          <!-- <ULink to="/profile">
          </ULink> -->
          <UButton variant="ghost" @click="isOpen = !isOpen">
            <UAvatar size="md" :alt="projectOwner" />
          </UButton>
          <ProfileSlideover v-model="isOpen" />
        </UTooltip>
      </div>
    </div>
  </ClientOnly>
</template>
