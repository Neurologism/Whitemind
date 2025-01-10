<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();

const projectVisibility = ref(
  projectStore.project?.data.visibility ?? 'private'
);
</script>

<template>
  <div class="w-screen bg-slate-900" style="min-height: calc(100vh - 4rem)">
    <Settings :in-project="true">
      <SettingsHeader>General</SettingsHeader>
      <SettingsInput label="Project Name" placeholder="Kurumi">
        Two projects of one user cannot share the same name.
      </SettingsInput>
      <SettingsTextarea label="Description" placeholder="Nothing here yet.">
      </SettingsTextarea>
      <SettingsSelect
        :options="['private', 'public']"
        label="Visibility"
        v-model="projectVisibility"
      ></SettingsSelect>
    </Settings>
  </div>
</template>
