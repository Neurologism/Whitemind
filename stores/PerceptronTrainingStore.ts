import { type Edge } from '~/types/edge.type';
import { type Node } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { Perceptron } from '~/types/perceptron.class';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import type { OptionalExports } from '~/types/components.type';

interface PerceptronTrainingStoreData {
  perceptrons: Perceptron[];
  inputNodes: string[];
  inputNodeUserValues: Record<string, number>;
}

export const usePerceptronTrainingStore = defineStore(
  'perceptronTrainingStore',
  {
    state: () => ({
      initialized: false,
      data: {
        perceptrons: [],
        inputNodes: [],
        inputNodeUserValues: {},
      } as PerceptronTrainingStoreData,
    }),
    getters: {},
    actions: {
      export(): OptionalExports {
        if (!this.initialized) {
          this.initializePerceptrons();
        }
        const perceptrons = this.data.perceptrons.map(
          (perceptron: Perceptron) => instanceToPlain(perceptron)
        );
        return {
          perceptrons,
          inputNodes: this.data.inputNodes,
          inputNodeUserValues: this.data.inputNodeUserValues,
        };
      },

      import(state: OptionalExports): void {
        if (!state.perceptrons) {
          console.error('Invalid import object.');
          return;
        }

        this.data.perceptrons = state.perceptrons.map(
          (perceptron: Record<string, any>) =>
            plainToInstance(Perceptron, perceptron)
        );
        this.data.inputNodes = state.inputNodes ?? [];
        this.data.inputNodeUserValues = state.inputNodeUserValues ?? {};

        this.initialized = true;
      },

      initializePerceptrons() {
        const vueFlowStore = useVueFlowStore();

        this.data.perceptrons = [];
        for (const node of vueFlowStore.nodes) {
          if (node.type === 'operator_add') {
            this.data.perceptrons.push(Perceptron.fromOperator(node.id));
          }
        }

        this.initialized = true;
      },

      getOperatorNodePerceptron(
        operatorNodeId: string
      ): Perceptron | undefined {
        return this.data.perceptrons.find(
          (perceptron) => perceptron.operatorNode?.id === operatorNodeId
        );
      },

      getSignNodePerceptron(signNodeId: string): Perceptron | undefined {
        return this.data.perceptrons.find(
          (perceptron) => perceptron.signNode?.id === signNodeId
        );
      },

      getInputNodeIndex(inputNodeId: string): number {
        return this.data.inputNodes.findIndex((nId) => nId === inputNodeId);
      },

      setInputNodeUserValue(inputNodeId: string, newValue: number): void {
        this.data.inputNodeUserValues[inputNodeId] = newValue;
      },

      getInputNodeUserValue(inputNodeId: string): number {
        return this.data.inputNodeUserValues[inputNodeId];
      },

      getInputNodePerceptron(inputNodeId: string): Perceptron | undefined {
        for (const perceptron of this.data.perceptrons) {
          if (!perceptron.inputNodes) continue;
          for (let i = 0; i < perceptron.inputNodes.length; i++) {
            if (perceptron.inputNodes[i].id === inputNodeId) return perceptron;
          }
        }
      },

      getInputWeight(edge: Edge): number | null {
        if (!this.initialized) {
          this.initializePerceptrons();
        }
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) {
          return null;
        }
        return perceptron.getInputWeight(edge.source);
      },

      onOperatorNodeCreation(node: Node) {
        const perceptron = new Perceptron(
          [],
          'activation_none',
          node,
          [],
          undefined
        );
        this.data.perceptrons.push(perceptron);
      },

      onOperatorNodeRemoval(node: Node) {
        this.data.perceptrons = this.data.perceptrons.filter(
          (perceptron) => perceptron.operatorNode?.id !== node.id
        );
      },

      onInputNodeRemoval(node: Node) {
        const perceptron = this.getInputNodePerceptron(node.id);
        if (!perceptron) return;
        perceptron.removeInput(node.id);
        const inputNodeIndex = this.getInputNodeIndex(node.id);
        this.data.inputNodes.splice(inputNodeIndex);
        delete this.data.inputNodeUserValues[node.id];
      },

      onConnectedInput(edge: Edge, inputNodeUserValue: number = 0) {
        const vueFlowStore = useVueFlowStore();
        const sessionStore = useSessionStore();
        const newPerceptron = this.getOperatorNodePerceptron(edge.target);
        if (
          !this.data.inputNodes.some((nodeId: string) => nodeId === edge.source)
        ) {
          this.data.inputNodes.push(edge.source);
          this.data.inputNodeUserValues[edge.source] ??= inputNodeUserValue;
        }
        if (!newPerceptron) {
          sessionStore.errorToast('Perceptron does not exist.');
          return;
        }
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) {
          sessionStore.errorToast(
            'Input node not found while adding perceptron input'
          );
          return;
        }
        newPerceptron.addInput(inputNode);
      },

      onDisconnectedInput(edge: Edge) {
        const vueFlowStore = useVueFlowStore();
        const oldPerceptron = this.getOperatorNodePerceptron(edge.target);
        if (!oldPerceptron) {
          throw new Error('Perceptron does not exist. ');
        }
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) {
          throw new Error(
            'Input node not found while removing perceptron input'
          );
        }
        oldPerceptron.removeInput(inputNode.id);
        if (this.getInputNodePerceptron(edge.source) === undefined) {
          const index = this.getInputNodeIndex(inputNode.id);
          if (index === -1) {
            console.error('Input node not found');
            return;
          }
          this.data.inputNodes.splice(index);
        }
      },

      updateEdgeWeight(edge: Edge, weight: number) {
        const vueFlowStore = useVueFlowStore();
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) throw new Error('Perceptron does not exist. ');
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) throw new Error('Input node does not exist.');
        perceptron.updateInputNodeWeight(inputNode, weight);
      },

      calculatePerceptronRawOutput(perceptron: Perceptron): number {
        if (perceptron.inputNodes?.length !== perceptron.weights.length) {
          console.error('Invalid inputNodes for perceptron.');
          return NaN;
        }
        const inputValues = perceptron.inputNodes.map(
          (node) => this.data.inputNodeUserValues[node.id]
        );
        return perceptron.calculateRawOutput(inputValues);
      },

      calculatePerceptronSignedOutput(perceptron: Perceptron): number {
        const rawOutput = this.calculatePerceptronRawOutput(perceptron);
        if (isNaN(rawOutput)) return rawOutput;
        return perceptron.activationFunction(rawOutput);
      },
    },
  }
);
