import type { Node } from '@vue-flow/core';
import type { Edge } from './edge.type';

export interface Components extends OptionalExports {
  nodes: Node[];
  edges: Edge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface OptionalExports {
  perceptrons?: Record<string, any>[];
}
