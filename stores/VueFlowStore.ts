import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';

export const useVueFlowStore = defineStore('vueFlowStore', {
  state: () => ({
    nodes: ref<Node[]>([]),
    edges: ref<Edge[]>([]),
    highlightedEdge: ref<string | null>(null),
    remote_data: {
      _id: 'string',
      name: 'string',
      description: 'string',
      owner_id: 'string',
      contributors: ['string'],
      visibility: 'private or public',
      created_on: 0,
      last_edited: 0,
    },
  }),
  getters: {
    nodeById:
      (state) =>
      (id: string): Node | undefined => {
        return state.nodes.find((node: Node) => node.id === id);
      },
  },
  actions: {
    removeEdge(edgeId: string) {
      console.log('Removing edge', edgeId);
      this.edges = this.edges.filter((edge) => edge.id !== edgeId);
      this.highlightedEdge = null;
    },

    nodeExists(nodeId: string): boolean {
      return this.nodes.some((node) => node.id === nodeId);
    },

    edgeExists(edgeId: string): boolean {
      return this.edges.some((edge) => edge.id === edgeId);
    },
  },
});
