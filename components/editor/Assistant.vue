<script setup lang="ts">
const showSpeechBubble = ref(true);

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
    class="relative rounded-full w-16 h-16 border border-slate-800 flex items-center justify-center"
  >
    <img
      :src="`/tutorialNarrators/${tutorialStore.currentNarrator}.png`"
      alt="Narrator"
      class="w-full h-full object-cover rounded-full cursor-pointer"
      @click="toggleSpeechBubble"
    />
    <UCard v-if="showSpeechBubble" class="speech-bubble text-white">
      <slot name="content">
        {{ tutorialStore.tutorial.data?.steps[tutorialStore.visibleStep].text }}
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
          :disabled="
            tutorialStore.tutorial.data === null
              ? true
              : tutorialStore.visibleStep ===
                tutorialStore.tutorial.data.steps.length - 1
          "
          icon="i-heroicons-chevron-right"
          variant="ghost"
          @click="stepForward"
        ></UButton>
      </div>
      <div class="mt-4">
        <UButton
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
