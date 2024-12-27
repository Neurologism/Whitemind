<script lang="ts" setup>
import type { PropType } from 'vue';
import { Handle, Position } from '@vue-flow/core';
import type { Connection, GraphEdge, GraphNode } from '@vue-flow/core';
import type {
  NodeConnectionConstraint,
  NodeDefinition,
  NodeGroupDefinition,
} from '~/components/editor/blocks';
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
  let sourceConstraints: NodeConnectionConstraint | undefined;
  let targetConstraints: NodeConnectionConstraint | undefined;
  if (connection.sourceHandle!.startsWith('out')) {
    sourceConstraints = sourceNodeDefinition.outputConstraints;
  } else if (connection.sourceHandle!.startsWith('val')) {
    let key = connection.sourceHandle!.split('-')[1];
    sourceConstraints = sourceNodeDefinition.data[key].constraints;
  }
  if (connection.targetHandle!.startsWith('in')) {
    targetConstraints = targetNodeDefinition.inputConstraints;
  } else if (connection.targetHandle!.startsWith('val')) {
    let key = connection.targetHandle!.split('-')[1];
    targetConstraints = targetNodeDefinition.data[key].constraints;
  }
  // Check if the connection is allowed by the constraints
  if (
    sourceConstraints?.allowedCategories &&
    targetConstraints?.allowedCategories
  ) {
    let res = sourceConstraints.allowedCategories.some((category) =>
      targetConstraints.allowedCategories!.includes(category)
    );
    console.log(res);
    return res;
  }
  if (sourceConstraints?.min || sourceConstraints?.max) {
    let newSourceConnectionCount =
      flowStore.handleConnectionCount(connection.sourceHandle!) + 1;
    console.log(newSourceConnectionCount);
    if (
      !(
        (sourceConstraints.min ?? 0 <= newSourceConnectionCount) &&
        newSourceConnectionCount <= (sourceConstraints.max ?? Infinity)
      )
    ) {
      console.log(
        `Source constraints failed: ${sourceConstraints.min} <= ${newSourceConnectionCount} <= ${sourceConstraints.max}`
      );
      return false;
    }
  }
  if (targetConstraints?.min || targetConstraints?.max) {
    let newTargetConnectionCount =
      flowStore.handleConnectionCount(connection.targetHandle!) + 1;
    if (targetConstraints.min) {
      if (newTargetConnectionCount <= targetConstraints.min) {
        return false;
      }
    }
    if (targetConstraints.max) {
      if (newTargetConnectionCount >= targetConstraints.max) {
        return false;
      }
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
  <Handle
    :id="handleId"
    :position="position"
    :connectable-start="!isInput"
    :connectable-end="isInput"
    :is-valid-connection="checkConnection"
    class="z-10 rounded-sm h-3 w-3 hover:w-4 hover:h-4 origin-center text-center border-solid flex items-center justify-center"
    :style="{
      backgroundImage: constraints?.allowedCategories
        ? CustomNodes.getHardGradientOfMultipleCategories(
            constraints!.allowedCategories,
            true
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
