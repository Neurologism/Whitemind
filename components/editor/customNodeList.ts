import { blocks } from '~/components/editor/blocks';
import type {
  NodeGroupDefinition,
  NodeDefinition,
} from '~/components/editor/blocks';
import type { XYPosition } from '@vue-flow/core';
import { useVueFlowStore } from '~/stores/VueFlowStore';

export class CustomNodes {
  static nodesList: NodeGroupDefinition[] = blocks;

  static getCustomNodeConfig(type: string): NodeDefinition | undefined {
    return CustomNodes.nodesList
      .flatMap((group) => group.nodes)
      .find((node) => node.type === type);
  }

  static getNodeGroup(type: string): NodeGroupDefinition | null {
    const node = CustomNodes.getCustomNodeConfig(type);
    if (!node) return null;
    return (
      CustomNodes.nodesList.find((group) =>
        group.nodes.some((node: NodeDefinition) => node.type === type)
      ) ?? null
    );
  }

  static getDefaultData(type: string, position: XYPosition) {
    const node = CustomNodes.getCustomNodeConfig(type);
    if (!node) return null;
    const data = {};

    for (const key in node.data) {
      // @ts-ignore - data[key] is not a valid type
      if (node.data[key].value !== undefined) {
        // @ts-ignore - data[key] is not a valid type
        data[key] = node.data[key]['value'];
      }
    }

    return {
      id: Math.random().toString(36),
      identifier: node.identifier,
      group_identifier: CustomNodes.getNodeGroup(type)?.group_identifier ?? '',
      type,
      position,
      height: node.minSize?.height,
      width: node.minSize?.width,
      data,
    };
  }

  static getColorOfCategory(category: string) {
    const group = CustomNodes.nodesList.find(
      (group) => group.group_identifier === category
    );
    return group?.color ?? '#000000';
  }

  static getHardGradientOfMultipleCategories(
    categories: string[],
    vertical: boolean = false
  ) {
    const colors = categories.map((category) =>
      CustomNodes.getColorOfCategory(category)
    );
    return `linear-gradient(to ${vertical ? 'top' : 'right'}, ${colors.map((color, index) => `${color} ${index * (100 / colors.length)}%, ${color} ${(index + 1) * (100 / colors.length)}%`).join(', ')})`;
  }

  static getColorOfHandle(sourceHandle: string) {
    const flowStore = useVueFlowStore();

    const split = sourceHandle.split('-');
    const nodeId = split[split.length - 1];
    if (split.length === 1) return '#000000';
    if (split.length === 2) {
      const node = flowStore.nodeById(nodeId!)!;
      const group = CustomNodes.getNodeGroup(node.type ?? '');
      return group?.color ?? '#000000';
    }
    if (split.length === 3) {
      const node = flowStore.nodeById(nodeId!)!;
      const nodeDef = CustomNodes.getCustomNodeConfig(node.type ?? '');
      const handleTypeKey = split[split.length - 2];
      const handleCategoryType =
        //@ts-ignore "constraints" exists on type 'id'
        nodeDef?.data[handleTypeKey!]?.constraints?.allowedCategories[0] ??
        CustomNodes.getNodeGroup(node.type ?? '')?.group_identifier;
      return CustomNodes.getColorOfCategory(handleCategoryType ?? '');
    }
  }
}
