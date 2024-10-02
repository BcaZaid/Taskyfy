import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './component/NavBar';
import Login from './component/Login';
import PrivateRoute from './component/PrivateRoute';
import './App.css'
import Dashboard from './component/Dashboard';
import CalendarView from './component/CalendarView';
import SignUp from './component/SignUp';
import { MantineProvider } from '@mantine/core';


const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <NavBar />} {/* Show NavBar only if the user is logged in */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
      </Routes>
    </>
  );
};

const App = () => {

  return (
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Router>
          <AppContent />
        </Router>
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
