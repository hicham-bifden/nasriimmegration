# Immigway Visa Agency

Site web professionnel pour l'agence de visa Immigway, spécialisée dans les services d'immigration au Canada.

## 🚀 Fonctionnalités

- **Site Web Responsive** : Design moderne et adaptatif
- **Système de Rendez-vous** : Prise de rendez-vous en ligne avec base de données
- **Envoi d'Emails Automatique** : Notifications par EmailJS
- **Menu Multi-niveaux** : Navigation complexe avec mega menu
- **Slider Interactif** : Carousel avec Swiper.js
- **Multilingue** : Support français/anglais
- **Calculateur CRS** : Outil d'évaluation Express Entry

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** : Framework JavaScript moderne
- **React Router** : Navigation et routage
- **Swiper.js** : Carousel et slider
- **CSS3** : Styles modernes et responsive
- **EmailJS** : Envoi d'emails automatique

### Backend
- **Node.js** : Serveur JavaScript
- **Express** : Framework web
- **MySQL** : Base de données (via MAMP)
- **CORS** : Gestion des requêtes cross-origin

## 📦 Installation

### Prérequis
- Node.js (v14+)
- MAMP (pour MySQL)
- Git

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/hicham-bifden/nasriimmegration.git
   cd nasriimmegration
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Démarrer MAMP
   - Créer la base `nasri_bdd`
   - Exécuter le script SQL dans `server/schema.sql`

4. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos clés EmailJS
   ```

5. **Démarrer l'application**
   ```bash
   # Démarrer le serveur backend
   npm run server
   
   # Dans un autre terminal, démarrer React
   npm start
   ```

## 🚀 Démarrage Rapide

```bash
# Script automatique pour démarrer tout
./start-immigway.sh
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React réutilisables
│   ├── Header.js       # Navigation principale
│   ├── Swiper.js       # Slider/carousel
│   ├── AppointmentBooking.js  # Système de rendez-vous
│   └── ...
├── pages/              # Pages de l'application
│   ├── HomePage.js     # Page d'accueil
│   ├── immigrate/      # Pages immigration
│   ├── services/       # Pages services
│   └── ...
├── contexts/           # Contextes React (langue, etc.)
├── services/           # Services API
└── config/             # Configuration

server/
├── mamp-server.js     # Serveur Node.js principal
├── routes/            # Routes API
├── models/            # Modèles de données
└── config/           # Configuration base de données
```

## 🔧 Configuration

### EmailJS
1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurer les clés dans `.env`
3. Créer des templates d'email

### Base de Données
- **Host** : localhost (MAMP)
- **Port** : 8889 (MAMP MySQL)
- **Database** : nasri_bdd
- **Table** : appointments

## 📱 Pages Disponibles

- **Accueil** : Slider et présentation
- **Services** : Consultation, représentation complète
- **Immigration** : Express Entry, PNP, Québec, Business
- **Études** : Admission universitaire, permis d'études
- **Travail** : Permis de travail, TFWP, IMP
- **Visite** : Visa visiteur, ETA
- **Parrainage** : Familial, parents
- **Ressources** : Outils, guides, villes
- **Rendez-vous** : Prise de rendez-vous en ligne

## 🎨 Personnalisation

### Modifier le contenu
- Éditer les composants dans `src/components/`
- Modifier les pages dans `src/pages/`
- Ajuster les styles dans les fichiers `.css`

### Ajouter des pages
1. Créer le composant dans `src/pages/`
2. Ajouter la route dans `src/App.js`
3. Mettre à jour le menu dans `src/components/Header.js`

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Serveur de production
```bash
npx serve -s build
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : hicham.bifden@gmail.com
- GitHub Issues : [Créer une issue](https://github.com/hicham-bifden/nasriimmegration/issues)

## 🙏 Remerciements

- React Community
- Swiper.js
- EmailJS
- MAMP
- Tous les contributeurs

---

**Développé avec ❤️ par Hicham Bifden**