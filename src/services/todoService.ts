// src/services/todoService.ts
import axios from 'axios';
import { Todo, TodoResponse } from '../utils/types';

const API_URL = 'http://localhost:8080/Todo'; // Cambia esta URL por la de tu API

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<TodoResponse>(API_URL);
  console.log(response)
  return Array.isArray(response.data.data) ? response.data.data : [];
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get<TodoResponse>(`${API_URL}/GetTodoById/${id}`);
  return response.data.data as Todo;
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post<TodoResponse>(API_URL, todo);
  return response.data.data as Todo;
};

export const updateTodo = async (id: number, todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.put<TodoResponse>(`${API_URL}/UpdateTodo/${id}`, todo);
  return response.data.data as Todo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/DeleteTodo/${id}`);
};