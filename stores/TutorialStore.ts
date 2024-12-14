import { defineStore } from 'pinia';

export const useTutorialStore = defineStore('tutorialStore', {
  state: () => ({
    tutorial: {
      fetchedTime: null as null | Date,
      data: null as {
        _id: string;
        name: string;
        summary: string;
        description: string;
        requiredTutorials: string[];
        nextTutorials: string[];
        experienceGain: number;
        startproject: string;
        unlockNodes: string[];
        steps: {
          text: string;
          narrator: string;
          addNodes: any[];
          addEdges: any[];
          removeNodes: any[];
          removeEdges: any[];
          highlightNodesTypes: any[];
          unlockNodes: any[];
          trainingEnabled: boolean;
        }[];
        tutorialCompleted: boolean;
        tutorialStarted: boolean;
      } | null,
    },
  }),
  getters: {},
  actions: {
    async fetchTutorial(fetchFunction: Function, id: string) {
      let response: Response = await fetchFunction('/api/tutorial/get', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorialId: id,
        }),
      });

      if (response.ok) {
        let data = await response.json();
        return data.tutorial;
      } else {
        console.error('Failed to fetch tutorial.');
        return null;
      }
    },

    async tutorialSetState(
      fetchFunction: Function,
      id: string | null = null,
      setStep: number | null = null,
      setCompleted: boolean | null = null
    ) {
      const body = JSON.stringify({
        tutorialId: id === null ? this.tutorial.data?._id : id,
        step: setStep === null ? this.tutorial.data?.steps.length : setStep,
        completed:
          setCompleted === null
            ? this.tutorial.data?.tutorialCompleted
            : setCompleted,
      });

      const result = await fetchFunction('/api/tutorial/set-state', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (result.ok) {
        return true;
      } else {
        console.error('Failed to update project.');
        return false;
      }
    },
  },
});
