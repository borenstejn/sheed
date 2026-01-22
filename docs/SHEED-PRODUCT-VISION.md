# SHEED - Vision Produit & Technique Complète

> Document de référence pour le développement de SHEED
> Créé le 22 janvier 2026

---

## Table des Matières

1. [Essence du Produit](#1-essence-du-produit)
2. [Vision UX/UI Mobile-First](#2-vision-uxui-mobile-first)
3. [Mécaniques Inspirées des Apps de Dating](#3-mécaniques-inspirées-des-apps-de-dating)
4. [Stack Technique Recommandée](#4-stack-technique-recommandée)
5. [Structure du Projet](#5-structure-du-projet)
6. [Prochaines Étapes](#6-prochaines-étapes)

---

## 1. Essence du Produit

### 1.1 La Vision

**SHEED transforme chaque utilisateur en Cupidon moderne.** Inspiré du mot hébreu "shidour" (l'art du matchmaking), c'est une app où tu ne cherches pas l'amour pour toi — tu le crées pour les autres.

**Pitch** : "SHEED turns you into a modern Cupid, letting you connect two of your contacts—friends, crushes, or random sparks—using their email or phone. Once Sheeded, they chat in a private room while you vibe with each of them separately."

### 1.2 Le Problème Résolu

La Gen-Z adore connecter les gens, mais il n'existe pas d'outil dédié pour ça. Les apps de dating sont égocentrées. SHEED inverse le paradigme : **tu es le héros qui fait matcher les autres**.

### 1.3 Le Concept Central : Le "Sheed"

Un **Sheed** = un acte de matchmaking. Quand tu "Sheedes" deux personnes :

1. **Une chatroom privée** se crée entre les deux matchés
2. **Deux chats séparés** te connectent à chacun d'eux individuellement

Tu restes impliqué sans être intrusif. Tu peux hype chacun séparément pendant qu'ils font connaissance entre eux.

### 1.4 Les Rôles Duaux

Chaque utilisateur vit **deux expériences** :

- **"Mes Sheeds"** — Là où tu joues le Cupidon (Sheeder)
- **"Je suis Sheedé"** — Là où quelqu'un t'a matché avec une autre personne

Tu peux être matchmaker ET être matché. C'est un écosystème bidirectionnel.

### 1.5 La Mécanique des Chatrooms

Chaque Sheed crée **jusqu'à 3 chatrooms** :

| Chatroom | Description | Qui peut voir |
|----------|-------------|---------------|
| **Sheed Chatroom** | Chat privé entre les 2 matchés | Seulement les 2 matchés |
| **Sheeder ↔ User 1** | Chat privé Sheeder/Personne 1 | Sheeder + Personne 1 |
| **Sheeder ↔ User 2** | Chat privé Sheeder/Personne 2 | Sheeder + Personne 2 |

**Point clé sur la privacy** : Le Sheeder ne peut PAS lire le contenu du chat entre les deux matchés. Il voit uniquement :
- Nombre de messages échangés
- Dernière activité (timestamp)
- Status (actif/inactif)
- Si le seuil des 10 messages est atteint (succès)

### 1.6 Règle Importante : Sheeds Multiples

Si **plusieurs Sheeders** matchent le même duo, ils partagent la même chatroom principale du couple — mais chaque Sheeder garde ses conversations privées avec chaque personne. Ça crée un réseau social imbriqué.

### 1.7 La Gamification

- Un Sheed est **"réussi"** après 10+ messages entre les deux matchés
- Stats de Sheeder : nombre de Sheeds, taux de succès
- Leaderboards et réputation
- Feedback anonyme des personnes matchées

### 1.8 Ce que SHEED N'EST PAS

| SHEED n'est pas... | Parce que... |
|--------------------|--------------|
| Une app de dating | Tu ne cherches pas pour toi |
| Un réseau social | Focus sur le matchmaking uniquement |
| Une app de group chat | Conversations 1-on-1 et 1-to-2 uniquement |

### 1.9 Ce que SHEED EST

- Un jeu de matchmaking pour Gen-Z
- Un outil pour activer ton réseau et jouer les Cupidons
- Un système de réputation sociale ("Je suis un bon matchmaker")
- Une version moderne de la tradition du shidour

---

## 2. Vision UX/UI Mobile-First

### 2.1 Principes Directeurs

| Inspiration | Ce qu'on prend |
|-------------|----------------|
| **Tinder** | Gestes swipe, rapidité, feedback satisfaisant |
| **Bumble** | Onboarding fluide, organisation claire |
| **Hinge** | Prompts/icebreakers, design épuré |
| **BeReal** | Notification push unique, FOMO viral |

**Ce qui différencie SHEED** :
- Tu agis pour les autres, pas pour toi
- Double casquette : Sheeder ET Sheedé
- Relation triangulaire (toi + 2 personnes)

### 2.2 Onboarding (3 écrans max)

```
┌─────────────────────────┐
│                         │
│    🏹 SHEED             │
│                         │
│  "Match tes potes,      │
│   pas toi-même"         │
│                         │
│  ┌─────────────────┐    │
│  │ 🍎 Continue w/  │    │
│  │    Apple        │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ 🔵 Continue w/  │    │
│  │    Google       │    │
│  └─────────────────┘    │
│                         │
│  Déjà un compte? Login  │
│                         │
└─────────────────────────┘
```

**Flow** :
1. **Splash** → Animation coeur + flèche (0.5s)
2. **SSO** → Apple/Google (1 tap)
3. **Permissions** → Contacts + Notifications (2 taps)
4. **Done** → Home

**Règle : 30 secondes max pour être dans l'app.**

### 2.3 Navigation Principale (3 onglets)

```
┌─────────────────────────────────────┐
│                                     │
│         [CONTENU ÉCRAN]             │
│                                     │
├─────────────────────────────────────┤
│   🏹          💬          👤        │
│  Sheeds      Chats      Profil      │
│   (2)         (5)                   │
└─────────────────────────────────────┘
```

| Onglet | Fonction |
|--------|----------|
| **🏹 Sheeds** | Toggle "Mes Sheeds" / "Sheedé(e)" |
| **💬 Chats** | Toutes les conversations actives |
| **👤 Profil** | Stats, settings, réputation |

### 2.4 Écran Sheeds

**Toggle en haut pour switcher de rôle** :

```
┌─────────────────────────────────────┐
│  ┌───────────────┬───────────────┐  │
│  │  MES SHEEDS   │   SHEEDÉ(E)   │  │
│  │    (actif)    │               │  │
│  └───────────────┴───────────────┘  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🟡 Emma ↔ Lucas             │    │
│  │ En attente · il y a 2h      │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🟢 Marie ↔ Thomas      (3)  │    │
│  │ Actif · 23 messages         │    │
│  └─────────────────────────────┘    │
│                                     │
│                          ┌────┐     │
│                          │ +  │     │
│                          └────┘     │
│                           FAB       │
└─────────────────────────────────────┘
```

**Codes couleur status** :
- 🟡 Jaune = En attente
- 🟢 Vert = Actif
- ⚪ Gris = Passé/Expiré

### 2.5 Création d'un Sheed (3 taps)

**Flow** :
1. **Tap 1** : Sélectionne personne 1 → checkmark vert
2. **Tap 2** : Sélectionne personne 2 → checkmark vert
3. **Tap 3** : Bouton "Sheed les ! 🏹"

```
┌─────────────────────────────────────┐
│  ← Nouveau Sheed                    │
├─────────────────────────────────────┤
│  ┌──────────┐    ┌──────────┐       │
│  │  👤      │ ↔  │  👤      │       │
│  │  Emma    │    │  Lucas   │       │
│  │    ✓     │    │    ✓     │       │
│  └──────────┘    └──────────┘       │
│                                     │
│  [Liste contacts...]                │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │      SHEED LES ! 🏹         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Feedback** :
- Vibration haptic au tap
- Animation confetti/sparkle au "Sheed les !"
- Transition vers le détail du Sheed créé

### 2.6 Écran Chats (Unifié)

Toutes les conversations au même endroit :

```
┌─────────────────────────────────────┐
│  Conversations                      │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │ 👤👤 Emma & Lucas      (2)  │    │
│  │ 🏹 Tu les as sheedé         │    │
│  │ "Haha trop bien!"  · 2min   │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 👤 Emma                (1)  │    │
│  │ 🏹 Chat privé sheeder       │    │
│  │ "Alors, des news?" · 15min  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 👤👤 Toi & Marie            │    │
│  │ 💘 Alex t'a sheedé          │    │
│  │ "Salut ! :)" · 1h           │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Distinction visuelle** :
- 🏹 = Tu es Sheeder (tu as créé)
- 💘 = Tu es Sheedé (quelqu'un t'a matché)

### 2.7 Détail d'un Sheed (Vue Sheeder)

```
┌─────────────────────────────────────┐
│  ←                            ⋮     │
├─────────────────────────────────────┤
│       👤 ──────🏹────── 👤          │
│      Emma              Lucas        │
│                                     │
│      🟢 ACTIF                       │
│      23 messages échangés           │
│      Créé il y a 3 jours            │
├─────────────────────────────────────┤
│  Leur chat privé                    │
│  ┌─────────────────────────────┐    │
│  │ 🟢 Actif · 23 messages      │    │
│  │ Dernière activité: 5min     │    │
│  │ 🔒 Conversation privée      │    │
│  └─────────────────────────────┘    │
│                                     │
│  Tes chats avec eux                 │
│  ┌─────────────────────────────┐    │
│  │ 👤 Emma              (1)    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 👤 Lucas                    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 2.8 Profil & Stats

```
┌─────────────────────────────────────┐
│  Mon Profil                         │
├─────────────────────────────────────┤
│         ┌─────────┐                 │
│         │  👤     │                 │
│         │ Photo   │                 │
│         └─────────┘                 │
│         @jerome                     │
├─────────────────────────────────────┤
│  🏆 STATS SHEEDER                   │
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │   12    │ │    8    │ │  67%   │ │
│  │ Sheeds  │ │ Réussis │ │ Taux   │ │
│  │ créés   │ │  (10+)  │ │success │ │
│  └─────────┘ └─────────┘ └────────┘ │
│                                     │
│  🎯 CLASSEMENT                      │
│  #23 parmi tes amis                 │
├─────────────────────────────────────┤
│  ⚙️ Paramètres                      │
│  🔔 Notifications                   │
│  🚫 Comptes bloqués                 │
│  ❓ Aide                            │
│  🚪 Déconnexion                     │
└─────────────────────────────────────┘
```

### 2.9 Notifications Push (Stratégie)

| Événement | Message | Priorité |
|-----------|---------|----------|
| Quelqu'un t'a sheedé | "🏹 Alex pense que tu matcherais avec quelqu'un..." | Haute |
| Les 2 ont accepté | "🎉 Emma & Lucas sont connectés grâce à toi !" | Haute |
| 10 messages atteints | "🏆 Ton sheed Emma↔Lucas est un succès !" | Medium |
| Message reçu | "💬 Emma: Salut !" | Standard |
| Sheed expirant | "⏰ Lucas n'a pas encore répondu..." | Basse |

### 2.10 Micro-Interactions & Animations

| Action | Feedback |
|--------|----------|
| Créer un Sheed | Confetti + vibration |
| Sheed accepté | Coeurs qui montent |
| Nouveau message | Badge bounce |
| 10 messages atteints | Trophée animation |
| Swipe pour archiver | Slide + fade |

---

## 3. Mécaniques Inspirées des Apps de Dating

### 3.1 Contexte

Une étude approfondie des apps de dating "chat-first" (Jigsaw, S'More, Lex, Pure, Blindlee, Schmooze, Hinge) a été réalisée. SHEED est fondamentalement différent car **on ne cherche pas des inconnus, on connecte des gens qu'on connaît**. Mais plusieurs mécaniques sont transférables.

### 3.2 Les 5 Mécaniques à Intégrer

#### 3.2.1 Message d'Intro du Sheeder (Inspiré de Hinge)

**Problème** : Les sheedés peuvent galérer à démarrer la conversation.

**Solution** : Le Sheeder écrit un message d'introduction visible par les deux :

```
┌─────────────────────────────────────┐
│         💌 Message du Sheeder       │
│                                     │
│  "Vous avez tous les deux le même   │
│   humour douteux, je vous laisse    │
│   découvrir lequel 😏"              │
│                                     │
│              — Alex                 │
└─────────────────────────────────────┘
```

#### 3.2.2 Badge "Your Turn" (Inspiré de Hinge)

Indique visuellement à qui c'est le tour de répondre :

```
┌─────────────────────────────────────┐
│ 👤👤 Emma & Lucas                   │
│                                     │
│ 🔴 À ton tour · Emma attend         │
│ Dernier message: il y a 2h          │
└─────────────────────────────────────┘
```

**Effet** : Obligation sociale subtile, réduit le ghosting.

#### 3.2.3 Urgence Temporelle (Inspiré de Pure, Bumble)

**7 jours pour accepter un Sheed**, sinon il expire :

```
┌─────────────────────────────────────┐
│ 🏹 Alex t'a sheedé avec quelqu'un   │
│                                     │
│ ██████████░░░░ 4 jours restants     │
│                                     │
│  [ Voir qui ]  [ Passer ]           │
└─────────────────────────────────────┘
```

Notifications progressives : J+1, J+3, J+6.

#### 3.2.4 Indicateur de Présence (Inspiré de Pure)

Savoir si l'autre est en ligne encourage les réponses :

```
│ 👤 Emma                             │
│ 🟢 En ligne maintenant              │

│ 👤 Lucas                            │
│ ⚫ Actif il y a 3h                  │
```

#### 3.2.5 Barre de Progression (Gamification)

Progression vers les 10 messages = succès :

```
┌─────────────────────────────────────┐
│  🏹 Sheed Emma ↔ Lucas              │
│                                     │
│  ████████░░ 8/10 messages           │
│  Plus que 2 pour un succès !        │
└─────────────────────────────────────┘
```

### 3.3 Ce qui NE S'APPLIQUE PAS à SHEED

| Mécanique | Pourquoi non pertinent |
|-----------|------------------------|
| Révélation progressive des photos | Les gens se connaissent déjà |
| Matching par personnalité/algorithme | Le Sheeder décide, pas l'algo |
| Slow dating / friction positive | On veut de la rapidité |
| Anti-superficialité | Pas de swipe, pas de jugement visuel |
| Vérification anti-catfish | Contacts réels du téléphone |

---

## 4. Stack Technique Recommandée

### 4.1 Critères de Choix

| Critère | Implication |
|---------|-------------|
| **Vibe coding** | IA comprend bien, peu de boilerplate, feedback instantané |
| **Design modifiable** | Pas de design system rigide, theming facile |
| **Mobile-first** | Performance native, gestures fluides, push notifications |
| **SHEED spécifique** | Chat real-time, relations complexes (user↔sheed↔chatroom) |

### 4.2 Stack Finale

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   📱 FRONTEND                                           │
│   ─────────────────────────────────────────────────     │
│   Expo SDK 52         → Runtime React Native            │
│   Expo Router         → Navigation file-based           │
│   NativeWind v4       → Tailwind (design flexible)      │
│   Zustand             → State local (minimal)           │
│   TanStack Query      → Cache & data fetching           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ☁️ BACKEND (Serverless)                               │
│   ─────────────────────────────────────────────────     │
│   Supabase Database   → PostgreSQL (relations)          │
│   Supabase Auth       → Google, Apple, Phone            │
│   Supabase Realtime   → WebSockets (chat)               │
│   Supabase Storage    → Photos de profil                │
│   Supabase Edge Func  → Logique métier (invitations)    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   🛠️ TOOLING                                            │
│   ─────────────────────────────────────────────────     │
│   TypeScript          → Type safety partout             │
│   Expo EAS            → Build iOS/Android               │
│   Expo Updates        → OTA updates (sans App Store)    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.3 Pourquoi Expo + Supabase ?

| Aspect | Raison |
|--------|--------|
| **Relations complexes** | SHEED a des relations User ↔ Sheed ↔ Chatroom ↔ Message. PostgreSQL gère ça proprement |
| **Row Level Security** | "Le Sheeder ne peut pas lire le chat des sheedés" → Une ligne de SQL |
| **Auth complet** | Google, Apple, SMS — tout intégré |
| **Realtime suffisant** | Pour du chat, Supabase Realtime fonctionne bien |
| **IA-friendly** | Claude, GPT, Copilot connaissent tous Supabase |
| **Open source** | Pas de vendor lock-in absolu |

### 4.4 Pourquoi PAS de Backend Custom ?

| Avec backend custom | Avec Supabase seul |
|---------------------|-------------------|
| 2 codebases à maintenir | 1 seule codebase |
| Déploiement backend + mobile | Déploiement mobile seulement |
| Auth à implémenter | Auth clé-en-main |
| WebSockets à gérer | Realtime intégré |
| Plus de bugs possibles | Moins de surface d'erreur |

**Pour vibe coding, moins de code = mieux.**

### 4.5 Technologies Évitées

| Tech | Pourquoi pas |
|------|--------------|
| **React Native Paper** | Material Design imposé, dur à customiser |
| **UI Kitten** | Design system Eva, trop rigide |
| **Redux** | Trop de boilerplate |
| **React Navigation seul** | Plus de config qu'Expo Router |
| **Flutter** | Dart ≠ écosystème JS, IA moins efficace |
| **Firebase** | NoSQL = relations complexes difficiles |

### 4.6 NativeWind pour le Design Flexible

```tsx
// tailwind.config.js - Changer le thème ici
module.exports = {
  theme: {
    extend: {
      colors: {
        sheed: {
          pink: '#FF6B9D',
          purple: '#9B59B6',
          blue: '#3498DB',
        }
      }
    }
  }
}

// Utilisation dans les composants
<View className="bg-sheed-pink rounded-2xl p-4">
  <Text className="text-white font-bold">
    Sheed les ! 🏹
  </Text>
</View>
```

**Modifier le design = modifier des classes. Pas de fichiers de style séparés.**

---

## 5. Structure du Projet

### 5.1 Architecture des Dossiers

```
sheed/
├── app/                      # Expo Router screens
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── onboarding.tsx
│   ├── (main)/
│   │   ├── (tabs)/
│   │   │   ├── sheeds.tsx
│   │   │   ├── chats.tsx
│   │   │   └── profile.tsx
│   │   ├── sheed/[id].tsx
│   │   └── chat/[id].tsx
│   └── _layout.tsx
├── components/               # Composants réutilisables
│   ├── Button.tsx
│   ├── SheedCard.tsx
│   ├── ChatBubble.tsx
│   ├── Avatar.tsx
│   └── ProgressBar.tsx
├── hooks/                    # Custom hooks
│   ├── useAuth.ts
│   ├── useSheeds.ts
│   ├── useChat.ts
│   └── useContacts.ts
├── stores/                   # Zustand stores
│   ├── authStore.ts
│   └── chatStore.ts
├── lib/                      # Utils, API client
│   ├── supabase.ts
│   └── utils.ts
├── supabase/
│   ├── migrations/           # Schema SQL
│   └── functions/            # Edge Functions
├── tailwind.config.js
├── app.json
└── package.json
```

### 5.2 Un Seul Repo

Pas de monorepo complexe. Un seul repo avec :
- Code mobile (Expo)
- Migrations Supabase
- Edge Functions

---

## 6. Prochaines Étapes

### 6.1 Phase 1 : Setup

1. Créer le projet Expo avec Expo Router
2. Configurer NativeWind (Tailwind)
3. Créer le projet Supabase
4. Configurer l'authentification (Google, Apple)

### 6.2 Phase 2 : Core Features

1. Schéma de base de données (users, sheeds, chatrooms, messages)
2. Écran de login/onboarding
3. Écran Sheeds (liste + création)
4. Écran Chats (liste + conversation)

### 6.3 Phase 3 : Polish

1. Notifications push
2. Animations et micro-interactions
3. Gamification (stats, progression)
4. Tests et optimisation

---

## Annexe : Schéma Relationnel Simplifié

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   USERS     │       │   SHEEDS    │       │  CHATROOMS  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │◄──────│ sheeder_id  │       │ id          │
│ email       │       │ user1_id    │──────►│ sheed_id    │
│ phone       │       │ user2_id    │       │ type        │
│ name        │       │ status      │       │ (sheed/     │
│ avatar_url  │       │ created_at  │       │  sheeder1/  │
└─────────────┘       │ intro_msg   │       │  sheeder2)  │
                      └─────────────┘       └─────────────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │  MESSAGES   │
                                            ├─────────────┤
                                            │ id          │
                                            │ chatroom_id │
                                            │ sender_id   │
                                            │ content     │
                                            │ created_at  │
                                            └─────────────┘
```

---

*Document généré le 22 janvier 2026*
*Pour toute question, consulter ce document comme référence principale.*
