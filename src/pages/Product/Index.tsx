import React, { useState, useEffect } from 'react';
import axios from 'axios';



import Todo from '../../components/Todo';

const API_TOKEN = 'efb8b76bf0c2a47121c19eaddbfb89ec804910a1'; 

interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
  onUpdate: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: () => void;
}

const Product: React.FC = () => {
  const [data, setData] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);


  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://api.todoist.com/rest/v2/tasks', {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post(
        'https://api.todoist.com/rest/v2/tasks',
        {
          content: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const startEditingTodo = (todo: TodoItem) => {
    setSelectedTodo(todo);
  };

  const handleEditInputChange = (value: string) => {
    setSelectedTodo((prevTodo) => {
      if (prevTodo) {
        return { ...prevTodo, content: value };
      }
      return null;
    });
  };

  const cancelEditing = () => {
    setSelectedTodo(null);
  };

  const handleUpdate = async () => {
    if (selectedTodo) {
      try {
        await axios.post(
          `https://api.todoist.com/rest/v2/tasks/${selectedTodo.id}`,
          {
            content: selectedTodo.content,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        fetchTodos();
        setSelectedTodo(null);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleTodoUpdate = async (id: number, completed: boolean) => {
    try {
      await axios.post(
        `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
          completed: completed,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  const handleTodoDelete = async (id: number) => {
    try {
      await axios.delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      fetchTodos(); 
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const fetchGet = async (id:number) => {
    try {
      const response = await axios.get(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className="w-screen h-screen flex justify-center items-center">
    <div className="max-w-500 p-8 bg-gray-100 shadow-md rounded-md">
      <input
        type="text"
        placeholder="New todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <button onClick={createTodo} className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Todo
      </button>
      <div className="grid grid-cols-4 gap-x-5 gap-y-5 mt-8">
        {data && data.map((item: TodoItem, index: number) => (
          <div key={index} className="w-full bg-white p-4 rounded shadow">
            
            <Todo
              key={index}
              todo={item}
              onUpdate={(id, completed) => handleTodoUpdate(id, completed)}
              onDelete={(id) => handleTodoDelete(id)}
              onEdit={() => startEditingTodo(item)}
              onDetail={(id) => fetchGet(id)}
            />
          </div>
        ))}
      </div>
      {selectedTodo && (
        <div className="mt-4">
          <input
            type="text"
            value={selectedTodo.content}
            onChange={(e) => handleEditInputChange(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
            Update
          </button>
          <button onClick={cancelEditing} className="bg-red-500 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      )}
    </div>
  </section>
  )
};

export default Product;
