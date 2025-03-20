// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../utils/types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void; // Asegúrate de que esta propiedad esté definida
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <h2>{todo.tittle}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.status}</p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <button onClick={() => onEdit(todo)}>Edit</button>
    </div>
  );
};

export default TodoItem;