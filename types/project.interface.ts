declare global {
  interface Project {
    fetchedTime: Date;
    data: {
      _id: string;
      components: any;
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
