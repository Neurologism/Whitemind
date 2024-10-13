<script setup lang="ts">
const showLoginModal = ref(false);
</script>

<template>
  <div class="flex flex-col h-screen">
    <AppHeader @click-profile="showLoginModal = true" />
    <div class="flex-grow">
      <slot />
    </div>
    <AppFooter/>
  </div>
</template>
