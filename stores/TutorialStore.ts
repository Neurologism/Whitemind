import { defineStore } from 'pinia';

export const useTutorialStore = defineStore('tutorialStore', {
  state: () => ({
    openInEditor: false,
    syncInterval: null as NodeJS.Timeout | null,
    visibleStep: 0 as number,
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
        unlockNodes: string[];
        steps: {
          text: string;
          narrator: string;
          addNodes: any[];
          addEdges: any[];
          removeNodes: any[];
          removeEdges: any[];
          modifyNodes: any[];
          highlightNodesTypes: any[];
          unlockNodes: any[];
          trainingEnabled: boolean;
        }[];
      } | null,
      tutorialCompleted: false as boolean,
      tutorialStarted: false as boolean,
      projectId: ref(''),
      currentStep: 0 as number,
      isUnlocked: false as boolean,
    },
  }),
  getters: {
    isNextStepUnlocked(state): boolean {
      const vueFlowStore = useVueFlowStore();
      const currentStep =
        state.tutorial.data?.steps[state.tutorial.currentStep];
      if (currentStep === undefined) {
        return false;
      }

      for (const addNode of currentStep.addNodes) {
        if (!vueFlowStore.nodeExists(addNode.id)) {
          return false;
        }
      }
      for (const removeNode of currentStep.removeNodes) {
        if (vueFlowStore.nodeExists(removeNode.id)) {
          return false;
        }
      }
      for (const addEdge of currentStep.addEdges) {
        if (!vueFlowStore.edgeExists(addEdge.id)) {
          return false;
        }
      }
      for (const removeEdge of currentStep.removeEdges) {
        if (vueFlowStore.edgeExists(removeEdge.id)) {
          return false;
        }
      }

      return true;
    },

    currentAddEdges(state) {
      return state.tutorial.data === null
        ? []
        : state.tutorial.data.steps[state.tutorial.currentStep].addEdges;
    },

    currentRemoveEdges(state) {
      return state.tutorial.data === null
        ? []
        : state.tutorial.data.steps[state.tutorial.currentStep].removeEdges;
    },

    currentAddNodes(state) {
      return state.tutorial.data === null
        ? []
        : state.tutorial.data.steps[state.tutorial.currentStep].addNodes;
    },

    currentRemoveNodes(state) {
      return state.tutorial.data === null
        ? []
        : state.tutorial.data.steps[state.tutorial.currentStep].removeNodes;
    },

    currentModifyNodes(state) {
      return state.tutorial.data === null
        ? []
        : state.tutorial.data.steps[state.tutorial.currentStep].modifyNodes;
    },

    currentNarrator(state): string {
      return state.tutorial.data === null
        ? ''
        : state.tutorial.data.steps[state.visibleStep].narrator;
    },

    progress(state): number {
      return state.tutorial.data === null
        ? 0
        : (state.visibleStep / (state.tutorial.data.steps.length - 1)) * 100;
    },

    isLoaded(state): boolean {
      return state.tutorial.data !== null;
    },

    isTrainingEnabled(state): boolean {
      return state.openInEditor && state.tutorial.data
        ? state.tutorial.data.steps[state.tutorial.currentStep].trainingEnabled
        : true;
    },
  },
  actions: {
    setStep(step: number) {
      this.visibleStep = step;
      this.tutorial.currentStep = step;
      this.syncState();
    },

    syncState() {
      if (this.tutorial.data === null) {
        return;
      }

      if (this.syncInterval) {
        clearInterval(this.syncInterval);
      }
      this.syncInterval = setTimeout(() => {
        this.tutorialSetState();
      }, 1000);
    },

    stepForward() {
      if (
        this.tutorial.data === null ||
        this.visibleStep >= this.tutorial.data.steps.length - 1
      ) {
        return false;
      }
      this.visibleStep++;
      console.log(this.visibleStep);
      if (this.visibleStep > this.tutorial.currentStep) {
        console.log(this.tutorial.currentStep);
        this.tutorial.currentStep = this.visibleStep;
        if (this.tutorial.currentStep === this.tutorial.data.steps.length - 1) {
          this.tutorial.tutorialCompleted = true;
        }
        this.syncState();
      }
      return true;
    },

    stepBack() {
      if (this.tutorial.data === null || this.visibleStep <= 0) {
        return false;
      }
      this.visibleStep--;
      return true;
    },

    async fetchTutorial(tutorialId: string) {
      const sessionStore = useSessionStore();
      const response: Response = await sessionStore.fetch(
        `/tutorials/${tutorialId}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Failed to fetch tutorial by id.');
        return null;
      }
    },

    async fetchTutorialByName(name: string) {
      const sessionStore = useSessionStore();
      const response = await sessionStore.fetch(`/tutorials/by-name/${name}`, {
        method: 'GET',
        cache: 'no-cache',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Failed to fetch tutorial by name.');
        return null;
      }
    },

    async getTutorial(id: string) {
      const fetchResponse = await this.fetchTutorial(id);

      if (fetchResponse) {
        this.tutorial.fetchedTime = new Date();

        this.tutorial.data = fetchResponse.tutorial;
        this.tutorial.tutorialCompleted = fetchResponse.tutorialCompleted;
        this.tutorial.tutorialStarted = fetchResponse.tutorialStarted;
        this.tutorial.currentStep = fetchResponse.currentStep;
        this.visibleStep = fetchResponse.currentStep;
        this.tutorial.projectId = fetchResponse.projectId;
        this.tutorial.isUnlocked = fetchResponse.isUnlocked;
        return true;
      } else {
        return false;
      }
    },

    async tutorialSetState(tutorialId: string | null = null) {
      const sessionStore = useSessionStore();

      const body = JSON.stringify({
        setStep: this.tutorial.currentStep,
        setCompleted: this.tutorial.tutorialCompleted,
      });

      const response = await sessionStore.fetch(
        `/tutorials/${tutorialId === null ? this.tutorial.data?._id : tutorialId}`,
        {
          method: 'PATCH',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        }
      );

      if (!response.ok) {
        console.error('Failed to update tutorial.');
        return false;
      }

      const data = await response.json();
      console.log(data);
      this.tutorial.projectId = data.projectId;
      console.log(this.tutorial.projectId);
      return true;
    },
  },
});
