// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, getTodoById } from '../services/todoService';
import { Todo } from '../utils/types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchId, setSearchId] = useState<string>(''); // Estado para el ID de búsqueda
  const [searchedTodo, setSearchedTodo] = useState<Todo | null>(null); // Estado para el Todo encontrado

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateSuccess = () => {
    setEditingTodo(null);
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  };

  const handleSearch = async () => {
    if (searchId) {
      const id = parseInt(searchId, 10);
      if (!isNaN(id)) {
        const todo = await getTodoById(id);
        setSearchedTodo(todo);
      }
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Todo ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchedTodo && (
        <div className="searched-todo">
          <h2>Searched Todo</h2>
          <TodoItem todo={searchedTodo} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      )}
      {editingTodo ? (
        <TodoForm todo={editingTodo} onSuccess={handleUpdateSuccess} />
      ) : (
        <>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </>
      )}
    </div>
  );
};
//esto es un comentario en react
export default TodoList;