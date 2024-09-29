<script setup lang="ts">
const showLoginModal = ref(false);
</script>

<template>
  <div>
    <AppHeader @click-profile="showLoginModal = true" />
    <slot />
    <AppFooter />

    <LoginModal
      @toggle="(n) => (showLoginModal = n)"
      :showModalProp="showLoginModal"
    />
  </div>
</template>
