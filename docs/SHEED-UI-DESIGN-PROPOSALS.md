# SHEED - Propositions de Design UI/UX

> Généré par Gemini Pro le 2026-01-22 18:05

---

Absolument. En tant qu'expert en design UI/UX spécialisé dans les applications pour la Gen-Z et les applications de dating, je vais analyser en profondeur les documents fournis et vous proposer une vision de design détaillée et actionnable pour SHEED.

Mon approche se concentrera sur la création d'une expérience utilisateur addictive, ludique et visuellement distinctive, parfaitement alignée avec la "vibe coding" et la stack technique choisie (Expo/NativeWind).

---

## **Design System Global : "Dopamine & Neon"**

Ce système de design est conçu pour être flexible, vibrant et optimisé pour le mode sombre, très prisé par la Gen-Z. Il s'appuie sur des gradients, de la transparence et des micro-interactions satisfaisantes.

### **1. Palette de Couleurs**

Le thème principal est un mode sombre avec des accents néon. Il est à la fois premium et énergique.

| Rôle | Couleur | Hex Code | Utilisation (classes NativeWind) |
| :--- | :--- | :--- | :--- |
| **Fond Principal** | Noir Profond | `#101012` | `bg-neutral-950` |
| **Fond Surface** | Gris Foncé | `#1C1C1E` | `bg-neutral-900` |
| **Primaire (Gradient)** | Sheed Pink → Sheed Purple | `#FF3B7A` → `#9A3BFF` | `bg-gradient-to-br from-pink-500 to-purple-500` |
| **Accent / Succès** | Vert Néon | `#00F5A0` | `bg-green-400 text-green-400` |
| **En Attente** | Jaune Ambre | `#FFC700` | `bg-yellow-400 text-yellow-400` |
| **Texte Principal** | Blanc Cassé | `#F5F5F7` | `text-neutral-100` |
| **Texte Secondaire** | Gris Clair | `#8A8A8E` | `text-neutral-400` |
| **Bordure / Ligne** | Gris Discret | `#3A3A3C` | `border-neutral-700` |
| **Glassmorphism** | Transparent Foncé | `rgba(28, 28, 30, 0.7)` | `bg-neutral-900/70 backdrop-blur-xl` |

### **2. Typographie**

On choisit deux polices modernes et open-source, faciles à intégrer avec Expo.

- **Titres & Headlines : `Satoshi`** (Bold, Black) - Une police géométrique et moderne avec du caractère.
- **Corps & UI : `Inter`** (Regular, Medium, SemiBold) - Extrêmement lisible et versatile pour l'UI.

| Rôle | Font | Weight | Size (NativeWind) |
| :--- | :--- | :--- | :--- |
| **Titre H1** | Satoshi | Black | `text-4xl` (36px) |
| **Titre H2** | Satoshi | Bold | `text-2xl` (24px) |
| **Titre H3** | Satoshi | Bold | `text-xl` (20px) |
| **Corps (Large)** | Inter | Regular | `text-lg` (18px) |
| **Corps (Base)** | Inter | Regular | `text-base` (16px) |
| **Label / Métadonnées** | Inter | Medium | `text-sm` (14px) |
| **Bouton** | Inter | SemiBold | `text-base` (16px) |

### **3. Composants UI Clés**

- **Boutons :** Forme de pilule (`rounded-full`), avec le gradient primaire, une légère ombre portée de la couleur du gradient pour un effet "glow".
- **Cards :** Coins très arrondis (`rounded-3xl`), utilisant l'effet de `glassmorphism` pour se superposer au fond. Bordure fine et discrète.
- **Icônes :** Bibliothèque **Lucide Icons**. Style fin et moderne, taille par défaut `24px`.
- **Badges :** Petites pilules (`rounded-full`) avec un fond de couleur (jaune, vert) et un texte en majuscules.

---

## **Designs Détaillés des Écrans**

### **1. SPLASH SCREEN**

*   **Description du layout :** Écran complètement noir. Au centre, une animation rapide et percutante. Le but est de créer une identité forte dès la première seconde.
*   **Palette de couleurs :** Fond `#101012`. Animation utilisant le gradient Pink-to-Purple et le Vert Néon.
*   **Typographie :** Le mot-symbole "SHEED" apparaît à la fin de l'animation, en `Satoshi Black`, blanc.
*   **Composants UI clés :** Aucun. C'est purement une animation.
*   **Micro-interactions & animations :** (Durée totale : ~0.8s)
    1.  Une ligne violette trace un arc de cercle (l'arc 🏹).
    2.  Une ligne rose apparaît et se tend (la corde).
    3.  Un petit cœur (`<3`) vert néon apparaît sur la corde.
    4.  La corde se relâche, projetant le cœur vers le haut de l'écran avec une traînée scintillante.
    5.  Le mot "SHEED" fade-in au centre. Vibration haptique subtile (`light impact`) au moment du tir.
*   **Inspirations visuelles :** Animation de lancement de l'app Cash App (rapide, brandée), animation de "like" de TikTok.
*   **Particularités Gen-Z :** Animation ultra-rapide, satisfaisante, qui raconte l'histoire du produit en une fraction de seconde.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │                                     │
    │                                     │
    │                                     │
    │                                     │
    │          (Animation 🏹 + ❤️)        │
    │                                     │
    │              S H E E D              │
    │                                     │
    │                                     │
    │                                     │
    │                                     │
    └─────────────────────────────────────┘
    ```

---

### **2. ONBOARDING**

Un carrousel de 3 écrans full-screen, swipeable horizontalement, avec des indicateurs de page en bas.

#### **Écran 1 : Proposition de Valeur**

*   **Description du layout :** Texte centré et percutant. Un grand emoji ou une illustration stylisée pour renforcer le message.
*   **Palette de couleurs :** Fond noir. Texte principal blanc. Un mot-clé ("potes") est surligné avec le gradient primaire.
*   **Typographie :** `Satoshi Black`, `text-4xl`.
*   **Composants UI clés :** Indicateurs de page (3 petits points en bas).
*   **Micro-interactions & animations :** En arrivant sur l'écran, le texte et l'emoji "pop" légèrement (scale de 0.9 à 1.0).
*   **Inspirations visuelles :** Onboarding de Bumble (clair, centré sur la valeur).
*   **Particularités Gen-Z :** Langage direct, utilisation d'emoji, message centré sur l'action sociale plutôt que sur soi.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │                                     │
    │                  🏹                 │
    │                                     │
    │          Match tes <potes>,         │
    │            pas toi-même.            │
    │                                     │
    │                                     │
    │                                     │
    │                                     │
    │                ● ○ ○                │
    └─────────────────────────────────────┘
    ```

#### **Écran 2 : Social Logins (SSO)**

*   **Description du layout :** Titre en haut, suivi de deux gros boutons pour Apple et Google. En bas, un lien discret pour le login. Le focus est à 100% sur l'inscription rapide.
*   **Palette de couleurs :** Boutons sur fond `bg-neutral-900` avec une bordure `border-neutral-700`. Logos officiels Apple/Google en blanc.
*   **Typographie :** Titre en `Satoshi Bold`, `text-2xl`. Texte du bouton en `Inter SemiBold`.
*   **Composants UI clés :** Boutons SSO. Ils doivent être larges et faciles à taper.
*   **Micro-interactions & animations :** Au `press-in`, le bouton se scale légèrement (0.98) et sa bordure s'illumine avec le gradient primaire.
*   **Inspirations visuelles :** Écran de login de toutes les apps modernes (Hinge, BeReal).
*   **Particularités Gen-Z :** Pas d'option email/password visible par défaut. On assume que l'utilisateur veut la solution la plus rapide.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │                                     │
    │          Prêt à jouer Cupidon ?     │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │       Continuer avec Apple  │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │     G  Continuer avec Google │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │        Déjà un compte? Login        │
    │                ○ ● ○                │
    └─────────────────────────────────────┘
    ```

#### **Écran 3 : Permissions**

*   **Description du layout :** Centré sur deux blocs distincts, un pour les contacts, un pour les notifications. Chaque bloc a une icône, un titre et un texte explicatif court et convaincant. Un seul gros bouton CTA en bas.
*   **Palette de couleurs :** Icônes avec le gradient primaire. Texte explicatif en `text-neutral-400`.
*   **Typographie :** Titre de chaque bloc en `Inter SemiBold`.
*   **Composants UI clés :** Bouton CTA "Activer & Go ! 🚀".
*   **Micro-interactions & animations :** Quand l'utilisateur appuie sur le bouton, une animation de chargement rapide (spinner avec le gradient) s'affiche, puis l'app demande les permissions natives iOS/Android.
*   **Inspirations visuelles :** Demandes de permission de BeReal (explique la valeur avant de demander).
*   **Particularités Gen-Z :** Justification claire et fun des permissions. "Pour trouver qui matcher" et "Pour les notifications quand ça chauffe 🔥". L'emoji dans le bouton est essentiel.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │          Juste deux trucs...        │
    │                                     │
    │   👤  **Accès aux contacts**        │
    │   Pour trouver tes potes à sheeder. │
    │                                     │
    │   🔔  **Notifications**             │
    │   Pour savoir quand ça devient hot. │
    │                                     │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │      Activer & Go ! 🚀      │    │
    │  └─────────────────────────────┘    │
    │                ○ ○ ●                │
    └─────────────────────────────────────┘
    ```

---

### **3. HOME - ONGLET SHEEDS**

*   **Description du layout :** Un header avec le logo. En dessous, un `Segmented Control` (le toggle) qui reste fixe. La zone en dessous est une liste scrollable de `SheedCard`. Un `Floating Action Button` (FAB) est ancré en bas à droite.
*   **Palette de couleurs :** Toggle actif avec un fond blanc/pilule qui glisse, sur un fond `bg-neutral-900`. Cards en `glassmorphism`. FAB avec le gradient primaire.
*   **Typographie :** Texte du toggle en `Inter SemiBold`.
*   **Composants UI clés :**
    *   **Toggle "Mes Sheeds" / "Sheedé(e)" :** Une pilule `bg-neutral-800`. L'option active est couverte par une autre pilule `bg-neutral-100` avec texte noir, qui glisse avec une animation `spring`.
    *   **SheedCard :** `bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-3xl`. Contient :
        *   Haut : `AvatarGroup` (deux avatars qui se chevauchent) + `Emma ↔ Lucas`.
        *   Bas : Badge de statut (ex: `🟡 EN ATTENTE`) + métadonnées (`il y a 2h`).
        *   Si actif : une fine barre de progression `bg-green-400` pour les 10 messages.
    *   **FAB :** Un cercle `w-16 h-16` avec le gradient primaire et une icône `+` blanche à l'intérieur. Ombre portée pour le faire flotter.
*   **Micro-interactions & animations :**
    *   Le toggle a une animation `spring` très réactive.
    *   Le FAB "pulse" légèrement quand un nouveau Sheed est possible.
    *   En scrollant, les cards peuvent avoir un léger effet de parallaxe ou d'animation `fade-in-up`.
*   **Inspirations visuelles :** Listes de Hinge (propres), toggle de l'app Stocks d'iOS (satisfaisant).
*   **Particularités Gen-Z :** Le `glassmorphism` des cartes donne un look futuriste et premium. Le toggle qui glisse est beaucoup plus satisfaisant qu'un simple changement de couleur.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  [logo] SHEED                       │
    ├─────────────────────────────────────┤
    │  ┌───────────────┬───────────────┐  │
    │  │  MES SHEEDS   │   SHEEDÉ(E)   │  │
    │  └───────────────┴───────────────┘  │
    ├─────────────────────────────────────┤
    │  ┌─────────────────────────────┐    │
    │  │ 👥 Marie ↔ Thomas      (3)  │    │
    │  │ 🟢 ACTIF · ████████░░ 8/10  │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │ 👥 Emma ↔ Lucas             │    │
    │  │ 🟡 EN ATTENTE · il y a 2h   │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │                                ┌──┐ │
    │                                │ +  │ │
    │                                └──┘ │
    └─────────────────────────────────────┘
    ```

---

### **4. CRÉATION D'UN SHEED**

*   **Description du layout :** Un écran modal qui glisse depuis le bas. Header avec un titre et un bouton "Fermer". En dessous, deux grands cercles "placeholder" pour les deux personnes à choisir. En dessous, la liste de contacts scrollable avec une barre de recherche. Un bouton CTA est ancré en bas.
*   **Palette de couleurs :** Placeholders avec une bordure pointillée `border-dashed border-neutral-700`. Une fois sélectionné, l'avatar remplit le cercle. Le bouton CTA est désactivé (`bg-neutral-800`) jusqu'à ce que deux personnes soient choisies, puis il prend le gradient primaire.
*   **Typographie :** "Qui veux-tu sheeder ?" en `Satoshi Bold`.
*   **Composants UI clés :**
    *   **Contact Selectors :** `[Avatar/+] ↔ [Avatar/+]`.
    *   **Contact List Item :** Avatar + Nom. Un checkmark `✓` vert néon apparaît sur la droite lors de la sélection.
    *   **Message d'intro :** Un champ de texte `bg-neutral-900` apparaît une fois les deux personnes choisies, avec un placeholder fun : "Ajoute un ice-breaker pour eux... 😏".
*   **Micro-interactions & animations :**
    *   Quand on tape sur un contact, son avatar "vole" et s'insère dans le placeholder en haut. `Haptic feedback (heavy)`.
    *   Le bouton CTA s'illumine avec le gradient et se scale légèrement quand il devient actif.
    *   Lors du tap sur "SHEED LES !", une animation **Lottie** de confettis/étincelles explose depuis le bouton et remplit l'écran avant de transitionner.
*   **Inspirations visuelles :** Sélection de contacts pour un groupe iMessage/WhatsApp.
*   **Particularités Gen-Z :** Le flow est un jeu. On "collectionne" les deux personnes. L'animation de succès est la récompense. Le placeholder du message d'intro est engageant.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  ↓ Nouveau Sheed                    │
    ├─────────────────────────────────────┤
    │       (👤 Emma)   ↔   (👤 Lucas)    │
    │                                     │
    ├─────────────────────────────────────┤
    │ 💬 "Vous adorez tous les deux..."   │
    ├─────────────────────────────────────┤
    │  🔍 Rechercher un contact...        │
    │  ┌─────────────────────────────┐    │
    │  │ 👤 Chloé                    ✓ │    │
    │  └─────────────────────────────┘    │
    │  ... (liste) ...                    │
    │                                     │
    ├─────────────────────────────────────┤
    │  ┌─────────────────────────────┐    │
    │  │      SHEED LES ! 🏹         │    │
    │  └─────────────────────────────┘    │
    └─────────────────────────────────────┘
    ```

---

### **5. DÉTAIL D'UN SHEED (Vue Sheeder)**

*   **Description du layout :** Header avec back-button. En haut, une représentation visuelle du "triangle" : Avatar 1 --- 🏹 --- Avatar 2. En dessous, une carte de statut globale. Puis, 3 cartes cliquables : "Leur chat privé" et les deux chats individuels.
*   **Palette de couleurs :** Icône 🏹 avec le gradient. Carte "Leur chat privé" avec un fond différent, peut-être un `glassmorphism` plus prononcé et une icône 🔒 proéminente.
*   **Typographie :** Stats en `Inter SemiBold` pour les rendre percutantes.
*   **Composants UI clés :**
    *   **Header Visuel :** `[Avatar Emma] --- [Icône 🏹] --- [Avatar Lucas]`.
    *   **Carte Statut :** `🟢 ACTIF`, `23 messages échangés`, `🏆 Succès atteint !`.
    *   **Carte Chat Privé (non cliquable pour le contenu) :** `bg-neutral-900/50`. Affiche les métadonnées (`23 messages`, `Dernière activité: 5min`) mais une grosse icône 🔒 et le texte "Conversation privée" montrent clairement qu'on ne peut pas y entrer. Taper dessus pourrait afficher un petit pop-up expliquant la règle de confidentialité.
    *   **Cartes Chats Individuels :** Cartes standards qui naviguent vers les écrans de chat.
*   **Micro-interactions & animations :** Le compteur de messages s'anime à chaque nouveau message, comme un compteur de score.
*   **Inspirations visuelles :** Dashboards de stats de jeux vidéo, analytics simplifiés.
*   **Particularités Gen-Z :** Le Sheeder est un "manager" ou un "coach". L'UI lui donne les outils pour suivre le "jeu" sans tricher. C'est un poste d'observation.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  ← Emma ↔ Lucas                     │
    ├─────────────────────────────────────┤
    │    👤 (Emma) ───🏹─── 👤 (Lucas)     │
    │                                     │
    │             🏆 SUCCÈS !             │
    │          23 messages échangés       │
    ├─────────────────────────────────────┤
    │  ▼ Leur chat privé                  │
    │  ┌─────────────────────────────┐    │
    │  │ 🔒 Actif · 23 messages      │    │
    │  │    Dernière activité: 5min    │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │  ▼ Tes chats avec eux               │
    │  ┌─────────────────────────────┐    │
    │  │ 👤 Parler à Emma          (1) │    │
    │  └─────────────────────────────┘    │
    │  ┌─────────────────────────────┐    │
    │  │ 👤 Parler à Lucas             │    │
    │  └─────────────────────────────┘    │
    └─────────────────────────────────────┘
    ```

---

### **6. ONGLET CHATS**

*   **Description du layout :** Header simple "Conversations". Liste de conversations scrollable. Pas de fioritures, l'efficacité prime.
*   **Palette de couleurs :** Utilisation des icônes 🏹 et 💘 avec des couleurs distinctes (par ex. 🏹 en gradient primaire, 💘 en Vert Néon) pour une reconnaissance instantanée.
*   **Typographie :** Nom du chat en `Inter SemiBold`. Sous-titre contextuel en `Inter Regular` et `text-neutral-400`.
*   **Composants UI clés :**
    *   **Chat List Item :** `Avatar(s)` à gauche. Au centre, une pile de textes : `Nom du Chat` (ex: Emma & Lucas), `Contexte` (ex: `🏹 Sheedé par toi`), `Dernier message`. À droite : `Heure` et `Badge de non-lus` (un cercle avec le gradient primaire et le nombre de messages).
*   **Micro-interactions & animations :** Un nouveau message fait "bouncer" le badge de non-lus. Swiper à gauche sur un item révèle des actions (Archiver, Mute).
*   **Inspirations visuelles :** Onglet messages d'Instagram, Telegram.
*   **Particularités Gen-Z :** La distinction `🏹 / 💘` est LA feature clé. Elle doit être visuelle, peut-être même utiliser les emojis directement dans le sous-titre pour un impact maximal.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  Conversations                      │
    ├─────────────────────────────────────┤
    │  ┌─────────────────────────────┐    │
    │  │ 👥 Emma & Lucas          2min │    │
    │  │ 🏹 Sheedé par toi          (2) │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │ 👤 Emma                 15min │    │
    │  │ 🏹 Chat privé avec elle    (1) │    │
    │  └─────────────────────────────┘    │
    │                                     │
    │  ┌─────────────────────────────┐    │
    │  │ 💘 Toi & Marie              1h │    │
    │  │    Sheedé par Alex            │    │
    │  └─────────────────────────────┘    │
    └─────────────────────────────────────┘
    ```

---

### **7. CONVERSATION CHAT**

*   **Description du layout :** Header contextuel. Zone de chat scrollable. Input de texte fixe en bas.
*   **Palette de couleurs :** Bulles de l'utilisateur avec le gradient primaire. Bulles de l'autre en `bg-neutral-800`.
*   **Typographie :** Messages en `Inter Regular`, `text-base`.
*   **Composants UI clés :**
    *   **Header :** Avatar + Nom. En dessous, statut de présence (`🟢 En ligne` ou `Actif il y a 3h`).
    *   **Bulle de message :** `rounded-2xl`, sans "queue". Les bulles successives du même utilisateur ont des coins moins arrondis pour se coller.
    *   **Message d'intro du Sheeder :** Un type de bulle spécial, centré, avec une bordure `border-dashed` et une icône 🏹, pour le distinguer des messages normaux.
    *   **Input bar :** `bg-neutral-900`, `rounded-full`, avec une icône pour envoyer.
*   **Micro-interactions & animations :** Les nouvelles bulles de message apparaissent avec une petite animation de `fade-in-up`. Taper sur une bulle peut permettre de réagir avec un emoji (comme sur iMessage/Instagram).
*   **Inspirations visuelles :** Chats de Telegram (clean, rapide), réactions d'iMessage.
*   **Particularités Gen-Z :** Les bulles en gradient pour l'utilisateur renforcent son identité. Les réactions emoji sont un standard attendu.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  ← 👤 Emma  (🟢 En ligne)           │
    ├─────────────────────────────────────┤
    │      [ Salut ! Comment ça va ? ]    │
    │                                     │
    │ [ Super et toi ? 😄 ]               │
    │ [ C'est fou cette app ]             │
    │                                     │
    │                                     │
    │                                     │
    │                                     │
    │                                     │
    ├─────────────────────────────────────┤
    │  ( Message...                 ) [>] │
    └─────────────────────────────────────┘
    ```

---

### **8. PROFIL & STATS**

*   **Description du layout :** Layout vertical simple. Grosse zone pour l'avatar et le nom d'utilisateur. Section "Stats" proéminente. Puis une section "Classement" et enfin une liste pour les paramètres.
*   **Palette de couleurs :** Stats avec les couleurs d'accent (Vert, Jaune). Le classement peut utiliser une couleur bronze/argent/or subtile.
*   **Typographie :** Chiffres des stats en `Satoshi Black`, `text-3xl`. Labels en `Inter Medium`.
*   **Composants UI clés :**
    *   **Avatar :** Grand cercle (`w-24 h-24`), avec un anneau de gradient autour si l'utilisateur est un "Top Sheeder".
    *   **Cartes de Stats :** Trois cartes `glassmorphism` côte à côte. `[12] Sheeds créés`, `[8] Réussis`, `[67%] Taux de succès`. Le pourcentage utilise le Vert Néon.
    *   **Carte Classement :** `🏆 #23 parmi tes amis`. Taper dessus pourrait ouvrir un leaderboard complet.
    *   **Liste de Settings :** Items de liste classiques avec `Icône` > `Label` > `>`.
*   **Micro-interactions & animations :** Les chiffres des stats s'animent et comptent jusqu'à leur valeur quand l'écran se charge.
*   **Inspirations visuelles :** Profils de jeux mobiles, écran de stats de Spotify Wrapped.
*   **Particularités Gen-Z :** La gamification est au cœur. Les stats et le classement sont mis en avant pour créer un sentiment de compétition et de réputation sociale. C'est le "score" du jeu de Cupidon.
*   **Wireframe ASCII :**
    ```
    ┌─────────────────────────────────────┐
    │  Mon Profil                         │
    ├─────────────────────────────────────┤
    │             (  👤  )               │
    │              @jerome                │
    ├─────────────────────────────────────┤
    │  🏆 STATS SHEEDER                   │
    │  ┌─────────┐ ┌─────────┐ ┌────────┐ │
    │  │   12    │ │    8    │ │  67%   │ │
    │  │ Sheeds  │ │ Réussis │ │ Succès │ │
    │  └─────────┘ └─────────┘ └────────┘ │
    ├─────────────────────────────────────┤
    │  🎯 CLASSEMENT                      │
    │  #23 parmi tes amis                 │
    ├─────────────────────────────────────┤
    │  ⚙️ Paramètres                      │
    │  🔔 Notifications                   │
    │  🚫 Comptes bloqués                 │
    └─────────────────────────────────────┘
    ```