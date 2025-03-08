<script setup lang="ts">
import { Position, useNodesData } from '@vue-flow/core';
import type {
  NodeConnectionConstraint,
  NodeDefinition,
  NodeGroupDefinition,
} from '~/types/blocks.types';
import DatasetSelector from '~/components/project/customNode/DatasetNode/DatasetSelector.vue';
import { datasets, type datasetDefinition } from '~/data/datasets';
import ClassicHandle from '~/components/project/customNode/ClassicHandle.vue';

const slideOverOpen = ref(false);

const props = defineProps<{
  nodeId: string;
  shapeData: NodeDefinition;
  shapeGroupData: NodeGroupDefinition;
}>();
const nodesData = useNodesData(props.nodeId);
const flowStore = useVueFlowStore();

function datasetByIdentifier(identifier: string): datasetDefinition | null {
  return datasets.find((ds) => ds.identifier === identifier) ?? null;
}
function setNewDataset(dataset: datasetDefinition) {
  //remove every edge with the nodeId in it
  flowStore.edges
    .filter(
      (edge) => edge.source === props.nodeId || edge.target === props.nodeId
    )
    .forEach((edge) => flowStore.removeEdge(edge));
  nodesData.value!.data.datasetIdentifier = dataset.identifier;
  slideOverOpen.value = false;
}

function bytesToSizeString(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + sizes[i];
}

const outConstraints: NodeConnectionConstraint = {
  allowedCategories: ['dataset'],
};

const datasetDefinition: ComputedRef<datasetDefinition | null> = computed(() =>
  datasetByIdentifier(nodesData.value?.data.datasetIdentifier ?? '')
);
</script>

<template>
  <USlideover v-model="slideOverOpen">
    <DatasetSelector
      :close-modal="() => (slideOverOpen = false)"
      :select-dataset="setNewDataset"
    />
  </USlideover>
  <div class="flex flex-col flex-nowrap font-mono">
    <div
      v-if="datasetDefinition"
      v-for="connection in datasetDefinition.connections"
    >
      <div class="mt-0.5 mb-0.5 pt-0.5 justify-end flex">
        <div class="font-mono text-sm relative">
          <span class="bg-bg-3 pr-2.5 pl-2.5 p-0.5 rounded font-mono">
            {{ connection }}
          </span>
          <ClassicHandle
            :constraints="outConstraints"
            :handle-id="`val-${connection}_dataset-${nodeId}`"
            :key="`${connection}_dataset-${nodeId}`"
            :is-input="false"
            :position="Position.Right"
            :shape-group-data="shapeGroupData"
          />
        </div>
      </div>
    </div>
    <div class="text-center p-2">
      <UButton
        leading-icon="mdi-database"
        color="orange"
        class="py-1"
        @click="slideOverOpen = true"
        block
        >{{ datasetDefinition?.name ?? 'Select Dataset' }}</UButton
      >
    </div>
    <div class="mx-2" v-if="datasetDefinition">
      <span class="text-xs text-gray-500"
        >{{ bytesToSizeString(datasetDefinition.sizeInBytes) }} |
        {{ datasetDefinition.numberOfRecords }} Records</span
      >
    </div>
  </div>
</template>
