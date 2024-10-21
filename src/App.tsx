import React, { useState, useEffect, useRef } from 'react';
import TodoForm from './Todo/TodoForm';
import TodoList from './TodoList/TodoList';
import Filters from './Filters/Filters';
import './style.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'todos'; // Key to store todos in localStorage
const getInitialTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedTodos) {
    return (JSON.parse(storedTodos)); // Load todos if available
  }
  return [];
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(getInitialTodosFromLocalStorage());
  const [filter, setFilter] = useState<string>('all');
  const firstRender = useRef(true);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!firstRender.current) {
      console.log("Saving data to localStorage:", todos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    };
    return () => {
      firstRender.current = false;
    }
  }, [todos]);

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
    const completedTodos = todos.filter(todo => todo.completed);
    if (completedTodos.length > 0) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };
  
  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !areAllCompleted })));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosLeft = todos.filter((todo) => !todo.completed).length;

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
        <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        <div className='footer'>
          <span className="todo-count">{activeTodosLeft} items left!</span>
          <Filters filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
  
};

export default App;
