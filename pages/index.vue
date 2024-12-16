<script setup lang="ts">
const sessionStore = useSessionStore();
</script>

<template>
  <div class="py-32 sm:py-48 md:py-64 relative md:pb-24 h-screen">
    <div class="text-center relative">
      <h3
        class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white w-2/3 mx-auto"
      >
        Create powerful AI entirely codeless
      </h3>
      <div class="mt-10 justify-center gap-x-6 gap-y-3">
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="transition-transform transform delay-200 duration-700 hover:scale-125 px-4 py-2 md:px-6 md:py-3 text-lg font-semibold text-white"
          icon="i-heroicons-rocket-launch"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>
