<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";

const sessionStore = useSessionStore();

const projects = ref([] as string[]);
const searchedProjects: Ref<string[] | null> = ref(null)

const searchQuery = ref('');

let searchTimeout: NodeJS.Timeout | null = null;

const onSearchChange = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(async () => {
    let response = await sessionStore.fetch('/api/project/search', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          q: searchQuery.value,
        },
      })
    });
    if (!response.ok) return;
    let data = await response.json();
    projects.value = data.projects;
  }, 300);
};

</script>

<template>
  <div class="flex w-screen justify-center flex-row">
    <div class="md:basis-2/3 lg:basis-1/2 dark:divide-slate-700 mx-10 md:mx-0 truncate">
      <div class="flex flex-row py-8 pl-8 pr-8">
        <UInput
            v-model="searchQuery"
            name="searchQuery"
            class="flex-1 mr-4"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            @change="onSearchChange"
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

        <UButton class="flex-none" icon="i-heroicons-plus" to="/projects/new">
          New Project
        </UButton>
      </div>
      <div class="grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 m-4">
        <ProjectCard v-for="id in (searchedProjects ? searchedProjects : sessionStore.sessionData.user.project_ids)" :key="id" :id="id"/>
      </div>
      <div v-if="(searchedProjects ? searchedProjects : sessionStore.sessionData.user.project_ids ?? []).length === 0">
        <div class="flex flex-col items-center justify-center">
          <div class="text-2xl font-bold text-gray-500">No projects found</div>
        </div>
      </div>
    </div>
  </div>
</template>