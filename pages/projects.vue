<script setup lang="ts">
const projects = ref([
  {
    name: "This is a project",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description: "Description 1",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Jeff-Project",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description: "Description 2",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Manga is awesome",
    id: "64e7a2f9e4b0f29b2c7a1e91",
    description:
      "This project aims to develop a comprehensive digital platform for manga creation, collaboration, and distribution. The platform will provide an all-in-one solution for aspiring manga artists, writers, and readers to create, share, and enjoy high-quality manga content. Key features will include an intuitive drawing and storyboarding interface, collaborative tools for teams of creators, a robust digital library for readers, and a monetization system for artists.",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Project Alpha",
    id: "64e7a2f9e4b0f29b2c7a1e92",
    description: "Alpha project description",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Project Beta",
    id: "64e7a2f9e4b0f29b2c7a1e93",
    description: "Beta project description",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Project Gamma",
    id: "64e7a2f9e4b0f29b2c7a1e94",
    description: "Gamma project description",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Project Delta",
    id: "64e7a2f9e4b0f29b2c7a1e95",
    description: "Delta project description",
    lastUpdated: new Date(347023957),
  },
  {
    name: "Project Epsilon",
    id: "64e7a2f9e4b0f29b2c7a1e96",
    description: "Epsilon project description",
    lastUpdated: new Date(347023957),
  },
]);

const searchQuery = ref('');

</script>

<template>
  <div class="flex w-screen justify-center flex-row">
    <div
      class="md:basis-2/3 lg:basis-1/2 dark:divide-slate-700 mx-10 md:mx-0 truncate"
    >
      <div class="flex flex-row py-8 pl-8 pr-8">
        <UInput
            v-model="searchQuery"
            name="searchQuery"
            class="flex-1 mr-4"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
                v-show="searchQuery != ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="searchQuery = ''"
            />
          </template>
        </UInput>

        <UButton class="flex-none" icon="i-heroicons-plus">
          New Project
        </UButton>
      </div>
      <div class="grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 m-4">
        <UCard
            v-for="project in projects"
            :key="project.id"
        >
          <template #header>
            <h4 class="text-primary">{{project.name}}</h4>
          </template>

          <p class="text-sm text-gray-500 whitespace-pre-line overflow-ellipsis line-clamp-2">{{project.description}}</p>

          <template #footer>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">
                Last updated: {{project.lastUpdated.toString().slice(0, 15)}}
              </span>
              <UButton to="/project/{{project.id}}" class="text-sm">
                View Project
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
