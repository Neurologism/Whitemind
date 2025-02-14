import { defineStore } from 'pinia';
import { Perceptron } from '~/types/perceptron.class';

export const usePerceptronTrainingStore = defineStore(
  'perceptronTrainingStore',
  {
    state: () => ({
      perceptrons: [] as Perceptron[],
    }),
    getters: {},
    actions: {},
  }
);
