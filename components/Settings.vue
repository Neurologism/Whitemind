<script setup lang="ts">
const props = defineProps({
  inProject: { type: Boolean, required: true },
});

const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.loading = false;
  sessionStore.syncLocalSessionData();
  if (!sessionStore.isAuthorized) {
    navigateTo('/login');
  }
});

const settingsItems = props.inProject
  ? [
      {
        label: 'Appearance',
        click: () => navigateTo('/settings/public'),
        icon: 'mdi:user-outline',
      },
    ]
  : [
      {
        label: 'Public Profile',
        click: () => navigateTo('/settings/public'),
        icon: 'mdi:user-outline',
      },
      {
        label: 'Public Profile',
        click: () => navigateTo('/settings/account'),
        icon: 'i-heroicons-cog-6-tooth',
      },
      // {
      //   label: 'Mail & Phone',
      //   click: () => navigateTo('/settings/emails'),
      //   icon: 'mdi:email-outline',
      // },
      {
        label: 'Authentication',
        click: () => navigateTo('/settings/authentication'),
        icon: 'mdi:key-outline',
      },
    ];
</script>

<template>
  <div
    class="w-full lg:w-2/3 mx-auto flex flex-row mt-8 mb-32"
    style="min-height: calc(100vh - 16rem - 34px)"
  >
    <SettingsVerticalBar :items="settingsItems"></SettingsVerticalBar>
    <div class="w-full flex flex-col space-y-4">
      <slot />
    </div>
  </div>
</template>
