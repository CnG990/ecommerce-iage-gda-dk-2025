#!/bin/bash

# 🚀 Script de déploiement automatique Heroku pour Backend Laravel
# Usage: ./deploy-heroku.sh [app-name]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_message "Vérification des prérequis..."
    
    # Vérifier si Heroku CLI est installé
    if ! command -v heroku &> /dev/null; then
        print_error "Heroku CLI n'est pas installé. Installez-le avec: npm install -g heroku"
        exit 1
    fi
    
    # Vérifier si on est connecté à Heroku
    if ! heroku auth:whoami &> /dev/null; then
        print_error "Vous n'êtes pas connecté à Heroku. Exécutez: heroku login"
        exit 1
    fi
    
    # Vérifier si on est dans le bon répertoire
    if [ ! -f "composer.json" ]; then
        print_error "Ce script doit être exécuté depuis le dossier backend/"
        exit 1
    fi
    
    print_success "Prérequis vérifiés"
}

# Configuration de l'application Heroku
setup_heroku_app() {
    local app_name=$1
    
    print_message "Configuration de l'application Heroku..."
    
    if [ -z "$app_name" ]; then
        print_warning "Aucun nom d'application fourni, création d'une nouvelle app..."
        app_name=$(heroku create --json | jq -r '.name')
        print_success "Application créée: $app_name"
    else
        # Vérifier si l'app existe
        if heroku apps:info --app "$app_name" &> /dev/null; then
            print_warning "L'application $app_name existe déjà"
        else
            print_message "Création de l'application $app_name..."
            heroku create "$app_name"
        fi
    fi
    
    echo "$app_name"
}

# Configuration des add-ons
setup_addons() {
    local app_name=$1
    
    print_message "Configuration des add-ons Heroku..."
    
    # Ajouter PostgreSQL
    print_message "Ajout de PostgreSQL..."
    heroku addons:create heroku-postgresql:mini --app "$app_name"
    
    # Ajouter Redis
    print_message "Ajout de Redis..."
    heroku addons:create heroku-redis:mini --app "$app_name"
    
    print_success "Add-ons configurés"
}

# Configuration des variables d'environnement
setup_environment() {
    local app_name=$1
    
    print_message "Configuration des variables d'environnement..."
    
    # Variables de base
    heroku config:set APP_ENV=production --app "$app_name"
    heroku config:set APP_DEBUG=false --app "$app_name"
    heroku config:set APP_URL="https://$app_name.herokuapp.com" --app "$app_name"
    heroku config:set LOG_CHANNEL=stack --app "$app_name"
    heroku config:set BROADCAST_DRIVER=log --app "$app_name"
    
    # Base de données
    heroku config:set DB_CONNECTION=pgsql --app "$app_name"
    
    # Cache et sessions
    heroku config:set CACHE_DRIVER=redis --app "$app_name"
    heroku config:set SESSION_DRIVER=redis --app "$app_name"
    heroku config:set QUEUE_CONNECTION=redis --app "$app_name"
    
    # CORS pour le frontend Vercel
    heroku config:set CORS_ALLOWED_ORIGINS="https://ecommerce-iage-gda-dk-2025.vercel.app" --app "$app_name"
    
    print_success "Variables d'environnement configurées"
}

# Déploiement du code
deploy_code() {
    local app_name=$1
    
    print_message "Déploiement du code..."
    
    # Ajouter Heroku comme remote
    heroku git:remote -a "$app_name"
    
    # Déployer
    git push heroku master
    
    print_success "Code déployé"
}

# Configuration post-déploiement
post_deploy_setup() {
    local app_name=$1
    
    print_message "Configuration post-déploiement..."
    
    # Générer la clé d'application
    heroku run php artisan key:generate --app "$app_name"
    
    # Exécuter les migrations
    heroku run php artisan migrate --force --app "$app_name"
    
    # Cachez la configuration
    heroku run php artisan config:cache --app "$app_name"
    heroku run php artisan route:cache --app "$app_name"
    heroku run php artisan view:cache --app "$app_name"
    
    # Optimiser l'application
    heroku run php artisan optimize --app "$app_name"
    
    print_success "Configuration post-déploiement terminée"
}

# Test de l'application
test_application() {
    local app_name=$1
    
    print_message "Test de l'application..."
    
    # Ouvrir l'application
    heroku open --app "$app_name"
    
    # Afficher les logs
    print_message "Logs de l'application (Ctrl+C pour arrêter):"
    heroku logs --tail --app "$app_name"
}

# Fonction principale
main() {
    local app_name=$1
    
    print_message "🚀 Démarrage du déploiement Heroku..."
    
    # Vérifications préliminaires
    check_prerequisites
    
    # Configuration de l'app
    if [ -z "$app_name" ]; then
        app_name=$(setup_heroku_app)
    else
        app_name=$(setup_heroku_app "$app_name")
    fi
    
    # Configuration des add-ons
    setup_addons "$app_name"
    
    # Configuration de l'environnement
    setup_environment "$app_name"
    
    # Déploiement
    deploy_code "$app_name"
    
    # Configuration post-déploiement
    post_deploy_setup "$app_name"
    
    # Test
    test_application "$app_name"
    
    print_success "🎉 Déploiement terminé avec succès!"
    print_message "URL de votre application: https://$app_name.herokuapp.com"
    print_message "Pour voir les logs: heroku logs --tail --app $app_name"
    print_message "Pour ouvrir l'app: heroku open --app $app_name"
}

# Gestion des erreurs
trap 'print_error "Une erreur est survenue. Arrêt du script."; exit 1' ERR

# Exécution du script
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [app-name]"
    echo "  app-name: Nom de l'application Heroku (optionnel)"
    echo ""
    echo "Exemples:"
    echo "  $0                    # Crée une nouvelle app avec un nom généré"
    echo "  $0 my-app-name        # Utilise l'app existante ou crée 'my-app-name'"
    exit 0
fi

main "$1" 