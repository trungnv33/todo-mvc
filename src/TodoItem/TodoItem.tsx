import React, { useRef, useState } from 'react';
import Todo from '../Todo/todo.interface';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);  // Track if we are editing the todo
  const [editText, setEditText] = useState(todo.text); // Track the current text in the input field
  const inputRef = useRef<HTMLInputElement>(null);  // To focus on input when editing

  // Start editing when double-clicked
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0); // Focus input when entering edit mode
  };

  // Handle the change of text in the input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  // Save changes when pressing "Enter" or losing focus
  const handleSave = () => {
    if (editText.trim() === '') {
      deleteTodo(todo.id);  // If text is empty, delete the todo
    } else {
      editTodo(todo.id, editText);  // Save the new text
    }
    setIsEditing(false);  // Exit edit mode
  };

  // Handle keyboard events for saving or canceling edits
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();  // Save when pressing "Enter"
    } else if (e.key === 'Escape') {
      setIsEditing(false);  // Cancel editing if "Escape" is pressed
      setEditText(todo.text);  // Revert back to the original text
    }
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      {!isEditing && (
        <><input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="toggle"
          id={`toggle-${todo.id}-checked`} />
          <label htmlFor={`toggle-${todo.id}-checked`} className='todo-label-checked'/>
          <label htmlFor={`toggle-${todo.id}-text`}  className='todo-label-text' onDoubleClick={handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)}>×</button>
        </>

      )}
      {isEditing && (
        <input
          ref={inputRef}  // Ref to focus input automatically
          className="edit"
          value={editText}
          onChange={handleChange}
          onBlur={handleSave}  // Save changes when losing focus
          onKeyDown={handleKeyDown}  // Handle keyboard events for save/cancel
          onDoubleClick={handleDoubleClick}
        />
      )}
    </li>
  );
};

export default TodoItem;
