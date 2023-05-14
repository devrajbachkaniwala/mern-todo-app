import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className='navbar-container'>
      <ul>
        <li className='item-1'>
          <Link to='/' className={`app-name link`}>
            Todo App
          </Link>
        </li>
        <li className='item-2'>
          <Link
            to='/'
            className={`link home-link ${
              location.pathname === '/' ? 'current-route' : ''
            }`}
          >
            Home
          </Link>
        </li>
        <li className='item-3'>
          <Link
            to='/todos/add'
            className={`link add-link ${
              location.pathname === '/todos/add' ? 'current-route' : ''
            }`}
          >
            Add Todo
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
