<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";

const toast = useToast();

const sessionStore = useSessionStore();
const projectStore = useProjectStore();

if (!sessionStore.doesSessionIdExist) {
  navigateTo("/");
  toast.add({
    title: "You are not logged in",
    description: "You must be logged in to create a project",
  });
}

let projectName = ref("");
let projectDescription = ref("");
let projectVisible = ref(true);

let isProcessingCreation = ref(false);

const tabValues = [
  {
    label: "Public",
    value: false,
  },
  {
    label: "Private",
    value: true,
  },
];

const createProject = async () => {
  isProcessingCreation.value = true;
  let response = await sessionStore.fetch("/api/project/create", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project: {
        name: projectName.value,
        description: projectDescription.value,
        visibility: projectVisible.value ? "private" : "public",
      },
    }),
  });
  if (!response.ok) {
    toast.add({
      title: "Failed to create project",
    });
  }
  let data = await response.json();

  if (data.project?._id) {
    await projectStore.fetchProject(data.project._id, sessionStore.fetch);
    await sessionStore.loginWithSessionToken(
      sessionStore.sessionData.sessionID,
    );
    navigateTo("/projects");
  }

  isProcessingCreation.value = false;
};
</script>

<template>
  <div class="flex w-screen justify-center flex-row conte">
    <div
      class="md:basis-2/3 lg:basis-2/5 sm:basis-full basis-full dark:divide-slate-700 mx-5 p-5"
    >
      <h1 class="sm:text-3xl text-2xl">Create a new Project</h1>
      <span class="text-gray-500"
        >Id velit magnam ipsam nostrum pariatur facilis ea ab. Quibusdam non
        minima corporis nemo voluptatibus.
      </span>
      <div class="mt-1 mb-1">
        <UDivider />
      </div>
      <div class="input-tile">
        <HintBox>
          <UInput
            v-model="projectName"
            label="Project Name"
            placeholder="Enter the name of your project"
          />
          <template #hint>
            <UAlert
              icon="mdi-info"
              color="orange"
              title="Project name validation not jet implemented!"
              description="ensure the project name is unique"
            />
          </template>
        </HintBox>
      </div>
      <div class="input-tile">
        <UTextarea
          v-model="projectDescription"
          label="Project Description"
          placeholder="Describe your project"
          type="textarea"
          :rows="2"
        />
      </div>
      <div class="input-tile">
        <UTabs
          :items="tabValues"
          @change="(index) => (projectVisible = index == 0)"
        />
      </div>
      <div class="input-tile">
        <UDivider />
      </div>
      <div class="input-tile">
        <UButton
          block
          :disabled="
            !projectName || !projectDescription || isProcessingCreation
          "
          color="primary"
          @click="createProject"
          >Create Project</UButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-tile {
  @apply mt-2 mb-2;
}
</style>
