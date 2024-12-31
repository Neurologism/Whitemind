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
          highlightNodesTypes: any[];
          unlockNodes: any[];
          trainingEnabled: boolean;
        }[];
      } | null,
      tutorialCompleted: false as boolean,
      tutorialStarted: false as boolean,
      projectId: null as string | null,
      currentStep: 0 as number,
    },
  }),
  getters: {
    currentAddEdges(data) {
      return data.tutorial.data === null
        ? []
        : data.tutorial.data.steps[data.tutorial.currentStep].addEdges;
    },

    currentAddNodes(data) {
      return data.tutorial.data === null
        ? []
        : data.tutorial.data.steps[data.tutorial.currentStep].addNodes;
    },

    currentNarrator(data): string {
      return data.tutorial.data === null
        ? ''
        : data.tutorial.data.steps[data.visibleStep].narrator;
    },

    progress(data): number {
      return data.tutorial.data === null
        ? 0
        : (data.tutorial.currentStep / (data.tutorial.data.steps.length - 1)) *
            100;
    },

    isLoaded(data): boolean {
      return data.tutorial.data !== null;
    },

    isTrainingEnabled(data): boolean {
      return data.openInEditor && data.tutorial.data
        ? data.tutorial.data.steps[data.tutorial.currentStep].trainingEnabled
        : true;
    },
  },
  actions: {
    syncState() {
      if (this.tutorial.data === null) {
        return;
      }

      if (this.syncInterval) {
        clearInterval(this.syncInterval);
      }
      this.syncInterval = setTimeout(() => {
        this.tutorialSetState();
      }, 3000);
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

    async fetchTutorial(fetchFunction: Function, id: string) {
      const response: Response = await fetchFunction('/api/tutorial/get', {
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
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Failed to fetch tutorial.');
        return null;
      }
    },

    async getTutorial(fetchFunction: Function, id: string) {
      const fetchResponse = await this.fetchTutorial(fetchFunction, id);

      if (fetchResponse) {
        this.tutorial.fetchedTime = new Date();

        this.tutorial.data = fetchResponse.tutorial;
        this.tutorial.tutorialCompleted = fetchResponse.tutorialCompleted;
        this.tutorial.tutorialStarted = fetchResponse.tutorialStarted;
        this.tutorial.currentStep = fetchResponse.currentStep;
        this.visibleStep = fetchResponse.currentStep;
        this.tutorial.projectId = fetchResponse.projectId;
        return true;
      } else {
        return false;
      }
    },

    async tutorialSetState(id: string | null = null) {
      const sessionStore = useSessionStore();

      const body = JSON.stringify({
        tutorialId: id === null ? this.tutorial.data?._id : id,
        setStep: this.tutorial.currentStep,
        setCompleted: this.tutorial.tutorialCompleted,
      });

      const response = await sessionStore.fetch('/api/tutorial/set-state', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

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
