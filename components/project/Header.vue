<script setup lang="ts">
const emit = defineEmits(['click-theme']);

const isOpen = ref(false);

const tutorialStore = useTutorialStore();
const sessionStore = useSessionStore();
const projectStore = useProjectStore();

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
  projectOwner: string;
}>();

const breadcrumbSettings = computed(() => {
  return tutorialStore.openInEditor
    ? [
        {
          label: 'WhiteMind',
          icon: 'i-heroicons-home',
          to: '/',
        },
        {
          label: 'Tutorials',
          icon: 'i-heroicons-academic-cap',
          to: '/tutorials',
        },
        {
          label: projectStore.project?.data.name ?? '',
          icon: 'i-heroicons-folder',
        },
      ]
    : [
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
          label: projectStore.project?.data.name ?? '',
          icon: 'i-heroicons-folder',
        },
      ];
});
</script>

<template>
  <ClientOnly>
    <div
      class="bg-bg-3 border-b-2 border-accent-6 h-16 flex flex-row flex-nowrap items-center select-none"
    >
      <div class="ml-3 hidden md:block">
        <div class="rounded bg-bg-2 border">
          <ULink
            to="/"
            class="group-hover:text-primary hover:bg-blend first:text-xl first:font-semibold first:text-text-1 first:group-hover:text-text-1 p-2"
            >WhiteMind<span class="text-primary">Editor</span></ULink
          >
        </div>
      </div>
      <div class="ml-3 md:hidden mr-2">
        <img
          src="/whitemindLogo.svg"
          alt="WhiteMind Icon"
          style="width: 30px; height: 30px; min-width: 30px; min-height: 30px"
        />
      </div>
      <div class="lg:ml-10 flex lg:mr-5">
        <UBreadcrumb :links="breadcrumbSettings"></UBreadcrumb>
      </div>
      <div class="flex-1 mr-2 ml-2 lg:mr-10 lg:ml-5">
        <slot />
      </div>
      <div class="mr-3 items-center flex flex-row">
        <!-- <div class="p-2 hover:cursor-pointer rounded" @click="toggleColorMode">
          <UIcon name="fluent:dark-theme-20-filled" />
        </div> -->
        <UTooltip class="ml-3" :text="`Show profile (${props.projectOwner})`">
          <!-- <ULink to="/profile">
          </ULink> -->
          <UButton variant="ghost" @click="isOpen = !isOpen">
            <UAvatar
              size="md"
              :alt="projectOwner"
              :src="sessionStore.hasPfp ? sessionStore.pfpUrl : '/user.svg'"
            />
          </UButton>
          <ProfileSlideover v-model="isOpen" />
        </UTooltip>
      </div>
    </div>
    <ProjectTabsBar></ProjectTabsBar>
  </ClientOnly>
</template>
