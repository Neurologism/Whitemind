import { defineStore } from 'pinia';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [
      {
        fetchedTime: new Date(),
        data: {
          _id: 'string',
          name: 'string',
          description: 'string',
          owner_id: 'string',
          contributors: ['string'],
          visibility: 'private or public',
          created_on: 0,
          last_edited: 0,
          components: null,
        },
      },
    ],
  }),
  getters: {},
  actions: {
    async deleteProject(projectId: string) {
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
      if (response.ok) {
        return true;
      } else {
        console.error('Failed to delete project.');
        return false;
      }
    },

    async getProject(id: string) {
      let field = this.projects.find((project) => project.data._id === id);
      if (field === undefined || field === null) {
        await this.fetchProject(id);
        field = this.projects.find((project) => project.data._id === id);
      }
      if (!field) return null;
      if (field.fetchedTime < new Date(new Date().getTime() - 15000)) {
        await this.fetchProject(id);
        field = this.projects.find((project) => project.data._id === id);
      }
      return field?.data ?? null;
    },

    async fetchProject(id: string) {
      const sessionStore = useSessionStore();
      let response: Response = await sessionStore.fetch('/api/project/get', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: {
            _id: id,
          },
        }),
      });
      if (response.ok) {
        let data = await response.json();
        this.projects.push({
          fetchedTime: new Date(),
          data: data.project,
        });
        return data.project;
      } else {
        console.error('Failed to fetch project.');
        return null;
      }
    },

    async updateProjectComponents(id: string, components: any) {
      let project = this.projects.find((project) => project.data._id === id);
      if (!project) return null;
      project.data.components = components;
      const body = JSON.stringify({
        project: {
          _id: id,
          components: components,
        },
      });

      const sessionStore = useSessionStore();

      const result = await sessionStore.fetch('/api/project/update', {
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
