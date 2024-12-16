<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();

const emit = defineEmits(['click-theme']);

const showProfileSlideover = ref(false);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const links = [
  [
    {
      label: 'Whitemind',
      click: () => navigateTo('/'),
    },
  ],
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'Tutorials',
      icon: 'i-heroicons-academic-cap',
      to: '/tutorials',
    },
    {
      label: 'Projects',
      icon: 'i-heroicons-folder',
      to: '/projects',
    },
  ],
  [
    {
      label: '',
      icon: 'fluent:dark-theme-20-filled',
      click: () => (isDark.value = !isDark.value),
    },
    {
      label: 'USERNAME',
      avatar: {
        alt: sessionStore.sessionData.user.displayname ?? 'Login',
      },
      click: () => {
        if (sessionStore.doesSessionIdExist) {
          navigateTo('/profile');
        } else {
          navigateTo('/profile/login');
        }
      },
    },
  ],
];
</script>

<template>
  <ClientOnly>
    <ProfileSlideover v-model="showProfileSlideover" />
    <div class="h-16"></div>
    <div
      class="border-b border-gray-200 dark:border-gray-800 flex items-center w-full z-50 fixed h-16"
    >
      <div
        @click="() => navigateTo('/')"
        class="hover:cursor-pointer grow-0 ml-1 sm:ml-3 lg:ml-5"
      >
        <NuxtImg
          src="/favicon-32x32.png"
          width="48"
          height="48"
          alt="Whitemind"
          class="drop-shadow-md group-hover:text-primary hover:bg-blend relative first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white p-2"
        />
      </div>

      <div class="flex-grow"></div>
      <UTooltip
        class="hover:cursor-pointer sm:mr-2"
        @click="() => (isDark = !isDark)"
        :text="isDark ? 'light theme' : 'dark theme'"
      >
        <UIcon name="fluent:dark-theme-20-filled" size="large" />
      </UTooltip>
      <div
        v-if="!sessionStore.doesSessionIdExist"
        class="ml-1 sm:ml-3 lg:ml-5 grow-0 mr-3 lg:mr-5"
      >
        <UButton
          to="/profile/login"
          variant="ghost"
          color="gray"
          class="mr-1 sm:mr-3 lg:mr-5"
        >
          Sign in
        </UButton>
        <UButton to="/profile/register" variant="solid" color="gray">
          Sign up
        </UButton>
      </div>

      <UTooltip class="mr-1 sm:mr-3 lg:mr-5 grow-0" v-else>
        <div
          class="hover:cursor-pointer grow-0 mr-1 sm:mr-3 lg:mr-5"
          @click="showProfileSlideover = !showProfileSlideover"
        >
          <UAvatar
            size="md"
            :alt="sessionStore.sessionData.user.displayname ?? ''"
          />
        </div>
      </UTooltip>
    </div>
  </ClientOnly>
  <!-- <ClientOnly>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    >
      <template #default="{ link }">
        <span
          class="group-hover:text-primary relative hidden md:block first:text-xl first:font-semibold first:dark:text-white first:dark:group-hover:text-white"
          >{{
            link.label === 'USERNAME'
              ? (sessionStore.sessionData.user.displayname ?? 'Login')
              : link.label
          }}</span
        >
      </template>
    </UHorizontalNavigation>
  </ClientOnly> -->
</template>
