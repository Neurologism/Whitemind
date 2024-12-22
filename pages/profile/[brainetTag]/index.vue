<script setup lang="ts">
const route = useRoute();
const brainetTag = ref<string>(route.params.brainetTag as string);
</script>

<template>
  <ProfileComponent :brainet-tag="brainetTag" />
</template>
