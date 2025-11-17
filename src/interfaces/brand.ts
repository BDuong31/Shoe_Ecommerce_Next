export interface IBrand {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrandCreate {
  name: string;
}

export interface IBrandUpdate {
  name?: string;
}