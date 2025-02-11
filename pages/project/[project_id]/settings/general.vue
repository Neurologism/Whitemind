<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const vueFlowStore = useVueFlowStore();
const toast = useToast();
const route = useRoute();

const showChangeProjectEditorModal = ref(false);

const projectVisibility = ref('private');
const projectEditorType = ref('classic');
const projectName = ref('');
const projectDescription = ref('');

watch(
  () => projectStore.project?.data.visibility,
  () => {
    projectVisibility.value =
      projectStore.project?.data.visibility ?? 'private';
  },
  { immediate: true }
);
watch(
  () => projectStore.project?.data.editorType,
  () => {
    projectEditorType.value =
      projectStore.project?.data.editorType ?? 'classic';
  },
  { immediate: true }
);
watch(
  () => projectStore.project?.data.name,
  () => {
    projectName.value = projectStore.project?.data.name ?? '';
  },
  { immediate: true }
);
watch(
  () => projectStore.project?.data.description,
  () => {
    projectDescription.value = projectStore.project?.data.description ?? '';
  },
  { immediate: true }
);

const valueChanged = computed(() => {
  return (
    projectVisibility.value !== projectStore.project?.data.visibility ||
    projectEditorType.value !== projectStore.project?.data.editorType ||
    projectName.value !== projectStore.project?.data.name ||
    projectDescription.value !== projectStore.project?.data.description
  );
});

async function clickUpdateProject() {
  if (projectStore.project?.data.editorType !== projectEditorType.value) {
    showChangeProjectEditorModal.value = true;
  } else {
    await updateProject();
  }
}

async function cancelEditorChange() {
  showChangeProjectEditorModal.value = false;
  projectEditorType.value = projectStore.project?.data.editorType ?? 'classic';
}

async function confirmEditorChange() {
  showChangeProjectEditorModal.value = false;
  vueFlowStore.nodes = [];
  vueFlowStore.edges = [];

  await updateProject();
}

async function updateProject() {
  const updateData = {
    name: projectName.value,
    description: projectDescription.value,
    visibility: projectVisibility.value,
    editorType: projectEditorType.value,
    components: vueFlowStore.components,
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
  <GenericModal v-model="showChangeProjectEditorModal">
    <template #title>
      <h2 class="text-xl font-bold">Changing the project editor</h2>
    </template>
    <template #text>
      <p class="text-sm">
        Warning: You are about to change the editor of this project. This will
        remove all the data from the current editor. Are you sure you want to
        continue?
      </p>
    </template>
    <template #bottom>
      <div class="mx-auto flex flex-row space-x-2">
        <UButton color="gray" @click="cancelEditorChange"> Cancel </UButton>
        <UButton color="red" @click="confirmEditorChange"> Continue </UButton>
      </div>
    </template>
  </GenericModal>
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
      <SettingsSelect
        :options="['classic', 'perceptron']"
        label="Editor"
        v-model="projectEditorType"
      >
        Beware, as this option will remove all the data from the current editor.
      </SettingsSelect>
      <div>
        <UButton
          color="gray"
          icon="material-symbols:save"
          @click="clickUpdateProject"
          :disabled="!valueChanged"
          >Save profile</UButton
        >
      </div>
    </SettingsBase>
  </div>
</template>
