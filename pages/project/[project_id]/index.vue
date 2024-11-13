<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";
import { ref } from 'vue';
import {VueFlow, useVueFlow, Panel, SmoothStepEdge} from '@vue-flow/core';
import Sidebar from '~/components/editor/Sidebar.vue';
import {MiniMap} from "@vue-flow/minimap";
import '@vue-flow/minimap/dist/style.css'
import { CustomNodes } from "~/components/editor/customNodeList";
import {Background} from "@vue-flow/background";
import CustomNode from "~/components/editor/CustomNode.vue";
import ProjectHeader from "~/components/editor/ProjectHeader.vue";
import IdConnectionEdge from "~/components/editor/IdConnectionEdge.vue";
const toast = useToast();
const colorMode = useColorMode();

const sessionStore = useSessionStore();
const projectStore = useProjectStore();

definePageMeta({
  layout: "project",
});
const route = useRoute();
const projectId = route.params.project_id;

const _loading = ref(true);
const nodes = ref([])
const edges = ref([])


async function loadProject() {
  _loading.value = true;
  await projectStore.fetchProject(projectId as string, sessionStore.fetch);
  _loading.value = false;
}

const { onConnect, addEdges, addNodes, vueFlowRef, project, toObject } = useVueFlow()

onConnect((params) => {
  if (params.sourceHandle?.startsWith('val-')) {
    params.type = 'smoothstep';
    console.log()
    params.data = {
      key: params.sourceHandle?.slice(4, params.sourceHandle.length - params.source.length - 1),
    }
  }
  addEdges([params]);
})

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
  const nodeTypeString = event.dataTransfer?.getData('node') ?? '';
  const nodeType = CustomNodes.getCustomNodeConfig(nodeTypeString);
  if (!nodeType) return;

  const { left, top } = vueFlowRef.value!.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })

  const newNode = CustomNodes.getDefaultData(nodeType.type, position)
  addNodes([newNode]);
}

function setClipboard(data: string) {
  navigator.clipboard.writeText(data).then(() => {
    toast.add({ title: 'Copied to clipboard!' });
  });
}

function saveButtonPressed() {
  const object = toObject();
  setClipboard(JSON.stringify(object, null, 2));
}

const projectTitle = computed(() => projectStore.projects.find(p => p.data._id === projectId)?.data.name ?? 'Loading Project Title...');
const projectOwner = computed(() => sessionStore.sessionData.user.displayname ?? 'Loading...');

</script>

<template>
  <ProjectHeader :project-title="projectTitle" :project-owner="projectOwner" id="project_header">
    <div class="bg-red-700">
      hallo
    </div>
  </ProjectHeader>
  <div v-if="_loading">
    <UProgress animation="carousel" />
  </div>
  <div class="flex flex-row">
    <div
       class="dnd-flow flex-2"
       @drop="handleDrop"
       @dragover.prevent
    >
      <VueFlow
          :nodes="nodes"
          :edges="edges"
          class="border-3 border-amber-400"
      >
        <template #edge-id-connection="customEdgeProps">
          <IdConnectionEdge
              :id="customEdgeProps.id"
              :source-x="customEdgeProps.sourceX"
              :source-y="customEdgeProps.sourceY"
              :target-x="customEdgeProps.targetX"
              :target-y="customEdgeProps.targetY"
              :source-position="customEdgeProps.sourcePosition"
              :target-position="customEdgeProps.targetPosition"
              :data="customEdgeProps.data"
              :marker-end="customEdgeProps.markerEnd"
              :style="customEdgeProps.style"
          />
        </template>

      <Background :pattern-color="colorMode.value=== 'dark' ? '#aaa' : '#222'" :gap="16" :size="2" />
        <Panel position="top-left">
          <div style="max-height: 70%">
            <UCard>
              <Sidebar />
            </UCard>
          </div>
        </Panel>
        <Panel position="top-right">
          <div class="p-4">
            <UButton
                icon="mdi-json"
                size="xl"
                variant="solid"
                color="green"
                class="mb-4"
                @click="saveButtonPressed"
            />
          </div>
        </Panel>
        <MiniMap zoomable node-color="black" mask-color="rgba(56,56,56,0.5)"/>
        <template
            v-for="node in CustomNodes.nodesList.flatMap(group => group.nodes)"
            :key="node.type"
            v-slot:[`node-${node.type}`]="props"
        >
        <CustomNode :props="props" :node-id="props.id" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';


:root {
  --project-header-height: 0;
  --app-footer-height: 0;
}


.dnd-flow {
  height: calc((100vh - var(--project-header-height)) - var(--app-footer-height) - var(--app-footer-height) - 5px);
  width: 100vw;
}




</style>