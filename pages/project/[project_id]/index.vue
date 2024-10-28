<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import DropzoneBackground from '~/components/editor/DropzoneBackground.vue';
import Sidebar from '~/components/editor/Sidebar.vue';
import useDragAndDrop from '~/components/editor/useDnD';
import {MiniMap} from "@vue-flow/minimap";



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
  <div class="dnd-flow" @drop="onDrop">
    <Sidebar />
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
      <DropzoneBackground
          :style="{
            backgroundColor: isDragOver ? '#e7f3ff !important' : 'transparent !important',
            transition: 'background-color 0.2s ease !important',
      }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <MiniMap zoomable/>
    </VueFlow>
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

.dnd-flow {
  flex-direction:column;
  display:flex;
  flex: 1 1 auto;
  height: calc((100vh - var(--project-header-height)) - var(--app-footer-height) - var(--app-footer-height));
  width: 100vw;
}

.dnd-flow aside {
  color:#fff;
  font-weight:700;
  border-right:1px solid #eee;
  padding:15px 10px;
  font-size:12px;
  background:#10b981bf;
  -webkit-box-shadow:0 5px 10px 0 rgba(0,0,0,.3);
  box-shadow:0 5px 10px #0000004d
}

.dnd-flow aside .nodes>* {
  margin-bottom:10px;
  cursor:grab;
  font-weight:500;
  -webkit-box-shadow:5px 5px 10px 2px rgba(0,0,0,.25);
  box-shadow:5px 5px 10px 2px #00000040
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