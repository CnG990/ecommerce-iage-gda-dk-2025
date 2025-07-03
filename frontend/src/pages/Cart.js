import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyPromoCode,
  removePromoCode 
} from '../redux/slices/cartSlice';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaTag } from 'react-icons/fa';
import { formatPrice } from '../utils/formatters';
import { getImageUrl } from '../utils/imageUtils';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, promoCode, discount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [promoCodeInput, setPromoCodeInput] = React.useState('');
  const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    const item = items.find(item => item.id === id);
    if (item && newQuantity > item.stock) {
      return;
    }

    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      dispatch(clearCart());
    }
  };

  const handleApplyPromoCode = async () => {
    if (!promoCodeInput.trim()) {
      return;
    }

    setIsApplyingPromo(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validCodes = {
        'WELCOME10': { type: 'percentage', value: 10, description: 'Réduction de 10%' },
        'SAVE20': { type: 'percentage', value: 20, description: 'Réduction de 20%' },
        'FIRST5': { type: 'fixed', value: 5000, description: 'Réduction de 5000 FCFA' }
      };

      if (validCodes[promoCodeInput.toUpperCase()]) {
        dispatch(applyPromoCode({
          code: promoCodeInput.toUpperCase(),
          ...validCodes[promoCodeInput.toUpperCase()]
        }));
        setPromoCodeInput('');
      } else {
        return;
      }
    } catch (error) {
      return;
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromoCode = () => {
    dispatch(removePromoCode());
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = discount || 0;
  const finalTotal = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-6">
            <FaShoppingBag className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Découvrez notre large gamme de produits et ajoutez vos articles préférés
          </p>
          <Link
            to="/products"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          <p className="text-gray-600 mt-2">
            {totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Articles</h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Vider le panier
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatPrice(item.price)} / unité
                      </p>
                      
                      <div className="text-sm">
                        {item.stock > 0 ? (
                          item.stock <= 5 ? (
                            <span className="text-orange-600">
                              Plus que {item.stock} en stock
                            </span>
                          ) : (
                            <span className="text-green-600">En stock</span>
                          )
                        ) : (
                          <span className="text-red-600">Rupture de stock</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity >= item.stock}
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
              >
                <span>← Continuer mes achats</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaTag className="text-primary-600" />
                <span>Code promo</span>
              </h3>

              {promoCode ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-green-800">{promoCode.code}</span>
                      <p className="text-sm text-green-600">{promoCode.description}</p>
                    </div>
                    <button
                      onClick={handleRemovePromoCode}
                      className="text-green-600 hover:text-green-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    disabled={isApplyingPromo}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplyingPromo ? '...' : 'Appliquer'}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Résumé de la commande
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>Calculée à l'étape suivante</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Procéder au paiement
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Paiement sécurisé SSL • Livraison 24-48h
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Vos avantages</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Livraison gratuite dès 50 000 FCFA</li>
                <li>✓ Retour gratuit sous 30 jours</li>
                <li>✓ Paiement sécurisé</li>
                <li>✓ Service client 7j/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 