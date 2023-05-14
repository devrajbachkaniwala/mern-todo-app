import React, { useEffect, useState } from 'react';
import TodoListItem from './TodoListItem';
import { TodoService } from '../services/TodoService';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    TodoService.getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleIsCompleted = async (e, todoId) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: e.target.checked };
        }
        return todo;
      })
    );

    const res = await TodoService.updateTodoById(todoId, {
      isCompleted: e.target.checked
    });
  };

  const handleDelete = async (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));

    const res = await TodoService.deleteTodoById(todoId);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul className='todo-list-container'>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleIsCompleted={handleIsCompleted}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
