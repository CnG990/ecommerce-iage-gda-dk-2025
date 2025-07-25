import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaArrowRight, FaTruck, FaShieldAlt, FaHeadset, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCode, FaServer } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    try {
      dispatch(fetchProducts());
    } catch (error) {
      console.warn('Erreur lors du chargement des produits:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Simuler des produits en vedette
      setFeaturedProducts(products.slice(0, 6));
    }
  }, [products]);

  const categories = [
    { name: 'Électronique', icon: '📱', count: 45 },
    { name: 'Informatique', icon: '💻', count: 32 },
    { name: 'Audio', icon: '🎧', count: 28 },
    { name: 'Vêtements', icon: '👕', count: 67 },
    { name: 'Livres', icon: '📚', count: 89 },
    { name: 'Sport', icon: '⚽', count: 34 }
  ];

  const features = [
    {
      icon: FaTruck,
      title: 'Livraison Rapide',
      description: 'Livraison gratuite à partir de 50 000 FCFA'
    },
    {
      icon: FaShieldAlt,
      title: 'Paiement Sécurisé',
      description: 'Transactions 100% sécurisées'
    },
    {
      icon: FaHeadset,
      title: 'Support 24/7',
      description: 'Assistance client disponible'
    }
  ];

  const teamMembers = [
    {
      name: 'Cheikh Ngom',
      role: 'Développeur Frontend',
      phone: '+221 77 123 45 67',
      email: 'cheikhngom99@gmail.com',
      icon: FaCode,
      description: 'Spécialiste React.js et développement d\'interfaces utilisateur'
    },
    {
      name: 'Balla Niang',
      role: 'Développeur Backend',
      phone: '+221 76 987 65 43',
      email: 'ballaniang512@gmail.com',
      icon: FaServer,
      description: 'Expert Laravel et architecture backend'
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur
              <span className="block text-yellow-400">Kayy Dieunede</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Votre boutique en ligne de confiance - Développée par l'équipe IAGE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Voir nos produits
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login?redirect=/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-gray-600 text-lg">
              Trouvez facilement ce que vous cherchez
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform duration-200"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} produits
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produits en Vedette
            </h2>
            <p className="text-gray-600 text-lg">
              Nos produits les plus populaires
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Voir tous les produits
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Équipe de Développement
            </h2>
            <p className="text-gray-600 text-lg">
              Kayy Dieunede - Projet IAGE GDA DK 2025 - Développé au Sénégal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg text-primary-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <FaPhone className="text-primary-600" />
                      <span className="text-gray-700">{member.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <FaEnvelope className="text-primary-600" />
                      <span className="text-gray-700">{member.email}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contactez Notre Équipe
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Pour toute question technique ou support, n'hésitez pas à nous contacter
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Localisation</h3>
              <p className="text-gray-600">Dakar, Sénégal</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">+221 77 123 45 67</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contact@iage.sn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Kayy Dieunede
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Votre boutique en ligne de confiance - Développée par l'équipe IAGE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 