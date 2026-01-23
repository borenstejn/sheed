# Guide de Test SHEED

## Situation actuelle

L'application SHEED utilise:
- **Expo SDK 54** avec New Architecture
- **NativeWind v4** pour le styling
- **expo-router** pour la navigation

## Problème avec Expo Go

Expo Go SDK 54+ force l'utilisation du New Architecture, ce qui cause une incompatibilité avec NativeWind v4.

**Erreur typique:**
```
TypeError: expected dynamic type 'boolean', but had type 'string'
```

## Solutions pour tester

### Option 1: Development Build (Recommandé) ✅

Créer un build de développement via EAS (gratuit):

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Créer le build iOS (simulateur)
eas build --profile development --platform ios

# OU créer le build Android
eas build --profile development --platform android
```

Le build sera téléchargeable depuis le dashboard Expo.

### Option 2: Simulateur iOS (requiert Xcode)

Si Xcode est installé:

```bash
# Configurer Xcode
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Lancer sur simulateur
npx expo start --ios
```

### Option 3: Version Web

```bash
# Installer les dépendances web
npx expo install react-native-web react-dom

# Lancer version web
npx expo start --web
```

## Vérification du code

Les tests unitaires vérifient que le code compile correctement:

```bash
npm test
# Résultat: 326 tests passants
```

## Configuration EAS

Le fichier `eas.json` est déjà configuré avec 3 profils:
- `development`: Build de dev avec simulateur iOS
- `preview`: Build de test interne
- `production`: Build App Store/Play Store
