<script setup lang="ts">
const showLoginModal = ref(false);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ProjectHeader />
    <div class="flex-grow">
    <slot class=""/>
    </div>
    <AppFooter/>
  </div>
</template>
