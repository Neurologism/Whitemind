<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';
const route = useRoute();

const tabs = [
  {
    label: 'Editor',
    icon: 'carbon:model-builder',
  },
  {
    label: 'Models',
    icon: 'mdi:cube-outline',
  },
  {
    label: 'Settings',
    icon: 'mdi:settings-outline',
  },
];
</script>

<template>
  <div class="w-screen flex flex-row absolute">
    <div
      class="bg-slate-800 flex flex-row mx-auto pointer-events-auto z-10 border-b-2 border-x-2 border-slate-600 rounded-b-full px-6 select-none"
    >
      <div
        @click="navigateToSubroute(route.fullPath, 3, 'editor')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4 flex flex-row items-center"
      >
        <UIcon name="carbon:model-builder" class="mr-1"></UIcon>
        Editor
      </div>
      <div
        @click="navigateToSubroute(route.fullPath, 3, 'models')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4 flex flex-row items-center"
      >
        <UIcon name="mdi:cube" class="mr-1"></UIcon>
        Models
      </div>
      <div
        @click="navigateToSubroute(route.fullPath, 3, 'settings')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4 flex flex-row items-center"
      >
        <UIcon name="mdi:settings-outline" class="mr-1"></UIcon> Settings
      </div>
    </div>
  </div>
</template>
