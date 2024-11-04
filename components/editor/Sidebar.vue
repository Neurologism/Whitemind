<script setup lang="ts">
import {nodesList} from "~/components/editor/customNodeList";

function handleDragStart(event, nodeType) {
  console.log("setting data to: ", nodeType)
  event.dataTransfer.setData("node", nodeType);
}

</script>

<template>
    <div class="border border-amber-400">
      <div
        draggable="true"
        v-for="node in nodesList"
        @dragstart="handleDragStart($event, node.type)"
        :aria-current="node.type"
      >
        <UCard>
          <template #header>
            <h5>{{ node.name }}</h5>
          </template>
          {{ node.description }}
        </UCard>
      </div>
    </div>
</template>
