#!/bin/bash

# Script de déploiement Vercel pour le projet IAGE GDA DK 2025
# Usage: ./deploy-vercel.sh

echo "🚀 Démarrage du déploiement Vercel..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis le dossier frontend"
    exit 1
fi

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Erreur: Node.js n'est pas installé"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ Erreur: npm n'est pas installé"
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

echo "🌐 Déploiement sur Vercel..."
echo "⚠️  Assurez-vous d'avoir configuré vos variables d'environnement sur Vercel!"

# Déployer sur Vercel
vercel --prod

echo "✅ Déploiement terminé!"
echo "🔗 Votre application est maintenant en ligne!"
echo "📝 N'oubliez pas de vérifier:"
echo "   - Les variables d'environnement sont configurées"
echo "   - Les appels API fonctionnent"
echo "   - L'authentification fonctionne"
echo "   - Les redirections fonctionnent" 