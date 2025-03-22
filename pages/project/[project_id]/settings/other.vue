<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const toast = useToast();
const route = useRoute();

const showDeleteAccountModal = ref(false);
const showResetProjectModal = ref(false);

async function deleteProject() {
  const response = await projectStore.deleteProject();
  if (response?.ok) {
    toast.add({
      title: 'Project deleted',
      icon: 'mdi-check',
      color: 'green',
    });
    navigateTo('/projects');
  } else {
    toast.add({
      title: "Project couldn't be deleted",
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }
}

async function resetProject() {
  showResetProjectModal.value = false;
  projectStore.resetProject();
  toast.add({
    title: 'Editor reset',
    icon: 'mdi-check',
    color: 'green',
  });
}

projectStore.projectId = route.params.project_id as string;
</script>

<template>
  <GenericModal v-model="showDeleteAccountModal">
    <template #title>Delete project</template>
    <template #text>
      Are you sure you want to delete "{{
        projectStore.project?.data.name ?? 'unnamed'
      }}" ? <br />
      This action is irreversible.
    </template>
    <template #bottom>
      <UButton
        icon="i-heroicons-trash-solid"
        color="red"
        @click="deleteProject"
        class="mx-auto"
        >Delete</UButton
      >
    </template>
  </GenericModal>
  <GenericModal v-model="showResetProjectModal">
    <template #title>Reset editor</template>
    <template #text>
      Are you sure you want to reset all nodes of this project? This will delete
      all nodes but you will keep trained models and settings.
    </template>
    <template #bottom>
      <UButton
        icon="i-heroicons-arrow-path"
        color="yellow"
        @click="resetProject"
        class="mx-auto"
        >Reset</UButton
      >
    </template>
  </GenericModal>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase variant="project">
      <SettingsHeader>Other</SettingsHeader>
      <SettingsHeader :weight="2" class="mt-8">Reset editor</SettingsHeader>
      <SettingsText>All nodes in the editor will be removed. </SettingsText>
      <div>
        <UButton
          color="yellow"
          icon="i-heroicons-arrow-path"
          @click="showResetProjectModal = true"
          >Reset editor</UButton
        >
      </div>
      <SettingsHeader :weight="2" class="mt-8">Delete project</SettingsHeader>
      <SettingsText
        >This will permanently erase all data associated with this project
        including previously trained models.
      </SettingsText>
      <div>
        <UButton
          color="red"
          icon="i-heroicons-trash-solid"
          @click="showDeleteAccountModal = true"
          >Delete project</UButton
        >
      </div>
    </SettingsBase>
  </div>
</template>
