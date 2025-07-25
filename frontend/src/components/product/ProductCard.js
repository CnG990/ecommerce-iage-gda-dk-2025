import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatPrice, formatPercentage } from '../../utils/formatters';
import { getImageUrl } from '../../utils/imageUtils';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Vérification que le produit existe et a les propriétés nécessaires
  if (!product || !product.id) {
    console.warn('ProductCard: produit invalide', product);
    return null;
  }

  const handleAddToCart = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      
      if (!product.stock || product.stock < 1) {
        toast.error('Produit en rupture de stock');
        return;
      }

      dispatch(addToCart({
        id: product.id,
        name: product.name || 'Produit',
        price: product.price || 0,
        image: product.image || '/placeholder.png',
        stock: product.stock || 0,
        quantity: 1
      }));

      toast.success(`${product.name || 'Produit'} ajouté au panier !`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product?.slug || product?.id || 'product'}`} className="block relative">
        <img
          src={getImageUrl(product?.image)}
          alt={product?.name || 'Produit'}
          className="w-full h-48 object-cover"
          onError={(e) => {
            try {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            } catch (error) {
              console.warn('Erreur lors du chargement de l\'image:', error);
            }
          }}
        />
        {product?.discount && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product?.name || 'Produit'}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          {product?.rating && (
            <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product?.price || 0)}
            </span>
            {product?.originalPrice && product.originalPrice > (product?.price || 0) && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {(product?.stock || 0) > 0 && (
            <span className="text-sm text-green-600">En stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 