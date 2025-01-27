<script setup lang="ts">
import { SyncStatus } from '~/types/syncStatus.enum';

const sessionStore = useSessionStore();
const projectStore = useProjectStore();
const vueFlowStore = useVueFlowStore();

onMounted(() => {
  sessionStore.loading = false;
  sessionStore.syncLocalSessionData();
  if (!sessionStore.isAuthorized) {
    navigateTo('/login');
  }
});

defineShortcuts({
  s: () => projectStore.syncProject(),
});

sessionStore.showLoadingAnimation();
</script>

<template>
  <EditorProjectHeader
    :project-title="projectStore.project?.data.name ?? ''"
    :project-owner="sessionStore.sessionData.user.displayname ?? ''"
    class="w-full pointer-events-auto"
  >
    <div class="flex flex-row">
      <div class="flex-1 lg:mr-10">
        <EditorTrainingHeader
          :project-id="projectStore.project?.data._id ?? ''"
          :sync-status="projectStore.syncStatus"
        />
      </div>
      <div class="flex">
        <UTooltip text="Write changes to server" :shortcuts="['s']">
          <div
            class="flex items-center hover:scale-105 transition-transform cursor-pointer rounded-md p-3"
            :style="{
              backgroundColor:
                projectStore.syncStatus === SyncStatus.unsaved
                  ? 'orange'
                  : projectStore.syncStatus === SyncStatus.synced
                    ? 'green'
                    : projectStore.syncStatus === SyncStatus.error
                      ? 'red'
                      : 'gray',
              color: 'white',
            }"
            @click="() => projectStore.syncProject()"
          >
            <UIcon :name="projectStore.syncStatus" />
          </div>
        </UTooltip>
      </div>
    </div>
  </EditorProjectHeader>
  <slot />
</template>
