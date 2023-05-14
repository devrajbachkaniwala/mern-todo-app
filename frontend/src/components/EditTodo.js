import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { TodoService } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';

const initialTodoState = {
  title: '',
  description: '',
  isCompleted: false
};

function EditTodo() {
  const [todo, setTodo] = useState(initialTodoState);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TodoService.getTodoById(id).then((todo) => setTodo(todo));
  }, [id]);

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

    const res = await TodoService.updateTodoById(id, todo);
    navigate('/');
  };

  return (
    <div>
      <h2> Edit Todo</h2>
      <TodoForm
        todo={todo}
        handleTodo={handleTodo}
        handleSubmit={handleSubmit}
        buttonName={'Save'}
      />
    </div>
  );
}

export default EditTodo;
