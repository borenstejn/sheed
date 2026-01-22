# SHEED - Options de Stack Technique

> Document pour review par un LLM externe
> Créé le 22 janvier 2026

---

## Contexte du Projet

### Le Produit : SHEED

SHEED est une app mobile de matchmaking où les utilisateurs ("Sheeders") connectent deux de leurs contacts. Les personnes matchées ("Sheedés") chattent entre eux dans une room privée, tandis que le Sheeder maintient des conversations séparées avec chacun.

### Caractéristiques Techniques Clés

- **Chat real-time** entre les sheedés
- **Relations complexes** : User ↔ Sheed ↔ Chatroom ↔ Message
- **Privacy** : Le Sheeder ne peut pas lire le chat des sheedés (seulement voir l'activité)
- **Auth** : Google, Apple, Phone/SMS
- **Notifications push**
- **Accès aux contacts du téléphone**

### Contraintes de Développement

| Contrainte | Description |
|------------|-------------|
| **Vibe coding** | Développement rapide assisté par IA (Claude, GPT). Le code doit être simple, bien documenté, avec des patterns connus |
| **Design non finalisé** | L'UI/UX doit être facilement modifiable sans refactoring majeur |
| **Mobile-first** | iOS et Android, pas de web pour le MVP |
| **Solo developer** | Une seule personne qui code, pas d'équipe |
| **Budget limité** | Préférence pour les services avec free tier généreux |

---

## Options de Framework Mobile

### Option A : Expo (React Native)

```
Expo SDK 52+ avec Expo Router
```

| Avantages | Inconvénients |
|-----------|---------------|
| Zero config pour démarrer | Limité pour certains modules natifs très spécifiques |
| Preview instantané sur téléphone via QR code | APK/IPA légèrement plus gros (~10-20MB de plus) |
| OTA updates (push sans App Store) | Dépendance à l'écosystème Expo |
| EAS Build pour iOS/Android (cloud builds) | |
| Énorme communauté, très bien documenté | |
| IA (Claude, GPT) génère du code Expo très bien | |
| TypeScript natif | |
| Expo Router = navigation file-based simple | |

**Maturité** : Très mature, utilisé en production par des apps majeures
**Learning curve** : Faible si on connaît React

### Option B : React Native CLI (sans Expo)

```
React Native 0.73+ avec React Navigation
```

| Avantages | Inconvénients |
|-----------|---------------|
| Contrôle total sur le code natif | Configuration complexe (Xcode, Android Studio) |
| Pas de limitations Expo | Pas d'OTA updates natif |
| Légèrement plus performant (marginal) | Plus de boilerplate |
| | Builds locaux nécessaires (Mac obligatoire pour iOS) |
| | Plus de maintenance |

**Maturité** : Très mature
**Learning curve** : Moyenne à élevée

### Option C : Flutter

```
Flutter 3.x avec Dart
```

| Avantages | Inconvénients |
|-----------|---------------|
| UI très customisable, animations fluides | Dart ≠ JavaScript (écosystème différent) |
| Hot reload excellent | IA moins performante sur Dart que sur JS/TS |
| Une seule codebase très cohérente | Intégrations JS (Supabase, etc.) moins directes |
| Material & Cupertino widgets inclus | Communauté plus petite que React Native |
| Performance native | Taille des apps plus grande |

**Maturité** : Mature, supporté par Google
**Learning curve** : Moyenne (apprendre Dart)

### Option D : Kotlin Multiplatform + Compose

```
Kotlin Multiplatform Mobile (KMM) avec Jetpack Compose
```

| Avantages | Inconvénients |
|-----------|---------------|
| Code partagé avec Android natif | Encore jeune pour iOS |
| Performance optimale | Écosystème limité |
| Typage fort | Peu de ressources IA |
| | Courbe d'apprentissage élevée |

**Maturité** : En développement actif, pas encore mainstream
**Learning curve** : Élevée

### Recommandation Initiale : Expo

**Raison principale** : Vibe coding friendly. L'IA génère du code Expo/React Native de très haute qualité. Feedback loop instantané avec le QR code.

---

## Options de Backend

### Option A : Supabase

```
PostgreSQL + Auth + Realtime + Storage + Edge Functions
```

| Avantages | Inconvénients |
|-----------|---------------|
| **PostgreSQL** = relations SQL propres | Realtime un peu verbeux à configurer |
| **Row Level Security** = sécurité au niveau DB | Dashboard moins intuitif que Firebase |
| Auth complet (Google, Apple, Phone) | Edge Functions moins matures que Cloud Functions |
| Realtime WebSockets intégré | |
| Storage pour les fichiers | |
| Open source, self-hostable | |
| Free tier généreux (500MB DB, 1GB storage) | |
| IA connaît très bien Supabase | |
| Types TypeScript auto-générés | |

**Pricing** : Free tier → $25/mois (Pro)
**Maturité** : Mature, utilisé en production

### Option B : Firebase

```
Firestore + Auth + Cloud Messaging + Cloud Functions
```

| Avantages | Inconvénients |
|-----------|---------------|
| Le plus documenté, communauté énorme | **NoSQL** = relations complexes difficiles |
| Auth très simple | Vendor lock-in Google |
| Push notifications natives | Coûts peuvent exploser avec la scale |
| IA génère du Firebase parfaitement | Queries Firestore limitées |
| Analytics intégré | |
| Free tier généreux | |

**Pricing** : Free tier → Pay as you go (peut devenir cher)
**Maturité** : Très mature

**Note sur NoSQL et SHEED** : Les relations User ↔ Sheed ↔ Chatroom ↔ Message sont complexes. Avec Firestore, il faudrait dénormaliser les données ou faire des queries multiples. Faisable mais moins élégant qu'avec SQL.

### Option C : Convex

```
Database réactive + Functions + Auth (via Clerk) + File Storage
```

| Avantages | Inconvénients |
|-----------|---------------|
| **Realtime NATIF** - zéro config | Plus récent, moins de documentation |
| TypeScript end-to-end automatique | NoSQL-ish (pas de SQL) |
| Zéro boilerplate pour le real-time | Vendor lock-in |
| Hot reload des fonctions backend | Auth via Clerk (service externe) |
| Parfait pour les apps de chat | Moins connu des IA |
| Schéma validé côté serveur | |

**Pricing** : Free tier généreux → $25/mois
**Maturité** : Plus récent mais stable

### Option D : Appwrite

```
Database + Auth + Realtime + Storage + Functions (self-hosted ou cloud)
```

| Avantages | Inconvénients |
|-----------|---------------|
| Open source, self-hostable | Moins mature que Supabase/Firebase |
| Toutes les features intégrées | Communauté plus petite |
| Free tier cloud | Documentation moins riche |
| | IA moins familière |

**Pricing** : Free tier → $15/mois
**Maturité** : En croissance

### Option E : Backend Custom (Node.js/Express)

```
Express + PostgreSQL + Socket.io + Custom Auth
```

| Avantages | Inconvénients |
|-----------|---------------|
| Contrôle total | 2 codebases à maintenir |
| Pas de vendor lock-in | Auth à implémenter from scratch |
| Flexible | WebSockets à gérer manuellement |
| | Déploiement + infra à gérer |
| | Plus de surface pour les bugs |
| | Plus long à développer |

**Pricing** : Dépend de l'hébergement (Railway, Render, etc.)
**Maturité** : N/A

### Option F : Pocketbase

```
SQLite + Auth + Realtime + Storage (single binary)
```

| Avantages | Inconvénients |
|-----------|---------------|
| Extrêmement simple (1 fichier Go) | SQLite = pas idéal pour la scale |
| Self-hosted facilement | Pas de cloud managed |
| Gratuit | Moins de features avancées |
| Dashboard admin intégré | |

**Pricing** : Gratuit (self-hosted)
**Maturité** : Stable mais niche

### Recommandation Initiale : Supabase

**Raisons** :
1. **SQL** pour les relations complexes de SHEED
2. **Row Level Security** pour la privacy (Sheeder ne lit pas le chat)
3. **Auth complet** avec Phone/SMS
4. **IA-friendly** - très bien documenté

---

## Options de Styling/UI

### Option A : NativeWind (Tailwind pour React Native)

```jsx
<View className="bg-pink-500 rounded-2xl p-4">
  <Text className="text-white font-bold">Sheed!</Text>
</View>
```

| Avantages | Inconvénients |
|-----------|---------------|
| Tailwind = ultra flexible | Courbe d'apprentissage si pas familier |
| Pas de design system imposé | Classes peuvent devenir longues |
| Modifier le design = changer des classes | Runtime overhead (minimal) |
| IA génère du Tailwind parfaitement | |
| Theming via config file | |
| Cohérent avec le web si besoin | |

### Option B : Tamagui

```jsx
<Button theme="pink" size="$4" borderRadius="$6">
  Sheed!
</Button>
```

| Avantages | Inconvénients |
|-----------|---------------|
| Très performant (compile-time) | API plus complexe |
| Theming puissant | Moins connu des IA |
| Composants pré-construits | Documentation parfois confuse |
| Animations intégrées | |
| Cross-platform (web + native) | |

### Option C : React Native Paper

```jsx
<Button mode="contained" onPress={() => {}}>
  Sheed!
</Button>
```

| Avantages | Inconvénients |
|-----------|---------------|
| Material Design complet | **Design imposé** - dur à customiser |
| Composants accessibles | Look "Google/Android" |
| Bien documenté | Moins flexible pour un design unique |

### Option D : UI Kitten

```jsx
<Button status="primary" size="large">
  Sheed!
</Button>
```

| Avantages | Inconvénients |
|-----------|---------------|
| Eva Design System | **Design imposé** |
| Theming possible | Moins populaire |
| Composants complets | |

### Option E : StyleSheet natif + composants custom

```jsx
const styles = StyleSheet.create({
  button: { backgroundColor: '#FF6B9D', borderRadius: 16, padding: 16 }
});
```

| Avantages | Inconvénients |
|-----------|---------------|
| Zéro dépendance | Tout à construire from scratch |
| Performance optimale | Plus de code à écrire |
| Contrôle total | Moins de productivité |

### Recommandation Initiale : NativeWind

**Raisons** :
1. **Flexibilité max** - pas de design system imposé
2. **Vibe coding friendly** - l'IA génère du Tailwind parfaitement
3. **Itération rapide** - changer le design = changer des classes

---

## Options de State Management

### Option A : Zustand

```ts
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

| Avantages | Inconvénients |
|-----------|---------------|
| Minimal, 3 lignes pour un store | Moins structuré pour les grosses apps |
| Pas de boilerplate | |
| Persistance facile | |
| IA le génère parfaitement | |

### Option B : Redux Toolkit

```ts
const userSlice = createSlice({
  name: 'user',
  initialState: { value: null },
  reducers: { setUser: (state, action) => { state.value = action.payload } }
})
```

| Avantages | Inconvénients |
|-----------|---------------|
| Standard de l'industrie | Boilerplate même avec Toolkit |
| DevTools puissants | Overkill pour une petite app |
| Bien structuré | |

### Option C : Jotai

```ts
const userAtom = atom(null)
// Dans le composant
const [user, setUser] = useAtom(userAtom)
```

| Avantages | Inconvénients |
|-----------|---------------|
| API atomique, très simple | Moins de structure |
| Primitif React | |
| Léger | |

### Option D : React Context seul

```ts
const UserContext = createContext(null)
```

| Avantages | Inconvénients |
|-----------|---------------|
| Natif React | Re-renders excessifs si mal utilisé |
| Pas de dépendance | Pas de persistance intégrée |

### Recommandation Initiale : Zustand

**Raison** : Le plus simple pour vibe coding. Fonctionne parfaitement avec TanStack Query pour les données serveur.

---

## Options de Data Fetching

### Option A : TanStack Query (React Query)

```ts
const { data, isLoading } = useQuery({
  queryKey: ['sheeds'],
  queryFn: () => supabase.from('sheeds').select()
})
```

| Avantages | Inconvénients |
|-----------|---------------|
| Cache automatique | Un peu de setup |
| Refetch on focus | |
| Mutations avec invalidation | |
| Standard de l'industrie | |

### Option B : SWR

```ts
const { data, isLoading } = useSWR('sheeds', fetcher)
```

| Avantages | Inconvénients |
|-----------|---------------|
| Plus simple que React Query | Moins de features |
| Léger | |

### Option C : Fetch/Axios direct

```ts
const [data, setData] = useState(null)
useEffect(() => { fetch(...).then(setData) }, [])
```

| Avantages | Inconvénients |
|-----------|---------------|
| Pas de dépendance | Pas de cache |
| Contrôle total | Boilerplate loading/error |
| | Re-fetch manuel |

### Recommandation Initiale : TanStack Query

**Raison** : Gère loading, erreurs, cache, refetch automatiquement. Standard du marché.

---

## Matrice de Décision

### Pour le Framework Mobile

| Critère | Expo | RN CLI | Flutter | KMM |
|---------|------|--------|---------|-----|
| Vibe coding friendly | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| Setup rapide | ⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐ |
| IA génère bien | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Accès contacts | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Push notifications | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| OTA updates | ⭐⭐⭐ | ⭐ | ⭐ | ⭐ |

### Pour le Backend

| Critère | Supabase | Firebase | Convex | Custom |
|---------|----------|----------|--------|--------|
| Relations SQL | ⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| Realtime chat | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Auth complet | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Row Level Security | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Vibe coding friendly | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Free tier | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Open source | ⭐⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐ |

### Pour le Styling

| Critère | NativeWind | Tamagui | RN Paper | Custom |
|---------|------------|---------|----------|--------|
| Flexibilité design | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| Vibe coding friendly | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| Composants pré-faits | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Performance | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Theming | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

---

## Stack Recommandée (à challenger)

```
┌─────────────────────────────────────────────────────────┐
│   📱 FRONTEND                                           │
│   Expo SDK 52         → Framework React Native          │
│   Expo Router         → Navigation file-based           │
│   NativeWind v4       → Styling Tailwind                │
│   Zustand             → State management local          │
│   TanStack Query      → Data fetching + cache           │
├─────────────────────────────────────────────────────────┤
│   ☁️ BACKEND                                            │
│   Supabase Database   → PostgreSQL                      │
│   Supabase Auth       → Google, Apple, Phone            │
│   Supabase Realtime   → WebSockets pour le chat         │
│   Supabase Storage    → Photos de profil                │
│   Supabase Edge Func  → Logique métier                  │
├─────────────────────────────────────────────────────────┤
│   🛠️ TOOLING                                            │
│   TypeScript          → Type safety                     │
│   Expo EAS            → Builds cloud                    │
└─────────────────────────────────────────────────────────┘
```

---

## Questions Ouvertes pour Review

1. **Supabase vs Firebase** : Est-ce que les relations SQL justifient Supabase, ou Firebase serait plus simple malgré le NoSQL ?

2. **Convex** : Est-ce que Convex serait meilleur pour le real-time chat malgré le manque de maturité ?

3. **NativeWind vs Tamagui** : Tamagui offre plus de performance et des composants, mais NativeWind est plus flexible. Quel trade-off privilégier ?

4. **Expo vs RN CLI** : Y a-t-il des features de SHEED qui nécessiteraient RN CLI plutôt qu'Expo ?

5. **Zustand vs autre** : Pour une app de chat avec beaucoup d'état local (messages, présence), Zustand est-il suffisant ?

6. **Backend custom** : Serait-il préférable d'avoir un backend Express/Node pour plus de contrôle, même si c'est plus de travail ?

---

## Liens Utiles

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

*Document créé pour review externe - 22 janvier 2026*
