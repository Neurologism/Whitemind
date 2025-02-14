import type { Edge, Node } from '@vue-flow/core';
import type { ActivationFunction } from '~/types/activationFunction.type';
import { activationFunctionNodes } from '~/data/activationFunctionNodes';

export class Perceptron {
  weights: number[];
  activationFunction: ActivationFunction;
  operatorNode: Node | undefined;
  inputNodes: Node[] | undefined;
  signNode: Node | undefined;

  constructor(
    weights: number[],
    activationFunction: ActivationFunction,
    operatorNodeId: Node | undefined = undefined,
    inputNodes: Node[] | undefined = undefined,
    signNode: Node | undefined = undefined
  ) {
    this.weights = weights;
    this.activationFunction = activationFunction;
    this.operatorNode = operatorNodeId;
    this.inputNodes = inputNodes;
    this.signNode = signNode;

    if (this.inputNodes && this.weights.length !== this.inputNodes.length) {
      throw new Error(
        'Input ids length is greater than zero, but is different from weights length.'
      );
    }
  }

  static fromOperator(
    operatorNodeId: string,
    nodes: Node[] | undefined = undefined,
    edges: Edge[] | undefined = undefined
  ) {
    const vueFlowStore = useVueFlowStore();
    if (!nodes) {
      nodes = vueFlowStore.nodes;
    }
    if (!edges) {
      edges = vueFlowStore.edges;
    }

    const operatorNode = nodes.find((node) => node.id === operatorNodeId);
    if (!operatorNode) {
      throw new Error('Operator node not found');
    }

    const inputEdges = vueFlowStore.getEdgesByTargetId(operatorNodeId);
    const inputNodes = inputEdges.map((edge): Node => {
      const node = vueFlowStore.getNode(edge.source);
      if (!node) {
        throw new Error('Input node not found');
      }
      return node;
    }); // FIXME: get summand nodes by summand input field
    const outputEdges = vueFlowStore.getEdgesBySourceId(operatorNodeId);
    const outputNodes = outputEdges.map((edge) =>
      vueFlowStore.getNode(edge.target)
    );

    if (outputNodes.length !== 1) {
      throw new Error('Operator node must have exactly one output');
    }
    const signNode = outputNodes[0]; // FIXME: get output node by sum output field

    const weights = inputNodes.map(() => Math.random());

    return new Perceptron(
      weights,
      activationFunctionNodes['activation_sign'], // FIXME: hardcoded activation function
      operatorNode,
      inputNodes,
      signNode
    );
  }

  calculateSignedOutput(inputs: number[]): number {
    return this.activationFunction(this.calculateRawOutput(inputs));
  }

  calculateRawOutput(inputs: number[]): number {
    if (inputs.length !== this.weights.length) {
      throw new Error('Input length does not match weight length');
    }

    return this.weights.reduce(
      (sum, weight, index) => sum + weight * inputs[index],
      0
    );
  }
}
