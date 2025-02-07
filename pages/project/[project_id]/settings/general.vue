<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const toast = useToast();
const route = useRoute();

const projectVisibility = ref(
  projectStore.project?.data.visibility ?? 'private'
);
const projectName = ref(projectStore.project?.data.name ?? '');
const projectDescription = ref(projectStore.project?.data.description ?? '');

async function updateProject() {
  const updateData = {
    name: projectName,
    description: projectDescription,
    visibility: projectVisibility,
  };
  const success = await projectStore.updateProject(updateData);
  if (success) {
    toast.add({
      title: 'Saved',
      icon: 'mdi-check',
      color: 'green',
    });
  } else {
    toast.add({
      title: 'An error occurred',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }
}

watch(
  () => projectStore.project,
  (newProject, oldProject) => {
    projectVisibility.value =
      projectStore.project?.data.visibility ?? 'private';
    projectName.value = projectStore.project?.data.name ?? 'none';
    projectDescription.value = projectStore.project?.data.description ?? 'none';
  }
);

projectStore.projectId = route.params.project_id as string;
</script>

<template>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase :in-project="true">
      <SettingsHeader>General</SettingsHeader>
      <SettingsInput
        label="Project Name"
        placeholder="Kurumi"
        v-model="projectName"
      >
        Two projects of one user cannot share the same name.
      </SettingsInput>
      <SettingsTextarea
        label="Description"
        placeholder="Nothing here yet."
        v-model="projectDescription"
      >
      </SettingsTextarea>
      <SettingsSelect
        :options="['private', 'public']"
        label="Visibility"
        v-model="projectVisibility"
      ></SettingsSelect>
      <div>
        <UButton
          color="gray"
          icon="material-symbols:save"
          @click="updateProject"
          >Save profile</UButton
        >
      </div>
    </SettingsBase>
  </div>
</template>
