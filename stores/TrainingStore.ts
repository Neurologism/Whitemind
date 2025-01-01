import { defineStore } from 'pinia';

interface trainingState {
  training: {
    running: boolean;
    projectId?: string;
    modelId?: string;
    epoch: number | null;
    accuracy: number | null;
    loss: number | null;
    data: {
      status: 'queued' | 'training' | 'finished' | 'error' | 'stopped';
      output: any[];
      queued_at?: number;
      started_at?: number;
      finished_at?: number;
      error?: object;
      project_id?: string;
    };
  };
}

export const useTrainingStore = defineStore('trainingStore', {
  state: (): trainingState => ({
    training: {
      running: false,
      projectId: undefined,
      modelId: undefined,
      epoch: null,
      accuracy: null,
      loss: null,
      data: {
        status: 'queued',
        output: [],
        queued_at: undefined,
        started_at: undefined,
        finished_at: undefined,
        error: undefined,
        project_id: undefined,
      },
    },
  }),
  actions: {
    async startTraining(projectId: string) {
      const sessionStore = useSessionStore();
      this.$reset();
      const response = await sessionStore.fetch(
        '/api/project/model/training-start',
        {
          method: 'POST',
          body: JSON.stringify({
            project: {
              _id: projectId,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        this.training.running = true;
        this.training.projectId = projectId;
        this.training.modelId = data.model._id;
      }

      return {
        success: response.ok,
        message: (data['msg'] ?? null) as string | null,
      };
    },
    async fetchTrainingStatus(modelId: string) {
      const sessionStore = useSessionStore();
      if (!this.training.running) {
        return {
          success: false,
          message: 'Training not running',
        };
      }
      const response = await sessionStore.fetch(
        '/api/project/model/training-status',
        {
          method: 'POST',
          body: JSON.stringify({
            model: {
              _id: modelId,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseJson = await response.json();
      if (response.ok) {
        this.training.data = responseJson.model;
        if (
          responseJson.model.status === 'stopped' ||
          responseJson.model.status === 'finished'
        ) {
          this.training.running = false;
        }

        for (const output of this.training.data.output.reverse()) {
          if (output?.performance) {
            this.training.epoch = output.performance?.epoch;
            this.training.accuracy = output.performance?.accuracy;
            this.training.loss = output.performance?.loss;
            break;
          }
        }
      } else {
        this.$reset();
      }
      return {
        success: response.ok,
        message: (responseJson['msg'] ?? null) as string | null,
      };
    },
    async stopTraining() {
      if (!this.training.running) {
        return {
          success: false,
          message: 'Training not running',
        };
      }
      const sessionStore = useSessionStore();
      const response = await sessionStore.fetch(
        '/api/project/model/training-stop',
        {
          method: 'POST',
          body: JSON.stringify({
            model: {
              _id: this.training.modelId,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        this.$reset();
      }
      return {
        success: response.ok,
        message: (data['msg'] ?? null) as string | null,
      };
    },
    getVisualizerData(nodeID: string) {
      return this.training.data.output.filter((data) =>
        Object.keys(data).includes(nodeID)
      );
    },
  },
});
