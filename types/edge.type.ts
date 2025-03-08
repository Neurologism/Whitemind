import { type Edge as VueFlowEdge } from '@vue-flow/core';
import type { Perceptron } from './perceptron.class';

export type Edge = VueFlowEdge<EdgeData>;
export interface EdgeData {
  weight?: number;
  perceptron?: Perceptron;
}
