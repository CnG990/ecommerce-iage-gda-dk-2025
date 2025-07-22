# Guide des Commits GitHub - Équipe E-commerce

## 📝 Convention de Commits

### Format Recommandé
```
type(scope): description courte

Description détaillée si nécessaire

Co-authored-by: Nom <email@example.com>
```

### Types de Commits
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, point-virgules manquants, etc.
- `refactor`: Refactorisation du code
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

### Exemples par Membre

#### Membre 1 - Frontend React
```bash
# Développement des composants
git commit -m "feat(frontend): ajout du composant ProductCard

- Création du composant ProductCard avec design responsive
- Intégration des images et informations produit
- Ajout des interactions utilisateur (ajout au panier)

Co-authored-by: Membre2 <membre2@email.com>
Co-authored-by: Membre3 <membre3@email.com>"

# Correction de bugs
git commit -m "fix(frontend): correction du problème d'affichage du panier

- Résolution du bug d'affichage du panier vide
- Amélioration de la gestion des états Redux
- Tests unitaires ajoutés

Co-authored-by: Membre2 <membre2@email.com>
Co-authored-by: Membre3 <membre3@email.com>"
```

#### Membre 2 - Backend API
```bash
# Développement des endpoints
git commit -m "feat(backend): implémentation des endpoints produits

- Création des routes GET /api/products
- Ajout de la pagination et filtrage
- Documentation API avec Swagger

Co-authored-by: Membre1 <membre1@email.com>
Co-authored-by: Membre3 <membre3@email.com>"

# Sécurité et authentification
git commit -m "feat(backend): implémentation JWT et middleware auth

- Ajout de l'authentification JWT
- Middleware de protection des routes
- Validation des tokens

Co-authored-by: Membre1 <membre1@email.com>
Co-authored-by: Membre3 <membre3@email.com>"
```

#### Membre 3 - Intégration et Déploiement
```bash
# Configuration du déploiement
git commit -m "feat(deploy): configuration Vercel et Railway

- Ajout du fichier vercel.json
- Configuration des variables d'environnement
- Scripts de déploiement automatisé

Co-authored-by: Membre1 <membre1@email.com>
Co-authored-by: Membre2 <membre2@email.com>"

# Optimisations
git commit -m "perf(frontend): optimisation des performances

- Lazy loading des images
- Compression des assets
- Optimisation du bundle

Co-authored-by: Membre1 <membre1@email.com>
Co-authored-by: Membre2 <membre2@email.com>"
```

## 🏷️ Organisation des Branches

### Branches Principales
- `main`: Code de production
- `develop`: Branche de développement
- `feature/nom-feature`: Branches de fonctionnalités
- `hotfix/nom-fix`: Corrections urgentes

### Workflow Recommandé
```bash
# Créer une nouvelle branche pour une fonctionnalité
git checkout -b feature/gestion-panier

# Développer et commiter
git add .
git commit -m "feat(frontend): implémentation de la gestion du panier"

# Pousser la branche
git push origin feature/gestion-panier

# Créer une Pull Request sur GitHub
# Demander la review des autres membres
# Merge après approbation
```

## 📊 Suivi des Contributions

### Utilisation des Co-authors
Pour chaque commit, inclure tous les membres qui ont contribué :

```bash
git commit -m "feat: nouvelle fonctionnalité

Description détaillée

Co-authored-by: Prénom Nom <email@example.com>
Co-authored-by: Prénom Nom <email@example.com>
Co-authored-by: Prénom Nom <email@example.com>"
```

### Tags pour Identifier les Responsabilités
- `[FRONTEND]` - Travail sur l'interface utilisateur
- `[BACKEND]` - Travail sur l'API
- `[DEPLOY]` - Configuration et déploiement
- `[TEST]` - Tests et qualité
- `[DOCS]` - Documentation

## 🎯 Objectifs par Membre

### Membre 1 - Frontend React
**Responsabilités:**
- Développement des composants React
- Gestion de l'état avec Redux
- Interface utilisateur et UX
- Intégration avec l'API

**Commits attendus:**
- Composants UI (ProductCard, Cart, Checkout)
- Pages principales (Home, Products, ProductDetail)
- Gestion d'état Redux
- Responsive design
- Tests des composants

### Membre 2 - Backend API
**Responsabilités:**
- Développement de l'API REST
- Base de données et modèles
- Authentification et sécurité
- Gestion des emails et PDF

**Commits attendus:**
- Endpoints API (produits, commandes, utilisateurs)
- Authentification JWT
- Gestion des fichiers (images)
- Génération de factures PDF
- Envoi d'emails automatiques

### Membre 3 - Intégration et Déploiement
**Responsabilités:**
- Configuration du déploiement
- Optimisation des performances
- Tests d'intégration
- Documentation technique

**Commits attendus:**
- Configuration Vercel/Railway
- Scripts de déploiement
- Optimisations de performance
- Tests end-to-end
- Documentation du projet

## 📈 Métriques de Suivi

### Commits par Semaine
- **Minimum recommandé:** 5-10 commits par membre
- **Qualité:** Messages descriptifs et co-authors
- **Répartition:** Équilibrée entre les membres

### Pull Requests
- **Review obligatoire:** Chaque PR doit être reviewée par au moins 2 membres
- **Tests:** Tous les changements doivent être testés
- **Documentation:** Mise à jour de la documentation si nécessaire

## 🚀 Checklist Final

### Avant le Déploiement
- [ ] Tous les tests passent
- [ ] Documentation à jour
- [ ] Variables d'environnement configurées
- [ ] Code review effectuée
- [ ] Build de production réussi

### Après le Déploiement
- [ ] Tests sur l'environnement de production
- [ ] Vérification des fonctionnalités principales
- [ ] Monitoring des performances
- [ ] Backup de la base de données

---

**Note:** Ce guide garantit une traçabilité claire des contributions de chaque membre pour l'évaluation du projet. 