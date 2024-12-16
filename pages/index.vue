<script setup lang="ts">
const sessionStore = useSessionStore();
</script>

<template>
  <div
    class="flex flex-col w-full overflow-scroll"
    style="background-image: linear-gradient(to bottom, #4c0090ff, #003ff0ff)"
  >
    <div class="panel flex relative">
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Unlock the power of AI creation
        </h2>
        <p class="text-2xl mt-4 text-slate-200">
          Turn your concepts into smart, AI-powered solutions effortlessly.
        </p>
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="transition-all px-4 py-2 md:px-6 md:py-3 text-lg font-semibold dark:text-white bg-blue-600 hover:bg-blue-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Sign up
        </UButton>
      </div>

      <UIcon
        name="tabler:bulb-filled"
        class="absolute"
        style="font-size: 15rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="fluent:brain-circuit-20-filled"
        class="absolute"
        style="font-size: 15rem; top: 10vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="mage:robot-uwu-fill"
        class="absolute"
        style="font-size: 10rem; bottom: 15vh; right: 20vw"
      ></UIcon>
    </div>

    <div class="panel flex relative">
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 30%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Create AI without coding skills
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          Whitemind lets anyone create advanced AI models <br />
          with an intuitive drag-and-drop interface.
        </p>
      </div>

      <UIcon
        name="mdi:puzzle"
        class="absolute"
        style="
          font-size: 10rem;
          bottom: calc(20vh - 6rem);
          left: calc(26vw - 6rem);
        "
      ></UIcon>
      <UIcon
        name="mdi:puzzle"
        class="absolute"
        style="font-size: 10rem; bottom: 20vh; left: calc(26vw - 6rem)"
      ></UIcon>
      <UIcon
        name="mdi:puzzle"
        class="absolute"
        style="font-size: 10rem; bottom: 20vh; left: 26vw"
      ></UIcon>
      <UIcon
        name="mingcute:code-fill"
        class="absolute"
        style="font-size: 10rem; top: 12vh; right: 28vw"
      ></UIcon>
      <UIcon
        name="mage:mouse-pointer-fill"
        class="absolute"
        style="font-size: 20rem; bottom: 14vh; right: 14vw"
      ></UIcon>
    </div>

    <div class="panel flex relative">
      <div
        class="absolute w-1/2 text-left"
        style="top: 40%; left: 60%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          No need for <br />
          expensive hardware
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          Whitemind provides cloud-based infrastructure, so you can build <br />
          powerful AI without the need for costly equipment.
        </p>
      </div>

      <UIcon
        name="mdi:cloud"
        class="absolute"
        style="
          font-size: 10rem;
          bottom: calc(20vh - 6rem);
          left: calc(26vw - 6rem);
        "
      ></UIcon>
      <UIcon
        name="mdi:server"
        class="absolute"
        style="font-size: 10rem; top: 4vh; right: 28vw"
      ></UIcon>
      <UIcon
        name="ph:graphics-card-fill"
        class="absolute"
        style="font-size: 20rem; bottom: 14vh; right: 14vw"
      ></UIcon>
    </div>

    <div class="panel flex relative">
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Learn with easy-to-follow tutorials
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          Access step-by-step tutorials that make complex AI concepts easy to
          grasp.
        </p>
      </div>

      <UIcon
        name="fluent:hat-graduation-12-filled"
        class="absolute"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="mage:book-fill"
        class="absolute"
        style="font-size: 10rem; top: 10vh; right: 8vw"
      ></UIcon>
    </div>

    <div class="panel flex relative">
      <div
        class="absolute w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Built on leading tensorflow technology
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          Whitemind leverages TensorFlow, one of the most powerful AI
          frameworks, ensuring your models are cutting-edge.
        </p>
        <UButton
          :to="
            sessionStore.doesSessionIdExist ? '/profile' : '/profile/register'
          "
          class="px-4 py-2 md:px-6 md:py-3 text-lg font-semibold dark:text-white bg-purple-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Get Started
        </UButton>
      </div>

      <UIcon
        name="cib:tensorflow"
        class="absolute"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="eos-icons:rotating-gear"
        class="absolute"
        style="font-size: 10rem; top: 10vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="iconoir:network-right-solid"
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
