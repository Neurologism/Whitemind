<script setup lang="ts">
const sessionStore = useSessionStore();

const textProgress = ref(0);
const inAnimation = ref(false);

function incrementTextProgress() {
  textProgress.value = textProgress.value + 1;
  if (textProgress.value < sessionStore.loadingText.length) {
    setTimeout(incrementTextProgress, 50);
  } else if (!sessionStore.loading) {
    fadeOut();
  } else {
    inAnimation.value = false;
  }
}

function decrementTextProgress() {
  textProgress.value = textProgress.value - 1;
  if (textProgress.value > 0) {
    setTimeout(
      decrementTextProgress,
      textProgress.value === sessionStore.loadingText.length - 1 ? 100 : 25
    );
  } else {
    gsap.killTweensOf('.typingCursor');
    gsap.to('.typingCursor', {
      duration: 0,
      opacity: 0,
    });
  }
}

function fadeIn() {
  gsap.killTweensOf('*');
  textProgress.value = 0;
  gsap.to('.frame', { duration: 0, opacity: 1 });
  gsap
    .timeline()
    .to('.whitemindLogo', { opacity: 1, duration: 1, ease: 'power1.out' }, '<')
    .from(
      '.whitemindLogo',
      {
        scale: 2,
        duration: 1,
        ease: 'power2.out',
      },
      '<'
    )
    .to('.frame', { backgroundColor: 'rgba(0, 0, 0, 1)', duration: 0 }, '<')
    .to('.whitemindLogo', {
      duration: 0.5,
      ease: 'power1.out',
      yoyo: true,
      repeat: -1,
      repeatDelay: 0,
    });

  setTimeout(() => {
    gsap.to('.typingCursor', {
      duration: 0,
      yoyo: true,
      repeat: -1,
      opacity: 1,
      repeatDelay: 0.3,
    });
    incrementTextProgress();
  }, 500);
}

function fadeOut() {
  gsap.killTweensOf('*');
  decrementTextProgress();

  gsap
    .timeline()
    .to('.frame', {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 0.5,
      ease: 'power4.out',
    })
    .to(
      '.whitemindLogo',
      { opacity: 0, duration: 0.5, ease: 'power4.out' },
      '<'
    );

  setTimeout(() => {
    gsap.to('.frame', { duration: 0, opacity: 0 });
    inAnimation.value = false;
  }, 500);
}

onMounted(() => {
  if (!sessionStore.loading) {
    gsap.set('.frame', { backgroundColor: 'rgba(0, 0, 0, 0)' });
  }
});

watch(
  () => sessionStore.loading,
  (loading) => {
    if (inAnimation.value) {
      return;
    }
    inAnimation.value = true;
    if (loading) {
      fadeIn();
    } else {
      fadeOut();
    }
  }
);
</script>
<template>
  <div
    class="frame z-[100] bg-bg-1 absolute w-screen h-screen justify-center flex"
    :class="{
      'pointer-events-none': !sessionStore.loading,
    }"
  >
    <div class="relative justify-center items-center my-auto">
      <NuxtImg
        src="/whitemindLogo.svg"
        width="128"
        height="128"
        class="whitemindLogo mx-auto opacity-0"
      />
      <h1 class="whitemindText text-4xl font-bold hidden">WhiteMind</h1>
      <div class="flex flex-row">
        <h3 class="text-2xl font-mono mt-4">
          {{ sessionStore.loadingText.slice(0, textProgress) }}
        </h3>
        <div class="typingCursor h-2 w-4 bg-text-1 mt-8 ml-1 opacity-0"></div>
      </div>
    </div>
  </div>
</template>
