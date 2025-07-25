import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import des composants de layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import du composant de gestion des erreurs
import ErrorBoundary from './components/common/ErrorBoundary';

/**
 * Composant principal de l'application e-commerce
 * Gère la structure générale de l'application
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* En-tête de l'application avec navigation */}
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        
        {/* Contenu principal avec routage */}
        <main className="flex-grow">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        
        {/* Pied de page avec informations de contact */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
      
      {/* Configuration des notifications toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ErrorBoundary>
  );
}

export default App; 