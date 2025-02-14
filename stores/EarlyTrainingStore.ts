import { defineStore } from 'pinia';

// hier kannst du bei Bedarf Typen definieren, z.B. so:
interface RandomType {
  components: Project[];
  models: string[];
  name: string;
  visibility: 'private' | 'public';
}

// Bei Bedarf kannst du auch Klassen erstellen, z.B. eine eigene Perceptron-Klasse
class Perceptron {
  constructor() {
    console.log('Perceptron created');
  }
}

export const useVueFlowStore = defineStore('earlyTrainingStore', {
  // im state gibst du das schema der zu speichernden daten an → wird in einem globalen Objekt gespeichert
  state: () => ({}),

  // getters sind praktisch einfach computed values
  getters: {},

  // actions sind das pardon zu methoden einer Klasse
  actions: {},
});
