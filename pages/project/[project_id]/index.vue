<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'project',
});

const route = useRoute();

navigateToSubroute(route.fullPath, 3, 'editor');
</script>

<template></template>
