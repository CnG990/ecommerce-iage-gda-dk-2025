import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  try {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold">Kayy Dieunede</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Votre boutique en ligne de confiance. Développée au Sénégal par Cheikh Ngom (Frontend) et Balla Niang (Backend). 
                Projet IAGE GDA DK 2025 - Innovation et Excellence.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook className="text-xl" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="text-xl" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="text-xl" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="text-xl" />
                </button>
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                    Tous les produits
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300">
                    Dakar, Sénégal<br />
                    Institut Africain de Gestion et d'Économie
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300">+221 77 123 45 67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300">contact@iage.sn</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300">cheikhngom99@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300">ballaniang512@gmail.com</span>
                </div>
              </div>

              {/* Horaires */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">Horaires d'ouverture</h4>
                <p className="text-gray-300 text-sm">
                  Lun - Ven: 9h00 - 18h00<br />
                  Sam: 10h00 - 16h00<br />
                  Dim: Fermé
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                <p className="text-gray-300">
                  Inscrivez-vous pour recevoir nos dernières offres et nouveautés
                </p>
              </div>
              <div className="flex w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 lg:w-64 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                  S'abonner
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Kayy Dieunede. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Développé avec ❤️ par Cheikh Ngom & Balla Niang - Sénégal
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Erreur dans Footer:', error);
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Kayy Dieunede. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Développé avec ❤️ par Cheikh Ngom & Balla Niang - Sénégal
            </p>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer; 