import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import TodoHome from './components/TodoHome';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import EditTodo from './components/EditTodo';
import AddTodo from './components/AddTodo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoHome />,
    children: [
      {
        path: '/',
        element: <TodoList />
      },
      {
        path: '/todos/:id',
        element: <TodoDetail />
      },
      {
        path: '/todos/add',
        element: <AddTodo />
      },
      {
        path: '/todos/:id/edit',
        element: <EditTodo />
      },
      {
        path: '/todos',
        element: <TodoList />
      }
    ]
  }
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
