<script lang="ts" setup>
import {
  type Node,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Position,
  getBezierPath,
} from '@vue-flow/core';
import { type Edge } from '~/types/edge.type';
import { SyncStatus } from '~/types/syncStatus.enum';

const vueFlowStore = useVueFlowStore();
const sessionStore = useSessionStore();
const projectStore = useProjectStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String as PropType<Position>,
    required: true,
  },
  targetPosition: {
    type: String as PropType<Position>,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const edge = computed(() => vueFlowStore.getEdge(props.id)!);
const sourceNode = computed(
  (): Node => vueFlowStore.getNode(edge.value.source)!
);
const targetNode = computed(
  (): Node => vueFlowStore.getNode(edge.value.target)!
);
const sourceNodeDefinition = computed(() =>
  projectStore.editorConfig.getCustomNodeConfig(sourceNode.value.type ?? '')
);
const targetNodeDefinition = computed(() =>
  projectStore.editorConfig.getCustomNodeConfig(targetNode.value.type ?? '')
);
const sourceDataAttribute = computed(() => {
  const sourceDataAttribute =
    sourceNodeDefinition.value?.data[
      edge.value.sourceHandle?.split('-')[1] ?? ''
    ];
  if (sourceDataAttribute?.type === 'id') {
    return sourceDataAttribute;
  } else {
    return undefined;
  }
});
const targetDataAttribute = computed(() => {
  const targetDataAttribute =
    targetNodeDefinition.value?.data[
      edge.value.targetHandle?.split('-')[1] ?? ''
    ];
  if (targetDataAttribute?.type === 'id') {
    return targetDataAttribute;
  } else {
    return undefined;
  }
});
const allowModifyDisplayText = computed((): boolean => {
  const sourceVal = Boolean(sourceDataAttribute.value?.allowModifyDisplayText);
  const targetVal = Boolean(targetDataAttribute.value?.allowModifyDisplayText);
  const sessionStore = useSessionStore();
  if (sourceVal && targetVal) {
    sessionStore.errorToast(
      `Both source and target data attributes cannot have allowModifyDisplayText set to true. \nnode types are ${sourceNode.value.type} and ${targetNode.value.type}`
    );
    return false;
  } else {
    return sourceVal !== targetVal;
  }
});
const displayTextInputRef = ref<HTMLInputElement | null>(null);

const edgeDisplayText = ref('');

watch(
  () => projectStore.editorConfig.getEdgeDisplayText(props.id),
  (newValue: string) => {
    edgeDisplayText.value = newValue;
  },
  { immediate: true }
);

function onDeselectDisplayTextInput() {
  let setDisplayText: ((edge: Edge, text: string) => void) | undefined;
  const sessionStore = useSessionStore();
  if (sourceDataAttribute.value?.allowModifyDisplayText) {
    setDisplayText = sourceDataAttribute.value.setDisplayText;
  } else if (targetDataAttribute.value?.allowModifyDisplayText) {
    setDisplayText = targetDataAttribute.value.setDisplayText;
  } else {
    sessionStore.errorToast(
      `Both source and target data attributes cannot have allowModifyDisplayText set to true. \nnode types are ${sourceNode.value.type} and ${targetNode.value.type}`
    );
    return;
  }
  if (!setDisplayText) {
    sessionStore.errorToast(
      `setDisplayText function is not defined even though allowModifyDisplayText is set to true. \nnode types are ${sourceNode.value.type} and ${targetNode.value.type}`
    );
    return;
  }
  const currentDisplayText = projectStore.editorConfig.getEdgeDisplayText(
    props.id
  );
  if (currentDisplayText !== edgeDisplayText.value) {
    setDisplayText(edge.value, edgeDisplayText.value);
    edgeDisplayText.value = projectStore.editorConfig.getEdgeDisplayText(
      props.id
    );
    projectStore.syncStatus = SyncStatus.unsaved;
  }
}

function onSubmitDisplayTextInput() {
  displayTextInputRef.value?.blur();
}

// random offset between 15 and 35 based on string hash
const offset = Math.abs(
  (props.id
    .split('')
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
    20) +
    15
);

const path = computed(() => {
  const path = sessionStore.sessionData.smoothEdges
    ? getBezierPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition,
      })
    : getSmoothStepPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition,
        offset,
      });

  return path;
});

const coefficient = 10;
const lengthX = computed(() => props.targetX - props.sourceX);
const lengthY = computed(() => props.targetY - props.sourceY);
const lengthVertical = computed(() =>
  Math.sqrt(lengthX.value ** 2 + lengthY.value ** 2)
);
const angle = computed(() => Math.asin(lengthY.value / lengthVertical.value));
const horizontalOffset = computed(() => {
  return angle.value * coefficient;
});
const verticalOffset = computed(() => {
  return -((1 / 2) * Math.PI - angle.value) * coefficient;
});

const isHovered = computed(() => vueFlowStore.highlightedEdge === props.id);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <BaseEdge
    :path="path[0]"
    :style="{ ...style, strokeWidth: isHovered ? 3 : 2 }"
  ></BaseEdge>
  <EdgeLabelRenderer>
    <div
      :style="{
        position: 'absolute',
        backgroundColor: style?.stroke ?? '#FFFFFF',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="h-4 w-4 hover:bg-bg-3 p-1 rounded-sm text-center flex justify-center items-center text-text-1 text-lg pointer-events-none shadow-2xl shadow-white"
      :class="{
        hidden: !isHovered,
      }"
      @click="vueFlowStore.removeEdge(edge)"
    >
      x
    </div>
    <div
      :style="{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1] + horizontalOffset}px,${path[2] + verticalOffset}px)`,
      }"
      class="rounded-full text-center flex justify-center items-center text-text-2 text-sm z-10"
      :class="{
        hidden: isHovered,
        'pointer-events-auto ': allowModifyDisplayText,
        'cursor-text': allowModifyDisplayText,
      }"
      @mousedown.stop
    >
      <input
        v-if="allowModifyDisplayText"
        v-model="edgeDisplayText"
        class="w-6 bg-transparent focus:bg-bg-2 border-none focus:text-text-1"
        variant="none"
        ref="displayTextInputRef"
        @blur="onDeselectDisplayTextInput"
        @keyup.enter="onSubmitDisplayTextInput"
      />
      <span v-else> {{ edgeDisplayText }} </span>
    </div>
  </EdgeLabelRenderer>
</template>
