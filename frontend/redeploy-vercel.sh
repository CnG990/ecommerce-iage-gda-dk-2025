#!/bin/bash

# Script de redéploiement Vercel pour corriger l'erreur 404
# Usage: ./redeploy-vercel.sh

echo "🔧 Redéploiement Vercel pour corriger l'erreur 404..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis le dossier frontend"
    exit 1
fi

echo "📦 Installation des dépendances..."
npm install

echo "🔨 Construction du projet..."
npm run build

# Vérifier que la construction a réussi
if [ ! -d "build" ]; then
    echo "❌ Erreur: La construction a échoué. Le dossier build n'existe pas."
    exit 1
fi

echo "✅ Construction réussie!"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📥 Installation de Vercel CLI..."
    npm install -g vercel
fi

echo "🌐 Redéploiement sur Vercel avec la nouvelle configuration..."
echo "⚠️  La configuration vercel.json a été simplifiée pour résoudre l'erreur 404"

# Déployer sur Vercel en production
vercel --prod --yes

echo "✅ Redéploiement terminé!"
echo "🔗 Votre application devrait maintenant fonctionner sans erreur 404"
echo "📝 Testez ces URLs :"
echo "   - Page d'accueil: https://your-app.vercel.app/"
echo "   - Produits: https://your-app.vercel.app/products"
echo "   - Login: https://your-app.vercel.app/login"
echo ""
echo "💡 Si l'erreur persiste, attendez quelques minutes pour la propagation" 