<script setup lang="ts">
const showSpeechBubble = ref(true);

const tutorialStore = useTutorialStore();
const sessionStore = useSessionStore();

const disableNextStepButton = computed(() => {
  return tutorialStore.tutorial.data === null
    ? true
    : tutorialStore.visibleStep ===
        tutorialStore.tutorial.data.steps.length - 1 ||
        (tutorialStore.visibleStep === tutorialStore.tutorial.currentStep &&
          !tutorialStore.isNextStepUnlocked);
});

function toggleSpeechBubble() {
  showSpeechBubble.value = !showSpeechBubble.value;
}

function stepForward() {
  tutorialStore.stepForward();
}

function stepBack() {
  tutorialStore.stepBack();
}

function onNextTutorial() {
  sessionStore.showLoadingAnimation('Loading...');
  navigateTo(`/tutorial/${tutorialStore.tutorial.data?.nextTutorials[0]}`);
}

function onRestartTutorial() {
  // TODO
}

watch(showSpeechBubble, () => {
  if (showSpeechBubble.value) {
    gsap.to('.speech-bubble', {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  } else {
    gsap.to('.speech-bubble', {
      x: 500,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
});
</script>

<template>
  <div
    class="relative rounded-fullborder border-slate-800 flex items-center justify-center"
  >
    <div class="flex flex-row items-end space-x-4">
      <UTooltip text="Restart Tutorial"
        ><UButton
          color="primary"
          class="w-12 h-12"
          :ui="{ rounded: 'rounded-full' }"
          @click="onRestartTutorial"
        >
          <UIcon
            name="mdi:restart"
            class="text-3xl my-auto mx-auto"
          ></UIcon> </UButton
      ></UTooltip>
      <UTooltip
        text="Next Tutorial"
        v-if="tutorialStore.tutorial.tutorialCompleted"
        ><UButton
          color="green"
          class="w-12 h-12"
          :ui="{ rounded: 'rounded-full' }"
          @click="onNextTutorial"
        >
          <UIcon
            name="mdi:chevron-triple-right"
            class="text-3xl my-auto mx-auto"
          ></UIcon> </UButton
      ></UTooltip>

      <img
        :src="`/tutorialNarrators/${tutorialStore.currentNarrator}.png`"
        alt="Narrator"
        class="w-16 h-16 object-cover rounded-full cursor-pointer"
        @click="toggleSpeechBubble"
      />
    </div>
    <UCard
      class="speech-bubble text-white min-w-[350px] max-w-[500px] absolute"
    >
      <slot name="content">
        <span class="font-mono text-sm leading-none">
          {{
            tutorialStore.tutorial.data?.steps[tutorialStore.visibleStep].text
          }}
        </span>
      </slot>
      <div class="flex flex-row space-x-2 mt-4">
        <UButton
          :disabled="tutorialStore.visibleStep === 0"
          icon="i-heroicons-chevron-left"
          variant="ghost"
          @click="stepBack"
        ></UButton>
        <UProgress class="flex-grow my-auto" :value="tutorialStore.progress" />
        <UButton
          :disabled="disableNextStepButton"
          :icon="
            disableNextStepButton &&
            tutorialStore.visibleStep + 1 !==
              tutorialStore.tutorial.data?.steps.length
              ? 'mdi:lock'
              : 'i-heroicons-chevron-right'
          "
          variant="ghost"
          @click="stepForward"
          :class="{
            hidden:
              tutorialStore.visibleStep ===
              tutorialStore.tutorial.data?.steps.length
                ? tutorialStore.tutorial.data?.steps.length - 1
                : false,
          }"
        ></UButton>
      </div>
      <div class="w-full text-center mt-[-16px] text-gray-400">
        <span class="text-xs">
          {{ tutorialStore.visibleStep + 1 }} /
          {{ tutorialStore.tutorial.data?.steps.length }}
        </span>
      </div>
      <div class="mt-4">
        <UButton
          color="green"
          @click="onNextTutorial"
          class="w-full"
          :ui="{ rounded: 'rounded-full' }"
          v-if="
            tutorialStore.tutorial.data === null
              ? true
              : tutorialStore.visibleStep ===
                tutorialStore.tutorial.data.steps.length - 1
          "
        >
          <span class="ml-auto"> Next Tutorial</span>
          <UIcon
            name="mdi:chevron-triple-right"
            class="text-2xl mr-auto mt-[1px]"
          ></UIcon>
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.speech-bubble {
  bottom: 100%;
  right: 0;
  transform: translateY(-16px);
  background-color: rgba(16, 22, 73, 0.9);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 20px;
  transform: translateY(0);
  border-width: 12px;
  border-style: solid;
  border-color: #4682b4 transparent transparent transparent;
}
</style>
