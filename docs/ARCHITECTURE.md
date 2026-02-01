# Architecture du projet Looply

Ce document décrit l’organisation du code : **pages**, **composants**, **styles**, **logique métier** et **appels Supabase**. Il sert de référence pour garder une structure cohérente.

---

## 1. Principes

| Élément | Rôle | Règle courte |
|--------|------|----------------|
| **Pages** | Routes Next.js, métadonnées, composition | Pas de logique métier ni d’appels Supabase directs |
| **Composants** | UI réutilisable ou spécifique à une feature | Présentation + props/callbacks, pas d’appels API |
| **Styles** | Global + spécifique si besoin | Tailwind par défaut ; CSS modules ou fichiers dédiés pour cas complexes |
| **Logique / API** | Supabase uniquement (pas de backend custom) | Tout passe par `lib/` : client Supabase, services, auth |

---

## 2. Arborescence proposée

```
looply/
├── app/                          # Next.js App Router (pages = routes)
│   ├── (auth)/                   # Groupe : pages non connectées
│   │   ├── login/
│   │   │   ├── page.tsx          # Page : métadonnées + <LoginPage />
│   │   │   └── ...
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── layout.tsx            # Layout commun auth (centré, pas de sidebar)
│   ├── (dashboard)/             # Groupe : espace connecté
│   │   ├── layout.tsx           # Layout : sidebar, header, protection auth
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard (route /dashboard)
│   │   ├── clients/
│   │   ├── rdv/
│   │   ├── automatisations/
│   │   ├── messages/
│   │   └── parametres/
│   ├── layout.tsx               # Root layout (fonts, globals)
│   ├── globals.css
│   └── page.tsx                 # Landing ou redirection
│
├── components/
│   ├── ui/                      # Composants UI génériques
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                  # Structure globale
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageContainer.tsx
│   └── features/                # Composants par feature (optionnel)
│       ├── login/
│       │   ├── LoginForm.tsx
│       │   └── LoginBranding.tsx
│       ├── dashboard/
│       └── clients/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Client navigateur (createBrowserClient)
│   │   ├── server.ts            # Client serveur (cookies) pour RSC / API routes
│   │   └── middleware.ts        # Refresh session si besoin
│   ├── auth/                    # Logique auth (Supabase Auth)
│   │   ├── actions.ts           # signIn, signUp, signOut, resetPassword
│   │   └── utils.ts             # getSession, getUser, redirect si non connecté
│   ├── services/                # “Backend” = appels Supabase par domaine
│   │   ├── organizations.ts     # CRUD organisation, préférences
│   │   ├── clients.ts           # CRUD clients
│   │   ├── appointments.ts      # CRUD RDV
│   │   ├── automatisations.ts   # Règles, templates
│   │   ├── messages.ts          # Historique envois
│   │   └── ...
│   └── utils.ts                 # Helpers génériques (format date, etc.)
│
├── types/                       # Types TypeScript partagés
│   ├── database.ts              # Types générés depuis Supabase (optionnel)
│   ├── organization.ts
│   ├── client.ts
│   ├── appointment.ts
│   └── index.ts                 # Ré-exports
│
├── hooks/                       # Hooks React réutilisables
│   ├── useAuth.ts
│   ├── useOrganization.ts
│   ├── useClients.ts
│   └── ...
│
├── styles/                      # (Optionnel) Styles par feature ou composant
│   ├── login.module.css         # Si besoin au-delà de Tailwind
│   └── variables.css            # Variables CSS additionnelles
│
├── docs/
│   └── ARCHITECTURE.md          # Ce fichier
├── cahier-de-charge.md
├── package.json
└── ...
```

---

## 3. Rôles détaillés

### 3.1 Pages (`app/`)

- **Une page = un fichier `page.tsx`** (ou sous-dossiers pour segments de route).
- Contenu :
  - `export const metadata` (titre, description).
  - Import et rendu de **composants** et éventuellement de **hooks**.
  - Pas d’appel direct à Supabase : les pages délèguent à des **services** ou **actions** (appelés depuis des composants ou des Server Components via les services).
- Exemple : `app/(auth)/login/page.tsx` importe `<LoginForm />` ; `LoginForm` appelle `lib/auth/actions.signIn()` qui utilise Supabase.

### 3.2 Composants (`components/`)

- **`ui/`** : boutons, champs, cartes, modales — réutilisables partout, sans dépendance métier.
- **`layout/`** : header, sidebar, conteneur de page — structure de l’app.
- **`features/`** : composants liés à une feature (ex. formulaire de login, liste clients). Ils peuvent utiliser des hooks (`useAuth`, `useClients`) et appeler des **services** ou **actions** ; ils ne contiennent pas de `createClient` ni de requêtes Supabase brutes.

Convention : un composant de feature peut importer depuis `lib/services/*` et `lib/auth/*`, pas depuis `lib/supabase/client` directement (on passe par les couches auth/services).

### 3.3 Styles

- **Global** : `app/globals.css` (Tailwind, variables, keyframes).
- **Spécifique** : si un écran ou un composant a besoin de styles complexes difficiles à gérer en Tailwind seul, ajouter un fichier dans `styles/` (ex. `login.module.css`) et l’importer dans le composant ou la page concernée.
- On reste **Tailwind-first** pour garder une seule approche dominante.

### 3.4 Logique “backend” et appels API : Supabase dans `lib/`  

Il n’y a **pas de backend custom** : toute la logique serveur et les “appels API” sont des appels **Supabase** depuis le front (client ou serveur).

- **`lib/supabase/`**
  - `client.ts` : client navigateur (pour Client Components, hooks, actions).
  - `server.ts` : client serveur (pour Server Components, Route Handlers si besoin).
  - Utilisés **uniquement** par `lib/auth` et `lib/services`, pas par les pages ou composants UI bruts.

- **`lib/auth/`**
  - **actions** : `signIn`, `signUp`, `signOut`, `resetPassword`, etc. (Server Actions qui appellent Supabase Auth).
  - **utils** : `getSession()`, `getUser()`, redirection si non connecté — pour protéger les layouts et pages dashboard.

- **`lib/services/`**
  - Un fichier par domaine métier (organizations, clients, appointments, automatisations, messages).
  - Chaque fonction = une opération claire : `getClients(orgId)`, `createAppointment(orgId, data)`, etc.
  - Les services utilisent `createClient()` (client ou server selon le contexte) et font les requêtes Supabase (select, insert, update, delete). Les **pages et composants** appellent ces services (ou des Server Actions qui les appellent), jamais Supabase directement.

Exemple de flux :

1. Page `app/(auth)/login/page.tsx` affiche `<LoginForm />`.
2. `LoginForm` appelle `signIn(email, password)` depuis `lib/auth/actions`.
3. `signIn` utilise le client Supabase (navigateur ou serveur selon l’implémentation) pour `auth.signInWithPassword()`.

Un autre exemple :

1. Page `app/(dashboard)/clients/page.tsx` (Server Component) appelle `getClients(orgId)` depuis `lib/services/clients.ts`.
2. `getClients` utilise le client Supabase serveur et retourne les données ; la page les passe à un composant d’affichage.

---

## 4. Conventions de nommage

| Type | Convention | Exemple |
|------|------------|--------|
| Pages | minuscules, segments de route | `app/(dashboard)/clients/page.tsx` |
| Composants | PascalCase | `LoginForm.tsx`, `ClientCard.tsx` |
| Services | camelCase, verbe + domaine | `getClients`, `createAppointment` |
| Hooks | `use` + PascalCase | `useAuth`, `useOrganization` |
| Types | PascalCase | `Organization`, `AppointmentStatus` |
| Fichiers de styles | kebab ou module | `login.module.css`, `variables.css` |

---

## 5. Résumé des flux

- **Auth** : Page login → Composant `LoginForm` → `lib/auth/actions.signIn()` → Supabase Auth.
- **Données (lecture)** : Page dashboard → `lib/services/*.ts` (depuis Server Component ou via hook dans Client Component) → Supabase.
- **Données (écriture)** : Composant (ex. formulaire) → Server Action ou appel service → `lib/services/*.ts` → Supabase.
- **Styles** : Tailwind dans les composants ; `globals.css` pour global ; `styles/*.css` si besoin ciblé.

---

## 6. Prochaines étapes après validation

Une fois cette architecture validée :

1. Créer les dossiers et fichiers vides ou squelettes (`lib/supabase/`, `lib/auth/`, `lib/services/`, `types/`, `hooks/`, `components/ui|layout|features/`).
2. Déplacer / refactorer la page login actuelle pour qu’elle utilise `components/features/login/` et `lib/auth/actions`.
3. Brancher Supabase (client browser + server, variables d’env).
4. Implémenter les services au fil des features (organisations, clients, RDV, etc.).

Si tu valides cette structure (ou que tu veux modifier des noms / dossiers), on peut l’appliquer étape par étape dans le repo.
