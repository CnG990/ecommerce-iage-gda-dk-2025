import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Les présentes conditions d'utilisation régissent votre utilisation de notre site web et de nos services.
              En utilisant notre site, vous acceptez ces conditions dans leur intégralité.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Compte utilisateur</h2>
            <p className="text-gray-600 mb-4">
              Pour utiliser certaines fonctionnalités du site, vous devrez créer un compte. Vous êtes responsable
              de maintenir la confidentialité de votre compte et mot de passe.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Commandes et paiements</h2>
            <p className="text-gray-600 mb-4">
              En passant une commande, vous vous engagez à acheter le produit au prix indiqué.
              Tous les paiements sont traités de manière sécurisée.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Livraison</h2>
            <p className="text-gray-600 mb-4">
              Nous nous efforçons de livrer les produits dans les délais indiqués.
              Les frais de livraison sont calculés en fonction de votre localisation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Retours et remboursements</h2>
            <p className="text-gray-600 mb-4">
              Vous disposez d'un délai de 14 jours pour retourner un produit.
              Les remboursements sont effectués sur le mode de paiement original.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              Tout le contenu du site est protégé par les droits d'auteur.
              Vous ne pouvez pas utiliser ce contenu sans notre autorisation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation de responsabilité</h2>
            <p className="text-gray-600 mb-4">
              Nous ne sommes pas responsables des dommages indirects résultant de l'utilisation de notre site.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Modifications</h2>
            <p className="text-gray-600 mb-4">
              Nous nous réservons le droit de modifier ces conditions à tout moment.
              Les modifications prennent effet dès leur publication.
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Pour toute question concernant ces conditions, veuillez nous contacter à{' '}
                <a href="mailto:contact@example.com" className="text-primary-600 hover:text-primary-500">
                  contact@example.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← Retour à l'accueil
            </Link>
            <Link
              to="/politique-confidentialite"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Politique de confidentialité →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 