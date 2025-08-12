# Configuration CI/CD avec GitHub Actions et Vercel

## Configuration mise en place

### 1. GitHub Actions
- **CI Pipeline** (`.github/workflows/ci.yml`) : 
  - Tests sur Node.js 18.x et 20.x
  - Linting avec ESLint
  - Build du projet
  - Upload des artifacts de build

- **Deploy Pipeline** (`.github/workflows/deploy.yml`) :
  - Déploiement automatique vers Vercel
  - Preview deployments pour les branches
  - Production deployment pour la branche main

### 2. Vercel Configuration
- **vercel.json** configuré avec :
  - Framework Vite
  - Rewrites pour SPA routing
  - Headers de sécurité
  - Cache optimisé pour les assets

### 3. Version sans backend
- **contact-static.html** : Version statique du formulaire de contact
  - Prêt pour intégration Formspree
  - Pas de dépendance Supabase

## Configuration requise

### Secrets GitHub à configurer
Dans les settings de votre repository GitHub, ajoutez ces secrets :

1. **VERCEL_TOKEN** : Token d'authentification Vercel
   - Obtenir depuis : https://vercel.com/account/tokens

2. **VERCEL_ORG_ID** : ID de votre organisation Vercel
   - Trouvable dans les settings Vercel

3. **VERCEL_PROJECT_ID** : ID du projet Vercel
   - Créé lors du premier import du projet

### Étapes de configuration Vercel

1. Installer Vercel CLI localement :
```bash
npm i -g vercel
```

2. Connecter le projet :
```bash
vercel link
```

3. Les IDs seront générés dans `.vercel/project.json`

### Configuration Formspree (optionnel)

Pour activer le formulaire de contact :

1. Créer un compte sur https://formspree.io
2. Créer un nouveau formulaire
3. Remplacer `YOUR_FORM_ID` dans `contact-static.html` par votre ID Formspree

## Workflow

1. **Development** :
   - Push vers `ci-cd-no-backend` → Preview deployment
   - Tests automatiques via GitHub Actions

2. **Production** :
   - Merge vers `main` → Production deployment
   - Build optimisé et déployé sur Vercel

## Scripts disponibles

```bash
npm run dev      # Développement local
npm run build    # Build production
npm run lint     # Linting
npm run preview  # Preview du build local
```

## URLs de déploiement

- **Production** : [Configuré après premier déploiement]
- **Preview** : Généré automatiquement pour chaque PR

## Monitoring

- GitHub Actions : Voir l'onglet "Actions" du repository
- Vercel Dashboard : https://vercel.com/dashboard