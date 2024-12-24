<script setup lang="ts">
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core';
// import { MiniMap } from "@vue-flow/minimap";
// import "@vue-flow/minimap/dist/style.css";
import { CustomNodes } from '~/components/editor/customNodeList';
import { Background } from '@vue-flow/background';
import { SyncStatus } from '~/components/editor/syncStatus';

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
  tutorialProject: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.projectId,
  () => {
    console.log('Project ID changed');
    loadProject();
  },
  { deep: true }
);

const toast = useToast();
const colorMode = useColorMode();

const sessionStore = useSessionStore();
const projectStore = useProjectStore();
const flowStore = useVueFlowStore();

sessionStore.showLoadingAnimation();

const syncStatus = ref<SyncStatus>(SyncStatus.initializing);

const {
  onConnect,
  addEdges,
  addNodes,
  vueFlowRef,
  project,
  toObject,
  fromObject,
  getNodes,
  getEdges,
} = useVueFlow(flowStore);

function handleDrop(event: DragEvent) {
  const nodeTypeString = event.dataTransfer?.getData('node') ?? '';
  const nodeType = CustomNodes.getCustomNodeConfig(nodeTypeString);
  if (!nodeType) return;

  const { left, top } = vueFlowRef.value!.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = CustomNodes.getDefaultData(nodeType.type, position);
  // @ts-ignore
  addNodes([newNode]);
}

onConnect((params) => {
  // @ts-ignore
  params.type = 'smoothstep';
  if (params.sourceHandle?.startsWith('val-')) {
    // @ts-ignore
    params.data = {
      key: params.sourceHandle?.slice(
        4,
        params.sourceHandle.length - params.source.length - 1
      ),
    };
  }
  addEdges([params]);
});

async function loadProject() {
  await sessionStore.checkSession(true);
  const project = await projectStore.fetchProject(
    props.projectId,
    sessionStore.fetch
  );
  let components;
  if (!project.components) {
    components = {
      nodes: [],
      edges: [],
    };
  } else {
    components = project.components;
  }
  const loadResult = await fromObject(components);
  if (!loadResult) {
    toast.add({
      title: 'Failed to load project',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    syncStatus.value = SyncStatus.error;
  } else {
    flowStore.remote_data = project;
    sessionStore.loading = false;
    syncStatus.value = SyncStatus.synced;
  }
}

async function postProject() {
  syncStatus.value = SyncStatus.syncing;
  const object = toObject();
  const success = await projectStore.updateProjectComponents(
    props.projectId,
    object,
    sessionStore.fetch
  );
  if (!success) {
    toast.add({
      title: 'Failed to sync project',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    syncStatus.value = SyncStatus.error;
  } else {
    //toast.add({ title: 'Project synced', icon: 'mdi-check', color: 'green' });
    syncStatus.value = SyncStatus.synced;
  }
}
let syncInterval: NodeJS.Timeout | null = null;
function setSyncInterval() {
  syncStatus.value = SyncStatus.unsaved;
  if (syncInterval) {
    clearInterval(syncInterval);
  }
  syncInterval = setTimeout(() => {
    postProject();
  }, 5000);
}

const projectOwner = computed(
  () => sessionStore.sessionData.user.displayname ?? 'Loading...'
);

if (props.projectId !== '') {
  loadProject();
}

// save to server 5 seconds after last edit
watch(
  getNodes,
  () => {
    if (props.projectId !== '') {
      setSyncInterval();
    }
  },
  { deep: true }
);

watch(
  getEdges,
  () => {
    if (props.projectId !== '') {
      setSyncInterval();
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-row relative">
    <div
      class="dnd-flow flex-2 bg-slate-900"
      @drop="handleDrop"
      @dragover.prevent
    >
      <VueFlow
        v-model:nodes="flowStore.nodes"
        v-model:edges="flowStore.edges"
        class="border-3 border-amber-400"
      >
        <template #edge-id-connection="customEdgeProps">
          <EditorIdConnectionEdge
            :id="customEdgeProps.id"
            :source-x="customEdgeProps.sourceX"
            :source-y="customEdgeProps.sourceY"
            :target-x="customEdgeProps.targetX"
            :target-y="customEdgeProps.targetY"
            :source-position="customEdgeProps.sourcePosition"
            :target-position="customEdgeProps.targetPosition"
            :data="customEdgeProps.data"
            :style="customEdgeProps.style"
            :marker-start="customEdgeProps.markerStart"
            :marker-end="customEdgeProps.markerEnd"
          />
        </template>

        <Background
          :pattern-color="colorMode.value === 'dark' ? '#aaa' : '#222'"
          :gap="16"
          :size="2"
        />
        <Panel position="bottom-right">
          <div>
            <slot name="bottomright"></slot>
          </div>
        </Panel>
        <!--        <MiniMap zoomable node-color="black" mask-color="rgba(56,56,56,0.5)" />-->
        <template
          v-for="node in CustomNodes.nodesList.flatMap((group) => group.nodes)"
          :key="node.type"
          v-slot:[`node-${node.type}`]="props"
        >
          <EditorCustomNode :props="props" :node-id="props.id" />
        </template>
      </VueFlow>
    </div>
  </div>
  <div class="h-full absolute-overlay flex flex-col">
    <div class="pointer-events-auto">
      <EditorProjectHeader
        :project-title="flowStore.remote_data.name"
        :project-owner="projectOwner"
        class="w-full"
      >
        <div class="flex flex-row">
          <div class="flex-1 lg:mr-10">
            <EditorTrainingHeader
              :project-id="props.projectId"
              :sync-status="syncStatus"
            />
          </div>
          <div class="flex">
            <UTooltip text="Write changes to server">
              <UButton
                :icon="syncStatus"
                size="lg"
                variant="solid"
                :color="
                  syncStatus === SyncStatus.unsaved
                    ? 'orange'
                    : syncStatus === SyncStatus.synced
                      ? 'green'
                      : syncStatus === SyncStatus.error
                        ? 'red'
                        : 'gray'
                "
                class="hover:scale-105 transition-transform"
                @click="postProject"
                square
              />
            </UTooltip>
          </div>
        </div>
      </EditorProjectHeader>
    </div>
    <div class="" v-if="syncStatus === SyncStatus.initializing">
      <UProgress animation="carousel" />
    </div>
    <div v-else class="flex-1">
      <EditorSidebar class="h-full pointer-events-auto" />
    </div>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';

.absolute-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  pointer-events: none;
}

.dnd-flow {
  height: 100vh;
  width: 100vw;
}
</style>
