import { type Edge as VueFlowEdge } from '@vue-flow/core';
import type { Perceptron } from './perceptron.class';

export type Edge = VueFlowEdge<EdgeData>;
export interface EdgeData {}

export type PerceptronEdge = VueFlowEdge<PerceptronEdgeData>;
export interface PerceptronEdgeData extends EdgeData {
  weight: number;
  perceptron: Perceptron;
}
