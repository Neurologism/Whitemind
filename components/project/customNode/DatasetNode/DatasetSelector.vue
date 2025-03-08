<script setup lang="ts">
import { datasets, type datasetDefinition } from '~/data/datasets';
const props = defineProps<{
  closeModal: () => void;
  selectDataset: (dataset: datasetDefinition) => void;
}>();

function launchUrlInNewTab(url: string) {
  window.open(url, '_blank');
}

function bytesToSizeString(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + sizes[i];
}

//remove all spaces and special characters + put everything to lowercase
function normalizeString(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

const searchQuery = ref('');

const searchResults = computed(() => {
  if (searchQuery.value.trim() === '') {
    return datasets;
  }
  const normalizedQuery = normalizeString(searchQuery.value);
  return datasets.filter((dataset) => {
    return (
      normalizeString(dataset.name).includes(normalizedQuery) ||
      normalizeString(dataset.description).includes(normalizedQuery)
    );
  });
});
</script>

<template>
  <div class="py-5 flex flex-col flex-nowrap font-mono h-screen">
    <div class="px-5 flex flex-row justify-between items-center text-xl">
      <UIcon name="mdi-database" class="mr-2" />
      <span class="flex-1">Dataset Browser</span>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        @click="closeModal"
      />
    </div>
    <div class="py-3 px-5">
      <UDivider />
    </div>
    <div class="w-full mb-3 px-5">
      <UTooltip class="w-full" text="Dataset upload is not implemented jet.">
        <UButton
          leading-icon="material-symbols:upload-rounded"
          color="orange"
          block
          disabled
          >Upload dataset</UButton
        >
      </UTooltip>
    </div>
    <UInput
      class="mb-2 mx-5"
      size="md"
      placeholder="Search..."
      leading-icon="mdi-search"
      v-model="searchQuery"
    ></UInput>
    <div class="flex-1 flex flex-col flex-nowrap overflow-y-auto h-96">
      <div
        v-for="dataset in searchResults"
        class="flex mx-5 flex-col flex-nowrap p-1 my-1 hover:scale-105 rounded transition-transform border cursor-pointer select-none bg-slate-700"
        @click="props.selectDataset(dataset)"
      >
        <div class="flex flex-row flex-nowrap">
          <span
            class="font-semibold flex-1 overflow-clip text-ellipsis line-clamp-1"
            >{{ dataset.name }}</span
          >
          <UIcon
            v-if="dataset.url"
            name="mdi:launch"
            @click="launchUrlInNewTab(dataset.url)"
          />
        </div>
        <UDivider />
        <div class="flex flex-col flex-nowrap">
          <span class="text-sm">{{ dataset.description }}</span>
        </div>
        <UDivider />
        <div>
          <span class="text-xs"
            >{{ bytesToSizeString(dataset.sizeInBytes) }} |
            {{ dataset.numberOfRecords }} Records | {{ dataset.license }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
