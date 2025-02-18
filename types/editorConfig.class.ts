import type {
  NodeGroupDefinition,
  NodeDefinition,
  EdgeColors,
  NodeDefinitionDataEntry,
} from '~/types/blocks.types';
import type { Node, XYPosition } from '@vue-flow/core';
import { type Edge } from './edge.type';
import { useVueFlowStore } from '~/stores/VueFlowStore';
import Fuse from 'fuse.js';
import type { OptionalExports } from './components.type';

export class EditorConfig {
  nodesList: NodeGroupDefinition[];
  edgeColors: EdgeColors;
  getAdditionalExports: () => OptionalExports;
  importFromData: (editorConfig: EditorConfig, data: OptionalExports) => void;
  fuse: Fuse<NodeDefinition>;

  constructor(
    nodesList: NodeGroupDefinition[],
    edgeColors: EdgeColors,
    getAdditionalExports: () => OptionalExports = () => {
      return {};
    },
    importFromData: (
      editorConfig: EditorConfig,
      data: OptionalExports
    ) => void = (editorConfig, data) => {}
  ) {
    this.nodesList = nodesList;
    this.edgeColors = edgeColors;
    this.getAdditionalExports = getAdditionalExports;
    this.importFromData = importFromData;

    this.fuse = new Fuse(this.allNodes, {
      keys: ['name', 'description', 'type', 'group_identifier'],
    });
  }

  get allNodes() {
    return this.nodesList.flatMap((group) =>
      group.groups.flatMap((node) => node.nodes)
    );
  }

  getEdgeSourceDataAttribute(edge: Edge): NodeDefinitionDataEntry | undefined {
    const sourceNode = useVueFlowStore().getNode(edge.source);
    if (!sourceNode || !sourceNode.type) return;
    const sourceNodeDef = this.getCustomNodeConfig(sourceNode.type);
    if (!sourceNodeDef) return;
    const sourceHandleType = edge.sourceHandle?.split('-')[1];
    if (!sourceHandleType) return;
    return sourceNodeDef.data[sourceHandleType];
  }

  getEdgeTargetDataAttribute(edge: Edge): NodeDefinitionDataEntry | undefined {
    const targetNode = useVueFlowStore().getNode(edge.target);
    if (!targetNode || !targetNode.type) return;
    const targetNodeDef = this.getCustomNodeConfig(targetNode.type);
    if (!targetNodeDef) return;
    const targetHandleType = edge.targetHandle?.split('-')[1];
    if (!targetHandleType) return;
    return targetNodeDef.data[targetHandleType];
  }

  getOnNodeCreationCallback(node: Node): ((node: Node) => void) | undefined {
    return this.getCustomNodeConfig(node.id)?.onNodeCreation;
  }

  getOnEdgeConnectedCallback(edge: Edge): ((edge: Edge) => void) | undefined {
    const callbacks = this.getDoubleSidedAttributes(edge, 'onConnected') as ((
      edge: Edge
    ) => any)[];
    return this.combineEdgeCallbacks(callbacks);
  }

  getOnEdgeDisconnectedCallback(
    edge: Edge
  ): ((edge: Edge) => void) | undefined {
    const callbacks = this.getDoubleSidedAttributes(
      edge,
      'onDisconnected'
    ) as ((edge: Edge) => any)[];
    return this.combineEdgeCallbacks(callbacks);
  }

  getEdgeDisplayText(edgeId: string): string {
    const vueFlowStore = useVueFlowStore();

    const edge = vueFlowStore.getEdge(edgeId);
    if (!edge) return '';

    const callbacks = this.getDoubleSidedAttributes(
      edge,
      'edgeDisplayText'
    ) as (((edge: Edge) => string) | undefined)[];

    if (callbacks[0] === undefined && callbacks[1] === undefined) {
      return '';
    } else if (callbacks[0] !== undefined && callbacks[1] !== undefined) {
      throw new Error(
        `Conflict: Both source and target have edgeDisplayText callbacks defined for edge ${edgeId}`
      );
    }

    return this.combineEdgeCallbacks(callbacks)(edge);
  }

  getDoubleSidedEdgeSingleCallback(
    edge: Edge,
    attributeName: string
  ): (edge: Edge) => any {
    const callbacks = this.getDoubleSidedAttributes(edge, attributeName) as ((
      edge: Edge
    ) => any)[];
    return this.combineEdgeCallbacks(callbacks);
  }

  getDoubleSidedAttributes(
    edge: Edge,
    attributeName: string
  ): (Function | undefined)[] {
    let sourceAttribute: any = undefined;
    const edgeSourceDataAttribute = this.getEdgeSourceDataAttribute(edge);
    if (edgeSourceDataAttribute && attributeName in edgeSourceDataAttribute) {
      sourceAttribute = (edgeSourceDataAttribute as Record<string, any>)[
        attributeName
      ];
    }

    let targetAttribute: any = undefined;
    const edgeTargetDataAttribute = this.getEdgeTargetDataAttribute(edge);
    if (edgeTargetDataAttribute && attributeName in edgeTargetDataAttribute) {
      targetAttribute = (edgeTargetDataAttribute as Record<string, any>)[
        attributeName
      ];
    }

    return [sourceAttribute, targetAttribute];
  }

  combineEdgeCallbacks(
    callbacks: (((edge: Edge) => any) | undefined)[]
  ): (edge: Edge) => any {
    if (callbacks.length === 1) return callbacks[0] ?? ((edge: Edge) => {});
    return callbacks.reduce(
      (accumulated: (edge: Edge) => any, callback) => {
        if (callback === undefined) return accumulated;
        return (edge: Edge) => {
          accumulated(edge);
          return callback(edge);
        };
      },
      (edge: Edge) => {}
    );
  }

  static nodeHasNonIdData(node: NodeDefinition): boolean {
    return Object.keys(node.data).some((key) => node.data[key].type !== 'id');
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

  getNodeDefaultData(type: string, position: XYPosition): Node | null {
    const node = this.getCustomNodeConfig(type);
    if (!node) return null;
    const data = {} as Record<string, any>;

    for (const key in node.data) {
      if (node.data[key] !== undefined) {
        if ('value' in node.data[key]) {
          data[key] = node.data[key].value;
        } else {
          data[key] = undefined;
        }
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
    return this.edgeColors[category] ?? '#FFFFFF';
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
    const vueFlowStore = useVueFlowStore();

    const split = sourceHandle.split('-');
    const nodeId = split[split.length - 1];
    if (split.length === 1) {
      return '#000000';
    } else if (split.length === 2) {
      const node = vueFlowStore.getNode(nodeId!)!;
      const group = this.getNodeGroup(node.type ?? '');
      return group?.color ?? '#000000';
    } else if (split.length === 3) {
      const node = vueFlowStore.getNode(nodeId!)!;
      const nodeDef = this.getCustomNodeConfig(node.type ?? '');
      if (!nodeDef) {
        throw new Error(`Node definition not found for node ${node.type}`);
      }
      const handleTypeKey = split[split.length - 2];
      if (nodeDef.data[handleTypeKey].type !== 'id') {
        throw new Error(
          `Handle type ${handleTypeKey} is not of type 'id' in node ${node.type}`
        );
      }
      const constraints = nodeDef.data[handleTypeKey].constraints;
      if (!constraints) {
        throw new Error(
          `No constraints found for handle type ${handleTypeKey} in node ${node.type}`
        );
      }
      const allowedCategories = constraints.allowedCategories;
      if (!allowedCategories) {
        throw new Error(
          `No allowed categories found for handle type ${handleTypeKey} in node ${node.type}`
        );
      }
      const handleCategoryType =
        allowedCategories[0] ??
        this.getNodeGroup(node.type ?? '')?.group_identifier;
      return this.getColorOfCategory(handleCategoryType ?? '');
    }
  }

  getConstraintOfHandle(sourceHandle: string) {
    const vueFlowStore = useVueFlowStore();

    const split = sourceHandle.split('-');
    const nodeId = split[split.length - 1];
    if (split.length === 1) return null;
    const node = vueFlowStore.getNode(nodeId);
    if (!node) {
      throw new Error(`Node with id ${nodeId} not found`);
    }
    const nodeDef = this.getCustomNodeConfig(node.type ?? '');
    if (!nodeDef) {
      throw new Error(`Node definition not found for node ${node.type}`);
    }
    if (split.length === 2) {
      if (split[0] === 'in') {
        return nodeDef.inputConstraints;
      } else if (split[0] === 'out') {
        return nodeDef.outputConstraints;
      } else return null;
    }
    if (split.length === 3) {
      const handleTypeKey = split[split.length - 2];
      if ('constraints' in nodeDef.data[handleTypeKey]) {
        return nodeDef.data[handleTypeKey].constraints;
      } else {
        throw new Error(
          `No constraints found for handle type ${handleTypeKey} in node ${node.type}`
        );
      }
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
    return this.getColorOfCategory(overlappingCategories[0]); // todo: maybe other solution
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
