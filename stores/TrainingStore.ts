import { defineStore } from "pinia";

export const useTrainingStore = defineStore({
  id: "training-store",
  state: () => ({
    training: {
      running: false,
      id: null as string | null,
      data: {
          "status": "stopped" as  ("queued" | "training" | "finished" | "error" | "stopped"),
          "output": [] as string[],
          "queued_at": null as number | null,
          "started_at": null as number | null,
          "finished_at": null as number | null,
          "error": null as any,
          "project_id": null as string | null,
      },
    },
  }),
  actions: {
    async startTraining(fetchFunction:Function, projectId: string) {
      this.$reset();
        const response = await fetchFunction("/api/project/model/training-start", {
            method: "POST",
            body: JSON.stringify({
                project: {
                    _id: projectId,
                }
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            this.training.running = true;
            this.training.id = projectId;
        }

        return {
            success: response.ok,
            message: (data['msg'] ?? null ) as string | null,
        }
    },
    async fetchTrainingStatus(fetchFunction:Function, projectId: string) {
      if (!this.training.running) {
        return {
          success: false,
          message: "Training not running",
        }
      }
      const response = await fetchFunction("/api/project/model/training-status", {
        method: "POST",
        body: JSON.stringify({
          model: {
            _id: projectId,
          }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        this.training.data = data.model;
        if (data.model.status === "stopped") {
          this.training.running = false;
        }
      } else {
        this.$reset();
      }
      return {
        success: response.ok,
        message: (data['msg'] ?? null ) as string | null,
      }
    },
    async stopTraining(fetchFunction:Function) {
      if (!this.training.running) {
        return {
          success: false,
          message: "Training not running",
        }
      }
      const response = await fetchFunction("/api/project/model/training-stop", {
        method: "POST",
        body: JSON.stringify({
          model: {
            _id: this.training.id,
          }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        this.$reset();
      }
      return {
        success: response.ok,
        message: (data['msg'] ?? null ) as string | null,
      }
    },
  },
});
