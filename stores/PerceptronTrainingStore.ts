import { type Edge } from '~/types/edge.type';
import { defineStore } from 'pinia';
import { Perceptron } from '~/types/perceptron.class';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import type { OptionalExports } from '~/types/components.type';

interface PerceptronTrainingStoreData {
  perceptrons: Perceptron[];
}

export const usePerceptronTrainingStore = defineStore(
  'perceptronTrainingStore',
  {
    state: () => ({
      initialized: false,
      data: {
        perceptrons: [],
      } as PerceptronTrainingStoreData,
    }),
    getters: {},
    actions: {
      export(): OptionalExports {
        if (!this.initialized) {
          throw new Error(
            "Trying to export perceptronTrainingStore even though perceptrons aren't initialized yet. "
          );
        }
        const perceptrons = this.data.perceptrons.map(
          (perceptron: Perceptron) => instanceToPlain(perceptron)
        );
        return { perceptrons };
      },

      import(state: OptionalExports): void {
        if (!state.perceptrons) {
          throw new Error('Invalid import object.');
        }
        this.data.perceptrons = state.perceptrons.map(
          (perceptron: Record<string, any>) =>
            plainToInstance(Perceptron, perceptron)
        );
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
          throw new Error('Perceptron does not exist. ');
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
          throw new Error('Perceptron does not exist. ');
        }
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) {
          throw new Error(
            'Input node not found while removing perceptron input'
          );
        }
        perceptron.removeInput(inputNode.id);
      },

      updateEdgeWeight(edge: Edge, weight: number) {
        const vueFlowStore = useVueFlowStore();
        const perceptron = this.getOperatorNodePerceptron(edge.target);
        if (!perceptron) throw new Error('Perceptron does not exist. ');
        const inputNode = vueFlowStore.getNode(edge.source);
        if (!inputNode) throw new Error('Input node does not exist.');
        perceptron.updateInputNodeWeight(inputNode, weight);
      },
    },
  }
);
