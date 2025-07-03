import React from 'react';
import { Link } from 'react-router-dom';
import { saveCurrentPage } from '../../utils/redirectUtils';

/**
 * Composant pour créer des liens avec redirection automatique
 */
export const LoginLink = ({ to, children, className, ...props }) => {
  const handleClick = () => {
    // Sauvegarder la page actuelle avant la redirection
    saveCurrentPage(window.location.pathname);
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * Composant pour créer des liens vers des pages protégées avec redirection
 */
export const ProtectedLink = ({ to, children, className, ...props }) => {
  const handleClick = () => {
    // Sauvegarder la page de destination pour la redirection après connexion
    saveCurrentPage(to);
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * Fonction pour créer une URL de connexion avec redirection
 */
export const createLoginUrl = (redirectTo) => {
  if (!redirectTo || redirectTo === '/login' || redirectTo === '/register') {
    return '/login';
  }
  return `/login?redirect=${encodeURIComponent(redirectTo)}`;
};

/**
 * Fonction pour créer un lien de connexion avec redirection
 */
export const createLoginLink = (redirectTo, children, className) => {
  const loginUrl = createLoginUrl(redirectTo);
  
  return (
    <Link 
      to={loginUrl}
      onClick={() => saveCurrentPage(redirectTo)}
      className={className}
    >
      {children}
    </Link>
  );
}; 