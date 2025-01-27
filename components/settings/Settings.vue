<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

const props = defineProps({
  inProject: { type: Boolean, required: true },
});

const sessionStore = useSessionStore();
const route = useRoute();

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
        label: 'General',
        click: () => navigateToSubroute(route.fullPath, 4, 'general'),
        icon: 'i-heroicons-cog-6-tooth',
      },
      {
        label: 'Appearance',
        click: () => navigateToSubroute(route.fullPath, 4, 'appearance'),
        icon: 'mdi:brush-variant',
      },
    ]
  : [
      {
        label: 'Public Profile',
        click: () => navigateTo('/settings/public'),
        icon: 'mdi:user-outline',
      },
      {
        label: 'Account',
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
      {
        label: 'Local',
        click: () => navigateTo('/settings/local'),
        icon: 'mdi:computer',
      },
    ];
</script>

<template>
  <div
    class="w-full lg:w-2/3 mx-auto flex flex-row mb-32 pt-16"
    style="min-height: calc(100vh - 16rem - 34px)"
  >
    <SettingsVerticalBar :items="settingsItems"></SettingsVerticalBar>
    <div class="w-full flex flex-col space-y-4">
      <slot />
    </div>
  </div>
</template>
