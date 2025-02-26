<script setup lang="ts">
const sessionStore = useSessionStore();

const emit = defineEmits(['click-theme']);

const showProfileSlideover = ref(false);

const colorMode = useColorMode();
// const isDark = computed({
//   get() {
//     return colorMode.value === 'dark';
//   },
//   set() {
//     colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
//   },
// });
</script>

<template>
  <ClientOnly>
    <ProfileSlideover v-model="showProfileSlideover" />
    <div
      class="backdrop-blur-md border-accent-8 flex items-center w-full z-50 fixed h-16"
      style="border-bottom-width: 0.5px"
    >
      <div
        @click="() => navigateTo('/')"
        class="hover:cursor-pointer grow-0 ml-1 sm:ml-3 lg:ml-5"
      >
        <NuxtImg
          src="/favicon-32x32.png"
          width="48"
          height="48"
          alt="WhiteMind"
          class="group-hover:text-primary hover:bg-blend relative first:text-xl first:font-semibold first:text-text-1 first:group-hover:text-text-1 p-2"
          style="filter: drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.5))"
        />
      </div>
      <div
        class="text-text-1 text-2xl font-semibold hover:cursor-pointer grow-0"
        style="filter: drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.5))"
        @click="() => navigateTo('/')"
      >
        WhiteMind
      </div>

      <div class="flex-grow"></div>
      <!-- <UTooltip
        class="hover:cursor-pointer sm:mr-2"
        @click="() => (isDark = !isDark)"
        :text="isDark ? 'light theme' : 'dark theme'"
      >
        <UIcon name="fluent:dark-theme-20-filled" size="large" />
      </UTooltip> -->
      <div
        v-if="!sessionStore.isAuthorized"
        class="ml-1 sm:ml-3 lg:ml-5 grow-0 mr-3 lg:mr-5"
      >
        <UButton
          to="/login"
          variant="ghost"
          color="gray"
          class="mr-1 sm:mr-3 lg:mr-5"
        >
          Sign in
        </UButton>
        <UButton to="/signup" variant="solid" color="gray"> Sign up </UButton>
      </div>

      <UTooltip class="mr-1 sm:mr-3 lg:mr-5 grow-0" v-else>
        <div
          class="hover:cursor-pointer grow-0 mr-1 sm:mr-3 lg:mr-5"
          @click="showProfileSlideover = !showProfileSlideover"
        >
          <UAvatar
            size="md"
            :src="sessionStore.hasPfp ? sessionStore.pfpUrl : '/user.svg'"
            :alt="sessionStore.sessionData.user.displayname ?? ''"
          />
        </div>
      </UTooltip>
    </div>
  </ClientOnly>
</template>
