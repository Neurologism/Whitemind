<script setup lang="ts">
const sessionStore = useSessionStore();
const projectStore = useProjectStore();

const data: Ref<Project['data'] | undefined> = ref(undefined);
const props = defineProps({
  id: String,
});

onMounted(async () => {
  if (props.id == undefined) return;
  data.value = (await projectStore.getProject(props.id))?.data;
});
</script>

<template>
  <div
    class="h-40 select-none transform hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-md border-2 border-customPrimary-950 hover:border-primary bg-zinc-200 hover:bg-customPrimary-100 text-bg-1 font-mono"
    @click="
      sessionStore.showLoadingAnimation('Loading...');
      navigateTo(`/project/${props.id}`);
    "
  >
    <div class="flex flex-col flex-nowrap h-full" v-if="data">
      <div class="flex-none flex flex-row flex-nowrap items-center">
        <span
          class="flex-1 font-semibold overflow-ellipsis line-clamp-1 text-primary"
          >{{ data?.name ?? '' }}</span
        >
        <UIcon
          class="flex-none"
          :name="data?.visibility === 'private' ? 'mdi-lock' : 'mdi-lock-open'"
        />
      </div>
      <UDivider class="flex-none" />
      <span class="flex-1 text-sm text-text-3 line-clamp-4 overflow-ellipsis">
        {{ data?.description }}
      </span>
      <UDivider class="flex-none" />
      <span class="text-sm text-text-3 flex items-center">
        <UIcon name="mdi-calendar" class="mr-1" />
        Edited {{ new Date(data?.dateLastEdited ?? 0).toDateString() }}
      </span>
    </div>
    <div class="flex flex-col flex-nowrap h-full" v-else>
      <div class="flex-none">
        <USkeleton class="flex-none w-2/5 h-4 m-1 mr-4" />
        <UDivider class="flex-none" />
      </div>
      <div class="flex-grow">
        <USkeleton class="w-4/5 h-4 m-1 mr-4" />
        <USkeleton class="w-3/5 h-4 m-1 mr-4" />
      </div>
      <div class="flex-none">
        <UDivider class="flex-none" />
        <USkeleton class="flex-none w-4/5 h-4 ml-1 mt-1 mr-4" />
      </div>
    </div>
  </div>
</template>
