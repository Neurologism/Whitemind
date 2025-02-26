declare global {
  interface Project {
    fetchedTime: Date;
    data: {
      _id: string;
      components: any;
      contributors: string[];
      dateCreatedAt: Date;
      dateLastEdited: Date;
      description: string;
      models: string[];
      name: string;
      ownerId: string;
      visibility: 'private' | 'public';
    };
  }
}
