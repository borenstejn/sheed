# SHEED — Product Requirements Document (MVP)

## 1. Vision

**Côté Sheeder** : "Tu dis toujours qu'ils iraient bien ensemble. Prouve-le."
**Côté Sheedé** : "Ce n'est pas l'algo qui fait le match, mais ceux qui te connaissent vraiment."

SHEED transforme une intention sociale qui reste souvent au stade de la parole — "j'aimerais trop te présenter quelqu'un" — en une action concrète réalisable en 30 secondes.

## 2. Problème

Tout le monde a déjà pensé "ces deux-là iraient trop bien ensemble" sans jamais passer à l'acte. Pourquoi ? Parce que c'est gênant, compliqué à organiser, et que personne ne veut prendre la responsabilité si ça ne marche pas.

SHEED supprime ces frictions : c'est anonyme, instantané, et ludique.

## 3. Cible MVP

**Segment principal** : 25-35 ans, actifs, sociaux, qui ont des cercles d'amis étendus. Ils font des introductions sérieuses et crédibles.

**Segment secondaire (expansion naturelle)** : 18-25 ans, étudiants, plus viraux mais plus de "canulars".

On démarre par les 25-35 pour la qualité, la viralité descend naturellement vers les plus jeunes.

## 4. Positionnement

**Angle d'attaque MVP** : romantique. C'est le plus viral. L'amical et le business viendront après.

Le sheeder contrôle le curseur d'ambiguïté et de confidentialité de chaque introduction.

## 5. Concepts clés

| Terme | Définition |
|-------|-----------|
| **Sheeder** | Celui qui crée l'introduction entre deux personnes |
| **Sheedé(e)** | Personne présentée à une autre par le sheeder |
| **Sheed** | L'acte d'introduction lui-même (le match créé) |
| **Révélation** | Moment où les sheedés découvrent qui les a présentés |

## 6. User flows MVP

### 6.1. Créer un sheed (Sheeder)

1. Ouvre l'app
2. Tape "+" (nouveau sheed)
3. Choisit le contact 1 depuis son répertoire
4. Choisit le contact 2 depuis son répertoire
5. Confirme
6. SHEED envoie un lien à chaque sheedé (SMS ou lien partageable WhatsApp/iMessage)
7. C'est fait. 30 secondes.

**MVP = deux contacts et go.** Pas de message, pas de catégorie, pas de contexte. Le plus simple possible.

**Enrichissements post-MVP** : message d'introduction, raison/contexte ("Vous êtes tous les deux fans de plongée"), type (romantique/amical/business), niveau de confidentialité.

### 6.2. Recevoir un sheed (Sheedé)

1. Reçoit un lien via SMS/WhatsApp/iMessage : "Quelqu'un pense que tu devrais rencontrer quelqu'un 😏"
2. Clique sur le lien
3. Arrive directement dans une conversation — **zéro friction, pas d'inscription pour commencer à discuter**
4. L'inscription/connexion vient après, quand le sheedé est déjà engagé dans la conversation
5. S'il ne veut pas → refuse, c'est fini

### 6.3. La conversation

Trois canaux de chat possibles autour d'un même sheed :

| Canal | Participants | But |
|-------|-------------|-----|
| **Le date** | Sheedé 1 ↔ Sheedé 2 | La conversation principale |
| **Coulisses 1** | Sheeder ↔ Sheedé 1 | Encourager, conseiller |
| **Coulisses 2** | Sheeder ↔ Sheedé 2 | Encourager, conseiller |

Le sheeder voit un **compteur/statut** de la conversation principale (nombre de messages, activité) mais **ne peut PAS lire les messages** entre les sheedés.

### 6.4. La révélation

Après X messages échangés entre les sheedés, l'identité du sheeder est révélée. Ce seuil sert de mécanisme d'engagement : ça donne envie de continuer à discuter pour découvrir qui a joué les cupidons.

> Ce paramètre (nombre de messages avant révélation) sera ajustable au fil des itérations.

## 7. Gamification du Sheeder

Le sheeder est le héros du produit. Il revient parce que c'est fun et gratifiant :

- **Stats perso** : X sheeds créés, X% acceptés, X conversations actives
- **Score / classement** : "Top matchmaker de ton cercle"
- **Badges / achievements** : "Premier sheed", "5 sheeds actifs en même temps", "10 succès"
- **Plaisir simple** : voir en temps réel que ses amis discutent grâce à lui

Le "succès" d'un sheed n'est pas un statut formel. C'est un **indicateur fun** pour gamifier l'expérience du sheeder, pas une pression sur les sheedés.

## 8. Mécanique virale

Chaque sheed créé = potentiellement **2 nouveaux utilisateurs** acquis organiquement.

```
1 sheeder → 2 sheedés → chaque sheedé devient potentiellement sheeder → 2 nouveaux sheedés → ...
```

La boucle virale est le cœur du produit. **Rien ne doit la freiner.**

- Pas de paywall
- Pas de limite de sheeds
- Onboarding du sheedé = zéro friction (discussion d'abord, inscription après)
- Le lien partagé doit donner envie de cliquer

## 9. Monétisation

**MVP = gratuit total.** La viralité prime sur la rentabilité court terme.

On ne freine pas la croissance pour monétiser. La monétisation viendra quand la base utilisateurs le justifie.

## 10. Modération & Sécurité

**MVP minimal** :
- Un sheedé peut refuser une introduction → c'est fini, pas de relance
- Blocage basique d'un utilisateur

**Post-MVP** :
- Anti-harcèlement (empêcher de re-sheed les mêmes personnes après un refus)
- Détection de faux profils / spam
- Signalement de contenu

## 11. Métriques de succès

| Métrique | Ce qu'elle mesure |
|----------|------------------|
| **Sheeds créés / jour** | Adoption des sheeders |
| **Taux de clic sur le lien** | Qualité de l'accroche d'invitation |
| **Taux de double-acceptation** | Pertinence des introductions |
| **Messages échangés / sheed** | Engagement des sheedés |
| **Sheedé → Sheeder conversion** | Boucle virale |
| **Rétention J7 / J30 du sheeder** | Valeur long terme |

## 12. Ce qui est IN vs OUT du MVP

### IN (jour 1)

- Création de sheed en 2 taps (2 contacts, go)
- Envoi de lien d'invitation (SMS / lien partageable)
- Arrivée du sheedé sans inscription (zéro friction)
- Chat intégré (date + coulisses sheeder)
- Accepter / refuser un sheed
- Statut et compteur pour le sheeder
- Révélation du sheeder après X messages
- Stats basiques du sheeder
- Auth OAuth (Google / Apple)
- Dark mode

### OUT (post-MVP)

- Message d'introduction personnalisé
- Type de sheed (romantique / amical / business)
- Niveau de confidentialité configurable
- Badges et achievements
- Classement entre sheeders
- Modération avancée
- Notifications push
- Monétisation
- Support web complet
