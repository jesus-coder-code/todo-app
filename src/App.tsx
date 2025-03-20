// src/App.tsx
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Todo'}
      </button>
      {showForm && <TodoForm onSuccess={() => setShowForm(false)} />}
      <TodoList />
    </div>
  );
};

export default App;
