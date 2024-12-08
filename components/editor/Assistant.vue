<script setup lang="ts">
import { ref } from 'vue';

const showSpeechBubble = ref(false);
const speechBubbleContent = ref("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

function toggleSpeechBubble() {
  showSpeechBubble.value = !showSpeechBubble.value;
}
</script>

<template>
  <div class="relative rounded-full w-12 h-12 border flex items-center justify-center" @click="toggleSpeechBubble">
    <img src="/assets/img/test.jpg" alt="Assistant" class="w-full h-full object-cover rounded-full" />
    <div v-if="showSpeechBubble" class="speech-bubble border-2 border-customPrimary-900">
      {{ speechBubbleContent }}
    </div>
  </div>
</template>

<style scoped>
.speech-bubble {
  position: absolute;
  bottom: 100%;
  right: 0;
  transform: translateY(-10px);
  background-color: rgba(16, 22, 73, 0.9);
  border: 1px solid #4682b4; /* Steel Blue */
  padding: 10px;
  border-radius: 10px;
  width: max-content;
  max-width: 25vw;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 10px;
  transform: translateY(0);
  border-width: 10px;
  border-style: solid;
  border-color: #4682b4 transparent transparent transparent;
}
</style>