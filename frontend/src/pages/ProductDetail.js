import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductCard from '../components/product/ProductCard';
import { formatPrice, formatPercentage } from '../utils/formatters';
import { getImageUrl } from '../utils/imageUtils';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaShare, 
  FaStar, 
  FaChevronLeft, 
  FaChevronRight,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaUndo
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import productService from '../services/productService';

const ProductDetail = () => {
  const { slug } = useParams();  // Utiliser slug au lieu de id
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (slug) {
      dispatch(getProductById(slug));
      loadSimilarProducts(slug);
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [slug, dispatch]);

  const loadSimilarProducts = async (productSlug) => {
    if (!productSlug) return;
    
    try {
      const response = await productService.getSimilarProducts(productSlug, 4);
      if (response.data && response.data.data) {
        setSimilarProducts(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits similaires:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock < quantity) {
      toast.error('Quantité demandée non disponible');
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      stock: product.stock,
      quantity: quantity
    }));

    toast.success(`${quantity} ${product.name} ajouté${quantity > 1 ? 's' : ''} au panier !`);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers !');
    }
  };

  const getDiscountPercentage = () => {
    if (product?.originalPrice && product.originalPrice > product.price) {
      return formatPercentage(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return '0 %';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du produit..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Link
            to="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voir tous les produits
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = getDiscountPercentage();
  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Accueil</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Produits</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link 
                to={`/products?category=${product.category.id}`} 
                className="hover:text-primary-600"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Images */}
            <div>
              <div className="relative mb-4">
                <img
                  src={getImageUrl(images[selectedImageIndex])}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
                
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      disabled={selectedImageIndex === 0}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all"
                      disabled={selectedImageIndex === images.length - 1}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Miniatures */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`border-2 rounded-lg overflow-hidden ${
                        index === selectedImageIndex 
                          ? 'border-primary-600' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={getImageUrl(image) || '/images/placeholder-product.jpg'}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-6">
              <div>
                {product.category && (
                  <span className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                
                {/* Évaluation */}
                {product.rating && (
                  <div className="flex items-center mt-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount || 0} avis)
                    </span>
                  </div>
                )}
              </div>

              {/* Prix */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Statut stock */}
              <div className="flex items-center space-x-2">
                {product.stock > 0 ? (
                  <>
                    <FaCheck className="text-green-500" />
                    <span className="text-green-600 font-medium">
                      En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Rupture de stock</span>
                )}
              </div>

              {/* Description courte */}
              {product.shortDescription && (
                <p className="text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Sélecteur de quantité et ajout au panier */}
              {product.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="font-medium text-gray-900">Quantité:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaShoppingCart />
                      <span>Ajouter au panier</span>
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FaHeart className="text-gray-600" />
                    </button>
                    <button 
                      onClick={handleShare}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaShare className="text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Avantages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <FaTruck className="text-primary-600" />
                  <span className="text-sm text-gray-600">Livraison rapide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-primary-600" />
                  <span className="text-sm text-gray-600">Paiement sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUndo className="text-primary-600" />
                  <span className="text-sm text-gray-600">Retour 30 jours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-t border-gray-200">
            <div className="px-6 lg:px-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'specifications', label: 'Caractéristiques' },
                  { id: 'reviews', label: 'Avis clients' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="px-6 lg:px-8 py-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'Aucune description disponible.'}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Aucune caractéristique disponible.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <p className="text-gray-600">
                    Système d'avis en cours de développement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 