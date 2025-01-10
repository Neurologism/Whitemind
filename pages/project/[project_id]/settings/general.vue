<script setup lang="ts">
definePageMeta({
  layout: 'project',
});
</script>

<template>
  <div class="w-screen bg-slate-900" style="min-height: calc(100vh - 4rem)">
    <Settings :in-project="true"> </Settings>
  </div>
</template>
