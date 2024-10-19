import React, { useState } from 'react';
import TodoForm from './Todo/TodoForm';
import TodoList from './TodoList/TodoList';
import Filters from './Filters/Filters';
import './style.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !areAllCompleted })));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>todos</h1>
      <div className="container">
        <div className="todo-header">
          {todos.length > 0 && (
            <button className="check-all" onClick={toggleAllTodos}>
              ❯
            </button>
          )}
          <TodoForm addTodo={addTodo} />
        </div>
        <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        <Filters filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
      </div>
    </div>
  );
  
};

export default App;
