import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveCurrentPage } from '../../utils/redirectUtils';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth || {});
  const location = useLocation();

  if (!user) {
    try {
      // Sauvegarder la page actuelle avant la redirection
      saveCurrentPage(location.pathname);
    } catch (error) {
      console.warn('Erreur saveCurrentPage PrivateRoute:', error);
    }
    
    // Rediriger vers la page de connexion en sauvegardant l'URL de destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 