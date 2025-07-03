import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Collecte des données</h2>
            <p className="text-gray-600 mb-4">
              Nous collectons les informations que vous nous fournissez directement lors de :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>La création de votre compte</li>
              <li>La passation d'une commande</li>
              <li>L'inscription à notre newsletter</li>
              <li>Le contact avec notre service client</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Utilisation des données</h2>
            <p className="text-gray-600 mb-4">
              Nous utilisons vos données personnelles pour :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Gérer votre compte</li>
              <li>Traiter et livrer vos commandes</li>
              <li>Vous envoyer des informations sur nos produits et services</li>
              <li>Améliorer notre service client</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Protection des données</h2>
            <p className="text-gray-600 mb-4">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
              contre tout accès, modification, divulgation ou destruction non autorisée.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Cookies</h2>
            <p className="text-gray-600 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site.
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Partage des données</h2>
            <p className="text-gray-600 mb-4">
              Nous ne vendons pas vos données personnelles. Nous les partageons uniquement avec :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Nos prestataires de services (livraison, paiement)</li>
              <li>Les autorités légales si requis par la loi</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Vos droits</h2>
            <p className="text-gray-600 mb-4">
              Vous avez le droit de :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Vous opposer au traitement de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Conservation des données</h2>
            <p className="text-gray-600 mb-4">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour
              les finalités pour lesquelles elles ont été collectées.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Modifications</h2>
            <p className="text-gray-600 mb-4">
              Nous pouvons modifier cette politique de confidentialité à tout moment.
              Les modifications prennent effet dès leur publication sur le site.
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Pour exercer vos droits ou pour toute question, contactez-nous à{' '}
                <a href="mailto:privacy@example.com" className="text-primary-600 hover:text-primary-500">
                  privacy@example.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/conditions-utilisation"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← Conditions d'utilisation
            </Link>
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Retour à l'accueil →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 