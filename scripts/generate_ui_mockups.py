#!/Users/jeromeborenstejn/.claude/venv/bin/python3
"""
Script de génération de mockups UI pour SHEED avec Gemini 3 Pro Image
Génère les images de chaque écran de l'application basé sur les descriptions de design.
"""

import os
import sys
import time
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types

# Configuration Vertex AI
PROJECT_ID = "mon-projet-veo3-483016"
LOCATION = "global"
MODEL = "gemini-3-pro-image-preview"
CREDENTIALS_PATH = os.path.expanduser("~/.config/gcloud/veo3-key.json")

# Configuration sortie
OUTPUT_DIR = Path("/Users/jeromeborenstejn/PERSONNEL/Code/sheed/design/mockups")

# Contexte global pour tous les écrans
DESIGN_SYSTEM = """
DESIGN SYSTEM "Dopamine & Neon" pour SHEED - App de matchmaking Gen-Z:

COULEURS:
- Fond principal: Noir profond #101012
- Fond surface: Gris foncé #1C1C1E
- Gradient primaire: Pink #FF3B7A vers Purple #9A3BFF
- Accent/Succès: Vert néon #00F5A0
- En attente: Jaune ambre #FFC700
- Texte principal: Blanc cassé #F5F5F7
- Texte secondaire: Gris #8A8A8E

STYLE:
- Mode sombre avec accents néon
- Glassmorphism (transparence + blur)
- Coins très arrondis (rounded-3xl)
- Boutons en forme de pilule avec gradient
- UI moderne, premium, Gen-Z friendly
- Inspirations: Tinder, Bumble, Hinge, BeReal, TikTok

FORMAT: iPhone mockup, écran mobile vertical, style app store screenshot
"""


# Descriptions détaillées pour chaque écran
SCREENS = {
    "01_splash": {
        "name": "Splash Screen",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité du SPLASH SCREEN de l'app SHEED:

CONTENU:
- Écran complètement noir (#101012)
- Au centre: logo SHEED stylisé avec un arc et une flèche
- L'arc est violet (#9A3BFF), la corde est rose (#FF3B7A)
- Un petit coeur vert néon (#00F5A0) sur la corde
- Le mot "SHEED" en dessous en blanc, police géométrique moderne bold
- Effet de glow subtil autour du logo

STYLE:
- Ultra minimaliste
- Effet néon
- Sensation premium et moderne
- Proportions iPhone (9:19.5)

Qualité: 4K, UI design professionnel, style Dribbble/Behance
"""
    },

    "02_onboarding_1": {
        "name": "Onboarding - Value Prop",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran ONBOARDING 1 de SHEED:

CONTENU:
- Fond noir (#101012)
- Grande icône d'arc et flèche (🏹) au centre supérieur, stylisée en gradient pink-purple
- Titre principal: "Match tes potes, pas toi-même"
- Le mot "potes" est surligné avec le gradient pink-purple
- Police: géométrique moderne, bold, grande taille
- En bas: 3 indicateurs de page (dots), le premier est actif (blanc), les autres gris
- Espace généreux, centré verticalement

STYLE:
- Clean, moderne, impactant
- Message clair et direct
- Vibe Gen-Z, social, fun
- Proportions iPhone

Qualité: 4K, UI design professionnel, app store ready
"""
    },

    "02_onboarding_2": {
        "name": "Onboarding - SSO Login",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran ONBOARDING 2 (LOGIN) de SHEED:

CONTENU:
- Fond noir (#101012)
- Titre en haut: "Prêt à jouer Cupidon ?" en blanc, bold
- Deux gros boutons empilés verticalement au centre:
  1. "Continuer avec Apple" - icône Apple blanche, fond gris foncé (#1C1C1E), bordure grise
  2. "Continuer avec Google" - icône Google colorée, fond gris foncé (#1C1C1E), bordure grise
- Boutons en forme de pilule (rounded-full), large et facile à taper
- En bas: "Déjà un compte? Login" en texte gris
- 3 indicateurs de page, le deuxième est actif

STYLE:
- SSO moderne comme toutes les apps trendy
- Boutons larges, accessibles
- Minimaliste mais accueillant
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "02_onboarding_3": {
        "name": "Onboarding - Permissions",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran ONBOARDING 3 (PERMISSIONS) de SHEED:

CONTENU:
- Fond noir (#101012)
- Titre en haut: "Juste deux trucs..." en blanc, bold, casual
- Deux blocs de permission avec icônes:
  1. 👤 "Accès aux contacts" - sous-titre: "Pour trouver tes potes à sheeder"
  2. 🔔 "Notifications" - sous-titre: "Pour savoir quand ça devient hot 🔥"
- Icônes avec effet gradient pink-purple
- Sous-titres en gris (#8A8A8E)
- En bas: Grand bouton CTA "Activer & Go ! 🚀" avec gradient pink-purple, effet glow
- 3 indicateurs de page, le troisième est actif

STYLE:
- Fun et engageant, pas corporate
- Explique la valeur avant de demander
- Emoji dans le bouton
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "03_home_sheeds": {
        "name": "Home - Onglet Sheeds",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran HOME SHEEDS de SHEED:

CONTENU:
- Header: Logo "SHEED" à gauche
- Toggle segmenté: "MES SHEEDS" | "SHEEDÉ(E)" - l'option active a un fond blanc avec texte noir, fond général gris foncé
- Liste de SheedCards en glassmorphism:

  Card 1:
  - Deux avatars qui se chevauchent + "Marie ↔ Thomas"
  - Badge "🟢 ACTIF" vert
  - Barre de progression "████████░░ 8/10 messages"

  Card 2:
  - Deux avatars + "Emma ↔ Lucas"
  - Badge "🟡 EN ATTENTE" jaune
  - Texte "il y a 2h"

- FAB (Floating Action Button) en bas à droite: cercle gradient pink-purple avec icône "+" blanche
- Tab bar en bas: 3 onglets (🏹 Sheeds actif, 💬 Chats, 👤 Profil)

STYLE:
- Cards en glassmorphism (bg semi-transparent avec blur)
- Toggle avec animation pill qui slide
- Modern, clean, bien espacé
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "04_create_sheed": {
        "name": "Création d'un Sheed",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran CRÉATION DE SHEED de SHEED:

CONTENU:
- Header: "← Nouveau Sheed" avec bouton retour
- Zone de sélection en haut:
  - Deux grands cercles pour les avatars: (👤 Emma) ↔ (👤 Lucas)
  - Les deux personnes sont sélectionnées, checkmark vert
  - Icône ↔ au milieu avec gradient

- Zone message d'intro:
  - Champ de texte avec placeholder: "Ajoute un ice-breaker pour eux... 😏"
  - Fond gris foncé, coins arrondis

- Liste de contacts scrollable:
  - Barre de recherche "🔍 Rechercher un contact..."
  - Items de contact: Avatar + Nom, checkmark vert à droite si sélectionné

- Bouton CTA en bas: "SHEED LES ! 🏹" avec gradient pink-purple, pleine largeur

STYLE:
- Flow gamifié, on "collecte" les personnes
- Bouton désactivé gris si < 2 personnes
- Bouton actif avec gradient et glow
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "05_sheed_detail": {
        "name": "Détail d'un Sheed",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran DÉTAIL SHEED (vue Sheeder) de SHEED:

CONTENU:
- Header: "← Emma ↔ Lucas"
- Visualisation du triangle en haut:
  - Avatar Emma --- 🏹 (gradient) --- Avatar Lucas

- Zone stats:
  - "🏆 SUCCÈS !" en vert néon grand
  - "23 messages échangés"
  - "Créé il y a 3 jours"

- Section "Leur chat privé":
  - Card glassmorphism avec 🔒
  - "Actif · 23 messages"
  - "Dernière activité: 5min"
  - Indication "Conversation privée" - le Sheeder ne peut pas y accéder

- Section "Tes chats avec eux":
  - Card "👤 Parler à Emma" avec badge (1) notification
  - Card "👤 Parler à Lucas"

STYLE:
- Dashboard de "coach/manager"
- Stats gamifiées
- Privacy clairement indiquée
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "06_chats_list": {
        "name": "Onglet Chats",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran LISTE DES CHATS de SHEED:

CONTENU:
- Header simple: "Conversations"
- Liste de conversations:

  1. Deux avatars superposés + "Emma & Lucas"
     - Sous-titre: "🏹 Sheedé par toi"
     - Preview: "Haha trop bien!"
     - "2min" à droite + badge (2) notification gradient

  2. Un avatar + "Emma"
     - Sous-titre: "🏹 Chat privé avec elle"
     - Preview: "Alors, des news?"
     - "15min" + badge (1)

  3. Coeur + "Toi & Marie"
     - Sous-titre: "💘 Sheedé par Alex"
     - Preview: "Salut ! :)"
     - "1h"

- Tab bar en bas: 🏹 Sheeds, 💬 Chats (actif), 👤 Profil

STYLE:
- Distinction visuelle claire 🏹 vs 💘
- 🏹 = Tu es Sheeder (gradient pink-purple)
- 💘 = Tu es Sheedé (vert néon)
- Badges de notification en gradient
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "07_chat_conversation": {
        "name": "Conversation Chat",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran CONVERSATION CHAT de SHEED:

CONTENU:
- Header:
  - "←" bouton retour
  - Avatar + "Emma"
  - "🟢 En ligne" en vert néon

- Zone de chat:
  - Message d'intro du Sheeder (centré, bordure pointillée, icône 🏹):
    "Alex vous a sheedé: Vous adorez tous les deux les mêmes films !"

  - Bulles de l'autre (fond gris foncé #1C1C1E, à gauche):
    "Salut ! Comment ça va ?"

  - Mes bulles (gradient pink-purple, à droite):
    "Super et toi ? 😄"
    "C'est fou cette app"

- Input bar en bas:
  - Champ arrondi "Message..." fond gris foncé
  - Bouton envoyer icône flèche avec gradient

STYLE:
- Bulles sans "queue", coins arrondis
- Mes messages en gradient = identité visuelle forte
- Message du Sheeder distinct et spécial
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    },

    "08_profile": {
        "name": "Profil & Stats",
        "prompt": f"""{DESIGN_SYSTEM}

Génère un MOCKUP UI haute fidélité de l'écran PROFIL de SHEED:

CONTENU:
- Header: "Mon Profil"

- Zone avatar:
  - Grand avatar circulaire avec anneau gradient pink-purple (Top Sheeder)
  - "@jerome" en dessous

- Section Stats Sheeder (🏆):
  - 3 cards glassmorphism côte à côte:
    1. "12" grand + "Sheeds créés"
    2. "8" grand + "Réussis"
    3. "67%" en vert néon + "Succès"

- Section Classement (🎯):
  - Card: "#23 parmi tes amis"
  - Icône trophée

- Section Settings:
  - Liste items: ⚙️ Paramètres, 🔔 Notifications, 🚫 Comptes bloqués, ❓ Aide, 🚪 Déconnexion
  - Chaque item avec chevron ">"

- Tab bar: 🏹 Sheeds, 💬 Chats, 👤 Profil (actif)

STYLE:
- Gamification au centre
- Stats comme score de jeu
- Chiffres qui "pop"
- Proportions iPhone

Qualité: 4K, UI design professionnel
"""
    }
}


def setup_credentials():
    """Configure credentials for Vertex AI"""
    if not os.path.exists(CREDENTIALS_PATH):
        raise FileNotFoundError(f"Credentials not found: {CREDENTIALS_PATH}")
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH


def generate_screen(client, screen_id: str, screen_data: dict, output_dir: Path) -> bool:
    """Generate a single screen mockup"""

    output_path = output_dir / f"{screen_id}.png"

    # Skip if already exists
    if output_path.exists():
        print(f"  ⏭️  Déjà généré: {screen_data['name']}")
        return True

    print(f"  🎨 Génération: {screen_data['name']}...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[screen_data["prompt"]],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                temperature=0.8
            )
        )

        # Extract and save image
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                with open(output_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"  ✅ Sauvegardé: {output_path.name}")
                return True
            elif hasattr(part, 'text') and part.text:
                print(f"  💬 Gemini: {part.text[:100]}...")

        print(f"  ⚠️  Pas d'image générée pour {screen_data['name']}")
        return False

    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return False


def main():
    print("=" * 60)
    print("🎨 SHEED UI Mockup Generator")
    print("=" * 60)
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"📁 Output: {OUTPUT_DIR}")
    print(f"🤖 Model: {MODEL}")
    print("=" * 60)

    # Setup
    setup_credentials()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    client = genai.Client(
        vertexai=True,
        project=PROJECT_ID,
        location=LOCATION
    )

    # Generate each screen
    total = len(SCREENS)
    success = 0

    for i, (screen_id, screen_data) in enumerate(SCREENS.items(), 1):
        print(f"\n[{i}/{total}] {screen_data['name']}")

        if generate_screen(client, screen_id, screen_data, OUTPUT_DIR):
            success += 1

        # Rate limiting between requests
        if i < total:
            print("  ⏳ Pause 10s (rate limiting)...")
            time.sleep(10)

    # Summary
    print("\n" + "=" * 60)
    print(f"📊 RÉSUMÉ: {success}/{total} écrans générés")
    print(f"📁 Fichiers dans: {OUTPUT_DIR}")
    print("=" * 60)

    # List generated files
    files = list(OUTPUT_DIR.glob("*.png"))
    if files:
        print("\n📷 Fichiers générés:")
        for f in sorted(files):
            print(f"  - {f.name}")


if __name__ == "__main__":
    main()
