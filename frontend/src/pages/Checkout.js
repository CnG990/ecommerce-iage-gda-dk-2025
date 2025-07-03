import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">Finaliser ma commande</h1>
        <p className="text-gray-700 mb-6">
          Merci de votre confiance !<br />
          Cette page de paiement est en construction.<br />
          Vous pourrez bientôt finaliser vos achats ici.
        </p>
        <button
          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          onClick={handleReturnHome}
        >
          Retour à la boutique
        </button>
      </div>
    </div>
  );
};

export default Checkout; 