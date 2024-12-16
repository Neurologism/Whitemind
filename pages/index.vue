<script setup lang="ts">
const sessionStore = useSessionStore();
</script>

<template>
  <div class="flex flex-col w-full overflow-scroll">
    <div
      class="panel flex relative"
      style="background-image: linear-gradient(to bottom, #4c0090ff, #003ff0ff)"
    >
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Create powerful AI entirely codeless
        </h2>
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="px-4 py-2 md:px-6 md:py-3 text-lg font-semibold text-white bg-purple-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Get Started
        </UButton>
      </div>

      <UIcon
        name="tabler:bulb-filled"
        class="absolute"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="fluent:brain-circuit-20-filled"
        class="absolute"
        style="font-size: 10rem; top: 10vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="mage:robot-uwu-fill"
        class="absolute"
        style="font-size: 10rem; bottom: 15vh; right: 20vw"
      ></UIcon>
    </div>

    <div
      class="panel flex relative"
      style="background-image: linear-gradient(to bottom, #4c0090ff, #003ff0ff)"
    >
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Create powerful AI entirely codeless
        </h2>
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="px-4 py-2 md:px-6 md:py-3 text-lg font-semibold text-white bg-purple-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Get Started
        </UButton>
      </div>

      <UIcon
        name="tabler:bulb-filled"
        class="absolute"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="fluent:brain-circuit-20-filled"
        class="absolute"
        style="font-size: 10rem; top: 10vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="mage:robot-uwu-fill"
        class="absolute"
        style="font-size: 10rem; bottom: 15vh; right: 20vw"
      ></UIcon>
    </div>

    <div
      class="panel flex relative"
      style="background-image: linear-gradient(to bottom, #4c0090ff, #003ff0ff)"
    >
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Create powerful AI entirely codeless
        </h2>
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="px-4 py-2 md:px-6 md:py-3 text-lg font-semibold text-white bg-purple-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Get Started
        </UButton>
      </div>

      <UIcon
        name="tabler:bulb-filled"
        class="absolute"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="fluent:brain-circuit-20-filled"
        class="absolute"
        style="font-size: 10rem; top: 10vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="mage:robot-uwu-fill"
        class="absolute"
        style="font-size: 10rem; bottom: 15vh; right: 20vw"
      ></UIcon>
    </div>
  </div>
</template>

<style scoped>
.panel {
  height: calc(100vh - 4rem);
}
</style>
