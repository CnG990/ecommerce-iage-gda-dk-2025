import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/common/LoadingSpinner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App; 