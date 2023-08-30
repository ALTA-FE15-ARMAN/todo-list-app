// src/components/Todo.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface TodoProps {
  todo: {
    id: number;
    content: string;
    completed: boolean;
  };
  onUpdate: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetail : (id:number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onEdit, onDetail }) =>  {
  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <p className="todo-title">{todo.content}</p> <br />

      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <button onClick={() => onEdit(todo.id)}>Edit</button> 
      <button onClick={() => onDetail(todo.id)}>Detail</button> 
      <Link to={`/detail/${todo.id}`}>Detail</Link> {/* Tambahkan Link */}
    </div>
  );
};

export default Todo;
