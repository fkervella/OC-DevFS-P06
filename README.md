 

# Role
Développeur front-end chez Sportsee, stratup dédié au coaching sportif
> Lancement d'une nouvelle version des pages de profil utilisateur afin de suivre le nombre de sessions réalisées et le nombre de calories brulées
> Développement des nouvelles pages en React

# Maquette Figma de l'attendu
## Page de connexion
- Adresse email / mot de passe
- Mot de passe oublié

## Tableau de bord
- Header
- Résumé utilisateur (nom/pseudo + Membre depuis ... + Nb kilomètres parcourus
- Dernières performances : distance par période / fréquence cardiaque par période
- Cette semaine : courses réalisées + durée activité + distance
- Footer

## Profil
- Résumé utilisateur (nom/pseudo + Membre depuis ...)
- Détails utilisateur : age / genre / taille / poids
- Statistiques : temps total couru / calories brulées / distance totale parcourue / nombre de jors de repos / nombre de sessions

# Informations techniques
- Refaire la page de profil avec React
- Implémenter une authentification
- Graphiques : Recharts
- Routing : Create React Router
- React Router : navigation, authentification
- Context API : gestion d'état globale
- Desktop seulement, à partir de 1024 * 768 px
- back end déjà disponible (NodeJS)
- Gestion des requêtes : 
    - utiliser Fetch ou Axios
    - calls à réaliser en dehors des composants React
    - créer un hook à part qui se charge de faire les calls
- Commencer par réaliser un mock de données de l'API
- Standardiser les données venant de l'API pour les formatter correctement avant de les utiliser
    - mocker les données
    - s'appuyer sur Postman. Postman Agent à utiliser pour faire des requêtes à un backend qui tourne en local

# Etapes
## Etape 1 : Initialisation du projet
x Mettre en place l'environnement de développement avec Create React Router

# Etape 2 : Découverte du back-end et mock des données
x Comprendre la structure de l'interface et créer le mock de données

x Installation du backend

x Utilisation de Postman

x Créer le fichier pour la gestion des données mockées

x Structurer les données pour utilisation avec les graphiques
    > Affichage des courbes : chaque x : {name:'S1', courbe1:valeur, courbe2:valeur}
    > Affichage du camembert : [ {name:'segment1', value:valeur}, {name:'segment2', value:valeur} ]

x Comparer aux maquettes Figma

# Etape 3 : Mettre en place React Router et l'authentification

x Fichier spécifique pour les routes de l'application

x Gestion des erreurs

> token peut être stocké dans cookie

# Etape 4 : Mise en place de Context API
> Identifier les données à partager entre composants

> Partage des données entre composants

> Ne pas surcharger le contexte avec les données non essentielles

# Etape 5 : Développer les graphiques avec Recharts
> Remplacement des données mockées par les appels à l'API réelle

> Le système d'authentification doit fonctionner

> Service dédié aux appels API

> Implémenter une gestion des erreurs

> Utiliser les états de chargement pour améliorer l'expérience utilisateur

