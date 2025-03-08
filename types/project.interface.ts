import type { Components } from './components.type';

declare global {
  interface Project {
    fetchedTime: Date;
    data: {
      _id: string;
      components: Components;
      editorType: string;
      contributors: string[];
      dateCreatedAt: Date;
      dateLastEdited: Date;
      description: string;
      tasks: string[];
      name: string;
      ownerId: string;
      visibility: 'private' | 'public';
    };
  }
}
