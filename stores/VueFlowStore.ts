import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';

export const useVueFlowStore = defineStore('vueFlowStore', {
  state: () => ({
    nodes: ref<Node[]>([]),
    edges: ref<Edge[]>([]),
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
});
