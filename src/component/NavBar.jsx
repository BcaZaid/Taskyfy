import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/todos">Todos</Link>
      {user ? <button onClick={handleLogout}>Logout</button> : <Link to="/">Login</Link>}
    </nav>
  );
};

export default NavBar;
