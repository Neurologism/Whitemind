import type { Edge } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { Perceptron } from '~/types/perceptron.class';

export const usePerceptronTrainingStore = defineStore(
  'perceptronTrainingStore',
  {
    state: () => ({
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
      },

      getOperatorNodePerceptron(
        operatorNodeId: string
      ): Perceptron | undefined {
        return this.perceptrons.find(
          (perceptron) => perceptron.operatorNode?.id === operatorNodeId
        );
      },

      getInputWeight(edge: Edge): number | null {
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) {
          return null;
        }
        return perceptron.getInputWeight(edge.source);
      },
    },
  }
);
