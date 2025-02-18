import { type Edge } from '~/types/edge.type';
import { type Node } from '@vue-flow/core';
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
          this.initializePerceptrons();
        }
        const perceptrons = this.data.perceptrons.map(
          (perceptron: Perceptron) => instanceToPlain(perceptron)
        );
        return { perceptrons };
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

      getInputNodeIndex(inputNodeId: string): number {
        for (const perceptron of this.data.perceptrons) {
          if (!perceptron.inputNodes) continue;
          for (let i = 0; i < perceptron.inputNodes.length; i++) {
            if (perceptron.inputNodes[i].id === inputNodeId) return i;
          }
        }
        return -1;
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
        const perceptron = new Perceptron([], (x) => x, node, [], undefined);
        this.data.perceptrons.push(perceptron);
      },

      onOperatorNodeRemoval(node: Node) {
        this.data.perceptrons = this.data.perceptrons.filter(
          (perceptron) => perceptron.operatorNode?.id !== node.id
        );
        console.log(node);
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
