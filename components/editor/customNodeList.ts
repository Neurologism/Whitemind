import { blocks } from '~/components/editor/blocks';
import type {
  NodeGroupDefinition,
  NodeDefinition,
} from '~/components/editor/blocks';
import type { XYPosition } from '@vue-flow/core';

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
}
