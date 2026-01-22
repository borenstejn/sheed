# SHEED - Product Requirements Document

**Version:** 1.0.0
**Date:** January 2026
**Status:** MVP Specification

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Glossary](#2-glossary)
3. [User Stories](#3-user-stories)
4. [Technical Architecture](#4-technical-architecture)
5. [Data Models](#5-data-models)
6. [API Specification](#6-api-specification)
7. [Screen Specifications](#7-screen-specifications)
8. [Business Rules](#8-business-rules)
9. [Gamification](#9-gamification)
10. [Security & Privacy](#10-security--privacy)
11. [Design System](#11-design-system)
12. [Navigation](#12-navigation)
13. [State Management](#13-state-management)
14. [Notifications](#14-notifications)
15. [Error Handling](#15-error-handling)
16. [Testing](#16-testing)
17. [Deployment](#17-deployment)
18. [Appendices](#18-appendices)

---

## 1. Executive Summary

### 1.1 Vision & Mission

**Vision:** Become the go-to app for friend-powered matchmaking, where every meaningful connection starts with someone who knows both people.

**Mission:** Empower Gen-Z to play Cupid for their friends through a fun, gamified, and privacy-first matchmaking experience that leverages real social trust.

### 1.2 Target Audience

**Primary:** Gen-Z (18-28 years old)
- Socially active with large friend networks
- Comfortable with dating apps but frustrated by algorithmic matching
- Values authentic connections and social proof
- Enjoys gamified experiences with social elements

**Secondary:** Young Millennials (28-35)
- Looking for more meaningful introductions
- Has established friend groups to leverage

### 1.3 Value Proposition

| For | Pain Point | SHEED Solution |
|-----|-----------|----------------|
| Singles | Dating apps feel artificial | Real introductions from trusted friends |
| Matchmakers | No good way to set up friends | Dedicated tool with gamification rewards |
| Both | Awkward if it doesn't work | Anonymous until both parties engage |

### 1.4 Success KPIs

| KPI | Target (MVP) | Target (6mo) |
|-----|--------------|--------------|
| Monthly Active Users | 10,000 | 100,000 |
| Sheeds Created/Week | 5,000 | 50,000 |
| Match Success Rate | 15% | 25% |
| D7 Retention | 30% | 45% |
| Chatroom Conversion | 40% | 55% |

### 1.5 MVP Scope

**In Scope:**
- User authentication (SSO: Apple, Google)
- Contact import and management
- Sheed creation workflow
- 3-way chatroom system
- Success tracking and gamification
- Push notifications
- Basic profile management

**Out of Scope (v2+):**
- Premium subscriptions
- Video/voice in chat
- Group sheeds (3+ people)
- AI-powered suggestions
- Social feed/discovery

---

## 2. Glossary

### 2.1 Core Terminology

| Term | Definition |
|------|------------|
| **Sheed** | A matchmaking action where a Sheeder introduces two Sheedés. Noun and verb ("I sheed them" / "Create a sheed"). |
| **Sheeder** | The matchmaker who creates a Sheed. The "Cupid" who believes two people should meet. |
| **Sheedé** | A person who has been matched by a Sheeder. Recipient of a Sheed. |
| **Chatroom** | Private conversation space created when a Sheed is initiated. |
| **Success** | A Sheed reaches "success" status when ≥10 messages are exchanged in the chatroom. |
| **Pending** | Sheed status when created but Sheedés haven't engaged yet. |
| **Active** | Sheed status when Sheedés have started chatting (<10 messages). |
| **Expired** | Sheed status when 7 days pass without reaching success threshold. |

### 2.2 Three Chatroom System

SHEED implements a unique 3-chatroom architecture per Sheed:

```
┌─────────────────────────────────────────────────────┐
│                    SHEED #1234                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  CHATROOM A │  │  CHATROOM B │  │  CHATROOM C │ │
│  │ Sheeder ↔   │  │ Sheeder ↔   │  │ Sheedé 1 ↔  │ │
│  │  Sheedé 1   │  │  Sheedé 2   │  │  Sheedé 2   │ │
│  │  (Private)  │  │  (Private)  │  │  (Private)  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
```

- **Chatroom A:** Sheeder ↔ Sheedé 1 (context, encouragement)
- **Chatroom B:** Sheeder ↔ Sheedé 2 (context, encouragement)
- **Chatroom C:** Sheedé 1 ↔ Sheedé 2 (the actual date chat - Sheeder CANNOT read)

### 2.3 Success Threshold

The **10-message threshold** is calculated as:
- Total messages in Chatroom C (Sheedé ↔ Sheedé)
- Both participants must have sent at least 1 message
- System messages don't count
- Messages must be sent within the 7-day window

---

## 3. User Stories

### 3.1 Persona: The Sheeder (Matchmaker)

**Name:** Alex, 24
**Motivation:** "I love seeing my friends happy. I know two people who would be PERFECT together."
**Goals:** Create successful matches, build reputation as good matchmaker
**Frustrations:** No easy way to introduce friends, awkward when introductions fail

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| S-01 | As a Sheeder, I want to sign up quickly so I can start matching friends | SSO with Apple/Google < 30s |
| S-02 | As a Sheeder, I want to import my contacts so I can select people to match | Contact picker with search |
| S-03 | As a Sheeder, I want to select two people and write why they should meet | 2-step selection + message field |
| S-04 | As a Sheeder, I want to track my sheeds' progress | Dashboard with status filters |
| S-05 | As a Sheeder, I want to encourage sheedés privately | 1-on-1 chatrooms with each |
| S-06 | As a Sheeder, I want to see my success rate and points | Stats page with gamification |
| S-07 | As a Sheeder, I want notifications when my sheed progresses | Push for key events |

### 3.2 Persona: The Sheedé (Matched Person)

**Name:** Jordan, 23
**Motivation:** "I'm open to meeting someone new if a friend vouches for them."
**Goals:** Meet compatible people through trusted connections
**Frustrations:** Cold intros on dating apps, no context about matches

#### User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| D-01 | As a Sheedé, I want to see who matched me and why | Notification + context message |
| D-02 | As a Sheedé, I want to ask the Sheeder questions | Private chatroom with Sheeder |
| D-03 | As a Sheedé, I want to chat with my match privately | Chatroom without Sheeder access |
| D-04 | As a Sheedé, I want to see basic info about my match | Profile preview (photo, name, bio) |
| D-05 | As a Sheedé, I want to decline a sheed gracefully | Decline option with optional reason |
| D-06 | As a Sheedé, I want to know if it's mutual interest | Status indicators |

### 3.3 User Journeys

#### Journey 1: Creating a Sheed

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Open App  │ 2. Tap "+"   │ 3. Select    │ 4. Select     │
│    (Home)    │    Create    │   Person 1   │   Person 2    │
└──────┬───────┴──────┬───────┴──────┬───────┴───────┬────────┘
       │              │              │               │
       ▼              ▼              ▼               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5. Write intro message     │ 6. Review & Confirm │ 7. Success! │
│    "You two would be       │    Preview both     │   Sheed     │
│     perfect because..."    │    profiles         │   Created   │
└────────────────────────────┴─────────────────────┴─────────────┘
```

#### Journey 2: Receiving a Sheed

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Push      │ 2. Open App  │ 3. View Sheed  │ 4. Accept/   │
│ Notification │    Inbox     │    Details     │    Decline   │
└──────┬───────┴──────┬───────┴───────┬────────┴───────┬───────┘
       │              │               │                │
       ▼              ▼               ▼                ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5. Chat with Sheeder     │ 6. Chat with Match   │ 7. Success! │
│    (get context)         │    (build connection)│   10+ msgs  │
└──────────────────────────┴──────────────────────┴─────────────┘
```

---

## 4. Technical Architecture

### 4.1 Technology Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Mobile Framework** | Expo (React Native) | 52+ | Rapid development, OTA updates |
| **Routing** | Expo Router | 4.x | File-based routing, deep links |
| **Styling** | NativeWind | 4.x | Tailwind for React Native |
| **State Management** | Zustand | 4.x | Lightweight, simple API |
| **Server State** | TanStack Query | 5.x | Caching, background refresh |
| **Backend** | Supabase | Latest | Auth, DB, Realtime, Storage |
| **Database** | PostgreSQL | 15+ | Via Supabase |
| **Realtime** | Supabase Realtime | - | WebSocket subscriptions |
| **Push Notifications** | Expo Push | - | Cross-platform notifications |
| **Analytics** | PostHog | - | Product analytics |

### 4.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           MOBILE APP                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │   Screens   │ │  Components │ │   Stores    │ │   Hooks     │   │
│  │ (Expo      │ │ (NativeWind)│ │  (Zustand)  │ │ (TanStack)  │   │
│  │  Router)   │ │             │ │             │ │             │   │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘   │
│         └────────────────┴────────────────┴────────────────┘        │
│                                   │                                  │
└───────────────────────────────────┼──────────────────────────────────┘
                                    │ HTTPS / WSS
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                           SUPABASE                                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │    Auth     │ │  Database   │ │  Realtime   │ │   Storage   │    │
│  │  (GoTrue)   │ │ (PostgreSQL)│ │ (WebSocket) │ │   (S3)      │    │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │
│  ┌─────────────┐ ┌─────────────┐                                     │
│  │    Edge     │ │     RLS     │                                     │
│  │  Functions  │ │  Policies   │                                     │
│  └─────────────┘ └─────────────┘                                     │
└───────────────────────────────────────────────────────────────────────┘
```

### 4.3 Data Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  USER ACTION          APP LAYER           SUPABASE                 │
│  ───────────          ─────────           ────────                 │
│                                                                     │
│  Create Sheed    ──►  Zustand Store  ──►  INSERT sheed            │
│                       TanStack         │   INSERT chatrooms (3x)   │
│                       Mutation         │   NOTIFY sheedés          │
│                            │           │                           │
│                            ▼           ▼                           │
│                       Optimistic    Realtime                       │
│                       Update        Broadcast                      │
│                            │           │                           │
│                            ▼           ▼                           │
│  UI Update       ◄──  Query Cache  ◄──  Subscription              │
│                       Invalidation      Event                      │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Models

### 5.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    users     │       │    sheeds    │       │  chatrooms   │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │◄──┐   │ id (PK)      │──────►│ id (PK)      │
│ email        │   │   │ sheeder_id   │──┐    │ sheed_id     │
│ phone        │   └───│ sheede_1_id  │  │    │ type         │
│ display_name │   └───│ sheede_2_id  │  │    │ participant_a│
│ avatar_url   │       │ intro_message│  │    │ participant_b│
│ bio          │       │ status       │  │    │ created_at   │
│ points       │       │ created_at   │  │    └──────────────┘
│ created_at   │       │ expires_at   │  │           │
└──────────────┘       │ success_at   │  │           │
       ▲               └──────────────┘  │           ▼
       │                      │          │    ┌──────────────┐
       │                      │          │    │   messages   │
       │                      │          │    ├──────────────┤
       │                      │          │    │ id (PK)      │
       │                      │          │    │ chatroom_id  │
┌──────────────┐              │          │    │ sender_id    │
│   contacts   │              │          │    │ content      │
├──────────────┤              │          │    │ type         │
│ id (PK)      │              │          │    │ created_at   │
│ owner_id     │──────────────┘          │    │ read_at      │
│ contact_user │                         │    └──────────────┘
│ phone        │                         │
│ name         │                         │
│ created_at   │                         │
└──────────────┘                         │
                                         │
┌──────────────┐                         │
│notifications │◄────────────────────────┘
├──────────────┤
│ id (PK)      │
│ user_id      │
│ type         │
│ title        │
│ body         │
│ data         │
│ read_at      │
│ created_at   │
└──────────────┘
```

### 5.2 Complete SQL Schema

```sql
-- =====================================================
-- SHEED DATABASE SCHEMA
-- Supabase PostgreSQL
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE sheed_status AS ENUM (
  'pending',    -- Created, waiting for sheedés
  'active',     -- Sheedés engaged, <10 messages
  'success',    -- ≥10 messages exchanged
  'expired',    -- 7 days passed without success
  'declined'    -- One or both sheedés declined
);

CREATE TYPE chatroom_type AS ENUM (
  'sheeder_sheede_1',  -- Sheeder ↔ Sheedé 1
  'sheeder_sheede_2',  -- Sheeder ↔ Sheedé 2
  'sheede_sheede'      -- Sheedé 1 ↔ Sheedé 2 (main chat)
);

CREATE TYPE message_type AS ENUM (
  'text',
  'image',
  'system'  -- Auto-generated (e.g., "Chat started!")
);

CREATE TYPE notification_type AS ENUM (
  'new_sheed',           -- You've been sheed!
  'sheed_accepted',      -- Sheedé accepted
  'sheed_declined',      -- Sheedé declined
  'new_message',         -- New chat message
  'sheed_success',       -- 10 messages reached!
  'sheed_expiring',      -- 24h before expiration
  'sheed_expired'        -- Sheed expired
);

-- =====================================================
-- USERS TABLE
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Auth (from Supabase Auth)
  auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,

  -- Profile
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  bio VARCHAR(500),
  birth_date DATE,

  -- Gamification
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  total_sheeds_created INTEGER DEFAULT 0,
  total_sheeds_received INTEGER DEFAULT 0,
  successful_sheeds INTEGER DEFAULT 0,

  -- Settings
  push_token TEXT,
  notifications_enabled BOOLEAN DEFAULT true,

  -- Metadata
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_points ON users(points DESC);
CREATE INDEX idx_users_display_name_trgm ON users USING gin(display_name gin_trgm_ops);

-- =====================================================
-- CONTACTS TABLE
-- =====================================================

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Owner (who imported this contact)
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Contact info
  contact_user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL if not on SHEED
  phone VARCHAR(20),
  email VARCHAR(255),
  name VARCHAR(200) NOT NULL,

  -- Metadata
  imported_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique contact per owner
  CONSTRAINT unique_contact_per_owner UNIQUE (owner_id, phone),
  CONSTRAINT contact_has_identifier CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

-- Indexes
CREATE INDEX idx_contacts_owner ON contacts(owner_id);
CREATE INDEX idx_contacts_phone ON contacts(phone);
CREATE INDEX idx_contacts_contact_user ON contacts(contact_user_id);
CREATE INDEX idx_contacts_name_trgm ON contacts USING gin(name gin_trgm_ops);

-- =====================================================
-- SHEEDS TABLE
-- =====================================================

CREATE TABLE sheeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Participants
  sheeder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sheede_1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sheede_2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  intro_message TEXT NOT NULL CHECK (LENGTH(intro_message) BETWEEN 10 AND 1000),

  -- Status
  status sheed_status DEFAULT 'pending',
  sheede_1_accepted BOOLEAN,
  sheede_2_accepted BOOLEAN,

  -- Message count (for success tracking)
  message_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  success_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT different_participants CHECK (
    sheeder_id != sheede_1_id AND
    sheeder_id != sheede_2_id AND
    sheede_1_id != sheede_2_id
  )
);

-- Indexes
CREATE INDEX idx_sheeds_sheeder ON sheeds(sheeder_id);
CREATE INDEX idx_sheeds_sheede_1 ON sheeds(sheede_1_id);
CREATE INDEX idx_sheeds_sheede_2 ON sheeds(sheede_2_id);
CREATE INDEX idx_sheeds_status ON sheeds(status);
CREATE INDEX idx_sheeds_created ON sheeds(created_at DESC);
CREATE INDEX idx_sheeds_expires ON sheeds(expires_at) WHERE status IN ('pending', 'active');

-- =====================================================
-- CHATROOMS TABLE
-- =====================================================

CREATE TABLE chatrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parent sheed
  sheed_id UUID NOT NULL REFERENCES sheeds(id) ON DELETE CASCADE,

  -- Type determines participants
  type chatroom_type NOT NULL,

  -- Explicit participants (derived from sheed + type)
  participant_a_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  participant_b_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,

  -- Each sheed has exactly 3 chatrooms, one of each type
  CONSTRAINT unique_chatroom_per_sheed_type UNIQUE (sheed_id, type)
);

-- Indexes
CREATE INDEX idx_chatrooms_sheed ON chatrooms(sheed_id);
CREATE INDEX idx_chatrooms_participant_a ON chatrooms(participant_a_id);
CREATE INDEX idx_chatrooms_participant_b ON chatrooms(participant_b_id);
CREATE INDEX idx_chatrooms_last_message ON chatrooms(last_message_at DESC);

-- =====================================================
-- MESSAGES TABLE
-- =====================================================

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parent chatroom
  chatroom_id UUID NOT NULL REFERENCES chatrooms(id) ON DELETE CASCADE,

  -- Sender
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  type message_type DEFAULT 'text',
  content TEXT NOT NULL CHECK (LENGTH(content) BETWEEN 1 AND 5000),
  image_url TEXT,

  -- Read tracking
  read_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_chatroom ON messages(chatroom_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_messages_chatroom_created ON messages(chatroom_id, created_at DESC);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Recipient
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  type notification_type NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,

  -- Related data (JSON for flexibility)
  data JSONB DEFAULT '{}',

  -- Status
  read_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- MESSAGE COUNT TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_sheed_message_count()
RETURNS TRIGGER AS $$
DECLARE
  v_sheed_id UUID;
  v_chatroom_type chatroom_type;
  v_count INTEGER;
BEGIN
  -- Get the chatroom type and sheed
  SELECT sheed_id, type INTO v_sheed_id, v_chatroom_type
  FROM chatrooms WHERE id = NEW.chatroom_id;

  -- Only count messages in sheede_sheede chatroom
  IF v_chatroom_type = 'sheede_sheede' AND NEW.type != 'system' THEN
    -- Count messages
    SELECT COUNT(*) INTO v_count
    FROM messages m
    JOIN chatrooms c ON m.chatroom_id = c.id
    WHERE c.sheed_id = v_sheed_id
      AND c.type = 'sheede_sheede'
      AND m.type != 'system';

    -- Update sheed
    UPDATE sheeds
    SET message_count = v_count,
        status = CASE
          WHEN v_count >= 10 AND status != 'success' THEN 'success'
          WHEN status = 'pending' THEN 'active'
          ELSE status
        END,
        success_at = CASE
          WHEN v_count >= 10 AND success_at IS NULL THEN NOW()
          ELSE success_at
        END
    WHERE id = v_sheed_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER messages_count_trigger
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_sheed_message_count();

-- =====================================================
-- CHATROOM LAST MESSAGE TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_chatroom_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chatrooms
  SET last_message_at = NEW.created_at
  WHERE id = NEW.chatroom_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chatroom_last_message_trigger
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chatroom_last_message();
```

### 5.3 Row Level Security (RLS) Policies

```sql
-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sheeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS POLICIES
-- =====================================================

-- Users can read any user's public profile
CREATE POLICY "Users: public read"
  ON users FOR SELECT
  USING (true);

-- Users can only update their own profile
CREATE POLICY "Users: own update"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id)
  WITH CHECK (auth.uid() = auth_id);

-- =====================================================
-- CONTACTS POLICIES
-- =====================================================

-- Users can only see their own contacts
CREATE POLICY "Contacts: own read"
  ON contacts FOR SELECT
  USING (owner_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can only insert their own contacts
CREATE POLICY "Contacts: own insert"
  ON contacts FOR INSERT
  WITH CHECK (owner_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can only delete their own contacts
CREATE POLICY "Contacts: own delete"
  ON contacts FOR DELETE
  USING (owner_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- =====================================================
-- SHEEDS POLICIES
-- =====================================================

-- Users can see sheeds they're involved in
CREATE POLICY "Sheeds: participant read"
  ON sheeds FOR SELECT
  USING (
    sheeder_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    sheede_1_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    sheede_2_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- Only the sheeder can create sheeds
CREATE POLICY "Sheeds: sheeder insert"
  ON sheeds FOR INSERT
  WITH CHECK (sheeder_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Sheedés can update their acceptance status
CREATE POLICY "Sheeds: sheede update"
  ON sheeds FOR UPDATE
  USING (
    sheede_1_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    sheede_2_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- =====================================================
-- CHATROOMS POLICIES
-- =====================================================

-- Users can only see chatrooms they're a participant in
CREATE POLICY "Chatrooms: participant read"
  ON chatrooms FOR SELECT
  USING (
    participant_a_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    participant_b_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- =====================================================
-- MESSAGES POLICIES
-- =====================================================

-- Users can read messages in chatrooms they're part of
CREATE POLICY "Messages: chatroom participant read"
  ON messages FOR SELECT
  USING (
    chatroom_id IN (
      SELECT id FROM chatrooms
      WHERE participant_a_id = (SELECT id FROM users WHERE auth_id = auth.uid())
         OR participant_b_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

-- Users can send messages in chatrooms they're part of
CREATE POLICY "Messages: chatroom participant insert"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = (SELECT id FROM users WHERE auth_id = auth.uid()) AND
    chatroom_id IN (
      SELECT id FROM chatrooms
      WHERE participant_a_id = (SELECT id FROM users WHERE auth_id = auth.uid())
         OR participant_b_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================

-- Users can only see their own notifications
CREATE POLICY "Notifications: own read"
  ON notifications FOR SELECT
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can only update (mark read) their own notifications
CREATE POLICY "Notifications: own update"
  ON notifications FOR UPDATE
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));
```

---

## 6. API Specification

### 6.1 Authentication Endpoints

Authentication is handled by Supabase Auth with SSO providers.

#### Sign In with Apple
```typescript
// Client-side
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'apple',
  options: {
    redirectTo: 'sheed://auth/callback',
    scopes: 'email name'
  }
});
```

#### Sign In with Google
```typescript
// Client-side
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'sheed://auth/callback',
    scopes: 'email profile'
  }
});
```

#### Get Current User
```typescript
const { data: { user }, error } = await supabase.auth.getUser();
```

#### Sign Out
```typescript
const { error } = await supabase.auth.signOut();
```

### 6.2 User Profile API

#### Get Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('auth_id', userId)
  .single();
```

#### Update Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .update({
    display_name: 'New Name',
    bio: 'Updated bio',
    avatar_url: 'https://...'
  })
  .eq('auth_id', userId);
```

#### Get User Stats
```typescript
const { data, error } = await supabase
  .from('users')
  .select(`
    points,
    total_sheeds_created,
    total_sheeds_received,
    successful_sheeds
  `)
  .eq('auth_id', userId)
  .single();
```

### 6.3 Contacts API

#### Import Contacts (Batch)
```typescript
const { data, error } = await supabase
  .from('contacts')
  .upsert(
    contacts.map(c => ({
      owner_id: currentUserId,
      phone: c.phoneNumber,
      name: c.name,
      email: c.email
    })),
    { onConflict: 'owner_id,phone' }
  );
```

#### Search Contacts
```typescript
const { data, error } = await supabase
  .from('contacts')
  .select(`
    *,
    contact_user:contact_user_id(id, display_name, avatar_url)
  `)
  .eq('owner_id', currentUserId)
  .ilike('name', `%${searchTerm}%`)
  .limit(20);
```

#### Match Contacts with Users
```typescript
// Edge Function: match-contacts
const { data, error } = await supabase.functions.invoke('match-contacts', {
  body: { contactIds: ['uuid1', 'uuid2'] }
});
```

### 6.4 Sheeds API

#### Create Sheed
```typescript
// Edge Function: create-sheed
const { data, error } = await supabase.functions.invoke('create-sheed', {
  body: {
    sheede_1_id: 'uuid',
    sheede_2_id: 'uuid',
    intro_message: 'You two would be perfect together because...'
  }
});

// Response
{
  sheed: { id, status, created_at, ... },
  chatrooms: [
    { id, type: 'sheeder_sheede_1', ... },
    { id, type: 'sheeder_sheede_2', ... },
    { id, type: 'sheede_sheede', ... }
  ]
}
```

#### Get My Sheeds (as Sheeder)
```typescript
const { data, error } = await supabase
  .from('sheeds')
  .select(`
    *,
    sheede_1:sheede_1_id(id, display_name, avatar_url),
    sheede_2:sheede_2_id(id, display_name, avatar_url)
  `)
  .eq('sheeder_id', currentUserId)
  .order('created_at', { ascending: false });
```

#### Get My Sheeds (as Sheedé)
```typescript
const { data, error } = await supabase
  .from('sheeds')
  .select(`
    *,
    sheeder:sheeder_id(id, display_name, avatar_url),
    sheede_1:sheede_1_id(id, display_name, avatar_url),
    sheede_2:sheede_2_id(id, display_name, avatar_url)
  `)
  .or(`sheede_1_id.eq.${currentUserId},sheede_2_id.eq.${currentUserId}`)
  .order('created_at', { ascending: false });
```

#### Accept/Decline Sheed
```typescript
const { data, error } = await supabase
  .from('sheeds')
  .update({
    sheede_1_accepted: true, // or sheede_2_accepted depending on user
    status: 'active'
  })
  .eq('id', sheedId);
```

### 6.5 Chat/Messaging API

#### Get Chatroom Messages
```typescript
const { data, error } = await supabase
  .from('messages')
  .select(`
    *,
    sender:sender_id(id, display_name, avatar_url)
  `)
  .eq('chatroom_id', chatroomId)
  .order('created_at', { ascending: true })
  .range(0, 49);
```

#### Send Message
```typescript
const { data, error } = await supabase
  .from('messages')
  .insert({
    chatroom_id: chatroomId,
    sender_id: currentUserId,
    type: 'text',
    content: 'Hello!'
  })
  .select()
  .single();
```

#### Mark Messages as Read
```typescript
const { data, error } = await supabase
  .from('messages')
  .update({ read_at: new Date().toISOString() })
  .eq('chatroom_id', chatroomId)
  .neq('sender_id', currentUserId)
  .is('read_at', null);
```

### 6.6 Realtime Subscriptions

#### Subscribe to Chatroom Messages
```typescript
const subscription = supabase
  .channel(`chatroom:${chatroomId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `chatroom_id=eq.${chatroomId}`
    },
    (payload) => {
      // Handle new message
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

#### Subscribe to Sheed Updates
```typescript
const subscription = supabase
  .channel(`sheed:${sheedId}`)
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'sheeds',
      filter: `id=eq.${sheedId}`
    },
    (payload) => {
      // Handle sheed status change
      console.log('Sheed updated:', payload.new);
    }
  )
  .subscribe();
```

#### Subscribe to Notifications
```typescript
const subscription = supabase
  .channel(`notifications:${userId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      // Handle new notification
      showLocalNotification(payload.new);
    }
  )
  .subscribe();
```

### 6.7 Edge Functions

#### `create-sheed`
```typescript
// supabase/functions/create-sheed/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { sheede_1_id, sheede_2_id, intro_message } = await req.json();
  const authHeader = req.headers.get('Authorization')!;

  // Verify user
  const { data: { user } } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', '')
  );

  // Get sheeder user record
  const { data: sheeder } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  // Create sheed
  const { data: sheed, error: sheedError } = await supabase
    .from('sheeds')
    .insert({
      sheeder_id: sheeder.id,
      sheede_1_id,
      sheede_2_id,
      intro_message
    })
    .select()
    .single();

  if (sheedError) throw sheedError;

  // Create 3 chatrooms
  const chatrooms = [
    {
      sheed_id: sheed.id,
      type: 'sheeder_sheede_1',
      participant_a_id: sheeder.id,
      participant_b_id: sheede_1_id
    },
    {
      sheed_id: sheed.id,
      type: 'sheeder_sheede_2',
      participant_a_id: sheeder.id,
      participant_b_id: sheede_2_id
    },
    {
      sheed_id: sheed.id,
      type: 'sheede_sheede',
      participant_a_id: sheede_1_id,
      participant_b_id: sheede_2_id
    }
  ];

  const { data: createdChatrooms } = await supabase
    .from('chatrooms')
    .insert(chatrooms)
    .select();

  // Create notifications for sheedés
  await supabase.from('notifications').insert([
    {
      user_id: sheede_1_id,
      type: 'new_sheed',
      title: 'You\'ve been Sheed! 💘',
      body: `${sheeder.display_name} thinks you should meet someone`,
      data: { sheed_id: sheed.id }
    },
    {
      user_id: sheede_2_id,
      type: 'new_sheed',
      title: 'You\'ve been Sheed! 💘',
      body: `${sheeder.display_name} thinks you should meet someone`,
      data: { sheed_id: sheed.id }
    }
  ]);

  // Update sheeder stats
  await supabase.rpc('increment_user_stat', {
    user_id: sheeder.id,
    stat_name: 'total_sheeds_created'
  });

  return new Response(
    JSON.stringify({ sheed, chatrooms: createdChatrooms }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

#### `check-expired-sheeds` (Scheduled)
```typescript
// supabase/functions/check-expired-sheeds/index.ts
// Runs via pg_cron every hour

serve(async () => {
  const supabase = createClient(/*...*/);

  // Find and expire sheeds past their expiration date
  const { data: expiredSheeds } = await supabase
    .from('sheeds')
    .update({ status: 'expired' })
    .in('status', ['pending', 'active'])
    .lt('expires_at', new Date().toISOString())
    .select();

  // Notify participants
  for (const sheed of expiredSheeds || []) {
    await supabase.from('notifications').insert([
      {
        user_id: sheed.sheeder_id,
        type: 'sheed_expired',
        title: 'Sheed Expired',
        body: 'Your sheed didn\'t reach the success threshold',
        data: { sheed_id: sheed.id }
      }
    ]);
  }

  return new Response(JSON.stringify({ expired: expiredSheeds?.length || 0 }));
});
```

---

## 7. Screen Specifications

### 7.1 Screen Overview

| # | Screen | Route | Purpose |
|---|--------|-------|---------|
| 1 | Splash | `/` | App loading, auth check |
| 2 | Onboarding | `/onboarding` | First-time user flow |
| 3 | Auth | `/auth` | Sign in with SSO |
| 4 | Home (Sheeder) | `/(tabs)/home` | My created sheeds |
| 5 | Inbox (Sheedé) | `/(tabs)/inbox` | Sheeds I received |
| 6 | Create Sheed | `/sheed/create` | Multi-step sheed creation |
| 7 | Sheed Detail | `/sheed/[id]` | View sheed status & chats |
| 8 | Chat | `/chat/[id]` | Messaging screen |
| 9 | Profile | `/(tabs)/profile` | User profile & stats |
| 10 | Contacts | `/contacts` | Import & manage contacts |

---

### 7.2 Screen 1: Splash

**Route:** `/`

**Purpose:** Display logo while checking authentication state.

**UI Components:**
- Centered SHEED logo (animated)
- Subtle loading indicator

**State Required:**
- `isLoading: boolean`
- `isAuthenticated: boolean`

**API Calls:**
- `supabase.auth.getSession()`

**Flow:**
```
┌─────────────────┐
│                 │
│    [LOGO]       │    Check auth
│                 │    ──────────►  Auth? ─Yes─► /(tabs)/home
│   Loading...    │                   │
│                 │                   No
└─────────────────┘                   │
                                      ▼
                                  /onboarding (new)
                                  /auth (returning)
```

**States:**
- **Loading:** Show logo with pulse animation
- **Error:** Retry button if auth check fails

---

### 7.3 Screen 2: Onboarding

**Route:** `/onboarding`

**Purpose:** Introduce new users to SHEED concept.

**UI Components:**
```
┌────────────────────────────────┐
│                                │
│      [Illustration 1]         │
│                                │
│   "Be the Ultimate Cupid"     │
│                                │
│   Connect your friends and    │
│   watch the magic happen      │
│                                │
│         ○ ● ○ ○               │  ◄── Page indicators
│                                │
│   [    Get Started    ]       │
│                                │
│      Skip                      │
└────────────────────────────────┘
```

**Slides:**
1. "Be the Ultimate Cupid" - Intro to Sheeder role
2. "Real Connections" - Value prop for Sheedés
3. "Track Your Success" - Gamification preview
4. "Privacy First" - Security explanation

**State Required:**
- `currentSlide: number`
- `hasCompletedOnboarding: boolean` (AsyncStorage)

**API Calls:** None

**Navigation:**
- "Get Started" → `/auth`
- "Skip" → `/auth`
- Completes → Set `hasCompletedOnboarding = true`

---

### 7.4 Screen 3: Auth

**Route:** `/auth`

**Purpose:** Authenticate users via SSO providers.

**UI Components:**
```
┌────────────────────────────────┐
│                                │
│         [SHEED Logo]          │
│                                │
│     Welcome to SHEED          │
│                                │
│  ┌────────────────────────┐   │
│  │ 🍎 Continue with Apple │   │
│  └────────────────────────┘   │
│                                │
│  ┌────────────────────────┐   │
│  │ G  Continue with Google│   │
│  └────────────────────────┘   │
│                                │
│                                │
│  By continuing, you agree to  │
│  our Terms and Privacy Policy │
│                                │
└────────────────────────────────┘
```

**State Required:**
- `isLoading: boolean`
- `error: string | null`
- `provider: 'apple' | 'google' | null`

**API Calls:**
- `supabase.auth.signInWithOAuth({ provider })`

**States:**
- **Default:** Both buttons enabled
- **Loading:** Selected provider button shows spinner, other disabled
- **Error:** Toast with error message, buttons re-enabled

**Post-Auth Flow:**
1. Auth callback received
2. Check if user profile exists
3. If new user → `/profile/setup` (create profile)
4. If existing user → `/(tabs)/home`

---

### 7.5 Screen 4: Home (Sheeder Dashboard)

**Route:** `/(tabs)/home`

**Purpose:** Show all sheeds created by the current user.

**UI Components:**
```
┌────────────────────────────────┐
│ My Sheeds           [+ Create] │
├────────────────────────────────┤
│ [All] [Active] [Success] [Exp] │ ◄── Filters
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ 👤 Alex ↔ 👤 Jordan       │ │
│ │ Status: Active  💬 7/10   │ │
│ │ 2 days remaining          │ │
│ │ ────────────────────────  │ │
│ │ "You both love hiking..." │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 👤 Sam ↔ 👤 Riley          │ │
│ │ Status: Success ✅         │ │
│ │ Completed Jan 15          │ │
│ └────────────────────────────┘ │
│                                │
│        [Load More]             │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface HomeState {
  sheeds: Sheed[];
  filter: 'all' | 'pending' | 'active' | 'success' | 'expired';
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  page: number;
}
```

**API Calls:**
- `GET sheeds WHERE sheeder_id = currentUser`
- Pagination: 20 per page

**Empty State:**
```
┌────────────────────────────────┐
│                                │
│       [Cupid illustration]    │
│                                │
│   No Sheeds Yet!              │
│                                │
│   Time to play matchmaker.    │
│   Create your first sheed!    │
│                                │
│   [  Create Sheed  ]          │
│                                │
└────────────────────────────────┘
```

**Error State:**
- Retry button
- Pull-to-refresh always available

---

### 7.6 Screen 5: Inbox (Sheedé Inbox)

**Route:** `/(tabs)/inbox`

**Purpose:** Show all sheeds where current user is a Sheedé.

**UI Components:**
```
┌────────────────────────────────┐
│ Inbox                    🔔 3  │
├────────────────────────────────┤
│ [New] [In Progress] [History] │
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ 🆕 New Sheed!             │ │
│ │ From: Taylor              │ │
│ │ Match: Unknown (tap to    │ │
│ │       reveal)             │ │
│ │ [Accept] [Decline]        │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 💬 Active with Casey      │ │
│ │ From: Morgan              │ │
│ │ 5 messages · 4 days left  │ │
│ │ Last: "Hey! Nice to..."   │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface InboxState {
  sheeds: SheedAsShede[];
  filter: 'new' | 'active' | 'history';
  unreadCount: number;
  isLoading: boolean;
}
```

**API Calls:**
- `GET sheeds WHERE sheede_1_id = currentUser OR sheede_2_id = currentUser`

**Interaction:**
- Tap "Accept" → Update sheed, navigate to `/sheed/[id]`
- Tap "Decline" → Confirmation modal, then update sheed
- Tap card → Navigate to `/sheed/[id]`

---

### 7.7 Screen 6: Create Sheed

**Route:** `/sheed/create`

**Purpose:** Multi-step wizard to create a new sheed.

**Step 1: Select First Person**
```
┌────────────────────────────────┐
│ ← Create Sheed      Step 1/3  │
├────────────────────────────────┤
│                                │
│ Who's the first person?       │
│                                │
│ ┌────────────────────────────┐ │
│ │ 🔍 Search contacts...      │ │
│ └────────────────────────────┘ │
│                                │
│ Recent                         │
│ ┌────────────────────────────┐ │
│ │ 👤 Alex Johnson            │ │
│ │    On SHEED                │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ 👤 Jordan Smith            │ │
│ │    Invite to SHEED         │ │
│ └────────────────────────────┘ │
│                                │
│ [Import Contacts]              │
└────────────────────────────────┘
```

**Step 2: Select Second Person**
```
┌────────────────────────────────┐
│ ← Create Sheed      Step 2/3  │
├────────────────────────────────┤
│                                │
│ Who's the second person?      │
│                                │
│ ┌─────────────────────────┐   │
│ │ 👤 Alex Johnson    ✓    │   │ ◄── First person shown
│ │    Selected             │   │
│ └─────────────────────────┘   │
│                                │
│ Now select their match:        │
│                                │
│ ┌────────────────────────────┐ │
│ │ 🔍 Search contacts...      │ │
│ └────────────────────────────┘ │
│ [Contact list...]              │
└────────────────────────────────┘
```

**Step 3: Write Introduction**
```
┌────────────────────────────────┐
│ ← Create Sheed      Step 3/3  │
├────────────────────────────────┤
│                                │
│ 👤 Alex  ♥  👤 Jordan         │
│                                │
│ Why should they meet?          │
│                                │
│ ┌────────────────────────────┐ │
│ │ You both love hiking and  │ │
│ │ have the same dark humor. │ │
│ │ I think you'd really hit  │ │
│ │ it off!                   │ │
│ │                           │ │
│ │                    85/500 │ │
│ └────────────────────────────┘ │
│                                │
│ 💡 Tip: Be specific about     │
│    why they're a good match   │
│                                │
│ [    Create Sheed    ]        │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface CreateSheedState {
  step: 1 | 2 | 3;
  person1: Contact | null;
  person2: Contact | null;
  introMessage: string;
  isSubmitting: boolean;
  searchQuery: string;
}
```

**Validation:**
- Person 1 and Person 2 must be different
- Neither can be the current user
- Intro message: 10-500 characters

**API Calls:**
- `GET contacts` (paginated, searchable)
- `POST create-sheed` (Edge Function)

---

### 7.8 Screen 7: Sheed Detail

**Route:** `/sheed/[id]`

**Purpose:** View sheed status and access chatrooms.

**UI Components (Sheeder View):**
```
┌────────────────────────────────┐
│ ← Sheed Details               │
├────────────────────────────────┤
│                                │
│      👤 Alex  ♥  👤 Jordan    │
│                                │
│    ┌─────────────────────┐    │
│    │ Status: Active      │    │
│    │ 💬 7/10 messages    │    │
│    │ ████████░░ 70%      │    │
│    │ 4 days remaining    │    │
│    └─────────────────────┘    │
│                                │
│ Your intro message:            │
│ "You both love hiking..."     │
│                                │
├────────────────────────────────┤
│ Chatrooms                      │
│                                │
│ ┌────────────────────────────┐ │
│ │ 💬 Chat with Alex    →    │ │
│ │    Last: "Thanks for..."  │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 💬 Chat with Jordan  →    │ │
│ │    Last: "I'm excited..." │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 🔒 Alex ↔ Jordan          │ │
│ │    Private (7 messages)   │ │
│ └────────────────────────────┘ │
│                                │
└────────────────────────────────┘
```

**UI Components (Sheedé View):**
```
┌────────────────────────────────┐
│ ← Sheed Details               │
├────────────────────────────────┤
│                                │
│ Taylor matched you with:       │
│                                │
│      👤 Jordan Smith          │
│      "Loves hiking, coding"   │
│      [View Profile]           │
│                                │
│ Taylor's intro:                │
│ "You both love hiking..."     │
│                                │
├────────────────────────────────┤
│ Chatrooms                      │
│                                │
│ ┌────────────────────────────┐ │
│ │ 💬 Chat with Jordan  →    │ │
│ │    Start the conversation!│ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 💬 Chat with Taylor  →    │ │
│ │    Ask about your match   │ │
│ └────────────────────────────┘ │
│                                │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface SheedDetailState {
  sheed: Sheed;
  chatrooms: Chatroom[];
  userRole: 'sheeder' | 'sheede';
  isLoading: boolean;
}
```

**API Calls:**
- `GET sheeds WHERE id = sheedId`
- `GET chatrooms WHERE sheed_id = sheedId`

**Realtime:**
- Subscribe to sheed updates (status, message_count)

---

### 7.9 Screen 8: Chat

**Route:** `/chat/[id]`

**Purpose:** Real-time messaging interface.

**UI Components:**
```
┌────────────────────────────────┐
│ ← Jordan Smith         •Online│
├────────────────────────────────┤
│                                │
│        ┌─────────────────┐    │
│        │ Hey! Nice to    │    │
│        │ meet you! 😊    │    │
│        │         10:30am │    │
│        └─────────────────┘    │
│                                │
│  ┌─────────────────┐          │
│  │ Hi! Taylor told │          │
│  │ me about you    │          │
│  │ 10:32am         │          │
│  └─────────────────┘          │
│                                │
│        ┌─────────────────┐    │
│        │ Yeah! So you're │    │
│        │ into hiking too?│    │
│        │         10:33am │    │
│        └─────────────────┘    │
│                                │
│                                │
├────────────────────────────────┤
│ ┌─────────────────────────┐ 📷│
│ │ Type a message...       │ ↑ │
│ └─────────────────────────┘   │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  inputText: string;
  otherUser: User;
  chatroomType: ChatroomType;
}
```

**API Calls:**
- `GET messages WHERE chatroom_id = id ORDER BY created_at`
- `POST messages (chatroom_id, content)`
- `PUT messages (mark as read)`

**Realtime:**
- Subscribe to new messages in chatroom
- Typing indicators (optional v2)

**Features:**
- Auto-scroll to bottom on new message
- Sent/delivered/read indicators
- Image upload (v2)
- Pull to load older messages

---

### 7.10 Screen 9: Profile

**Route:** `/(tabs)/profile`

**Purpose:** User profile, stats, and settings.

**UI Components:**
```
┌────────────────────────────────┐
│ Profile                  [⚙️]  │
├────────────────────────────────┤
│                                │
│        ┌───────────┐          │
│        │   👤      │          │
│        │  Avatar   │          │
│        └───────────┘          │
│       Taylor Martinez         │
│     taylor@email.com          │
│                                │
│     [Edit Profile]            │
│                                │
├────────────────────────────────┤
│ Stats                          │
│                                │
│ ┌──────────┬──────────┬──────┐│
│ │  🎯 24   │  ✅ 18   │ 75%  ││
│ │ Created  │ Success  │ Rate ││
│ └──────────┴──────────┴──────┘│
│                                │
│ 🏆 Points: 1,250              │
│ 📊 Rank: #42 (Top 5%)         │
│                                │
├────────────────────────────────┤
│ Achievements                   │
│                                │
│ 🥇 First Sheed                │
│ 💘 5 Successful Matches       │
│ 🔥 3 Day Streak               │
│                                │
├────────────────────────────────┤
│ [Leaderboard]                  │
│ [Settings]                     │
│ [Help & Support]               │
│ [Sign Out]                     │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface ProfileState {
  user: User;
  stats: UserStats;
  achievements: Achievement[];
  isLoading: boolean;
}
```

**API Calls:**
- `GET users WHERE auth_id = currentUser`
- `GET user_achievements`

---

### 7.11 Screen 10: Contacts

**Route:** `/contacts`

**Purpose:** Import and manage phone contacts.

**UI Components:**
```
┌────────────────────────────────┐
│ ← Contacts           [Import] │
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ 🔍 Search contacts...      │ │
│ └────────────────────────────┘ │
├────────────────────────────────┤
│ On SHEED (12)                  │
│                                │
│ ┌────────────────────────────┐ │
│ │ 👤 Alex Johnson      ✓    │ │
│ │    @alexj                  │ │
│ └────────────────────────────┘ │
│ [More...]                      │
│                                │
├────────────────────────────────┤
│ Not on SHEED (156)             │
│                                │
│ ┌────────────────────────────┐ │
│ │ 👤 Jordan Smith            │ │
│ │    +1 555-123-4567         │ │
│ │              [Invite]      │ │
│ └────────────────────────────┘ │
│ [More...]                      │
└────────────────────────────────┘
```

**State Required:**
```typescript
interface ContactsState {
  contacts: Contact[];
  searchQuery: string;
  isImporting: boolean;
  hasPermission: boolean;
}
```

**API Calls:**
- `POST contacts (batch upsert)`
- `GET contacts`
- Expo Contacts API for device contacts

**Permissions:**
- Request contacts permission
- Handle denied state with explanation

---

## 8. Business Rules

### 8.1 Sheed Creation Rules

| Rule | Description |
|------|-------------|
| BR-001 | A user cannot sheed themselves |
| BR-002 | Sheede 1 and Sheede 2 must be different people |
| BR-003 | Sheeder must have both people in their contacts |
| BR-004 | Intro message must be 10-500 characters |
| BR-005 | A user can create unlimited sheeds |
| BR-006 | Multiple sheeders can match the same duo |

### 8.2 Privacy Rules

| Rule | Description |
|------|-------------|
| BR-010 | Sheeder CANNOT read the Sheedé ↔ Sheedé chatroom |
| BR-011 | Sheedé identities hidden until both accept (v2) |
| BR-012 | Match profile visible after acceptance |
| BR-013 | Message content never shared outside participants |
| BR-014 | Users can delete their chat history |

### 8.3 Success Calculation

```
SUCCESS CRITERIA:
─────────────────────────────────────────────────────
1. Total messages in Sheedé ↔ Sheedé chatroom ≥ 10
2. Both Sheedés have sent at least 1 message
3. Messages sent within 7-day window
4. System messages excluded from count
─────────────────────────────────────────────────────

POINTS AWARDED:
- Sheeder: +50 points on success
- Sheedé 1: +10 points on success
- Sheedé 2: +10 points on success
```

### 8.4 Expiration Rules

| Rule | Description |
|------|-------------|
| BR-020 | Sheeds expire 7 days after creation |
| BR-021 | Expiration paused if success reached |
| BR-022 | 24-hour warning notification sent |
| BR-023 | Expired sheeds move to history |
| BR-024 | Chatrooms remain readable after expiration |

### 8.5 Multiple Sheeders Same Duo

```
SCENARIO: Taylor and Morgan both sheed Alex ↔ Jordan
─────────────────────────────────────────────────────

SHEED A (by Taylor):
├── Chatroom: Taylor ↔ Alex
├── Chatroom: Taylor ↔ Jordan
└── Chatroom: Alex ↔ Jordan (A)

SHEED B (by Morgan):
├── Chatroom: Morgan ↔ Alex
├── Chatroom: Morgan ↔ Jordan
└── Chatroom: Alex ↔ Jordan (B)

RESULT:
- Two separate sheede_sheede chatrooms exist
- Alex and Jordan can chat in both
- Each sheed tracks success independently
- Both sheeders can earn points
```

---

## 9. Gamification

### 9.1 Points System

| Action | Points | Limit |
|--------|--------|-------|
| Create a sheed | +5 | Unlimited |
| Sheed reaches "active" | +10 | Per sheed |
| Sheed reaches "success" (as Sheeder) | +50 | Per sheed |
| Sheed reaches "success" (as Sheedé) | +10 | Per sheed |
| First sheed of the day | +5 | 1x daily |
| 3-day streak (creating sheeds) | +25 | Weekly |
| Invited friend joins | +20 | Unlimited |

### 9.2 Success Rate

```typescript
// Success rate calculation
const successRate = (successfulSheeds / totalSheeds) * 100;

// Display tiers
if (successRate >= 80) tier = "Cupid Legend 💘";
else if (successRate >= 60) tier = "Love Expert 💕";
else if (successRate >= 40) tier = "Matchmaker 💝";
else if (successRate >= 20) tier = "Apprentice 💗";
else tier = "Beginner ❤️";
```

### 9.3 Leaderboard

**Categories:**
1. **Points** - Total points accumulated
2. **Success Rate** - % of successful sheeds (min 5 sheeds)
3. **Most Sheeds** - Total sheeds created
4. **Hot Streak** - Current consecutive successful sheeds

**Display:**
- Top 100 users shown
- Current user's rank highlighted
- Weekly and all-time views
- Friends-only filter

### 9.4 Achievements

| Achievement | Criteria | Badge |
|-------------|----------|-------|
| First Sheed | Create 1 sheed | 🎯 |
| Matchmaker | 5 successful sheeds | 💘 |
| Love Guru | 25 successful sheeds | 👼 |
| Perfect Week | 7-day sheed streak | 🔥 |
| Networker | 50 contacts imported | 📱 |
| Influencer | 10 friends joined via invite | 🌟 |
| Century Club | 100 points | 💯 |

### 9.5 Progress Bars

**Sheed Progress:**
```
┌─────────────────────────────────────────────┐
│ Messages: 7/10                              │
│ █████████████████████░░░░░░░  70%          │
│ 3 more messages until success!              │
└─────────────────────────────────────────────┘
```

**Daily Goal:**
```
┌─────────────────────────────────────────────┐
│ Daily Sheeds: 2/3                           │
│ ████████████████████░░░░░░░░  67%          │
│ Create 1 more sheed for bonus points!       │
└─────────────────────────────────────────────┘
```

---

## 10. Security & Privacy

### 10.1 Authentication

**SSO Only Policy:**
- No email/password authentication
- Apple Sign-In (required for iOS)
- Google Sign-In
- Future: Phone number verification

**Session Management:**
- JWT tokens via Supabase Auth
- 7-day refresh token expiry
- Automatic token refresh
- Secure token storage (Expo SecureStore)

### 10.2 Data Protection

**Encryption:**
- All API calls over HTTPS/TLS 1.3
- Data at rest encrypted (Supabase default)
- Sensitive fields hashed where applicable

**Data Access:**
```sql
-- Example: User can only see messages in their chatrooms
CREATE POLICY "messages_participant_access" ON messages
  FOR SELECT
  USING (
    chatroom_id IN (
      SELECT id FROM chatrooms
      WHERE participant_a_id = current_user_id()
         OR participant_b_id = current_user_id()
    )
  );
```

### 10.3 RLS Security Matrix

| Table | Own Data | Participants | Public |
|-------|----------|--------------|--------|
| users | RW | R (profile) | - |
| contacts | RW | - | - |
| sheeds | RW (sheeder) | R (sheedés) | - |
| chatrooms | - | R (participants) | - |
| messages | W (sender) | R (participants) | - |
| notifications | R | - | - |

### 10.4 Contact Permissions

**Request Flow:**
1. Explain why contacts needed
2. Request iOS/Android permission
3. Handle denial gracefully
4. Allow manual entry fallback

**Data Handling:**
- Only store phone/email/name
- Never access SMS or call history
- Sync on-demand, not automatic
- Delete contact data on user request

### 10.5 GDPR Compliance

| Right | Implementation |
|-------|----------------|
| Access | Export all user data via settings |
| Rectification | Edit profile, delete messages |
| Erasure | "Delete Account" purges all data |
| Portability | JSON export of sheeds, messages |
| Withdraw Consent | Disable notifications, revoke contacts |

**Data Retention:**
- Active accounts: Indefinite
- Deleted accounts: 30-day grace, then hard delete
- Expired sheeds: Retain 90 days, then archive
- Messages: Retain until user or sheed deleted

---

## 11. Design System

### 11.1 Design Tokens

#### Colors

**Theme: Dopamine & Neon (Dark)**
```css
/* Primary */
--primary-500: #8B5CF6;      /* Violet */
--primary-400: #A78BFA;
--primary-600: #7C3AED;

/* Secondary */
--secondary-500: #EC4899;    /* Pink */
--secondary-400: #F472B6;

/* Accent */
--accent-500: #06B6D4;       /* Cyan */
--accent-glow: #22D3EE;

/* Backgrounds */
--bg-primary: #0F0F1A;       /* Deep purple-black */
--bg-secondary: #1A1A2E;
--bg-card: #252538;
--bg-elevated: #2D2D44;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A0A0B8;
--text-muted: #6B6B80;

/* Status */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

**Theme: Gelato Glow (Light)**
```css
/* Primary */
--primary-500: #8B5CF6;      /* Violet */
--primary-100: #EDE9FE;

/* Secondary */
--secondary-500: #EC4899;    /* Pink */
--secondary-100: #FCE7F3;

/* Backgrounds */
--bg-primary: #FFFBFE;       /* Warm white */
--bg-secondary: #FDF4F8;     /* Blush */
--bg-card: #FFFFFF;

/* Text */
--text-primary: #1F1F2E;
--text-secondary: #6B6B80;
```

#### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Space Grotesk', sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

#### Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

#### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### 11.2 Component Library

#### Button Variants

```tsx
// Primary Button
<Button variant="primary">Create Sheed</Button>
// bg-primary-500, text-white, rounded-xl, py-4

// Secondary Button
<Button variant="secondary">View Profile</Button>
// bg-bg-card, text-text-primary, border border-primary-500

// Ghost Button
<Button variant="ghost">Cancel</Button>
// bg-transparent, text-text-secondary

// Danger Button
<Button variant="danger">Decline</Button>
// bg-error/10, text-error
```

#### Card Component

```tsx
<Card>
  <Card.Header>
    <Avatar src={user.avatar} />
    <Text variant="title">{user.name}</Text>
  </Card.Header>
  <Card.Body>
    {/* Content */}
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Styling: bg-bg-card, rounded-2xl, p-4, shadow-lg
```

#### Avatar Component

```tsx
<Avatar
  src={imageUrl}
  size="sm" | "md" | "lg" | "xl"
  status="online" | "offline"
/>

// Sizes: sm=32px, md=40px, lg=56px, xl=80px
// Status dot: absolute bottom-right
```

#### Badge Component

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Expired</Badge>
<Badge variant="info">New</Badge>

// Pill shape, uppercase, small text
```

#### Progress Bar

```tsx
<ProgressBar
  value={7}
  max={10}
  showLabel
  variant="gradient" // Uses primary-to-secondary gradient
/>
```

#### Input Component

```tsx
<Input
  label="Introduction Message"
  placeholder="Why should they meet?"
  maxLength={500}
  showCount
  multiline
  rows={4}
/>

// Dark mode: bg-bg-secondary, border-bg-elevated
// Focus: ring-2 ring-primary-500
```

### 11.3 Iconography

**Icon Library:** Lucide Icons (React Native compatible)

**Common Icons:**
- Navigation: Home, Inbox, User, Settings
- Actions: Plus, Send, Heart, X, Check
- Status: Clock, AlertCircle, CheckCircle
- Social: MessageCircle, Users, Share

### 11.4 Animation Guidelines

```tsx
// Standard transitions
const transitions = {
  fast: 150,    // Micro-interactions
  normal: 250,  // Standard UI
  slow: 350,    // Page transitions
};

// Spring config for React Native Reanimated
const springConfig = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

// Common animations
- Button press: scale(0.98)
- Card hover/press: scale(1.02), shadow increase
- Page enter: fadeIn + slideUp
- Modal: fadeIn bg + slideUp content
- Success: confetti burst from center
```

---

## 12. Navigation

### 12.1 Expo Router File Structure

```
app/
├── _layout.tsx              # Root layout (providers)
├── index.tsx                # Splash/redirect
├── (auth)/
│   ├── _layout.tsx          # Auth layout
│   ├── login.tsx            # SSO login screen
│   └── onboarding.tsx       # Onboarding slides
├── (tabs)/
│   ├── _layout.tsx          # Tab bar layout
│   ├── home.tsx             # Sheeder dashboard
│   ├── inbox.tsx            # Sheedé inbox
│   └── profile.tsx          # User profile
├── sheed/
│   ├── create.tsx           # Create sheed wizard
│   └── [id].tsx             # Sheed detail
├── chat/
│   └── [id].tsx             # Chat screen
├── contacts/
│   └── index.tsx            # Contacts management
└── settings/
    ├── index.tsx            # Settings menu
    ├── notifications.tsx    # Notification prefs
    └── privacy.tsx          # Privacy settings
```

### 12.2 Root Layout

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="sheed/create"
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="chat/[id]" />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

### 12.3 Tab Navigation

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, Inbox, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.bgPrimary,
          borderTopColor: colors.bgElevated,
        },
        tabBarActiveTintColor: colors.primary500,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Inbox color={color} />,
          tabBarBadge: unreadCount || undefined,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### 12.4 Modal Navigation

```tsx
// Presenting create sheed as modal
import { router } from 'expo-router';

// From anywhere in the app
router.push('/sheed/create');

// The modal automatically slides up because of:
// options={{ presentation: 'modal' }} in _layout.tsx
```

### 12.5 Deep Linking

**URL Scheme:** `sheed://`

**Supported Links:**
| URL | Screen | Use Case |
|-----|--------|----------|
| `sheed://` | Home | App open |
| `sheed://sheed/:id` | Sheed Detail | Push notification |
| `sheed://chat/:id` | Chat | Message notification |
| `sheed://invite/:code` | Onboarding | Invite link |

**Configuration:**
```json
// app.json
{
  "expo": {
    "scheme": "sheed",
    "ios": {
      "associatedDomains": ["applinks:sheed.app"]
    },
    "android": {
      "intentFilters": [{
        "action": "VIEW",
        "data": [{ "scheme": "sheed" }],
        "category": ["BROWSABLE", "DEFAULT"]
      }]
    }
  }
}
```

---

## 13. State Management

### 13.1 Zustand Stores

#### Auth Store

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false
      }),

      setSession: (session) => set({ session }),

      signOut: () => set({
        user: null,
        session: null,
        isAuthenticated: false
      }),

      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
```

#### Sheed Store

```typescript
// stores/sheedStore.ts
interface SheedState {
  // My created sheeds
  mySheeds: Sheed[];
  mySheedsFilter: SheedFilter;

  // Sheeds I received
  receivedSheeds: Sheed[];
  receivedFilter: SheedFilter;

  // Currently viewing
  activeSheed: Sheed | null;
  activeChatrooms: Chatroom[];

  // Actions
  setMySheeds: (sheeds: Sheed[]) => void;
  setReceivedSheeds: (sheeds: Sheed[]) => void;
  addSheed: (sheed: Sheed) => void;
  updateSheed: (id: string, updates: Partial<Sheed>) => void;
  setActiveSheed: (sheed: Sheed | null) => void;
  setFilter: (type: 'my' | 'received', filter: SheedFilter) => void;
}

export const useSheedStore = create<SheedState>((set, get) => ({
  mySheeds: [],
  mySheedsFilter: 'all',
  receivedSheeds: [],
  receivedFilter: 'new',
  activeSheed: null,
  activeChatrooms: [],

  setMySheeds: (sheeds) => set({ mySheeds: sheeds }),

  setReceivedSheeds: (sheeds) => set({ receivedSheeds: sheeds }),

  addSheed: (sheed) => set((state) => ({
    mySheeds: [sheed, ...state.mySheeds]
  })),

  updateSheed: (id, updates) => set((state) => ({
    mySheeds: state.mySheeds.map(s =>
      s.id === id ? { ...s, ...updates } : s
    ),
    receivedSheeds: state.receivedSheeds.map(s =>
      s.id === id ? { ...s, ...updates } : s
    ),
    activeSheed: state.activeSheed?.id === id
      ? { ...state.activeSheed, ...updates }
      : state.activeSheed
  })),

  setActiveSheed: (sheed) => set({ activeSheed: sheed }),

  setFilter: (type, filter) => set(
    type === 'my'
      ? { mySheedsFilter: filter }
      : { receivedFilter: filter }
  ),
}));
```

#### Chat Store

```typescript
// stores/chatStore.ts
interface ChatState {
  // Messages by chatroom
  messagesByChatroom: Record<string, Message[]>;

  // Current chatroom
  activeChatroomId: string | null;
  isTyping: boolean;
  inputText: string;

  // Unread counts
  unreadCounts: Record<string, number>;

  // Actions
  setMessages: (chatroomId: string, messages: Message[]) => void;
  addMessage: (chatroomId: string, message: Message) => void;
  setActiveChatroom: (id: string | null) => void;
  setInputText: (text: string) => void;
  markAsRead: (chatroomId: string) => void;
  updateUnreadCount: (chatroomId: string, count: number) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messagesByChatroom: {},
  activeChatroomId: null,
  isTyping: false,
  inputText: '',
  unreadCounts: {},

  setMessages: (chatroomId, messages) => set((state) => ({
    messagesByChatroom: {
      ...state.messagesByChatroom,
      [chatroomId]: messages
    }
  })),

  addMessage: (chatroomId, message) => set((state) => ({
    messagesByChatroom: {
      ...state.messagesByChatroom,
      [chatroomId]: [
        ...(state.messagesByChatroom[chatroomId] || []),
        message
      ]
    }
  })),

  setActiveChatroom: (id) => set({ activeChatroomId: id }),

  setInputText: (text) => set({ inputText: text }),

  markAsRead: (chatroomId) => set((state) => ({
    unreadCounts: { ...state.unreadCounts, [chatroomId]: 0 }
  })),

  updateUnreadCount: (chatroomId, count) => set((state) => ({
    unreadCounts: { ...state.unreadCounts, [chatroomId]: count }
  })),
}));
```

### 13.2 TanStack Query Keys

```typescript
// lib/queryKeys.ts
export const queryKeys = {
  // Users
  user: (id: string) => ['user', id] as const,
  currentUser: () => ['user', 'current'] as const,
  userStats: (id: string) => ['user', id, 'stats'] as const,

  // Contacts
  contacts: (userId: string) => ['contacts', userId] as const,
  contactSearch: (userId: string, query: string) =>
    ['contacts', userId, 'search', query] as const,

  // Sheeds
  sheeds: {
    all: () => ['sheeds'] as const,
    created: (userId: string) => ['sheeds', 'created', userId] as const,
    received: (userId: string) => ['sheeds', 'received', userId] as const,
    detail: (id: string) => ['sheeds', 'detail', id] as const,
  },

  // Chatrooms
  chatrooms: {
    bySheed: (sheedId: string) => ['chatrooms', 'sheed', sheedId] as const,
    detail: (id: string) => ['chatrooms', 'detail', id] as const,
  },

  // Messages
  messages: (chatroomId: string) => ['messages', chatroomId] as const,
  messagesInfinite: (chatroomId: string) =>
    ['messages', chatroomId, 'infinite'] as const,

  // Notifications
  notifications: (userId: string) => ['notifications', userId] as const,
  unreadCount: (userId: string) => ['notifications', userId, 'unread'] as const,

  // Leaderboard
  leaderboard: (type: 'points' | 'rate' | 'sheeds') =>
    ['leaderboard', type] as const,
};
```

### 13.3 Query Hooks

```typescript
// hooks/useSheeds.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useMySheeds() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.sheeds.created(user!.id),
    queryFn: () => fetchMySheeds(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateSheed() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: createSheed,
    onSuccess: (newSheed) => {
      // Add to cache
      queryClient.setQueryData(
        queryKeys.sheeds.created(user!.id),
        (old: Sheed[] = []) => [newSheed, ...old]
      );
      // Invalidate for fresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.sheeds.created(user!.id)
      });
    },
  });
}

// hooks/useMessages.ts
export function useMessages(chatroomId: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.messagesInfinite(chatroomId),
    queryFn: ({ pageParam = 0 }) =>
      fetchMessages(chatroomId, pageParam, 50),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 50 ? pages.length * 50 : undefined,
    enabled: !!chatroomId,
    staleTime: 0, // Always fresh for chat
  });
}

export function useSendMessage(chatroomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendMessage(chatroomId, content),
    onMutate: async (content) => {
      // Optimistic update
      const optimisticMessage = createOptimisticMessage(content);
      queryClient.setQueryData(
        queryKeys.messagesInfinite(chatroomId),
        (old: any) => addMessageToPages(old, optimisticMessage)
      );
      return { optimisticMessage };
    },
    onError: (err, content, context) => {
      // Rollback optimistic update
      queryClient.setQueryData(
        queryKeys.messagesInfinite(chatroomId),
        (old: any) => removeMessageFromPages(old, context!.optimisticMessage.id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.messagesInfinite(chatroomId)
      });
    },
  });
}
```

### 13.4 Realtime Subscriptions

```typescript
// hooks/useRealtimeMessages.ts
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeMessages(chatroomId: string) {
  const queryClient = useQueryClient();
  const { addMessage } = useChatStore();

  useEffect(() => {
    const channel = supabase
      .channel(`messages:${chatroomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chatroom_id=eq.${chatroomId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;

          // Update Zustand store for immediate UI
          addMessage(chatroomId, newMessage);

          // Update React Query cache
          queryClient.setQueryData(
            queryKeys.messagesInfinite(chatroomId),
            (old: any) => addMessageToPages(old, newMessage)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatroomId]);
}

// hooks/useRealtimeSheed.ts
export function useRealtimeSheed(sheedId: string) {
  const { updateSheed } = useSheedStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`sheed:${sheedId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sheeds',
          filter: `id=eq.${sheedId}`,
        },
        (payload) => {
          const updated = payload.new as Sheed;

          // Update store
          updateSheed(sheedId, updated);

          // Update query cache
          queryClient.setQueryData(
            queryKeys.sheeds.detail(sheedId),
            updated
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sheedId]);
}
```

---

## 14. Notifications

### 14.1 Notification Types

| Type | Trigger | Title | Body |
|------|---------|-------|------|
| `new_sheed` | Sheed created | "You've been Sheed! 💘" | "{Sheeder} thinks you should meet someone" |
| `sheed_accepted` | Sheedé accepts | "They're interested! 🎉" | "{Sheedé} accepted your sheed" |
| `sheed_declined` | Sheedé declines | "Not this time 💔" | "Your sheed with {names} was declined" |
| `new_message` | Message received | "{Sender}" | "{message preview}" |
| `sheed_success` | 10 messages reached | "It's a Match! 🎊" | "{names} hit it off! +50 points" |
| `sheed_expiring` | 24h before expiry | "Time's running out ⏰" | "Your sheed expires tomorrow" |
| `sheed_expired` | Sheed expires | "Sheed Expired" | "Your sheed with {names} has ended" |

### 14.2 Notification Payload Structure

```typescript
interface PushNotification {
  to: string;          // Expo push token
  title: string;
  body: string;
  data: {
    type: NotificationType;
    sheedId?: string;
    chatroomId?: string;
    senderId?: string;
  };
  sound: 'default' | null;
  badge?: number;
  channelId?: string;  // Android
}

// Example: New Message
{
  to: "ExponentPushToken[xxxx]",
  title: "Jordan",
  body: "Hey! Nice to meet you 😊",
  data: {
    type: "new_message",
    sheedId: "uuid",
    chatroomId: "uuid",
    senderId: "uuid"
  },
  sound: "default",
  badge: 3
}
```

### 14.3 Expo Push Configuration

```typescript
// lib/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return null;
  }

  // Check existing permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permission if not granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Push notification permission denied');
    return null;
  }

  // Get Expo push token
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: process.env.EXPO_PROJECT_ID,
  });

  // Android channel setup
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B5CF6',
    });

    await Notifications.setNotificationChannelAsync('messages', {
      name: 'Messages',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'message.wav',
    });
  }

  return token.data;
}

// Handle notification tap
export function setupNotificationListeners(navigation: any) {
  // Notification received while app is foregrounded
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('Foreground notification:', notification);
      // Could show in-app toast
    }
  );

  // User tapped on notification
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;

      switch (data.type) {
        case 'new_sheed':
        case 'sheed_accepted':
        case 'sheed_success':
          navigation.navigate('SheedDetail', { id: data.sheedId });
          break;
        case 'new_message':
          navigation.navigate('Chat', { id: data.chatroomId });
          break;
        default:
          navigation.navigate('Inbox');
      }
    }
  );

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}
```

### 14.4 Server-Side Push (Edge Function)

```typescript
// supabase/functions/send-push/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

interface PushRequest {
  userId: string;
  notification: {
    title: string;
    body: string;
    data: Record<string, any>;
  };
}

serve(async (req) => {
  const { userId, notification }: PushRequest = await req.json();

  // Get user's push token
  const supabase = createClient(/*...*/);
  const { data: user } = await supabase
    .from('users')
    .select('push_token, notifications_enabled')
    .eq('id', userId)
    .single();

  if (!user?.push_token || !user.notifications_enabled) {
    return new Response(JSON.stringify({ sent: false, reason: 'No token or disabled' }));
  }

  // Send via Expo
  const response = await fetch(EXPO_PUSH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
    body: JSON.stringify({
      to: user.push_token,
      title: notification.title,
      body: notification.body,
      data: notification.data,
      sound: 'default',
      priority: 'high',
    }),
  });

  const result = await response.json();

  // Handle invalid tokens
  if (result.data?.[0]?.status === 'error') {
    if (result.data[0].details?.error === 'DeviceNotRegistered') {
      // Remove invalid token
      await supabase
        .from('users')
        .update({ push_token: null })
        .eq('id', userId);
    }
  }

  return new Response(JSON.stringify({ sent: true, result }));
});
```

---

## 15. Error Handling

### 15.1 Error Codes

| Code | Category | Description | User Message |
|------|----------|-------------|--------------|
| `AUTH_001` | Auth | Invalid session | "Please sign in again" |
| `AUTH_002` | Auth | Token expired | "Session expired, signing you back in..." |
| `AUTH_003` | Auth | Account disabled | "Your account has been disabled" |
| `SHEED_001` | Sheed | Cannot sheed self | "You can't sheed yourself!" |
| `SHEED_002` | Sheed | Same person selected | "Please select two different people" |
| `SHEED_003` | Sheed | User not found | "This person hasn't joined SHEED yet" |
| `SHEED_004` | Sheed | Sheed not found | "This sheed no longer exists" |
| `SHEED_005` | Sheed | Already expired | "This sheed has expired" |
| `CHAT_001` | Chat | Not a participant | "You don't have access to this chat" |
| `CHAT_002` | Chat | Message too long | "Message exceeds 5000 characters" |
| `CHAT_003` | Chat | Send failed | "Message failed to send. Tap to retry." |
| `NET_001` | Network | No connection | "No internet connection" |
| `NET_002` | Network | Timeout | "Request timed out. Please try again." |
| `NET_003` | Network | Server error | "Something went wrong. Please try again." |

### 15.2 Error Handling Utility

```typescript
// lib/errors.ts
export class AppError extends Error {
  code: string;
  userMessage: string;
  isRetryable: boolean;

  constructor(
    code: string,
    message: string,
    userMessage: string,
    isRetryable = false
  ) {
    super(message);
    this.code = code;
    this.userMessage = userMessage;
    this.isRetryable = isRetryable;
  }
}

export const ErrorCodes = {
  AUTH_001: new AppError('AUTH_001', 'Invalid session', 'Please sign in again'),
  // ... etc
};

export function handleSupabaseError(error: any): AppError {
  // Map Supabase errors to app errors
  if (error.code === 'PGRST116') {
    return new AppError('NOT_FOUND', error.message, 'Not found', false);
  }
  if (error.code === '23505') {
    return new AppError('DUPLICATE', error.message, 'This already exists', false);
  }
  if (error.message?.includes('JWT')) {
    return new AppError('AUTH_002', error.message, 'Session expired', true);
  }

  // Default
  return new AppError(
    'UNKNOWN',
    error.message,
    'Something went wrong. Please try again.',
    true
  );
}
```

### 15.3 Retry Logic

```typescript
// lib/retry.ts
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const defaultConfig: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxAttempts, baseDelay, maxDelay, backoffMultiplier } = {
    ...defaultConfig,
    ...config,
  };

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry non-retryable errors
      if (error instanceof AppError && !error.isRetryable) {
        throw error;
      }

      if (attempt === maxAttempts) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffMultiplier, attempt - 1),
        maxDelay
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Usage in mutation
const sendMessage = useMutation({
  mutationFn: (content: string) =>
    withRetry(() => api.sendMessage(chatroomId, content), {
      maxAttempts: 3,
    }),
});
```

### 15.4 Offline Mode

```typescript
// hooks/useNetworkStatus.ts
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
      setConnectionType(state.type);
    });

    return () => unsubscribe();
  }, []);

  return { isOnline, connectionType };
}

// Offline queue for messages
// stores/offlineStore.ts
interface OfflineStore {
  pendingMessages: PendingMessage[];
  addPendingMessage: (msg: PendingMessage) => void;
  removePendingMessage: (id: string) => void;
  syncPendingMessages: () => Promise<void>;
}

export const useOfflineStore = create<OfflineStore>()(
  persist(
    (set, get) => ({
      pendingMessages: [],

      addPendingMessage: (msg) =>
        set((state) => ({
          pendingMessages: [...state.pendingMessages, msg],
        })),

      removePendingMessage: (id) =>
        set((state) => ({
          pendingMessages: state.pendingMessages.filter((m) => m.id !== id),
        })),

      syncPendingMessages: async () => {
        const { pendingMessages, removePendingMessage } = get();

        for (const msg of pendingMessages) {
          try {
            await api.sendMessage(msg.chatroomId, msg.content);
            removePendingMessage(msg.id);
          } catch (error) {
            console.error('Failed to sync message:', msg.id);
          }
        }
      },
    }),
    {
      name: 'offline-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 16. Testing

### 16.1 Unit Tests

**Framework:** Jest + React Native Testing Library

```typescript
// __tests__/stores/authStore.test.ts
import { useAuthStore } from '@/stores/authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().signOut();
  });

  it('should set user and mark as authenticated', () => {
    const mockUser = { id: '1', display_name: 'Test' };

    useAuthStore.getState().setUser(mockUser);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should clear user on sign out', () => {
    useAuthStore.getState().setUser({ id: '1', display_name: 'Test' });
    useAuthStore.getState().signOut();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});

// __tests__/utils/validation.test.ts
import { validateIntroMessage, validateSheedParticipants } from '@/utils/validation';

describe('validateIntroMessage', () => {
  it('should reject messages under 10 characters', () => {
    expect(validateIntroMessage('Short')).toEqual({
      valid: false,
      error: 'Message must be at least 10 characters',
    });
  });

  it('should reject messages over 500 characters', () => {
    const longMessage = 'a'.repeat(501);
    expect(validateIntroMessage(longMessage)).toEqual({
      valid: false,
      error: 'Message cannot exceed 500 characters',
    });
  });

  it('should accept valid messages', () => {
    expect(validateIntroMessage('This is a valid message!')).toEqual({
      valid: true,
    });
  });
});
```

### 16.2 Integration Tests

```typescript
// __tests__/integration/createSheed.test.ts
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateSheed } from '@/hooks/useSheeds';

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    functions: {
      invoke: jest.fn(),
    },
  },
}));

describe('useCreateSheed', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  it('should create a sheed and update cache', async () => {
    const mockSheed = {
      id: 'new-sheed-id',
      sheeder_id: 'user-1',
      sheede_1_id: 'user-2',
      sheede_2_id: 'user-3',
      status: 'pending',
    };

    (supabase.functions.invoke as jest.Mock).mockResolvedValueOnce({
      data: { sheed: mockSheed, chatrooms: [] },
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateSheed(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        sheede_1_id: 'user-2',
        sheede_2_id: 'user-3',
        intro_message: 'You two should meet!',
      });
    });

    expect(result.current.isSuccess).toBe(true);
  });
});
```

### 16.3 E2E Test Scenarios

**Framework:** Detox

```typescript
// e2e/createSheed.e2e.ts
describe('Create Sheed Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
    await loginAsTestUser();
  });

  it('should complete sheed creation wizard', async () => {
    // Step 1: Tap create button
    await element(by.id('create-sheed-button')).tap();
    await expect(element(by.text('Step 1/3'))).toBeVisible();

    // Step 2: Select first person
    await element(by.id('contact-search')).typeText('Alex');
    await element(by.id('contact-alex')).tap();
    await expect(element(by.text('Step 2/3'))).toBeVisible();

    // Step 3: Select second person
    await element(by.id('contact-search')).clearText();
    await element(by.id('contact-search')).typeText('Jordan');
    await element(by.id('contact-jordan')).tap();
    await expect(element(by.text('Step 3/3'))).toBeVisible();

    // Step 4: Write intro message
    await element(by.id('intro-message-input')).typeText(
      'You both love hiking and have similar humor!'
    );
    await element(by.id('create-sheed-submit')).tap();

    // Verify success
    await expect(element(by.text('Sheed Created!'))).toBeVisible();
    await expect(element(by.id('sheed-card-alex-jordan'))).toBeVisible();
  });

  it('should show validation error for short message', async () => {
    // Navigate to step 3
    await element(by.id('create-sheed-button')).tap();
    await element(by.id('contact-alex')).tap();
    await element(by.id('contact-jordan')).tap();

    // Type short message
    await element(by.id('intro-message-input')).typeText('Hi');
    await element(by.id('create-sheed-submit')).tap();

    // Verify error
    await expect(
      element(by.text('Message must be at least 10 characters'))
    ).toBeVisible();
  });
});

// e2e/chat.e2e.ts
describe('Chat Flow', () => {
  it('should send and receive messages in real-time', async () => {
    // Navigate to chat
    await element(by.id('sheed-card-alex-jordan')).tap();
    await element(by.id('chat-with-jordan')).tap();

    // Send message
    await element(by.id('message-input')).typeText('Hello!');
    await element(by.id('send-button')).tap();

    // Verify message appears
    await expect(element(by.text('Hello!'))).toBeVisible();

    // Verify sent status
    await expect(element(by.id('message-sent-indicator'))).toBeVisible();
  });
});
```

### 16.4 Test Coverage Requirements

| Category | Minimum Coverage |
|----------|-----------------|
| Stores | 90% |
| Hooks | 80% |
| Utils | 95% |
| Components | 70% |
| E2E Critical Paths | 100% |

---

## 17. Deployment

### 17.1 EAS Build Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://xxx.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGci..."
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://staging-xxx.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGci..."
      }
    },
    "production": {
      "ios": {
        "buildConfiguration": "Release",
        "credentialsSource": "remote"
      },
      "android": {
        "buildType": "app-bundle",
        "credentialsSource": "remote"
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://prod-xxx.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGci..."
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "team@sheed.app",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 17.2 OTA Updates

```json
// app.json (partial)
{
  "expo": {
    "updates": {
      "enabled": true,
      "checkAutomatically": "ON_LOAD",
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

```typescript
// App.tsx - Update check
import * as Updates from 'expo-updates';

useEffect(() => {
  async function checkForUpdates() {
    if (!__DEV__) {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // Optionally prompt user
          Alert.alert(
            'Update Available',
            'A new version is ready. Restart to apply?',
            [
              { text: 'Later', style: 'cancel' },
              { text: 'Restart', onPress: () => Updates.reloadAsync() },
            ]
          );
        }
      } catch (error) {
        console.error('Update check failed:', error);
      }
    }
  }

  checkForUpdates();
}, []);
```

### 17.3 Environment Variables

```bash
# .env.development
EXPO_PUBLIC_SUPABASE_URL=https://dev-xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
EXPO_PUBLIC_ENV=development

# .env.staging
EXPO_PUBLIC_SUPABASE_URL=https://staging-xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
EXPO_PUBLIC_ENV=staging

# .env.production
EXPO_PUBLIC_SUPABASE_URL=https://prod-xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
EXPO_PUBLIC_ENV=production
```

### 17.4 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test -- --coverage

      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - run: npm ci
      - run: eas build --platform all --profile preview --non-interactive

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - run: npm ci
      - run: eas update --branch staging --message "${{ github.event.head_commit.message }}"

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - run: npm ci
      - run: eas build --platform all --profile production --non-interactive --auto-submit
```

---

## 18. Appendices

### 18.1 API Response Examples

#### Get Sheed Response
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "sheeder_id": "user-001",
  "sheede_1_id": "user-002",
  "sheede_2_id": "user-003",
  "intro_message": "You both love hiking and have the same dark sense of humor. I think you'd really hit it off!",
  "status": "active",
  "sheede_1_accepted": true,
  "sheede_2_accepted": true,
  "message_count": 7,
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-22T10:30:00Z",
  "success_at": null,
  "sheeder": {
    "id": "user-001",
    "display_name": "Taylor Martinez",
    "avatar_url": "https://..."
  },
  "sheede_1": {
    "id": "user-002",
    "display_name": "Alex Johnson",
    "avatar_url": "https://..."
  },
  "sheede_2": {
    "id": "user-003",
    "display_name": "Jordan Smith",
    "avatar_url": "https://..."
  }
}
```

#### Get Messages Response
```json
{
  "messages": [
    {
      "id": "msg-001",
      "chatroom_id": "room-001",
      "sender_id": "user-002",
      "type": "text",
      "content": "Hey! Nice to finally connect 😊",
      "read_at": "2024-01-15T11:32:00Z",
      "created_at": "2024-01-15T11:30:00Z",
      "sender": {
        "id": "user-002",
        "display_name": "Alex Johnson",
        "avatar_url": "https://..."
      }
    },
    {
      "id": "msg-002",
      "chatroom_id": "room-001",
      "sender_id": "user-003",
      "type": "text",
      "content": "Hi Alex! Yeah, Taylor told me about you. So you're into hiking too?",
      "read_at": null,
      "created_at": "2024-01-15T11:35:00Z",
      "sender": {
        "id": "user-003",
        "display_name": "Jordan Smith",
        "avatar_url": "https://..."
      }
    }
  ],
  "hasMore": false,
  "nextCursor": null
}
```

### 18.2 SQL Migration Scripts

```sql
-- migrations/001_initial_schema.sql
-- Run this to set up the complete database

-- 1. Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Create enum types
CREATE TYPE sheed_status AS ENUM ('pending', 'active', 'success', 'expired', 'declined');
CREATE TYPE chatroom_type AS ENUM ('sheeder_sheede_1', 'sheeder_sheede_2', 'sheede_sheede');
CREATE TYPE message_type AS ENUM ('text', 'image', 'system');
CREATE TYPE notification_type AS ENUM (
  'new_sheed', 'sheed_accepted', 'sheed_declined',
  'new_message', 'sheed_success', 'sheed_expiring', 'sheed_expired'
);

-- 3. Create tables (see section 5.2 for full schema)
-- ... [tables creation]

-- 4. Create indexes
-- ... [indexes creation]

-- 5. Create RLS policies
-- ... [RLS policies]

-- 6. Create triggers
-- ... [triggers]

-- migrations/002_add_leaderboard_view.sql
CREATE OR REPLACE VIEW leaderboard_points AS
SELECT
  id,
  display_name,
  avatar_url,
  points,
  RANK() OVER (ORDER BY points DESC) as rank
FROM users
WHERE points > 0
ORDER BY points DESC
LIMIT 100;

CREATE OR REPLACE VIEW leaderboard_success_rate AS
SELECT
  id,
  display_name,
  avatar_url,
  total_sheeds_created,
  successful_sheeds,
  CASE
    WHEN total_sheeds_created > 0
    THEN ROUND((successful_sheeds::numeric / total_sheeds_created) * 100, 1)
    ELSE 0
  END as success_rate,
  RANK() OVER (
    ORDER BY (successful_sheeds::numeric / NULLIF(total_sheeds_created, 0)) DESC NULLS LAST
  ) as rank
FROM users
WHERE total_sheeds_created >= 5
ORDER BY success_rate DESC
LIMIT 100;
```

### 18.3 Design Mockup References

**Dark Theme (Dopamine & Neon):**
```
/design/design-1-dopamine-neon/
├── 01-splash.png
├── 02-onboarding-1.png
├── 02-onboarding-2.png
├── 02-onboarding-3.png
├── 03-auth.png
├── 04-home-empty.png
├── 04-home-filled.png
├── 05-inbox.png
├── 06-create-step1.png
├── 06-create-step2.png
├── 06-create-step3.png
├── 07-sheed-detail-sheeder.png
├── 07-sheed-detail-sheede.png
├── 08-chat.png
├── 09-profile.png
├── 10-contacts.png
└── components/
    ├── buttons.png
    ├── cards.png
    ├── inputs.png
    └── badges.png
```

**Light Theme (Gelato Glow):**
```
/design/design-2-gelato-glow/
├── [Same structure as above]
```

### 18.4 Third-Party Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~52.0.0 | Core framework |
| `expo-router` | ~4.0.0 | File-based routing |
| `@supabase/supabase-js` | ^2.39.0 | Backend client |
| `nativewind` | ^4.0.0 | Tailwind for RN |
| `zustand` | ^4.5.0 | State management |
| `@tanstack/react-query` | ^5.17.0 | Server state |
| `react-native-reanimated` | ~3.6.0 | Animations |
| `expo-notifications` | ~0.27.0 | Push notifications |
| `expo-contacts` | ~13.0.0 | Contact access |
| `expo-secure-store` | ~13.0.0 | Secure storage |
| `@react-native-community/netinfo` | ^11.0.0 | Network status |
| `lucide-react-native` | ^0.300.0 | Icons |

### 18.5 Glossary Quick Reference

| Term | Definition |
|------|------------|
| Sheed | A matchmaking action/entity |
| Sheeder | The matchmaker (creates sheeds) |
| Sheedé | The matched person (receives sheed) |
| Success | ≥10 messages in sheedé↔sheedé chat |
| Active | Sheedés engaged, <10 messages |
| Pending | Created, awaiting sheedé response |
| Expired | 7 days passed without success |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01 | PRD Team | Initial MVP specification |

---

*This PRD serves as the complete specification for SHEED MVP development. All sections are designed to be implementable without additional clarification.*

