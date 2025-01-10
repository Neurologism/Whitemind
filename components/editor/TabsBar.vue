<script setup lang="ts">
const route = useRoute();

function navigateToSubroute(text: string) {
  console.log(route.fullPath);
  navigateTo(route.fullPath.split('/').slice(0, 3).join('/') + '/' + text);
}

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
        @click="navigateToSubroute('editor')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4"
      >
        <UIcon name="carbon:model-builder"></UIcon>
        Editor
      </div>
      <div
        @click="navigateToSubroute('models')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4"
      >
        <UIcon name="mdi:cube"></UIcon>
        Models
      </div>
      <div
        @click="navigateToSubroute('settings')"
        variant="ghost"
        color="gray"
        size="xl"
        class="h-full cursor-pointer text-slate-200 hover:text-white transition-all duration-100 py-2 px-4"
      >
        <UIcon name="mdi:settings-outline"></UIcon>
        Settings
      </div>
    </div>
  </div>
</template>
