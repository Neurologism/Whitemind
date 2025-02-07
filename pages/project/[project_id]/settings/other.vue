<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const toast = useToast();

const showDeleteAccountModal = ref(false);

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
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase :in-project="true">
      <SettingsHeader>Other</SettingsHeader>
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
