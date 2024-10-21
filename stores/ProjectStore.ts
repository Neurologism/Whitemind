import { defineStore } from "pinia";

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    projects: [
      {
        fetchedTime: new Date(),
        data: {
          _id: "string",
          name: "string",
          description: "string",
          owner_id: "string",
          contributors: [
            "string"
          ],
          visibility: "private or public",
          created_on: 0,
          last_edited: 0,
          camera_position: [
            0,
            0,
            0
          ],
          components: {
            add: {
              modules: [
                {
                  type: "string",
                  value: "string or number",
                  parameters: [
                    {}
                  ]
                }
              ],
              connections: [
                {
                  from: "module1",
                  to: "module2"
                }
              ]
            },
            train: {
              parameters: [
                {
                  type: "string",
                  value: "string or number",
                  parameters: [
                    {}
                  ]
                }
              ]
            },
            predict: {
              parameters: [
                {
                  type: "string",
                  value: "string or number",
                  parameters: [
                    {}
                  ]
                }
              ]
            }
          },
          models: [
            "string"
          ]
        },
      },
    ],
  }),
  getters: {},
  actions: {
    async getProject(id: string, fetchFunction: Function) {
      let field = this.projects.find(project => project.data._id === id);
      if (field === undefined || field === null) {
        await this.fetchProject(id, fetchFunction);
        field = this.projects.find(project => project.data._id === id);
      }
      if (!field) return null;
      if (field.fetchedTime < new Date(new Date().getTime() - (15000))) {
        await this.fetchProject(id, fetchFunction);
        field = this.projects.find(project => project.data._id === id);
      }
      return field?.data ?? null;
    },
    async fetchProject(id: string, fetchFunction: Function) {
      let response: Response = await fetchFunction('/api/project/get', {
        method: 'POST',
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: {
            _id: id,
          }
        }),
      });
        if (response.ok) {
            let data = await response.json();
            this.projects.push({
            fetchedTime: new Date(),
            data: data.project,
            });
        } else {
            console.error("Failed to fetch project.");
        }
    }
  },
});
