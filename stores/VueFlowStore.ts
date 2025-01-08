import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';

export const useVueFlowStore = defineStore('vueFlowStore', {
  state: () => ({
    nodes: ref<Node[]>([]),
    edges: ref<Edge[]>([]),
    viewport: { x: 0, y: 0, zoom: 1 } as {
      x: number;
      y: number;
      zoom: number;
    },
    highlightedEdge: ref<string | null>(null),
  }),
  getters: {
    components(state) {
      return {
        nodes: state.nodes,
        edges: state.edges,
        viewport: state.viewport,
      };
    },
  },
  actions: {
    getNode(nodeId: string): Node | undefined {
      return this.nodes.find((node) => node.id === nodeId);
    },

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
