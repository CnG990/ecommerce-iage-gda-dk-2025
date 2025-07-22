#!/bin/bash

# Script de déploiement pour le projet E-commerce IAGE GDA DK 2025
# Usage: ./deploy.sh [frontend|backend|all]

set -e

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    print_error "Git n'est pas initialisé. Veuillez initialiser Git d'abord."
    exit 1
fi

# Fonction pour déployer le frontend
deploy_frontend() {
    print_message "Déploiement du frontend..."
    
    cd frontend
    
    # Vérifier si node_modules existe
    if [ ! -d "node_modules" ]; then
        print_message "Installation des dépendances..."
        npm install
    fi
    
    # Build de l'application
    print_message "Build de l'application..."
    npm run build
    
    # Vérifier si le build a réussi
    if [ ! -d "build" ]; then
        print_error "Le build a échoué. Vérifiez les erreurs ci-dessus."
        exit 1
    fi
    
    print_message "Frontend buildé avec succès!"
    cd ..
}

# Fonction pour préparer le backend
prepare_backend() {
    print_message "Préparation du backend..."
    
    # Vérifier si le fichier backend.zip existe
    if [ ! -f "backend.zip" ]; then
        print_error "Le fichier backend.zip n'existe pas."
        exit 1
    fi
    
    print_message "Backend prêt pour déploiement!"
}

# Fonction pour pousser sur GitHub
push_to_github() {
    print_message "Poussée vers GitHub..."
    
    # Vérifier s'il y a des changements
    if git diff-index --quiet HEAD --; then
        print_warning "Aucun changement détecté."
    else
        git add .
        git commit -m "Deploy: $(date)"
        git push origin main
        print_message "Code poussé vers GitHub avec succès!"
    fi
}

# Fonction pour afficher les instructions de déploiement
show_deployment_instructions() {
    echo ""
    print_message "📋 Instructions de déploiement:"
    echo ""
    echo "1. Frontend (Vercel):"
    echo "   - Aller sur https://vercel.com"
    echo "   - Connecter votre repository GitHub"
    echo "   - Configurer le projet:"
    echo "     * Framework: Create React App"
    echo "     * Root Directory: frontend"
    echo "     * Build Command: npm run build"
    echo "     * Output Directory: build"
    echo ""
    echo "2. Backend (Railway/Render):"
    echo "   - Aller sur https://railway.app ou https://render.com"
    echo "   - Connecter votre repository GitHub"
    echo "   - Configurer selon la technologie du backend"
    echo ""
    echo "3. Variables d'environnement à configurer:"
    echo "   - REACT_APP_API_URL=https://votre-backend-url.com/api"
    echo "   - REACT_APP_BASE_URL=https://votre-frontend-url.vercel.app"
    echo ""
}

# Menu principal
case "${1:-all}" in
    "frontend")
        deploy_frontend
        push_to_github
        show_deployment_instructions
        ;;
    "backend")
        prepare_backend
        push_to_github
        show_deployment_instructions
        ;;
    "all")
        deploy_frontend
        prepare_backend
        push_to_github
        show_deployment_instructions
        ;;
    *)
        print_error "Usage: ./deploy.sh [frontend|backend|all]"
        exit 1
        ;;
esac

print_message "✅ Déploiement terminé! Suivez les instructions ci-dessus pour finaliser le déploiement." 