import { defineStore } from 'pinia';

interface TrainingState {
  training: {
    running: boolean;
    projectId?: string;
    startNodeId?: string;
    modelId?: string;
    epoch: number | null;
    accuracy: number | null;
    mean_absolute_error: number | null;
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
  state: (): TrainingState => ({
    training: {
      running: false,
      projectId: undefined,
      modelId: undefined,
      epoch: null,
      accuracy: null,
      mean_absolute_error: null,
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
  getters: {},
  actions: {
    async startTraining(projectId: string, startNodeId: string) {
      const sessionStore = useSessionStore();
      this.$reset();
      const response = await sessionStore.fetch('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          project: {
            _id: projectId,
            startNodeId,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.training.running = true;
        this.training.projectId = projectId;
        this.training.startNodeId = startNodeId;
        this.training.modelId = data.task._id;
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
      const response = await sessionStore.fetch(`/tasks/${modelId}`, {
        method: 'GET',
      });
      const responseJson = await response.json();
      if (response.ok) {
        this.training.data = responseJson.task;
        if (
          responseJson.task.status === 'stopped' ||
          responseJson.task.status === 'finished' ||
          responseJson.task.status === 'error'
        ) {
          this.training.running = false;
        }

        for (let i = this.training.data.output.length - 1; i >= 0; i--) {
          const output = this.training.data.output[i];
          if (output?.performance) {
            console.log(output.performance);
            if (output.performance.epoch !== undefined) {
              this.training.epoch = output.performance.epoch;
            }
            if (output.performance.accuracy !== undefined) {
              this.training.accuracy = output.performance.accuracy;
            }
            if (output.performance.mean_absolute_error !== undefined) {
              this.training.mean_absolute_error =
                output.performance.mean_absolute_error;
            }
            if (output.performance.loss !== undefined) {
              this.training.loss = output.performance.loss;
            }
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
        `/tasks/${this.training.modelId}`,
        { method: 'PATCH' }
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
    lastNodeTrainingData(nodeID: string) {
      const toFix2 = (input: string | number) => {
        if (typeof input === 'number') {
          return input.toFixed(2);
        } else {
          return input;
        }
      };

      return computed(() => {
        const entries = this.training.data.output.filter((data) =>
          Object.keys(data).includes(nodeID)
        );

        if (entries.length > 0) {
          let resultMap = entries[entries.length - 1][nodeID];
          for (const key in resultMap) {
            if (key === 'url') continue;
            resultMap[key] = toFix2(resultMap[key]);
          }
          return resultMap;
        } else {
          return {};
        }
      });
    },
  },
});
