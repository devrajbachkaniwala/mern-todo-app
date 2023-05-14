import React from 'react';
import './TodoForm.css';

function TodoForm({
  todo: { title, description, isCompleted },
  handleTodo,
  handleSubmit,
  buttonName
}) {
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter title'
            value={title}
            onChange={handleTodo}
            required
          />
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            placeholder='Enter description'
            value={description}
            onChange={handleTodo}
            required
          />
        </div>

        <div>
          <label htmlFor='isCompleted'>Completed</label>
          <input
            type='checkbox'
            id='isCompleted'
            name='isCompleted'
            checked={isCompleted}
            onChange={handleTodo}
          />
        </div>

        <button type='submit' className='button'>
          {buttonName}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
