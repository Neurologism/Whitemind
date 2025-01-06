<script lang="ts" setup>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;

let options = [];
for (let i = 0; i < props.shapeDefinition.options.length; i++) {
  options.push(props.shapeDefinition.options[i]);
}
</script>

<template>
  <Multiselect
    v-model="nodesData.data[paramName]"
    :options="options"
    :multiple="true"
    :taggable="true"
  ></Multiselect>
</template>
