import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Node } from '@vue-flow/core';
import type { Edge } from '~/types/edge.type';
import type { Components, OptionalExports } from '~/types/components.type';

export const useVueFlowStore = defineStore('vueFlowStore', {
  state: () => ({
    nodes: ref<Node[]>([]),
    edges: ref<Edge[]>([]),
    viewport: { x: 0.1, y: 0.1, zoom: 1.1 } as {
      x: number;
      y: number;
      zoom: number;
    },
    highlightedEdge: ref<string | null>(null),
  }),
  getters: {
    components(state): Components {
      return {
        nodes: state.nodes,
        edges: state.edges,
        viewport: state.viewport,
      };
    },
  },
  actions: {
    export(): Components {
      const projectStore = useProjectStore();
      const additionalExports: OptionalExports =
        projectStore.editorConfig.getAdditionalExports();
      return {
        ...this.components,
        ...additionalExports,
      };
    },

    addEdges(edges: Edge[] | Edge): void {
      if (!Array.isArray(edges)) {
        edges = [edges];
      }
      this.edges = this.edges.concat(edges);

      const projectStore = useProjectStore();
      for (const edge of edges) {
        const callback =
          projectStore.editorConfig.getOnEdgeConnectedCallback(edge);
        if (callback) callback(edge);
      }
    },

    removeEdge(edge: Edge): void {
      this.edges = this.edges.filter(
        (currentEdge) => currentEdge.id !== edge.id
      );

      const projectStore = useProjectStore();
      const callback =
        projectStore.editorConfig.getOnEdgeDisconnectedCallback(edge);
      if (callback) callback(edge);
      this.highlightedEdge = null;
    },

    getNode(nodeId: string): Node | undefined {
      return this.nodes.find((node) => node.id === nodeId);
    },

    getEdge(edgeId: string): Edge | undefined {
      return this.edges.find((edge) => edge.id === edgeId);
    },

    getEdgesByTargetId(targetId: string): Edge[] {
      return this.edges.filter((edge: Edge) => edge.target === targetId);
    },

    getEdgesBySourceId(sourceId: string): Edge[] {
      return this.edges.filter((edge: Edge) => edge.source === sourceId);
    },

    nodeExists(nodeId: string): boolean {
      return this.nodes.some((node) => node.id === nodeId);
    },

    edgeExists(edgeId: string): boolean {
      return this.edges.some((edge) => edge.id === edgeId);
    },
  },
});
