<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";
import { ref } from 'vue';
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core';
import DropzoneBackground from '~/components/editor/DropzoneBackground.vue';
import Sidebar from '~/components/editor/Sidebar.vue';
import useDragAndDrop from '~/components/editor/useDnD';
import {MiniMap} from "@vue-flow/minimap";
import '@vue-flow/minimap/dist/style.css'



const sessionStore = useSessionStore();
const projectStore = useProjectStore();

definePageMeta({
  layout: "project",
});
const route = useRoute();
const projectId = route.params.project_id;

async function loadProject() {
  _loading.value = true;
  await projectStore.fetchProject(projectId as string, sessionStore.fetch);
  _loading.value = false;
}

const _loading = ref(true);
loadProject();


const { onConnect, addEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref([])

onConnect(addEdges)

const sidebarOpen = ref(false)

onMounted(() => {
  const projectHeader = document.getElementById('project_header');
  const appFooter = document.getElementById('app_footer');
  if (projectHeader && appFooter) {
    document.documentElement.style.setProperty('--project-header-height', `${projectHeader.offsetHeight}px`);
    document.documentElement.style.setProperty('--app-footer-height', `${appFooter.offsetHeight}px`);
  }
});

</script>

<template>
  <div v-if="_loading">
    <UProgress animation="carousel" />
  </div>
  <div class="flex-row">
    <div class="dnd-flow flex-1" @drop="onDrop">
      <!-- @ts-ignore: some linter error -->
      <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
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
        <DropzoneBackground
            :style="{
            backgroundColor: isDragOver ? '#e7f3ff !important' : 'transparent !important',
            transition: 'background-color 0.2s ease !important',
      }"
        >
          <p v-if="isDragOver">Drop here</p>
        </DropzoneBackground>
        <MiniMap zoomable node-color="black" mask-color="rgba(56,56,56,0.2)"/>
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


.dropzone-background .overlay {
  position:absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1;
  pointer-events:none
}

</style>