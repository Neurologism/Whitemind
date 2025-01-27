<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Connection, GraphEdge, GraphNode } from '@vue-flow/core';
import { Handle, Position } from '@vue-flow/core';
import {
  FlowOrientation,
  type NodeConnectionConstraint,
  type NodeDefinition,
  type NodeGroupDefinition,
} from '~/blocks/blocks';
import { CustomNodes } from '~/components/editor/customNodeList';

const flowStore = useVueFlowStore();

const props = defineProps({
  handleId: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<Position>,
    required: true,
  },
  isInput: {
    type: Boolean,
    required: true,
  },
  constraints: {
    type: Object as PropType<NodeConnectionConstraint>,
    required: false,
  },
  shapeData: {
    type: Object as PropType<NodeDefinition>,
    required: true,
  },
  shapeGroupData: {
    type: Object as PropType<NodeGroupDefinition>,
    required: true,
  },
});

function getHandleConnectionCount(handleId: string): number {
  return flowStore.edges.filter(
    (edge) => edge.sourceHandle === handleId || edge.targetHandle === handleId
  ).length;
}

function checkConnection(
  connection: Connection,
  elements: {
    edges: GraphEdge[];
    nodes: GraphNode[];
    sourceNode: GraphNode;
    targetNode: GraphNode;
  }
): boolean {
  const sourceNodeDefinition: NodeDefinition = CustomNodes.getCustomNodeConfig(
    elements.sourceNode.type
  )!;
  const targetNodeDefinition: NodeDefinition = CustomNodes.getCustomNodeConfig(
    elements.targetNode.type
  )!;

  if (connection.target === connection.source) {
    return false;
  }

  let sourceConstraints: NodeConnectionConstraint | undefined;
  let sourceDirection: FlowOrientation | undefined;
  let targetConstraints: NodeConnectionConstraint | undefined;
  let targetDirection: FlowOrientation | undefined;
  if (connection.sourceHandle!.startsWith('out')) {
    sourceConstraints = sourceNodeDefinition.outputConstraints;
    sourceDirection = FlowOrientation.OUTPUT;
  } else if (connection.sourceHandle!.startsWith('in')) {
    sourceConstraints = sourceNodeDefinition.inputConstraints;
    sourceDirection = FlowOrientation.INPUT;
  } else if (connection.sourceHandle!.startsWith('val')) {
    let key = connection.sourceHandle!.split('-')[1];
    sourceConstraints = sourceNodeDefinition.data[key].constraints;
    sourceDirection = sourceNodeDefinition.data[key].flowOrientation;
  }
  if (connection.targetHandle!.startsWith('in')) {
    targetConstraints = targetNodeDefinition.inputConstraints;
    targetDirection = FlowOrientation.INPUT;
  } else if (connection.targetHandle!.startsWith('out')) {
    targetConstraints = targetNodeDefinition.outputConstraints;
    targetDirection = FlowOrientation.OUTPUT;
  } else if (connection.targetHandle!.startsWith('val')) {
    let key = connection.targetHandle!.split('-')[1];
    targetConstraints = targetNodeDefinition.data[key].constraints;
    targetDirection = targetNodeDefinition.data[key].flowOrientation;
  }
  if (sourceDirection !== undefined && targetDirection !== undefined) {
    if (sourceDirection === targetDirection) {
      return false;
    }
  }

  // Check if the connection is allowed by the constraints
  if (
    sourceConstraints?.allowedCategories &&
    targetConstraints?.allowedCategories
  ) {
    let result = sourceConstraints.allowedCategories.some((category) =>
      targetConstraints.allowedCategories!.includes(category)
    );
    if (!result) {
      return false;
    }
  }
  if (sourceConstraints?.min || sourceConstraints?.max) {
    let newSourceConnectionCount =
      getHandleConnectionCount(connection.sourceHandle!) + 1;
    if (
      !(
        (sourceConstraints.min ?? 0 <= newSourceConnectionCount) &&
        newSourceConnectionCount <= (sourceConstraints.max ?? Infinity)
      )
    ) {
      return false;
    }
  }
  if (targetConstraints?.min || targetConstraints?.max) {
    let newTargetConnectionCount =
      getHandleConnectionCount(connection.targetHandle!) + 1;
    if (
      !(
        (targetConstraints.min ?? 0 <= newTargetConnectionCount) &&
        newTargetConnectionCount <= (targetConstraints.max ?? Infinity)
      )
    ) {
      return false;
    }
  }

  return true;
}

enum Rotations {
  top = 0,
  right = 90,
  bottom = 180,
  left = 270,
}

const arrowRotation: ComputedRef<number> = computed(() => {
  switch (props.position) {
    case 'top':
      return props.isInput ? Rotations.bottom : Rotations.top;
    case 'right':
      return props.isInput ? Rotations.left : Rotations.right;
    case 'bottom':
      return props.isInput ? Rotations.top : Rotations.bottom;
    case 'left':
      return props.isInput ? Rotations.right : Rotations.left;
    default:
      return 0;
  }
});
</script>

<template>
  <!--:connectable-start="!isInput"
:connectable-end="isInput" -->
  <Handle
    :id="handleId"
    :position="position"
    :type="props.isInput ? 'target' : 'source'"
    :is-valid-connection="checkConnection"
    class="z-10 rounded-sm h-4 w-4 hover:w-5 hover:h-5 origin-center text-center flex items-center justify-center border hover:border-2 border-slate-800"
    :style="{
      backgroundImage: constraints?.allowedCategories
        ? CustomNodes.getHardGradientOfMultipleCategories(
            constraints!.allowedCategories,
            arrowRotation === Rotations.left ||
              arrowRotation === Rotations.right
          )
        : undefined,
      backgroundColor: shapeGroupData.color,
    }"
  >
    <UIcon
      name="material-symbols:play-arrow"
      :style="{ transform: `rotate(${arrowRotation - 90}deg)` }"
      mode="css"
      size="1rem"
      class="text-white pointer-events-none"
    />
  </Handle>
</template>
