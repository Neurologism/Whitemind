import { defineStore } from 'pinia';
import { SyncStatus } from '~/components/editor/syncStatus';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    syncStatus: ref(SyncStatus.initializing as SyncStatus),
    project: null as Project | null,
    projects: [] as Project[],
  }),
  getters: {},
  actions: {
    async deleteProject(projectId: string = ''): Promise<Response | null> {
      if (!projectId) projectId = this.project?.data._id ?? '';
      if (!projectId) return null;

      const sessionStore = useSessionStore();
      const response = await sessionStore.fetch('/api/project/delete', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: {
            _id: projectId,
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to delete project.');
      }
      return response;
    },

    async getProject(projectId: string): Promise<Project | null> {
      let project = this.projects.find(
        (project) => project.data._id === projectId
      );
      if (
        project &&
        project.fetchedTime >= new Date(new Date().getTime() - 15000)
      ) {
        return project;
      }
      return await this.fetchProject(projectId);
    },

    async fetchProject(projectId: string): Promise<Project | null> {
      const sessionStore = useSessionStore();
      let response: Response = await sessionStore.fetch('/api/project/get', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: {
            _id: projectId,
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to fetch project.');
        return null;
      }

      let data = await response.json();
      const project = {
        fetchedTime: new Date(),
        data: data.project,
      } as Project;
      this.projects.push(project);
      return project;
    },

    async updateProject(
      projectId: string = '',
      projectData: Object = {}
    ): Promise<boolean> {
      let project;
      if (!projectId || projectId === this.project?.data._id) {
        if (!this.project) return false;
        project = this.project;
        projectId = project?.data._id;
      } else {
        project = this.projects.find(
          (project) => project.data._id === projectId
        );
      }
      if (!project) return false;

      project.data = { ...project.data, ...projectData } as Project['data'];
      const sessionStore = useSessionStore();
      const result = await sessionStore.fetch('/api/project/update', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: {
            _id: projectId,
            name: project.data.name,
            description: project.data.description,
            visibility: project.data.visibility,
            components: project.data.components,
            // ownerId: project.data.ownerId, this line can be uncommented when backmind issue #82 branch is merged
          },
        }),
      });
      return result.ok;
    },

    async syncProject(flowStore: any): Promise<boolean> {
      if (!this.project) return false;
      const toast = useToast();
      this.syncStatus = SyncStatus.syncing;

      this.project.data.components = flowStore.components;

      const success = await this.updateProject();

      if (!success) {
        toast.add({
          title: 'Failed to sync project',
          icon: 'mdi-alert-circle',
          color: 'red',
        });
        this.syncStatus = SyncStatus.error;
      } else {
        this.syncStatus = SyncStatus.synced;
      }
      return success;
    },
  },
});
