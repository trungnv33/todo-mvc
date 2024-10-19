import React from 'react';
import Todo from '../Todo/todo.interface';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
        className="toggle"
        id={`toggle-${todo.id}`}
      />
      <label htmlFor={`toggle-${todo.id}`} />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button className="destroy" onClick={() => deleteTodo(todo.id)}>×</button>
    </li>
  );
};

export default TodoItem;
