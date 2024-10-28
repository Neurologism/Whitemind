<script lang="ts" setup>
import { Background } from '@vue-flow/background'
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="25" pattern-color="#898989" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>
