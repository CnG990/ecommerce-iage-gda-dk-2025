# Guide de Gestion des Commits - Projet E-commerce

## 🎯 Objectif
Gérer les commits de manière professionnelle sans laisser de traces indésirables.

## 📋 Règles de Base

### 1. Messages de Commit Professionnels
```bash
# ✅ BON - Messages descriptifs et professionnels
git commit -m "feat(frontend): ajout du système de panier avec Redux

- Implémentation du composant Cart
- Intégration avec Redux pour la persistance
- Tests unitaires pour les fonctionnalités principales

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"

# ❌ MAUVAIS - Messages vagues ou inappropriés
git commit -m "fix stuff"
git commit -m "update"
```

### 2. Utilisation des Co-authors
Pour chaque commit, inclure tous les membres de l'équipe :
```bash
git commit -m "feat: nouvelle fonctionnalité

Description détaillée

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

### 3. Types de Commits Recommandés
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactorisation
- `test`: Tests
- `chore`: Maintenance

## 🧹 Nettoyage Avant Commit

### 1. Vérifier les Fichiers à Commiter
```bash
git status
git diff --cached
```

### 2. Exclure les Fichiers Sensibles
```bash
# Vérifier que .gitignore est à jour
cat .gitignore

# Si nécessaire, ajouter des fichiers sensibles
echo "secrets.json" >> .gitignore
echo ".env.local" >> .gitignore
```

### 3. Nettoyer les Fichiers Temporaires
```bash
# Supprimer les fichiers temporaires
rm -rf node_modules/.cache
rm -rf frontend/build
rm -rf .DS_Store
```

## 🔄 Workflow Recommandé

### Étape 1: Préparation
```bash
# 1. Vérifier l'état actuel
git status

# 2. Nettoyer les fichiers inutiles
git clean -fd

# 3. Vérifier les modifications
git diff
```

### Étape 2: Staging Sélectif
```bash
# Ajouter les fichiers de manière organisée
git add frontend/src/components/
git add frontend/src/pages/
git add docs/
git add README.md

# Éviter d'ajouter des fichiers sensibles
git reset HEAD secrets.json
git reset HEAD .env.local
```

### Étape 3: Commit Propre
```bash
git commit -m "feat(scope): description claire

- Point 1 de la modification
- Point 2 de la modification
- Point 3 de la modification

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

## 🚫 Éviter les Traces Indésirables

### 1. Ne Jamais Commiter
- Fichiers de configuration locaux (.env.local)
- Clés API ou secrets
- Fichiers de cache (node_modules, build/)
- Fichiers temporaires (.DS_Store, .log)
- Informations personnelles

### 2. Vérifier Avant Push
```bash
# Vérifier l'historique des commits
git log --oneline -10

# Vérifier les fichiers dans le dernier commit
git show --name-only HEAD

# Vérifier le contenu des fichiers
git show HEAD:path/to/file
```

### 3. Si Erreur Détectée
```bash
# Modifier le dernier commit
git commit --amend

# Ou créer un nouveau commit de correction
git commit -m "fix: correction du commit précédent

- Suppression des informations sensibles
- Ajout des fichiers manquants

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

## 📊 Exemples de Commits Propre

### Frontend
```bash
git commit -m "feat(frontend): implémentation du système d'authentification

- Ajout des pages Login et Register
- Intégration avec Redux pour la gestion d'état
- Validation des formulaires avec Yup
- Tests unitaires pour les composants

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

### Backend
```bash
git commit -m "feat(backend): API REST pour la gestion des produits

- Endpoints CRUD pour les produits
- Authentification JWT
- Validation des données avec Joi
- Documentation API avec Swagger

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

### Déploiement
```bash
git commit -m "feat(deploy): configuration Vercel et Railway

- Ajout du fichier vercel.json
- Configuration des variables d'environnement
- Scripts de déploiement automatisé
- Documentation du processus de déploiement

Co-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
```

## 🔍 Vérification Finale

### Avant Push
```bash
# 1. Vérifier l'historique
git log --oneline -5

# 2. Vérifier les fichiers modifiés
git diff --name-only HEAD~1

# 3. Vérifier le contenu des commits
git show --stat HEAD

# 4. Tester le build
cd frontend && npm run build
```

### Checklist de Sécurité
- [ ] Aucun fichier .env dans les commits
- [ ] Aucune clé API exposée
- [ ] Aucune information personnelle
- [ ] Messages de commit professionnels
- [ ] Co-authors inclus
- [ ] Tests passent
- [ ] Build réussi

## 🚀 Push Propre

```bash
# Push avec vérification
git push origin main

# Si erreur, corriger et recommencer
git push --force-with-lease origin main
```

---

**Rappel**: Toujours penser à la réputation professionnelle et à la sécurité du projet ! 