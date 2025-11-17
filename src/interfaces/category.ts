export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreate {
  name: string;
}

export interface ICategoryUpdate {
  name?: string;
}


