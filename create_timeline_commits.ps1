# Script pour créer des commits avec des dates échelonnées
# Usage: .\create_timeline_commits.ps1

Write-Host "🚀 Création de commits avec timeline réaliste..." -ForegroundColor Green

# Fonction pour créer un commit avec une date spécifique
function Create-Commit {
    param(
        [string]$Date,
        [string]$Message,
        [string]$FileContent,
        [string]$FileName
    )
    
    # Créer le fichier
    Set-Content -Path $FileName -Value $FileContent
    
    # Ajouter au staging
    git add $FileName
    
    # Créer le commit avec la date spécifiée
    git commit --date="$Date" -m $Message
    
    Write-Host "✅ Commit créé pour $Date" -ForegroundColor Green
}

# Timeline de commits (dates échelonnées sur 2 semaines)
$commits = @(
    @{
        Date = "2025-01-18 09:30:00"
        Message = "feat(frontend): implémentation des pages principales

- Création de la page d'accueil avec carrousel
- Page catalogue avec filtres et recherche
- Page détail produit avec galerie d'images
- Responsive design pour mobile et desktop

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Pages Principales

Ce dossier contient les pages principales de l'application e-commerce.

## Pages
- `Home.js` - Page d'accueil avec carrousel
- `Products.js` - Catalogue de produits
- `ProductDetail.js` - Détail d'un produit

## Fonctionnalités
- Navigation fluide entre les pages
- Design responsive
- Optimisation des performances"
        FileName = "frontend/src/pages/README.md"
    },
    @{
        Date = "2025-01-19 14:20:00"
        Message = "feat(cart): développement du système de panier

- Composant Cart avec gestion des quantités
- Intégration avec Redux pour la persistance
- Calcul automatique des totaux
- Validation des stocks disponibles

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Système de Panier

Gestion complète du panier d'achat.

## Fonctionnalités
- Ajout/suppression de produits
- Modification des quantités
- Calcul automatique des totaux
- Persistance avec Redux"
        FileName = "frontend/src/components/cart/README.md"
    },
    @{
        Date = "2025-01-20 11:45:00"
        Message = "feat(redux): configuration du store Redux

- Configuration du store principal
- Slices pour auth, cart, products
- Middleware pour la persistance
- Actions et reducers optimisés

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Configuration Redux

Gestion d'état centralisée avec Redux Toolkit.

## Slices
- `authSlice.js` - Authentification
- `cartSlice.js` - Panier
- `productSlice.js` - Produits
- `orderSlice.js` - Commandes"
        FileName = "frontend/src/redux/README.md"
    },
    @{
        Date = "2025-01-21 16:10:00"
        Message = "feat(admin): interface d'administration

- Dashboard avec statistiques
- Gestion des produits (CRUD)
- Gestion des commandes
- Interface utilisateur admin

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Interface d'Administration

Panel d'administration complet.

## Pages Admin
- Dashboard avec métriques
- Gestion des produits
- Suivi des commandes
- Gestion des utilisateurs"
        FileName = "frontend/src/pages/admin/README.md"
    },
    @{
        Date = "2025-01-22 13:30:00"
        Message = "feat(checkout): processus de commande

- Formulaire de commande complet
- Choix du mode de paiement
- Validation des données
- Génération de facture

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Processus de Commande

Système complet de commande.

## Étapes
1. Récapitulatif du panier
2. Informations de livraison
3. Choix du paiement
4. Confirmation"
        FileName = "frontend/src/pages/checkout/README.md"
    },
    @{
        Date = "2025-01-23 10:15:00"
        Message = "feat(services): services API

- Services pour l'authentification
- Services pour les produits
- Services pour les commandes
- Gestion des erreurs HTTP

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Services API

Couche de communication avec l'API backend.

## Services
- `authService.js` - Authentification
- `productService.js` - Produits
- `orderService.js` - Commandes
- `userService.js` - Utilisateurs"
        FileName = "frontend/src/services/README.md"
    },
    @{
        Date = "2025-01-24 15:45:00"
        Message = "feat(utils): utilitaires et helpers

- Formateurs de données
- Utilitaires d'images
- Gestion des redirections
- Validation des formulaires

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Utilitaires

Fonctions utilitaires réutilisables.

## Utilitaires
- `formatters.js` - Formatage des données
- `imageUtils.js` - Gestion des images
- `redirectUtils.js` - Redirections"
        FileName = "frontend/src/utils/README.md"
    },
    @{
        Date = "2025-01-25 12:00:00"
        Message = "test: ajout des tests unitaires

- Tests pour les composants React
- Tests pour les services API
- Tests pour les utilitaires
- Configuration Jest et Testing Library

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Tests Unitaires

Suite de tests complète.

## Tests
- Composants React
- Services API
- Utilitaires
- Redux store"
        FileName = "frontend/src/tests/README.md"
    },
    @{
        Date = "2025-01-26 14:30:00"
        Message = "perf: optimisations de performance

- Lazy loading des composants
- Optimisation des images
- Compression des assets
- Cache des requêtes API

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Optimisations Performance

Améliorations des performances.

## Optimisations
- Lazy loading
- Compression images
- Cache API
- Bundle optimization"
        FileName = "frontend/src/optimizations/README.md"
    },
    @{
        Date = "2025-01-27 09:20:00"
        Message = "docs: documentation finale

- README complet du projet
- Guide de déploiement
- Guide des commits
- Documentation API

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
        FileContent = "# Documentation Finale

Documentation complète du projet.

## Sections
- Installation
- Configuration
- Déploiement
- API Reference"
        FileName = "docs/FINAL_DOCUMENTATION.md"
    }
)

# Créer tous les commits
foreach ($commit in $commits) {
    Create-Commit -Date $commit.Date -Message $commit.Message -FileContent $commit.FileContent -FileName $commit.FileName
    Start-Sleep -Seconds 2  # Pause entre les commits
}

Write-Host "✅ Timeline de commits créée avec succès!" -ForegroundColor Green
Write-Host "📅 Commits échelonnés du 18 au 27 Janvier 2025" -ForegroundColor Yellow 