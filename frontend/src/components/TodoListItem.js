import React from 'react';
import { Link } from 'react-router-dom';
import './TodoListItem.css';

function TodoListItem({
  todo: { id, title, description, isCompleted },
  handleIsCompleted,
  handleDelete
}) {
  return (
    <li className={`todo-item ${isCompleted ? 'checked-item' : ''}`}>
      <input
        type='checkbox'
        id='isCompleted'
        name='isCompleted'
        checked={isCompleted}
        onChange={(e) => handleIsCompleted(e, id)}
        required
      />
      <Link to={`/todos/${id}`} className='todo-item-content-container'>
        <span className='text'>{`${title.slice(0, 25)}${
          title.length > 25 ? '...' : ''
        }`}</span>
        <span className='text'>{`${description.slice(0, 25)}${
          description.length > 25 ? '...' : ''
        }`}</span>
      </Link>
      <Link to={`/todos/${id}/edit`} className='button edit-btn'>
        Edit
      </Link>
      <button
        type='button'
        className='button delete-btn'
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoListItem;
