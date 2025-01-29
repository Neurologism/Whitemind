<script setup lang="ts">
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core';
// import { MiniMap } from "@vue-flow/minimap";
// import "@vue-flow/minimap/dist/style.css";
import { CustomNodes } from '~/utility/customNodeList';
import { Background } from '@vue-flow/background';
import { SyncStatus } from '~/types/syncStatus.enum';
import CustomConnectionEdge from '~/components/project/customEdge/CustomConnectionEdge.vue';
import CustomEdge from '~/components/project/customEdge/CustomEdge.vue';
import { useMouse } from '@vueuse/core';

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
const tutorialStore = useTutorialStore();
const vueFlowStore = useVueFlowStore();
const trainingStore = useTrainingStore();

const route = useRoute();
const config = useRuntimeConfig();

const mouse = useMouse();
const openContextMenu = ref(false);
const contextMenu = ref({ getBoundingClientRect: () => ({}) });
const contextMenuTargetNodeId = ref('');

trainingStore.training.epoch = null;
trainingStore.training.loss = null;
trainingStore.training.accuracy = null;
trainingStore.training.mean_absolute_error = null;

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
  onNodesChange,
  onEdgesChange,
  applyEdgeChanges,
  applyNodeChanges,
  removeNodes,
  viewportRef,
} = useVueFlow();

function handleDrop(event: DragEvent) {
  const nodeTypeString = event.dataTransfer?.getData('node') ?? '';
  const nodeType = CustomNodes.getCustomNodeConfig(nodeTypeString);
  if (!nodeType) return;

  if (vueFlowRef.value === null) {
    toast.add({
      title: 'Failed to drop node',
      description: 'VueFlow reference not found',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    return;
  }

  const { left, top } = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  let newNode = CustomNodes.getDefaultData(nodeType.type, position);

  addNewNode(newNode);
}

function addNewNode(newNode: any) {
  if (!props.tutorialProject) {
    // @ts-ignore
    addNodes([newNode]);
    return;
  }

  const components = toObject();

  for (const addNode of tutorialStore.currentAddNodes) {
    if (
      addNode.identifier !== newNode?.identifier ||
      addNode.group_identifier !== newNode?.group_identifier ||
      components.nodes.some((node) => node.id === addNode.id)
    ) {
      continue;
    }

    newNode = {
      ...newNode,
      ...addNode,
      data: {
        ...newNode?.data,
        ...addNode.data,
      },
    };

    // @ts-ignore
    addNodes([newNode]);
    console.log('Adding tutorial node', newNode);
    return;
  }

  if (config.public.tutorialAllowUnlistedNodeCreation) {
    // @ts-ignore
    addNodes([newNode]);
  } else {
    displayActionForbiddenToast();
  }
}

function onContextMenu(nodeId: string) {
  contextMenuTargetNodeId.value = nodeId;

  const top = unref(mouse.y);
  const left = unref(mouse.x);

  contextMenu.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left,
  });

  openContextMenu.value = true;
}

function contextMenuDuplicate() {
  openContextMenu.value = false;
  if (!contextMenuTargetNodeId.value) return;
  const node = vueFlowStore.getNode(contextMenuTargetNodeId.value);
  if (node === undefined) return;
  const newNode = CustomNodes.getDefaultData(node.type!, {
    x: node.position.x + 100,
    y: node.position.y + 100,
  });
  addNewNode(newNode);
}

function contextMenuDelete() {
  openContextMenu.value = false;
  if (!contextMenuTargetNodeId.value) return;
  removeNodes([contextMenuTargetNodeId.value]);
}

function onNodeRemove(change: any) {
  console.log('Node removed', change);
  if (!props.tutorialProject) {
    applyNodeChanges([change]);
    return;
  }
  console.log('Node removed', change);

  for (const removeNode of tutorialStore.currentRemoveNodes) {
    if (removeNode.id !== change.id) {
      continue;
    }

    applyNodeChanges([change]);
    console.log('Removing tutorial node', change);
    return;
  }
  console.log('Node removed', change);

  if (config.public.tutorialAllowUnlistedNodeDeletion) {
    applyNodeChanges([change]);
  } else {
    displayActionForbiddenToast();
  }
}

onNodesChange((changes) => {
  for (const change of changes) {
    switch (change.type) {
      case 'remove':
        onNodeRemove(change);
        break;
      default:
        applyNodeChanges([change]);
    }
  }
});

onEdgesChange((changes) => {
  applyEdgeChanges(changes);
});

onConnect((newEdge: any) => {
  console.log(newEdge);
  newEdge.type = 'smoothstep';
  newEdge.animated = false;
  newEdge.animationSpeed = 0.5;
  newEdge.style = {
    stroke:
      CustomNodes.getEdgeColor(newEdge.sourceHandle, newEdge.targetHandle) ??
      '#666',
    strokeWidth: 2,
  };

  if (!props.tutorialProject) {
    addEdges([newEdge]);
    return;
  }

  for (const addEdge of tutorialStore.currentAddEdges) {
    if (
      addEdge.source !== newEdge?.source ||
      addEdge.target !== newEdge?.target ||
      addEdge.sourceHandle !== newEdge?.sourceHandle ||
      addEdge.targetHandle !== newEdge?.targetHandle
    ) {
      continue;
    }

    newEdge = {
      ...newEdge,
      ...addEdge,
    };
    addEdges([newEdge]);
    console.log('Adding tutorial edge', newEdge);
    return;
  }

  if (config.public.tutorialAllowUnlistedEdgeCreation) {
    addEdges([newEdge]);
  } else {
    displayActionForbiddenToast();
  }
});

function displayActionForbiddenToast() {
  if (config.public.tutorialDisplayForbiddenToast) {
    toast.add({
      title: 'Action forbidden',
      description: 'This action is not allowed right now.',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }
}

function onRemoveEdge(infos: any) {
  if (!props.tutorialProject) {
    vueFlowStore.removeEdge(infos.edge.id);
    return;
  }

  for (const removeEdge of tutorialStore.currentRemoveEdges) {
    if (removeEdge.id !== infos.edge.id) {
      continue;
    }

    vueFlowStore.removeEdge(infos.edge.id);
    console.log('Removing tutorial edge', infos.edge);
    return;
  }

  if (config.public.tutorialAllowUnlistedEdgeDeletion) {
    vueFlowStore.removeEdge(infos.edge.id);
  } else {
    displayActionForbiddenToast();
  }
}

async function loadProject() {
  vueFlowStore.$reset();
  await sessionStore.checkSession(true);
  const project = await projectStore.fetchProject(props.projectId);

  if (!project) return;

  let components;
  if (!project.data.components) {
    components = {
      nodes: [],
      edges: [],
    };
  } else {
    components = project.data.components;
  }
  const loadResult = await fromObject(components);
  if (!loadResult) {
    toast.add({
      title: 'Failed to load project',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    projectStore.syncStatus = SyncStatus.error;
  } else {
    projectStore.project = project;
    sessionStore.loading = false;
    projectStore.syncStatus = SyncStatus.synced;
  }
}

let syncInterval: NodeJS.Timeout | null = null;
function setSyncInterval() {
  projectStore.syncStatus = SyncStatus.unsaved;
  if (syncInterval) {
    clearInterval(syncInterval);
  }
  syncInterval = setTimeout(() => projectStore.syncProject(), 8000);
}

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

watch(
  () => tutorialStore.isNextStepUnlocked,
  (newValue, oldValue) => {
    if (!tutorialStore.openInEditor) {
      return;
    }
    const currentStepObject =
      tutorialStore.tutorial.data?.steps[tutorialStore.tutorial.currentStep];
    if (
      currentStepObject === undefined ||
      currentStepObject.addEdges.length +
        currentStepObject.removeEdges.length +
        currentStepObject.addNodes.length +
        currentStepObject.removeNodes.length ===
        0
    ) {
      return;
    }
    if (newValue && !oldValue) {
      tutorialStore.visibleStep = tutorialStore.tutorial.currentStep;
      tutorialStore.stepForward();
    }
  }
);

const smallScreenNoteDismissed = ref(false);
</script>

<template>
  <div
    class="sm:hidden absolute top-0 left-0 h-screen w-screen bg-white bg-opacity-85 z-50 select-none flex"
    v-if="!smallScreenNoteDismissed"
  >
    <div
      class="flex flex-col mx-auto px-4 font-bold font-mono text-black justify-center items-center"
    >
      <span class="text-3xl font-bold font-mono">Small Screen</span>
      <span class="mt-8">
        We do not recommend using the editor on small screens. Please use a
        device with a larger screen for the best experience.
      </span>
      <div class="mt-4">
        <UButton
          @click="smallScreenNoteDismissed = true"
          type="primary"
          size="lg"
          >I understand</UButton
        >
      </div>
    </div>
  </div>
  <UContextMenu v-model="openContextMenu" :virtual-element="contextMenu">
    <div class="flex flex-col">
      <UButton
        @click="contextMenuDuplicate"
        class="w-full"
        variant="ghost"
        color="gray"
        size="lg"
        >Duplicate</UButton
      >
      <UButton
        @click="contextMenuDelete"
        class="w-full"
        variant="ghost"
        color="gray"
        size="lg"
        >Delete</UButton
      >
    </div>
  </UContextMenu>
  <div
    class="flex-2 bg-slate-900 w-screen"
    style="height: calc(100vh - 4rem)"
    @drop="handleDrop"
    @dragover.prevent
  >
    <VueFlow
      :apply-default="false"
      v-model:nodes="vueFlowStore.nodes"
      v-model:edges="vueFlowStore.edges"
      @viewport-change-end="vueFlowStore.viewport = toObject().viewport"
      class="border-3 border-amber-400 text-slate-500"
      @edge-mouse-enter="
        (infos) => (vueFlowStore.highlightedEdge = infos.edge.id)
      "
      @edge-mouse-leave="(_infos) => (vueFlowStore.highlightedEdge = null)"
      @edge-click="onRemoveEdge"
    >
      <Background
        :pattern-color="colorMode.value === 'dark' ? '#475569' : '#222'"
        :gap="48"
        :size="2"
      />
      <Panel position="bottom-right">
        <div>
          <slot name="bottomright"></slot>
        </div>
      </Panel>
      <!--        <MiniMap zoomable node-color="black" mask-color="rgba(56,56,56,0.5)" />-->
      <template #connection-line="props">
        <CustomConnectionEdge v-bind="props" />
      </template>
      <!-- this warning is an webstorm/lang server error, code works -->
      <template #edge-smoothstep="props">
        <CustomEdge
          :id="props.id"
          :marker-end="props.markerEnd"
          :sourcePosition="props.sourcePosition"
          :targetPosition="props.targetPosition"
          :sourceX="props.sourceX"
          :sourceY="props.sourceY"
          :targetX="props.targetX"
          :targetY="props.targetY"
          :data="props.data"
        />
      </template>
      <template
        v-for="node in CustomNodes.nodesList.flatMap((group) =>
          group.groups.flatMap((subGroup) => subGroup.nodes)
        )"
        :key="node.type"
        v-slot:[`node-${node.type}`]="props"
      >
        <EditorCustomNode
          :props="props"
          :node-id="props.id"
          @nodeContextmenu="onContextMenu"
          :key="route.fullPath.split('/')[2]"
        />
      </template>
    </VueFlow>
  </div>
  <div class="h-full absolute-overlay flex flex-col overflow-hidden">
    <div class="h-16"></div>
    <div
      class="flex-1 overflow-auto"
      v-if="projectStore.syncStatus === SyncStatus.initializing"
    >
      <UProgress animation="carousel" />
    </div>
    <div class="flex-1 overflow-auto" v-else>
      <ProjectSidebarBase class="h-full pointer-events-auto" />
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
</style>
