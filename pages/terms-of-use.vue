<script setup lang="ts">
import { marked } from 'marked';

const markdownContent = ref('# Loading...');

onMounted(async () => {
  try {
    const response = await fetch('/terms_of_use.md');
    const text = await response.text();
    markdownContent.value = await marked(text);
  } catch (error) {
    console.error('Error loading Markdown file:', error);
  }
});
</script>

<template>
  <div
    class="prose prose-lg max-w-none bg-white px-16 py-8"
    v-html="markdownContent"
  ></div>
</template>
