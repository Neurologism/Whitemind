<script setup lang="ts">
const projects = ref([
  {
    name: "This is a project",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description: "Description 1",
  },
  {
    name: "Jeff-Project",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description: "Description 2",
  },
  {
    name: "Manga is awesome",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description:
      "This project aims to develop a comprehensive digital platform for manga creation, collaboration, and distribution. The platform will provide an all-in-one solution for aspiring manga artists, writers, and readers to create, share, and enjoy high-quality manga content. Key features will include an intuitive drawing and storyboarding interface, collaborative tools for teams of creators, a robust digital library for readers, and a monetization system for artists.",
  },
]);
</script>

<template>
  <div class="h-screen flex w-screen justify-center flex-row">
    <div
      class="md:basis-2/3 lg:basis-1/2 divide-y dark:divide-slate-700 mx-10 md:mx-0 truncate"
    >
      <div class="flex flex-row py-8">
        <UInput
          color="white"
          variant="outline"
          placeholder="Find a project..."
          class="flex-1 mr-4"
        />
        <UButton class="flex-none" icon="i-heroicons-plus"> New Project </UButton>
      </div>
      <div v-for="project in projects" class="p-8 flex flex-row">
        <div class="grow truncate mr-10">
          <a to="/" class=""></a>
          <ULink
            :to="`/project/${project.id}`"
            class="text-primary text-xl font-bold truncate"
          >
            {{ project.name }}
          </ULink>
          <div class="truncate">
            {{ project.description }}
          </div>
        </div>
        <div class="flex-none my-auto flex">
          <UButton color="gray" class="rounded-none rounded-l-lg border-r-0">Open</UButton>
          <UButton color="gray" class="rounded-none rounded-r-lg" icon="i-heroicons-adjustments-horizontal">

          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
