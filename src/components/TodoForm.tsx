// src/components/TodoForm.tsx
import React, { useState } from 'react';
import { createTodo, updateTodo } from '../services/todoService';
import { Todo } from '../utils/types';

interface TodoFormProps {
  todo?: Todo;
  onSuccess: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSuccess }) => {
  const [name, setName] = useState(todo?.tittle || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [status, setStatus] = useState<'PENDING' | 'COMPLETED' | 'IN_PROGRESS'>(todo?.status || 'PENDING');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const todoData = { name, description, status};

    if (todo) {
      await updateTodo(todo.id, todoData);
    } else {
      await createTodo(todoData);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'PENDING' | 'COMPLETED' | 'IN_PROGRESS')}
      >
        <option value="PENDING">PENDING</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
      </select>
      <button type="submit">{todo ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default TodoForm;