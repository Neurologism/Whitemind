<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";
import { ref } from 'vue';
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core';
import Sidebar from '~/components/editor/Sidebar.vue';
import {MiniMap} from "@vue-flow/minimap";
import '@vue-flow/minimap/dist/style.css'
import {nodesList, type CustomNodeConfig} from "~/components/editor/customNodeList";
import {Background} from "@vue-flow/background";


const sessionStore = useSessionStore();
const projectStore = useProjectStore();

definePageMeta({
  layout: "project",
});
const route = useRoute();
const projectId = route.params.project_id;

const sidebarOpen = ref(false)
const _loading = ref(true);
const nodes = ref([])
const edges = ref([])


async function loadProject() {
  _loading.value = true;
  await projectStore.fetchProject(projectId as string, sessionStore.fetch);
  _loading.value = false;
}

const { onConnect, addEdges, addNodes, vueFlowRef, project } = useVueFlow()



onConnect(addEdges)

loadProject();


onMounted(() => {
  const projectHeader = document.getElementById('project_header');
  const appFooter = document.getElementById('app_footer');
  if (projectHeader && appFooter) {
    document.documentElement.style.setProperty('--project-header-height', `${projectHeader.offsetHeight}px`);
    document.documentElement.style.setProperty('--app-footer-height', `${appFooter.offsetHeight}px`);
  }
});

function handleDrop(event: DragEvent) {
  const nodeTypeString = event.dataTransfer?.getData('node');
  const nodeType = nodesList.find(node => node.type === nodeTypeString);
  if (!nodeType) return;

  const { left, top } = vueFlowRef.value!.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })

  const newNode = {
    id: Math.random().toString(36),
    type: nodeTypeString,
    data: nodeType.defaultData,
    position: position
  };
  addNodes([newNode]);
}

</script>

<template>
  <div v-if="_loading">
    <UProgress animation="carousel" />
  </div>
  <div class="flex-row">
    <div
       class="dnd-flow flex-1"
       @drop="handleDrop"
       @dragover.prevent
    >
      <VueFlow
          :nodes="nodes"
          :edges="edges"
          class="border-3 border-amber-400"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <Panel position="top-left">
          <div :hidden="sidebarOpen">
            <UButton
                size="xl"
                @click="sidebarOpen = true"
                class="animate__animated animate__backInDown"
                trailing-icon="mdi-chevron-right"
            >Toolbar</UButton>
          </div>
          <div :hidden="!sidebarOpen" class="node-container z-10 p-5 bg-gray-800 rounded-lg animate__animated animate__zoomInLeft">
            <UButton
                size="xl"
                @click="sidebarOpen = false"
                class="animate__animated animate__backInDown mb-3"
                trailing-icon="mdi-chevron-left"
                block
            >Close</UButton>
            <Sidebar />
          </div>
        </Panel>
        <MiniMap zoomable node-color="black" mask-color="rgba(56,56,56,0.2)"/>
        <template
            v-for="node in nodesList"
            :key="node.type"
            v-slot:[`node-${node.type}`]="props"
        >
        <component :is="node.component" :data="props" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';


:root {
  --project-header-height: 0;
  --app-footer-height: 0;
}

.animate__animated.animate__zoomInLeft {
  --animate-duration: 0.4s;
}
.animate__animated.animate__backInDown {
  --animate-duration: 0.4s;
}

.dnd-flow {
  height: calc((100vh - var(--project-header-height)) - var(--app-footer-height) - var(--app-footer-height));
  width: 100vw;
}

.node-container {
  max-height: calc((100vh - var(--project-header-height)) - var(--app-footer-height) - var(--app-footer-height) - 100px);
}



</style>