import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TodoService } from '../services/TodoService';
import './TodoDetail.css';

const initialTodoState = {
  title: '',
  description: '',
  isCompleted: false
};

function TodoDetail() {
  const [todo, setTodo] = useState(initialTodoState);
  const { title, description, isCompleted } = todo;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TodoService.getTodoById(id).then((todo) => setTodo(todo));
  }, [id]);

  const handleIsCompleted = async (e) => {
    setTodo((prev) => ({ ...todo, isCompleted: e.target.checked }));

    const res = await TodoService.updateTodoById(id, {
      isCompleted: e.target.checked
    });
  };

  const handleDelete = async () => {
    const res = await TodoService.deleteTodoById(id);
    navigate('/');
  };

  return (
    <article className='todo-detail-container'>
      <div className='btn-container'>
        <Link to={`/todos/${id}/edit`} className='button edit-btn'>
          Edit
        </Link>
        <button
          type='button'
          className='button delete-btn'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <h2 className='title'>{title}</h2>
      <p className='description'>{description}</p>
      <label htmlFor='isCompleted'>Completed</label>
      <input
        type='checkbox'
        id='isCompleted'
        name='isCompleted'
        checked={isCompleted}
        onChange={handleIsCompleted}
        required
      />
    </article>
  );
}

export default TodoDetail;
