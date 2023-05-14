import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { TodoService } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';

const initialTodoState = {
  title: '',
  description: '',
  isCompleted: false
};

function AddTodo() {
  const [todo, setTodo] = useState(initialTodoState);
  const navigate = useNavigate();

  const handleTodo = (e) => {
    if (e.target.name === 'isCompleted') {
      setTodo((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        };
      });
      return;
    }

    setTodo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(todo);

    const res = await TodoService.addTodo(todo);
    console.log(res);
    navigate('/');
  };

  return (
    <div>
      <h2> Add Todo</h2>
      <TodoForm
        todo={todo}
        handleTodo={handleTodo}
        handleSubmit={handleSubmit}
        buttonName={'Add'}
      />
    </div>
  );
}

export default AddTodo;
