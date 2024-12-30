<script setup lang="ts">
const sessionStore = useSessionStore();
const projectStore = useProjectStore();

const data: Ref<(typeof projectStore.projects)[0]['data'] | null> = ref(null);
const props = defineProps({
  id: String,
});

onMounted(async () => {
  if (props.id == undefined) return;
  data.value = await projectStore.getProject(props.id, sessionStore.fetch);
});
</script>

<template>
  <UCard
    v-if="data"
    class="transform transition-transform duration-300 cursor-pointer"
    @click="
      sessionStore.showLoadingAnimation('Loading...');
      navigateTo(`/project/${props.id}`);
    "
  >
    <template #header>
      <h4 class="text-primary">{{ data?.name ?? '' }}</h4>
    </template>

    <p
      class="text-sm text-gray-500 whitespace-pre-line overflow-ellipsis line-clamp-2"
    >
      {{ data?.description }}
    </p>

    <template #footer>
      <span class="text-sm text-gray-500"
        >Edited {{ new Date(data?.last_edited ?? 0).toDateString() }}</span
      >
    </template>
  </UCard>
  <UCard
    v-else
    class="transform transition-transform duration-300 cursor-pointer"
  >
    <template #header>
      <h4 class="text-primary">Loading...</h4>
    </template>
  </UCard>
</template>
