// src/types.ts
export interface Todo {
  id: number;
  tittle: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'IN_PROGRESS'
  createdAt: Date;
  updatedAt: Date
}

export interface TodoResponse {
  message: string;
  data: Todo | Todo[];
}