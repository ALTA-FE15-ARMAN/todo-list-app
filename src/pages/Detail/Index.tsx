import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
const API_TOKEN = 'efb8b76bf0c2a47121c19eaddbfb89ec804910a1';

interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
}
const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`https://api.todoist.com/rest/v2/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setTodo(response.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-500 p-8 bg-gray-100 shadow-md rounded-md">
      <h1>{todo.content}</h1>
    </div>
  );
};

export default DetailPage;
