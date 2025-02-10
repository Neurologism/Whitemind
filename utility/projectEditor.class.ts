import { blocks } from '~/data/blocks';
import type { NodeGroupDefinition, NodeDefinition } from '~/data/blocks';
import type { XYPosition } from '@vue-flow/core';
import { useVueFlowStore } from '~/stores/VueFlowStore';
import Fuse from 'fuse.js';

export class EditorConfig {
  nodesList: NodeGroupDefinition[];
  fuse;

  constructor(nodesList: NodeGroupDefinition[]) {
    this.nodesList = nodesList;
    this.fuse = new Fuse(this.allNodes, {
      keys: ['name', 'description', 'type', 'group_identifier'],
    });
  }

  get allNodes() {
    return this.nodesList.flatMap((group) =>
      group.groups.flatMap((node) => node.nodes)
    );
  }

  getCustomNodeConfig(type: string): NodeDefinition | undefined {
    return this.nodesList
      .flatMap((group) => group.groups.flatMap((node) => node.nodes))
      .find((node) => node.type === type);
  }

  getNodeGroup(type: string): NodeGroupDefinition | null {
    const node = this.getCustomNodeConfig(type);
    if (!node) return null;
    return (
      this.nodesList.find((group) =>
        group.groups
          .flatMap((node) => node.nodes)
          .some((node: NodeDefinition) => node.type === type)
      ) ?? null
    );
  }

  getDefaultData(type: string, position: XYPosition) {
    const node = this.getCustomNodeConfig(type);
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
      group_identifier: this.getNodeGroup(type)?.group_identifier ?? '',
      type,
      position,
      height: node.minSize?.height,
      width: node.minSize?.width,
      data,
    };
  }

  getColorOfCategory(category: string) {
    const group = this.nodesList.find(
      (group) => group.group_identifier === category
    );
    return group?.color;
  }

  getHardGradientOfMultipleCategories(
    categories: string[],
    vertical: boolean = false
  ) {
    const colors = categories.map((category) =>
      this.getColorOfCategory(category)
    );
    return `linear-gradient(to ${vertical ? 'top' : 'right'}, ${colors.map((color, index) => `${color} ${index * (100 / colors.length)}%, ${color} ${(index + 1) * (100 / colors.length)}%`).join(', ')})`;
  }

  getColorOfHandle(sourceHandle: string) {
    const flowStore = useVueFlowStore();

    const split = sourceHandle.split('-');
    const nodeId = split[split.length - 1];
    if (split.length === 1) return '#000000';
    if (split.length === 2) {
      const node = flowStore.getNode(nodeId!)!;
      const group = this.getNodeGroup(node.type ?? '');
      return group?.color ?? '#000000';
    }
    if (split.length === 3) {
      const node = flowStore.getNode(nodeId!)!;
      const nodeDef = this.getCustomNodeConfig(node.type ?? '');
      const handleTypeKey = split[split.length - 2];
      const handleCategoryType =
        //@ts-ignore "constraints" exists on type 'id'
        nodeDef?.data[handleTypeKey!]?.constraints?.allowedCategories[0] ??
        this.getNodeGroup(node.type ?? '')?.group_identifier;
      return this.getColorOfCategory(handleCategoryType ?? '');
    }
  }

  getConstraintOfHandle(sourceHandle: string) {
    const flowStore = useVueFlowStore();

    const split = sourceHandle.split('-');
    const nodeId = split[split.length - 1];
    if (split.length === 1) return null;
    if (split.length === 2) {
      const node = flowStore.getNode(nodeId!)!;
      const nodeDef = this.getCustomNodeConfig(node.type ?? '');

      if (split[0] === 'in') {
        return nodeDef?.inputConstraints;
      } else if (split[0] === 'out') {
        return nodeDef?.outputConstraints;
      } else return null;
    }
    if (split.length === 3) {
      const node = flowStore.getNode(nodeId!)!;
      const nodeDef = this.getCustomNodeConfig(node.type ?? '');
      const handleTypeKey = split[split.length - 2];
      // @ts-ignore "constraints" exists on type 'id'
      return nodeDef?.data[handleTypeKey!]?.constraints;
    }
  }

  getEdgeColor(sourceHandle: string, targetHandle: string) {
    const sourceConstraint = this.getConstraintOfHandle(sourceHandle);
    const targetConstraint = this.getConstraintOfHandle(targetHandle);
    const overlappingCategories = sourceConstraint?.allowedCategories?.filter(
      (category: string) =>
        targetConstraint?.allowedCategories?.includes(category)
    );
    if (!overlappingCategories) return null;
    return this.getColorOfCategory(overlappingCategories[0]); //todo: maybe other solution
  }

  search(q: string): NodeGroupDefinition[] {
    if (q === '') return this.nodesList;
    let clone = structuredClone(this.nodesList);
    const result = this.fuse.search(q);
    for (const group of clone) {
      for (const subGroup of group.groups) {
        subGroup.nodes = subGroup.nodes.filter((node) =>
          result.some((res) => res.item.type === node.type)
        );
      }
    }

    // Remove empty groups and subgroups
    clone = clone.filter((group) => group.groups.length > 0);
    clone.forEach((subGroup) => {
      subGroup.groups = subGroup.groups.filter(
        (subGroup) => subGroup.nodes.length > 0
      );
    });

    return clone;
  }
}
