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

const nodes = ref([])
const edges = ref([])

enum SyncStatus {
  initializing = 'mdi-sync',
  syncing = 'svg-spinners:270-ring',
  unsaved = 'mdi:content-save-edit-outline',
  synced = 'mdi:content-save-check',
  error = 'mdi:content-save-alert',
}
const syncStatus = ref<SyncStatus>(SyncStatus.initializing);


const { onConnect, addEdges, addNodes, vueFlowRef, project, toObject, fromObject, getNodes, getEdges } = useVueFlow()

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

function jsonButtonPressed() {
  const object = toObject();
  setClipboard(JSON.stringify(object, null, 2));
}

onMounted(() => {
  const projectHeader = document.getElementById('project_header');
  const appFooter = document.getElementById('app_footer');
  if (projectHeader && appFooter) {
    document.documentElement.style.setProperty('--project-header-height', `${projectHeader.offsetHeight}px`);
    document.documentElement.style.setProperty('--app-footer-height', `${appFooter.offsetHeight}px`);
  }
});

onConnect((params) => {
  if (params.sourceHandle?.startsWith('val-')) {
    // @ts-ignore
    params.type = 'smoothstep';
    console.log()
    // @ts-ignore
    params.data = {
      key: params.sourceHandle?.slice(4, params.sourceHandle.length - params.source.length - 1),
    }
  }
  addEdges([params]);
})

async function loadProject() {
  const project = await projectStore.fetchProject(projectId as string, sessionStore.fetch);
  let components;
  if (!project.components) {
    components = {
      nodes: [],
      edges: [],
    };
  } else {
    components = project.components
  }
  const loadResult = await fromObject(components);
  if (!loadResult) {
    toast.add({ title: 'Failed to load project', icon: 'mdi-alert-circle', color: 'red' });
    syncStatus.value = SyncStatus.error;
  } else {
    toast.add({ title: 'Project loaded', icon: 'mdi-check', color: 'green' });
    syncStatus.value = SyncStatus.synced;
  }
}

async function syncProject(force: boolean = false) {
  syncStatus.value = SyncStatus.syncing;
  const object = toObject();
  const success = await projectStore.updateProjectComponents(projectId as string, object, sessionStore.fetch);
  if (!success) {
    toast.add({ title: 'Failed to sync project', icon: 'mdi-alert-circle', color: 'red' });
    syncStatus.value = SyncStatus.error;
  } else {
    //toast.add({ title: 'Project synced', icon: 'mdi-check', color: 'green' });
    syncStatus.value = SyncStatus.synced;
  }
}
let syncInterval: NodeJS.Timeout | null = null;
function setInterval() {
  syncStatus.value = SyncStatus.unsaved;
  if (syncInterval) {
    clearInterval(syncInterval);
  }
  syncInterval = setTimeout(() => {
    syncProject(true);
  }, 5000);

}

const projectTitle = computed(() => projectStore.projects.find(p => p.data._id === projectId)?.data.name ?? 'Loading Project Title...');
const projectOwner = computed(() => sessionStore.sessionData.user.displayname ?? 'Loading...');

loadProject();

// save to server 5 seconds after last edit
watch(getNodes, () => {
  setInterval();
}, { deep: true });
watch(getEdges,  () => {
  setInterval();
}, { deep: true });


</script>

<template>
  <ProjectHeader :project-title="projectTitle" :project-owner="projectOwner" id="project_header">
    <div class="flex flex-row">
      <div class="flex-1">

      </div>
      <div class="flex">
        <div class="rounded p-1 hover:scale-110 transition-transform border-solid border border-e-orange-100"
          :style="{
            backgroundColor: syncStatus === SyncStatus.unsaved ? 'rgba(100, 100, 100, 0.5)' : (syncStatus === SyncStatus.synced ? 'green' : syncStatus === SyncStatus.error ? 'red' : 'rgba(255,255,255,0.3)'),
          }"
        >
          <UIcon :name="syncStatus" />
        </div>
      </div>
    </div>
  </ProjectHeader>
  <div v-if="syncStatus === SyncStatus.initializing">
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
                @click="jsonButtonPressed"
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