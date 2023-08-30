import React from 'react';

interface CardProps {
  todo: {
    id: number;
    content: string;
    completed: boolean;
  };
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ todo, onUpdate, onDelete }) => {
  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-title">{todo.content}</span>
      <button onClick={() => onUpdate(todo.id, !todo.completed)}>
        {todo.completed ? 'Reopen' : 'Complete'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default Card;
