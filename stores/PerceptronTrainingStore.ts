import type { Edge } from '@vue-flow/core';
import { on } from 'events';
import { defineStore } from 'pinia';
import { Perceptron } from '~/types/perceptron.class';

export const usePerceptronTrainingStore = defineStore(
  'perceptronTrainingStore',
  {
    state: () => ({
      initialized: false,
      perceptrons: [] as Perceptron[],
    }),
    getters: {},
    actions: {
      initializePerceptrons() {
        const vueFlowStore = useVueFlowStore();

        this.perceptrons = [];
        for (const node of vueFlowStore.nodes) {
          if (node.type === 'operator_add') {
            this.perceptrons.push(Perceptron.fromOperator(node.id));
          }
        }

        this.initialized = true;
      },

      getOperatorNodePerceptron(
        operatorNodeId: string
      ): Perceptron | undefined {
        return this.perceptrons.find(
          (perceptron) => perceptron.operatorNode?.id === operatorNodeId
        );
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

      onConnectedInput(edge: Edge) {
        const vueFlowStore = useVueFlowStore();
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) {
          return;
        }
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) {
          throw new Error('Input node not found while adding perceptron input');
        }
        perceptron.addInput(inputNode);
      },

      onDisconnectedInput(edge: Edge) {
        const vueFlowStore = useVueFlowStore();
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) {
          return;
        }
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) {
          throw new Error(
            'Input node not found while removing perceptron input'
          );
        }
        perceptron.removeInput(inputNode.id);
      },
    },
  }
);
