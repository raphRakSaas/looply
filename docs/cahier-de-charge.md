# Cahier des charges technique — SaaS “Looply” (RDV, relances, avis)

## 1) Objectif produit
Créer une plateforme web destinée aux **petits professionnels** (coiffeur, esthéticienne, coach, garage, etc.) pour :
- réduire les **no-show** via des rappels automatiques,
- accélérer le **paiement des impayés** via des relances programmées,
- augmenter les **avis Google** via des demandes automatiques après prestation,
- (optionnel) permettre une **prise de rendez-vous** simple avec **acompte Stripe**.

Le produit doit être :
- simple à configurer (**onboarding < 10 minutes**),
- fiable sur les envois (pas de doublons, logs, relances),
- multi-tenant (chaque pro a son espace sécurisé),
- monétisable via abonnement (15–25€/mois).

---

## 2) Périmètre fonctionnel

### 2.1 Utilisateurs et rôles
- **Propriétaire (Owner)** : gère l’entreprise, les réglages, l’abonnement, les automatisations.
- **Membre (Admin/Staff)** *(optionnel MVP)* : gère RDV et clients, accès limité à la facturation/paramètres.

### 2.2 Gestion entreprise (Organisation)
Chaque entreprise possède :
- profil (nom, logo optionnel, timezone),
- canaux d’envoi activés (email / SMS / WhatsApp),
- préférences d’automatisation,
- lien d’avis Google,
- abonnement actif.

### 2.3 Gestion clients
Fonctionnalités :
- création/édition d’un client (nom, email, téléphone, note),
- anti-duplication simple (email/téléphone),
- historique des interactions (RDV, messages envoyés, relances).

### 2.4 Gestion rendez-vous / prestations
Fonctionnalités :
- création/édition RDV (client, service, date/heure, montant optionnel),
- statut RDV : `planifié` / `terminé` / `annulé` / `no_show`,
- statut paiement : `payé` / `impayé` / `inconnu`,
- actions rapides : marquer “terminé”, “payé”, “annulé”.

> MVP : liste + filtres (jour/semaine). Pas besoin d’un planning complexe type Doctolib.

### 2.5 Automatisations (cœur du produit)
Le pro configure des **règles** basées sur des événements :
- **Rappel avant RDV** : J-1, H-2 (configurable)
- **Demande d’avis** : X minutes/heures après RDV terminé
- **Relance impayé** : J+1, J+7, J+14 (configurable)
- *(optionnel)* **Relance devis/facture** si module activé

Chaque règle définit :
- canal d’envoi (email / SMS / WhatsApp),
- déclencheur (avant/après/retard),
- délai (offset),
- modèle de message (template),
- activation/désactivation.

**Contraintes :**
- éviter les doublons d’envoi,
- gérer les retries (pannes provider),
- conserver un historique complet,
- permettre la désactivation par client (opt-out).

### 2.6 Templates de messages
- templates par canal (email/SMS/WhatsApp),
- variables dynamiques : nom client, date/heure, entreprise, lien avis, montant, lien paiement,
- prévisualisation + test d’envoi (vers l’email/tel du pro).

### 2.7 Historique des envois et observabilité
- journal des messages : `en attente` / `envoyé` / `échec`,
- détail d’erreur (provider refuse, numéro invalide, etc.),
- actions : relancer manuellement, annuler un message planifié.

### 2.8 Collecte d’avis Google
- champ “Lien avis Google” par entreprise,
- workflow : après RDV marqué `terminé` → envoi demande d’avis,
- suivi basique : envoi / clic (via lien de redirection tracké),
- relance si pas de clic après X jours *(optionnel)*.

### 2.9 Paiement & abonnement (Stripe)
- abonnements mensuels **Starter** / **Pro**,
- accès aux fonctionnalités selon plan :
  - **Starter** : email + rappels + avis
  - **Pro** : + SMS/WhatsApp + relance impayés + booking + acompte
- gestion des statuts : `active` / `past_due` / `canceled`,
- portail client Stripe (factures, carte, annulation).

### 2.10 Page de réservation + acompte *(optionnel MVP+)*
- page publique par entreprise (URL unique),
- sélection service + créneau simple ou demande de créneau,
- paiement acompte via Stripe Checkout,
- création RDV automatique après paiement,
- email de confirmation client + pro.

---

## 3) Exigences non fonctionnelles

### 3.1 Sécurité
- authentification sécurisée (email + mot de passe + reset),
- support 2FA *(planifié, pas forcément MVP)*,
- séparation stricte des données entre entreprises (multi-tenant),
- protections anti-abus (rate-limit, captcha sur pages publiques si nécessaire),
- opt-out client conforme (STOP pour SMS, désinscription email).

### 3.2 Conformité & données personnelles
- collecte minimale (nom, email, tel),
- pages légales : politique de confidentialité + CGU,
- conservation des logs d’envoi (durée configurable, ex. 90 jours),
- RGPD : export/suppression possible *(MVP+ mais anticipé)*.

### 3.3 Fiabilité des envois
Architecture conceptuelle “file d’attente / outbox” :
- planification des messages à envoyer,
- worker d’envoi,
- retries avec backoff,
- idempotence (ne pas envoyer 2 fois),
- statuts clairs.

Tolérance aux pannes provider (Twilio/Resend).

### 3.4 Performance
- dashboard rapide (< 2s sur vues principales),
- pagination sur listes (clients, RDV, historique),
- traitement cron en batch.

### 3.5 Scalabilité
- multi-tenant dès le départ,
- traitement d’envoi découplé (cron + worker),
- extensible (nouveaux canaux et règles).

---

## 4) Parcours utilisateur (User journeys)

### 4.1 Onboarding (objectif : 10 minutes)
1) création compte  
2) création entreprise (nom, timezone)  
3) ajout lien avis Google  
4) choix du canal (email par défaut)  
5) activation des règles par défaut (J-1 + H-2 + avis après 2h)  
6) ajout rapide (manuel ou CSV) : clients + RDV  
7) test d’envoi  
8) activation abonnement (ou essai gratuit)

### 4.2 Utilisation quotidienne
- le pro crée ses RDV / marque `terminé` / marque `payé`,
- le système planifie et envoie automatiquement,
- le pro consulte l’historique + stats.

### 4.3 Gestion d’un impayé
- RDV ou facture marqué `impayé`,
- relances automatiques selon règles,
- lien de paiement *(optionnel)* → client paie → statut mis à jour.

---

## 5) Interfaces (écrans)

### 5.1 Dashboard
- compteurs : RDV du jour, rappels envoyés, avis demandés, impayés en cours
- actions rapides : créer RDV, créer client, config automatisations

### 5.2 Clients
- liste + recherche
- fiche client : RDV, messages envoyés, opt-out

### 5.3 RDV
- liste filtrée (jour/semaine, statut)
- actions : terminer / annuler / payé / impayé

### 5.4 Automatisations
- activation/désactivation
- réglage délais (J-1, H-2, etc.)
- choix canal
- gestion templates

### 5.5 Messages (Historique)
- statut + filtres
- relancer / annuler
- détails erreurs

### 5.6 Paramètres
- entreprise
- lien avis Google
- canaux (setup SMS/WhatsApp)
- abonnement & facturation

### 5.7 Booking public *(optionnel MVP+)*
- choix service + paiement acompte
- confirmation

---

## 6) Notifications et règles d’envoi (spécifications)

### 6.1 Rappels RDV
- règle par défaut : **J-1** (heure configurable) + **H-2**
- pas d’envoi si RDV `annulé`
- option : inclure lien “confirmer/annuler” (tracking)

### 6.2 Demande d’avis Google
- déclenchée après RDV `terminé`
- délai par défaut : +120 minutes
- relance optionnelle si pas de clic après X jours

### 6.3 Relances impayés
- déclenchées sur RDV/facture `impayé`
- séquence par défaut : J+1, J+7, J+14
- arrêt des relances si statut passe à `payé`

---

## 7) Reporting & indicateurs (MVP)
- nombre de messages envoyés / échoués
- taux de clic avis (si tracking activé)
- no-show (si le pro utilise le statut)
- impayés en cours (compteur)

---

## 8) Backlog (Roadmap)

### MVP (2 semaines)
- Auth + organisations + clients + RDV
- règles + templates
- planification + envoi email
- historique des envois
- Stripe abonnement
- avis Google automatique (email)

### V1 (3–5 semaines)
- SMS via provider
- relance impayés avancée + lien paiement
- booking public simple + acompte Stripe

### V2 (6–10 semaines)
- WhatsApp (templates et contraintes provider)
- devis/factures PDF
- rôles staff + permissions
- exports/archives + conformité renforcée