# Configuration du VERCEL_TOKEN pour GitHub Actions

## Étapes pour créer et configurer le token Vercel

### 1. Créer un token Vercel
1. Connectez-vous à votre compte Vercel : https://vercel.com
2. Allez dans Settings → Tokens : https://vercel.com/account/tokens
3. Cliquez sur "Create Token"
4. Donnez un nom au token (ex: "GitHub Actions ACD")
5. Sélectionnez la durée de validité (recommandé: "No Expiration" pour CI/CD)
6. Copiez le token généré (vous ne pourrez plus le voir après)

### 2. Ajouter le token aux secrets GitHub
1. Allez sur votre repository GitHub : https://github.com/Gabistam/ACD
2. Cliquez sur "Settings" (⚙️)
3. Dans le menu de gauche : "Secrets and variables" → "Actions"
4. Cliquez sur "New repository secret"
5. Ajoutez les secrets suivants :

   **VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: [Collez le token créé à l'étape 1]
   
   **VERCEL_ORG_ID** (déjà récupéré)
   - Name: `VERCEL_ORG_ID`
   - Value: `team_pHnHkixCQln2gksFAS1R81qS`
   
   **VERCEL_PROJECT_ID** (déjà récupéré)
   - Name: `VERCEL_PROJECT_ID`
   - Value: `prj_Nu6eKH4lONxEOnjaOcogMwbLC4ow`

### 3. Vérifier la configuration
Une fois les secrets configurés :
1. Les workflows GitHub Actions pourront s'authentifier avec Vercel
2. Les déploiements automatiques fonctionneront à chaque push
3. Vous verrez les déploiements dans l'onglet "Actions" de GitHub

## Résolution des problèmes

### Si le déploiement échoue encore :
1. Vérifiez que les 3 secrets sont bien configurés
2. Vérifiez que le token n'a pas expiré
3. Vérifiez que le token a les permissions nécessaires

### Pour les pages 404 :
Le fichier `vercel.json` a été configuré avec :
- `cleanUrls: true` : Permet d'accéder aux pages sans l'extension .html
- `trailingSlash: false` : Évite les problèmes de slash à la fin des URLs

Exemples d'URLs qui fonctionneront :
- `/nos-actions` (au lieu de `/nos-actions.html`)
- `/qui-sommes-nous`
- `/nous-soutenir`
- `/contact-static`