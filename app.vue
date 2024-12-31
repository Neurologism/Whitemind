<script setup lang="ts">
const route = useRoute();

const splitRoute = computed(() => route.path.split('/'));

const moveNotifications = computed((): boolean => {
  if (splitRoute.value.length <= 1) {
    return false;
  }
  return splitRoute.value[1] === 'tutorial';
});
</script>

<template>
  <div>
    <LoadingOverlay />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :class="{ 'mr-80': moveNotifications }" />
  </div>
</template>
