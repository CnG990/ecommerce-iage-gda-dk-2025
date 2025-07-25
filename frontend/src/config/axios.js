import axios from 'axios';

// Configuration de l'URL API avec fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Configuration globale d'axios
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Permet l'envoi des cookies pour les sessions
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Intercepteur pour ajouter le token d'authentification
axios.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Erreur lors de la récupération du token:', error);
    }
    return config;
  },
  (error) => {
    console.error('Erreur dans l\'intercepteur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Erreur API:', error);
    
    // Gestion des erreurs réseau
    if (!error.response) {
      console.warn('Erreur réseau - API non accessible');
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      try {
        // Token expiré ou invalide
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion si nécessaire
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } catch (localStorageError) {
        console.warn('Erreur localStorage:', localStorageError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios; 