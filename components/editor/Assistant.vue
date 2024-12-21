<script setup lang="ts">
const showSpeechBubble = ref(false);

function toggleSpeechBubble() {
  showSpeechBubble.value = !showSpeechBubble.value;
}

const tutorialStore = useTutorialStore();

function stepForward() {
  tutorialStore.stepForward();
}

function stepBack() {
  tutorialStore.stepBack();
}
</script>

<template>
  <div
    class="relative rounded-full w-16 h-16 border flex items-center justify-center"
  >
    <img
      src="/assets/img/test.jpg"
      alt="Assistant"
      class="w-full h-full object-cover rounded-full"
      @click="toggleSpeechBubble"
    />
    <UCard v-if="showSpeechBubble" class="speech-bubble text-white">
      <slot name="content">
        {{
          tutorialStore.tutorial.data?.steps[tutorialStore.tutorial.currentStep]
            .text
        }}
      </slot>
      <br /><br />
      <UButton
        :disabled="tutorialStore.tutorial.currentStep === 0"
        icon="i-heroicons-chevron-left"
        variant="ghost"
        @click="stepBack"
      ></UButton>
      <UButton
        :disabled="
          tutorialStore.tutorial.data === null
            ? true
            : tutorialStore.tutorial.currentStep ===
              tutorialStore.tutorial.data.steps.length - 1
        "
        icon="i-heroicons-chevron-right"
        variant="ghost"
        @click="stepForward"
      ></UButton>
    </UCard>
  </div>
</template>

<style scoped>
.speech-bubble {
  position: absolute;
  bottom: 100%;
  right: 0;
  transform: translateY(-16px);
  background-color: rgba(16, 22, 73, 0.9);
  min-width: 300px;
  max-width: 500px;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 10px;
  transform: translateY(0);
  border-width: 12px;
  border-style: solid;
  border-color: #4682b4 transparent transparent transparent;
}
</style>
