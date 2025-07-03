import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Ensure token is in localStorage
    if (token && !localStorage.getItem('token')) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  if (!user || !token) {
    toast.error('Veuillez vous connecter pour accéder à cette page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has admin role
  const isAdmin = user.roles?.some(role => role.name === 'admin') || user.isAdmin === true;

  if (!isAdmin) {
    toast.error('Accès non autorisé');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute; 