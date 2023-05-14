import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function TodoHome() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default TodoHome;
