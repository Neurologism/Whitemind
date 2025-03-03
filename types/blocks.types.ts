import type { Node } from '@vue-flow/core';
import type { Edge } from './edge.type';

export enum FlowOrientation {
  INPUT = 'input',
  OUTPUT = 'output',
}

export type NodeGroupDefinition = {
  name: string;
  icon: string;
  color: string;
  group_identifier: string;
  default_width?: number;
  groups: NodeSubGroupDefinition[];
};

export type NodeSubGroupDefinition = {
  name: string;
  icon?: string;
  color?: string;
  nodes: NodeDefinition[];
};

export type NodeConnectionConstraint = {
  allowedCategories?: string[];
  min?: number;
  max?: number;
};

export enum NodeDisplay {
  Classic = 'CLASSIC',
  Circle = 'CIRCLE',
}

export type NodeDefinition = {
  display: NodeDisplay;
  type: string;
  name: string;
  description: string;
  identifier: string;
  minSize?: { width: number; height: number };
  circleDiameter?: number;
  hideTopBar?: boolean;
  hideInput?: boolean;
  hideOutput?: boolean;
  inputConstraints?: NodeConnectionConstraint;
  outputConstraints?: NodeConnectionConstraint;
  data: Record<string, NodeDefinitionDataEntry>;
  dynamicNodeName?: (node: Node) => string;
  onNodeCreation?: (node: Node) => void;
  onNodeRemoval?: (node: Node) => void;
  contextMenuOptions?: ContextMenuOption[];
};

export type ContextMenuOption = {
  label: string;
  onClick: (node: Node) => void;
};

export type NodeDefinitionDataEntry =
  | {
      type: 'id';
      flowOrientation: FlowOrientation;
      invertPosition?: boolean;
      constraints?: NodeConnectionConstraint;
      required?: boolean;
      rules?: any[];
      edgeDisplayText?: (edge: Edge) => string; // do a global search when renaming
      onConnected?: (edge: Edge) => void; // do a global search when renaming
      onDisconnected?: (edge: Edge) => void; // do a global search when renaming
      allowModifyDisplayText?: boolean;
      setDisplayText?: (edge: Edge, text: string) => void;
      dynamicAttributeName?: (node: Node) => string;
      hasInput?: boolean;
      setInputValue?: (node: Node, text: string) => void;
      getInputValue?: (node: Node) => string;
    }
  | {
      type: 'select';
      options: string[];
      value?: string | null;
    }
  | {
      type: 'float';
      value?: number | null;
      min?: number;
      max?: number;
      step?: number;
    }
  | {
      type: 'int';
      value?: number | null;
      min?: number;
      max?: number;
      step?: number;
    }
  | {
      type: 'boolean';
      value?: boolean | null;
      inline: boolean | undefined;
    }
  | {
      type: 'tuple';
      itemType: 'number' | 'string';
      value?: string[] | null;
    }
  | {
      type: 'multiselect';
      options: string[];
      value?: string[] | null;
    }
  | {
      type: 'string';
      value?: string | null;
    }
  | {
      type: 'range';
      min: number;
      max: number;
      step: number;
      value?: number | null;
      inline: boolean | undefined;
    };

export type EdgeColors = Record<string, string>;
