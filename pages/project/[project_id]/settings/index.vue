<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'project',
});

const route = useRoute();

navigateToSubroute(route.fullPath, 5, 'general');
</script>

<template>
  <div class="w-screen bg-slate-900" style="min-height: calc(100vh - 4rem)">
    <SettingsBase :in-project="true"> </SettingsBase>
  </div>
</template>
