<script setup lang="ts">
definePageMeta({
  layout: 'project',
});
</script>

<template>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase :in-project="true">
      <SettingsHeader>Appearance</SettingsHeader>
    </SettingsBase>
  </div>
</template>
