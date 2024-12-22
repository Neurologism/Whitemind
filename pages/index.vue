<script setup lang="ts">
import { current } from 'tailwindcss/colors';
import BrainCircuit20Filled from '~/components/icon/BrainCircuit20Filled.vue';

definePageMeta({
  layout: 'plain',
});

const sessionStore = useSessionStore();

function onMouseMove(event: MouseEvent) {
  if (window.innerWidth < 1280) return;

  const { clientX, clientY } = event;

  const movementFactor = 50;
  const x = (clientX / window.innerWidth) * movementFactor * 0.5;
  const y = (clientY / window.innerHeight) * movementFactor;

  gsap.to('.text1', {
    x: -x * 0.2,
    y: -y * 0.2,
    duration: 2,
    ease: 'power3.out',
  });

  gsap.to('.text2', {
    x: -x * 0.3,
    y: -y * 0.3,
    duration: 2,
    ease: 'power3.out',
  });
  gsap.to('.text3', {
    x: -x * 0.4,
    y: -y * 0.4,
    duration: 2,
    ease: 'power3.out',
  });

  gsap.to('.icon2-0', {
    x: -x * 1.5,
    y: -y * 1.5,
    duration: 2,
    ease: 'power3.out',
  });
  gsap.to('.icon2-1', {
    x: -x * 0.5,
    y: -y * 0.5,
    duration: 2,
    ease: 'power3.out',
  });

  gsap.to('.icon3-0', {
    x: -x * 1.0,
    y: -y * 1.0,
    duration: 2,
    ease: 'power3.out',
  });

  gsap.to('.icon3-1', {
    x: -x * 0.5,
    y: -y * 0.5,
    duration: 2,
    ease: 'power3.out',
  });
}

onMounted(() => {
  initGsap();
});

function initGsap() {
  const matchMedia = gsap.matchMedia();

  matchMedia.add('(min-width: 1280px)', () => {
    gsap
      .timeline()
      .from('.text1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
      })
      .from(
        '.text2',
        {
          duration: 1,
          y: 100,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        '.icon2',
        {
          duration: 1,
          x: 200,
          y: 50,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        '.icon3',
        {
          duration: 2,
          rotation: 180,
          opacity: 0,
          ease: 'elastic.out',
        },
        '-=0.5'
      )
      .from('.text3', {
        duration: 3,
        opacity: 0,
        ease: 'power3.out',
      });
  });

  matchMedia.add('(max-width: 1279px)', () => {
    gsap
      .timeline()
      .from('.text1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
      })
      .from(
        '.text2',
        {
          duration: 1,
          y: 100,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        '.icon3',
        {
          duration: 2,
          rotation: 180,
          opacity: 0,
          ease: 'elastic.out',
        },
        '-=0.5'
      )
      .from('.text3', {
        duration: 3,
        opacity: 0,
        ease: 'power3.out',
      });
  });

  matchMedia.add('(min-width: 1280px)', () => {
    gsap.from('.puzzle1', {
      scrollTrigger: {
        trigger: '.mainpanel',
        start: '20% center',
        end: '26% center',
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      ease: 'none',
      duration: 1,
    });

    gsap.from('.puzzle2', {
      scrollTrigger: {
        trigger: '.mainpanel',
        start: '26% center',
        end: '32% center',
        scrub: 1,
      },
      opacity: 0,
      y: -200,
      ease: 'none',
      duration: 1,
    });

    gsap.from('.puzzle3', {
      scrollTrigger: {
        trigger: '.mainpanel',
        start: '32% center',
        end: '38% center',
        scrub: 1,
      },
      opacity: 0,
      x: 200,
      ease: 'none',
      duration: 1,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.text4',
          start: 'bottom bottom',
        },
      })
      .to('.text4', {
        opacity: 1,
        ease: 'power3.out',
        duration: 1,
      })
      .from(
        '.text4',
        {
          y: 100,
          ease: 'power3.out',
          duration: 1,
        },
        '-=1'
      )
      .to(
        '.text5',
        {
          opacity: 1,
          ease: 'power3.out',
          duration: 1,
        },
        '-=0.5'
      )
      .from(
        '.text5',
        {
          y: 100,
          ease: 'power3.out',
          duration: 1,
        },
        '-=1'
      );
  });
  matchMedia.add('(max-width: 1279px)', () => {});

  gsap.from('.panel2', {
    scrollTrigger: {
      trigger: '.panel2',
      pin: true,
      start: 'center center',
      end: 'bottom top',
    },
    ease: 'none',
  });

  gsap.from('.icon4', {
    scrollTrigger: {
      trigger: '.mainpanel',
      start: '24% center',
      end: '38% center',
      scrub: 1,
    },
    opacity: 0,
    x: -200,
    ease: 'none',
    duration: 1,
  });

  gsap.to('.panel3', {
    scrollTrigger: {
      trigger: '.panel3',
      pin: true,
      start: 'center center',
      end: 'bottom top',
      scrub: 1,
    },
    x: '-100%',
    ease: 'none',
  });

  gsap.from('.panel4', {
    scrollTrigger: {
      trigger: '.panel4',
      pin: true,
      start: 'center center',
      end: 'bottom top',
      scrub: 1,
    },
    x: '100%',
    ease: 'none',
  });
}
</script>

<template>
  <AppHeader />
  <div class="h-16 bg-black"></div>
  <div
    class="mainpanel flex flex-col w-full overflow-hidden bg-black"
    @mousemove="onMouseMove"
  >
    <!-- style="background-image: linear-gradient(to bottom, #340062ff, #003ff0ff)" -->
    <div class="panel1 panel flex relative">
      <div
        class="absolute w-2/3 md:w-1/2 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text1 text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Unlock the power of AI creation
        </h2>
        <p class="text2 text-xl lg:text-2xl mt-4 text-slate-200">
          Turn your concepts into smart, AI-powered solutions effortlessly.
        </p>
        <UButton
          :to="sessionStore.isAuthorized ? '/profile' : '/signup'"
          class="text3 px-4 py-2 md:px-6 md:py-3 text-lg font-semibold dark:text-white bg-blue-600 hover:bg-blue-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Sign up for WhiteMind
        </UButton>
        <UIcon
          name="mage:robot-uwu-fill"
          class="icon3 icon3-0 mt-14 xl:hidden text"
          style="font-size: 10rem"
        ></UIcon>
      </div>

      <UIcon
        name="fluent:brain-circuit-20-filled"
        class="absolute icon2 icon2-0 hidden xl:block z-10"
        style="font-size: 15rem; top: 50vh; left: 10vw"
      ></UIcon>
      <BrainCircuit20Filled
        size="225"
        class="icon2 icon2-1 hidden xl:block absolute text-blue-500 blur-sm"
        style="top: calc(50vh - 8px); left: calc(10vw - 8px); font-size: 10rem"
      />
      <UIcon
        name="mage:robot-uwu-fill"
        class="icon3 icon3-0 hidden xl:block absolute z-10"
        style="bottom: 50vh; right: 10vw; font-size: 10rem"
      ></UIcon>
      <!-- <UIcon
        name="mdi:circle"
        class="icon3 icon3-0 hidden xl:block absolute text-blue-500"
        style="bottom: 52vh; right: 11vw; font-size: 7rem"
      ></UIcon> -->

      <IconRobotUwuFill
        size="150"
        class="icon3 icon3-1 hidden xl:block absolute text-blue-500 blur-sm"
        style="
          bottom: calc(50vh + 8px);
          right: calc(10vw + 8px);
          font-size: 10rem;
        "
      />
    </div>

    <div class="panel2 panel flex relative">
      <div
        class="absolute w-2/3 md:w-1/2 text-center left-1/2 xl:left-1/3 mt-16 xl:mt-0"
        style="top: 40%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white xl:opacity-0"
        >
          Create AI without coding skills
        </h2>
        <p class="text5 text-2xl mt-4 text-slate-300 xl:opacity-0">
          WhiteMind lets anyone create advanced AI models <br />
          with an intuitive drag-and-drop interface.
        </p>
        <UIcon
          name="mingcute:code-fill"
          class="icon4 mt-16 text xl:hidden"
          style="font-size: 12rem"
        ></UIcon>
      </div>

      <UIcon
        name="mdi:puzzle"
        class="absolute puzzle1 hidden xl:block"
        style="font-size: 15rem; bottom: 26vh; right: 20vw"
      ></UIcon>
      <UIcon
        name="mdi:puzzle"
        class="absolute puzzle2 hidden xl:block"
        style="font-size: 15rem; bottom: calc(26vh + 9rem); right: calc(20vw)"
      ></UIcon>
      <UIcon
        name="mdi:puzzle"
        class="absolute puzzle3 hidden xl:block"
        style="
          font-size: 15rem;
          bottom: calc(26vh + 9rem);
          right: calc(20vw - 9rem);
        "
      ></UIcon>
      <UIcon
        name="mingcute:code-fill"
        class="absolute icon4 hidden xl:block"
        style="font-size: 10rem; bottom: 12vh; left: 28vw"
      ></UIcon>
      <UIcon
        name="mage:mouse-pointer-fill"
        class="absolute icon5 opacity-0 hidden xl:block"
        style="font-size: 20rem; bottom: 14vh; right: 14vw"
      ></UIcon>
    </div>
    <div class="panel3 panel flex relative">
      <div
        class="absolute w-2/3 md:w-1/2 text-left text6 left-1/2"
        style="top: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          No need for expensive hardware
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          WhiteMind provides cloud-based infrastructure, so you can build
          powerful AI without the need for costly equipment.
        </p>
      </div>

      <UIcon
        name="mdi:server"
        class="absolute hidden xl:block"
        style="
          font-size: 15rem;
          bottom: calc(24vh - 6rem);
          left: calc(10vw - 6rem);
        "
      ></UIcon>
      <UIcon
        name="mdi:cloud"
        class="absolute opacity-0 hidden xl:block"
        style="font-size: 10rem; top: 4vh; right: 28vw"
      ></UIcon>
      <UIcon
        name="ph:graphics-card-fill"
        class="absolute hidden xl:block"
        style="font-size: 20rem; bottom: 56vh; right: 11vw"
      ></UIcon>
    </div>

    <div class="panel4 panel flex relative">
      <div
        class="absolute w-2/3 md:w-1/2 text-left text6 left-1/2"
        style="top: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text7 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Learn with easy-to-follow tutorials
        </h2>
        <p class="text7 text-2xl mt-4 text-slate-300">
          Access step-by-step tutorials that make complex AI concepts easy to
          grasp.
        </p>
      </div>

      <UIcon
        name="fluent:hat-graduation-12-filled"
        class="absolute hidden xl:block"
        style="font-size: 15rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="mage:book-fill"
        class="absolute hidden xl:block"
        style="font-size: 15rem; top: 10vh; right: 8vw"
      ></UIcon>
    </div>

    <div class="panel5 panel flex relative">
      <div
        class="absolute w-2/3 text-center"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
      >
        <h2
          class="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto"
        >
          Built on leading technology
        </h2>
        <p class="text-2xl mt-4 text-slate-300">
          WhiteMind leverages Keras, a high-level neural networks API, utilizing
          several state-of-the-art deep learning frameworks such as TensorFlow,
          Theano and CNTK, to deliver highly efficient and scalable AI
          solutions.
        </p>
        <UButton
          :to="sessionStore.isAuthorized ? '/profile' : '/signup'"
          class="px-4 py-2 md:px-6 md:py-3 text-lg font-semibold dark:text-white bg-purple-700 mt-8"
          icon="i-heroicons-rocket-launch-solid"
          :color="'none' as any"
        >
          Get Started
        </UButton>
      </div>

      <UIcon
        name="cib:tensorflow"
        class="absolute hidden xl:block"
        style="font-size: 10rem; top: 50vh; left: 10vw"
      ></UIcon>
      <UIcon
        name="eos-icons:rotating-gear"
        class="absolute hidden xl:block"
        style="font-size: 10rem; top: 6vh; right: 8vw"
      ></UIcon>
      <UIcon
        name="cib:keras"
        class="absolute hidden xl:block"
        style="font-size: 10rem; bottom: 15vh; right: 20vw"
      ></UIcon>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.panel {
  height: calc(100vh - 4rem);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.panel2 {
  margin-bottom: calc(100vh - 4rem);
}

.panel4 {
  margin-top: calc(4rem - 100vh);
  margin-bottom: calc(100vh - 4rem);
}

.mainpanel {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
