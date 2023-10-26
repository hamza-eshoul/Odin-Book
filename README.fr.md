## Projet Odin Book

[![en](https://img.shields.io/badge/lang-en-red)](README.md)

Ce dépôt comprend le Full Stack Odin Book projet créé pour [Odin Project](https://www.theodinproject.com/lessons/nodejs-odin-book).

L'objectif du projet est de créer un clone de la plateforme de médias sociaux Facebook en implémentant les principales fonctionnalités de la plateforme, à savoir les utilisateurs, les profils, les publications, les « likes », les « amis » ainsi que le fil d'actualité.

Une API RESTful a été créé à l'aide d'ExpressJS et sert de backend au projet.

Une interface utilisateur intuitive a été créé à l'aide de ReactJS et sert de frontend au projet.

- Lien du projet - https://odin-book-project.onrender.com/
- Dépôt frontend du projet - https://github.com/skynter/Odin-Book-frontend
- Dépôt backend du projet - https://github.com/skynter/Odin-Book-backend

## Page d'accueil

![Homepage Screenshot](/screenshots/Homepage-screenshot.png)

## Page d'amis

![Friends page Screenshot](/screenshots/Friends-screenshot.png)

## Page de profil

![Profile's page Screenshot](/screenshots/Profile-screenshot.png)

## Version Mobile

![Mobile Version Screenshot](/screenshots/Mobile-version-screenshot.png)

## Technologies Utilisées

- NodeJS
- ExpressJS
- MongoDB
- ReactJS
- Tailwind CSS
- Cloudinary NodeJS

## Principales Fonctionnalités

- Intégration avec une RESTful backend API
- Authentification à travers les JWTs
- Personnalisation des profils d'utilisateurs
- Opérations CRUD pour la fonctionnalité "amis" (Ajout d'amis / Suppression d'amis / Gestion des demandes d'amis)
- Opérations CRUD pour la fonctionnalité "publications" (Ajout de publications / Suppression de publications )
- Opérations CRUD pour la fonctionnalité "commentaires" (Ajout de commentaires / Modifiation de commentaires / Suppression de commentaires)
- Interface Utilisateur Intuitive
- Interface Utilisateur Responsive

## Installation

Pour exécuter le projet localement sur votre machine :

- Accédez au dossier frontend du projet et exécutez la commande suivante pour installer les dépendances du projet :

```
npm install
```

- Exécutez la commande suivante pour pour générer un serveur local de développement

```
npm start
```

- Ouvrez http://localhost:3000 avec votre navigateur pour accéder à la version locale du frontend de votre projet

- Les points de terminaison de l'API figurant au niveau du dossier backend du projet sont accessibles à travers l'API hébergé sur https://odin-book-api-g5zs.onrender.com

- Les deux points de terminaisons principaux de l'API sont le POST https://odin-book-api-g5zs.onrender.com/posts et le POST https://odin-book-api-g5zs.onrender.com/users/:user_id/send_friend_request
