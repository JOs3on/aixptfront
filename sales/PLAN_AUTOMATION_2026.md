# Plan Stratégique — Outreach Automatisé & Priorisation (Q3–Q4 2026)

**Vue d'ensemble :** Ce plan couvre (1) le choix de niche, (2) le moteur d'outreach email piloté par IA en code custom (~0 $/mois), (3) le plan de re-warmup de vos 5 boîtes mail, (4) la conformité CASL, (5) la ré-estimation des coûts API du vocal et le pricing, (6) le plan 30/60/90 et (7) le backlog site web.

---

## 0. Résumé exécutif (ce que vous devriez faire)

1. **Niche 1 (email) : Dentistes** — votre liste actuelle de Québec + extraction Montréal à venir. Volume élevé, le courriel contourne la réceptionniste, votre Email X existe déjà.
2. **Niche 2 (email) : HVAC/CVC** — dès que la liste Montréal/Ville de Québec est prête. Propriétaires-opérateurs qui répondent eux-mêmes → taux de réponse élevé; offre vocale "appels d'urgence manqués" très forte.
3. **Concessionnaires : AUCUN cold email.** Réservez vos 2-3 appels/visites par semaine aux concessionnaires indépendants qualifiés de la liste courte. C'est votre terrain confortable (face-à-face) et les leads sont rares.
4. **SEO = produit d'entrée** pour générer du cash-flow et ouvrir des portes (upsell chatbot/site/vocal par la suite). Votre playbook ProfResults est complet — c'est le seul service que vous pouvez livrer sans dépendre de personne.
5. **Moteur d'outreach : code Python custom** (pas de n8n), exécuté en cron sur votre Mac (ou VM Oracle Always Free), $0/mois de logiciel, utilisant vos tokens AI gratuits (Gemini free tier, Perplexity, Groq).
6. **Warmup : 4 semaines avant le premier envoi réel**, sur vos 5 boîtes, ~5→20 courriels/jour/boîte, puis envois réels 10→50/jour au total.

---

## 1. Choix de niche (recommandation + logique)

| Critère | Dentistes | Concessionnaires | HVAC/CVC | SEO |
|---|---|---|---|---|
| Volume de leads | +++ (QC + MTL) | + (indépendants rares à QC) | +++ (MTL + entre-deux) | Selon niche |
| Contourne le gatekeeper | OUI (email → le dentiste propriétaire) | Oui (DG) | Oui (proprio-opérateur) | Oui |
| Taille du ticket | 2-4k (chatbot) / 4-4.8k (vocal) | 4.8k + 750$/mois | 4-4.8k + 750$/mois | 750-1 000 $ |
| Douleur vérifiable | Formulaires sans confirmation, appels en soirée perdus | Appels manqués = ventes perdues | Appels d'urgence manqués = contrats perdus | Rang Google mauvais |
| Copy existante | Oui (Email X vidéo) | Oui (complète) | Oui (complète) | Oui (workflow) |
| Fit avec email automatisé | **Excellent** | Faible (petit bassin) | **Excellent** | Bon |

**Recommandation :** lancez le moteur email sur **Dentistes** (liste QC immédiate), ajoutez **HVAC** quand la liste MTL est prête. Les concessionnaires passent par le canal humain (face-à-face + prototype audio), pas par l'email. Le SEO est vendu en parallèle comme produit d'appel auprès des mêmes prospects.

> **Question ouverte à trancher :** pour les dentistes, quelle offre leader ? Le chatbot (friction du formulaire web — votre Email X existant) OU le vocal (appels perdus en soirée/fin de semaine) ? Recommandation : **le vocal pour les cliniques avec 2+ dentistes** (volume d'appels suffisant), **le chatbot pour les cliniques solo**. L'email peut faire les deux selon la taille détectée.

---

## 2. Moteur d'outreach automatisé — Architecture (code custom, ~0 $/mois)

### 2.1 Principe

Votre framework "Email X + Variable Y" (Sales Outreach.md) se prête parfaitement à l'automatisation : Email X est **fixe** (code), Variable Y est **généré par IA** (recherche web + règles) et **validé par vous** avant envoi. Vous n'êtes impliqué que sur : (a) le contrôle qualité hebdomadaire des lots, (b) les réponses YES (c'est l'argent). Tout le reste tourne tout seul.

### 2.2 Composants (modules Python, exécutés en cron/launchd)

```
Module 1 — INGESTION          Charge les CSV (sales/leads/*.csv), normalise, dédoublonne
Module 2 — ENRICHISSEMENT     Pour chaque lead : génère le JSON "Variable Y" via Gemini/Perplexity
                              + recherche web (nom du décideur vérifié, page exacte, friction)
Module 3 — QUALITÉ (humain)   Vous validez un lot de 20 emails générés (checklist 10s send test)
Module 4 — ENVOI              Rotation des 5 boîtes, envois 8h-16h HNE lun-ven, 10→50/jour max,
                              via SMTP smtp.zoho.com (ou Zoho Mail API)
Module 5 — RÉPONSES           Poll IMAP toutes les 30-60 min → classification Gemini :
                              YES / QUESTION / NOT_INTERESTED / OOO / BOUNCE
Module 6 — SUIVIS & CONFORMITÉ  Follow-ups J3/J5/J7 (règles de compression du doc), opt-out,
                              suppression, logs de consentement, rapport hebdo par email
```

### 2.3 Pile technique (tout gratuit)

| Composant | Outil | Coût |
|---|---|---|
| Orchestration | Python 3 (stdlib `smtplib`/`imaplib`) + `cron` ou `launchd` | $0 |
| Données leads | Google Sheet (recommandé, partageable) ou CSV dans `sales/leads/` | $0 |
| Personnalisation AI | Gemini API — **free tier : 1 500 req/jour** (modèle Gemini Flash) | $0 |
| Recherche web pour enrichissement | Gemini avec *Grounding with Google Search* (dispo free tier) OU vos tokens Perplexity API | $0 |
| Générateur rapide de secours | Groq free tier (Llama 3.3 70B : 1 000 req/jour) | $0 |
| Envoi | Zoho Mail — vos 5 boîtes existantes (SMTP + IMAP) | $0 (déjà payé) |
| Runtime | Votre Mac (launchd) ou VM Oracle Cloud "Always Free" | $0 |
| Vérif. deliverabilité | mail-tester.com (gratuit), bounces via IMAP | $0 |

**Pourquoi pas n8n/Instantly/Smartlead :** n8n = coût de construction élevé pour une séquence aussi simple; Instantly/Smartlead = 37-47 $/mois sans vrai free tier, surdimensionnés pour 10-50 emails/jour. Le code custom fait exactement ce que votre framework demande, avec moins de friction.

### 2.4 Le prompt de génération "Variable Y" (encodage de vos règles)

Chaque lead reçoit ce JSON (à faire générer par Gemini + grounding web) :

```
{
  "decision_maker_name": "Prénom NOM (SEULEMENT si vérifié sur 2 sources : site + annuaire/GBP)",
  "company_name": "Nom public exact",
  "website": "domaine officiel",
  "page_url": "URL exacte de la page où vit la friction",
  "friction": "UNE friction visible <10s sur UNE page (formulaire sans confirmation, pas de chat, pas de téléphone en soirée...)",
  "recognizable_reason": "Comportement humain du visiteur (ex: « remplit le formulaire puis cherche ailleurs ») — PAS de jargon marketing",
  "consequence_mechanism": "Chaîne cause-effet SANS chiffres (friction → hésitation → rupture de momentum → sortie/retard → moins de rendez-vous)",
  "subject_line": "Libellé de décision qui reflète LE micro-oui de l'email (répondable en une ligne)",
  "lead_type": "chatbot | vocal | seo",
  "consent_basis": {"type": "publication_conspicue", "url_source": "https://...", "date_verif": "YYYY-MM-DD"}
}
```

**Règles à encoder dans le prompt système (issues de Sales Outreach.md) :**
1. 1 friction seulement, 1 page seulement, 1 lane (jamais un audit).
2. "Observable ou conditionnel" — jamais de chiffres inventés, jamais "votre taux de conversion", jamais de langage accusateur.
3. Subject line = le même micro-oui que le corps de l'email.
4. Si un variable est faible → **retourner `"skip": true`** au lieu de compenser avec plus de mots (votre règle 7).
5. Le nom du décideur uniquement si "on parierait de l'argent dessus" (votre règle).

**Friction type par offre :**
- Dentiste chatbot : "Formulaire de contact sans confirmation de disponibilité" → micro-oui : "Je vous prépare une vidéo de 1 min sur ce point ?"
- Dentiste vocal : "Aucune info sur ce qui arrive quand on appelle en soirée / pendant les heures de traitement" → micro-oui : "Je vous envoie un extrait audio de 45 s ?"
- HVAC vocal : "Pas de numéro visible pour urgence 24/7 ou ligne occupée en pleine canicule" → micro-oui : "Je vous envoie un démo audio de 45 s ?"

### 2.5 Classification des réponses (Module 5)

Prompt système pour Gemini : catégorise + propose une action selon votre YES-flow :

| Réponse | Action automatique |
|---|---|
| `YES` | **Alerte immédiate à vous** (email + SMS/Telegram gratuit). IA rédige la confirmation + lien de prise de RDV (Calendly). Vous appelez. |
| `QUESTION` | IA rédige une réponse courte et contenue (règles YES-flow : 1 sujet, pas de survente, pas de nouvel argument). **Brouillon → vous approuvez avant envoi** (ou envoi auto après 24h si vous n'avez pas répondu). |
| `NOT_INTERESTED` | 1 réponse de clôture polie, suppression définitive, CASL-respecté. |
| `OOO` / `BOUNCE` | Suspendre le lead, réessayer J+5 (OOO) ou marquer invalide (bounce). |

### 2.6 Suivis J3/J5/J7 (Module 6)

Reprendre exactement vos scripts compressés :
- **J3** : reconnaître l'envoi initial, rester court, "avancer ou fermer le dossier" (fork).
- **J5** : reconnaître les 2 tentatives, forcer une décision OUI/NON, aucune nouvelle info.
- **J7** : clôture propre, porte ouverte sans tirer dessus.
Les 3 suivis sont générés par IA à partir de vos templates et envoyés automatiquement — sauf si le lead a répondu.

---

## 3. Plan de re-warmup (vos 5 boîtes — CRITIQUE avant tout envoi réel)

**État actuel :** domaine warmé 14 jours sur Instantly il y a longtemps, boîtes transférées vers Zoho, inactives depuis → réputation échouée, domaine à re-warmup complet. Vos 5 boîtes partagent le même domaine → la réputation du domaine est commune, mais à faible volume c'est gérable.

| Semaine | Volume / boîte / jour | Action |
|---|---|---|
| S1 | 5 | DNS (SPF `include:zoho.eu/com`, DKIM, DMARC `p=none`→`p=quarantine`), activer le warm-up intégré Zoho si dispo (Admin → Mail → Warm-up; gratuit). Sinon warm-up manuel : envoyer de vrais courriels courts à 5 contacts + vous répondre entre boîtes. |
| S2 | 8-12 | Monter progressivement, répondre à TOUT ce qui revient (l'engagement compte plus que le volume) |
| S3 | 12-15 | Tester mail-tester.com pour vérifier SPF/DKIM/DMARC pass |
| S4 | 15-20 | Prêt. Ne JAMAIS dépasser ~25/jour/boîte. |
| S5+ | Réel 10/jour total | +5/jour/semaine jusqu'à 50/jour max (10/boîte/jour, rotation) |

**Règles de protection du domaine :**
- Horaires : 8h-16h HNE, lundi-vendredi uniquement.
- Zéro adresse scrapée douteuse : votre règle "skip si variable faible" protège aussi la deliverabilité.
- Opt-out honoré sous 10 jours ouvrables (exigence CASL) ET immédiatement dans votre suppression list.
- Pas de 2e domaine pour l'instant (budget 0). Si la deliverabilité se dégrade malgré tout, ajoutez un domaine secondaire à ~15 $/an pour isoler les envois froids.

---

## 4. Conformité CASL (obligatoire — Canada)

Votre méthode (emails publics extraits de Google Maps) repose sur le **consentement implicite** prévu à l'art. 10(9)b) de la LPRPDE/CASL : adresse *publiée de façon conspicuous* (site web, GBP) SANS mention "ne pas contacter", ET message **pertinent à l'activité professionnelle** du destinataire. C'est votre meilleure base légale — l'exemption B2B du règlement (par. 3(a)) exige une relation préexistante, donc ne comptez pas dessus pour du cold email.

**Checklist à implémenter dans le code (Module 6) :**
- [ ] **Identification obligatoire** dans CHAQUE message : nom légal/commercial + adresse physique valide (ou case postale) + téléphone ou courriel, valide ≥ 60 jours.
- [ ] **Lien de désinscription** clair et gratuit dans chaque courriel (mailto: ou 1 clic). Processé < 10 jours ouvrables.
- [ ] **Pertinence** : chaque envoi nomme un décideur précis et un sujet lié à SON rôle (votre Variable Y fait déjà ça).
- [ ] **Preuve de consentement** : pour chaque lead, enregistrez l'URL où l'adresse a été trouvée + date (champ `consent_basis` ci-dessus). Le fardeau de la preuve est sur VOUS (art. 13).
- [ ] Pas d'adresses obtenues par attaque dictionnaire, pas de listes achetées.
- [ ] Sanctions : jusqu'à 10 M$ par violation (organisation) / 1 M$ (individu), responsabilité personnelle des dirigeants (art. 33).

**En pratique :** les cabinets de cold email B2B canadiens conformes font exactement ce que votre framework fait déjà (décideur nommé, pertinence réelle, opt-out). Il vous manque seulement : le pied de page conforme + la boucle de désinscription + la trace de consentement. Tout ça est automatisable.

---

## 5. Ré-estimation des coûts API — Agent vocal (pour recalibrer le pricing)

Scénario : 200-600 appels/mois × ~3 min = 600-1 800 minutes/mois, français québécois, prise de RDV.

| Plateforme | Tarif effectif | Coût mensuel (600-1 800 min) | Note |
|---|---|---|---|
| **Vapi** (BYOK) | ~0,05 $/min plateforme + modèles à coût + téléphonie | **~57-168 $** | Flexible; apportez vos clés LLM/TTS (Gemini/Cartesia) pour réduire |
| **Retell AI** | ~0,11-0,31 $/min tout inclus | ~78-270 $ | Qualité + latence excellentes, tout géré |
| **Bland AI** | 0,14 $/min (plan Start, plateforme gratuite) | ~84-252 $ | Simple, mais orienté gros volumes |
| **LiveKit Cloud** (plan Ship) | 50 $/mois = 5 000 min agent + 1 000 min tél. incluses | **~50-70 $** | Le moins cher si vous codez l'orchestration |

**Recommandation :** Vapi en BYOK pour le contrôle des coûts, ou LiveKit Ship si vous aimez coder. Ajoutez ~1-2 $/mois par numéro téléphonique canadien + ~0,007-0,015 $/min de téléphonie (Twilio/Telnyx). TTS : Cartesia/Deepgram Aura (~0,02-0,03 $/min) plutôt qu'ElevenLabs pour le volume (0,09-0,18 $/min).

### 5.1 Prix recommandé (vos règles coûts × 3 respectées)

| Offre | Setup | Mensuel | COGS mensuel estimé | Marge |
|---|---|---|---|---|
| Chatbot site web | 2 000-4 000 $ | 100-150 $ | ~100 $ | bonne |
| Vocal standard (≤600 appels/mois) | **4 800 $** (anchor existant) | **750 $** | 60-270 $ | **64-92 %** |
| Vocal entrée (petits commerces) | 4 000 $ | 395-500 $ | 50-200 $ | 50-87 % |

**Conclusion : votre anchor de 4 800 $ + 750 $/mois est sain.** Les coûts API (même en scénario haut : 270 $/mois) laissent une marge confortable. Vous pourriez même offrir un palier "petite clinique" à 395 $/mois sans casser votre règle du ×3. Recalculez seulement après 3 mois réels de données d'usage (durée moyenne d'appel réelle vs 3 min estimées).

---

## 6. Plan 30/60/90

### Jours 1-14 — Fondations (warmup + infra)
- [ ] Vérifier DNS Zoho (SPF/DKIM/DMARC) + activer warm-up (intégré ou manuel) sur les 5 boîtes
- [ ] Déposer les CSV (dentistes QC actuels + extractions MTL à venir) dans `sales/leads/`
- [ ] Mettre en place l'environnement Python + squelette des modules 1 et 4 (envoi test à vous-même)
- [ ] Définir les colonnes du Google Sheet/CSV de suivi (statut : à envoyer / envoyé / répondu-YES / QUESTION / NON / OOO / bounce)

### Jours 15-30 — Premiers lots réels
- [ ] Module 2 (enrichissement) sur les 50 premiers dentistes QC
- [ ] Vous validez 10 emails générés (checklist "10s send test" de votre doc) — mesure du % de lots acceptés
- [ ] Début des envois réels : 10/jour au total, lundi-vendredi
- [ ] Module 5 (réponses) actif : classifiez + testez le flux YES (alerte + confirmation + lien RDV)
- [ ] Objectif semaine 4 : ~150 courriels envoyés, ~4-10 réponses, 1-2 meetings bookés

### Jours 31-60 — Scale + 2e niche
- [ ] Ramper à 30-50/jour (rotation 5 boîtes)
- [ ] Activer les suivis J3/J5/J7 automatiques
- [ ] Pull MTL → enrichir → lancer la piste **HVAC** (offre vocale urgences)
- [ ] Vendre le **SEO (750-1 000 $)** aux prospects qui refusent chatbot/vocal mais ont un GBP faible (upsell naturel)

### Jours 61-90 — Optimisation + closing
- [ ] Analyser les taux (voir KPIs) → durcir le prompt Variable Y (ex. skips trop fréquents = friction trop exigeante)
- [ ] Objectif : 2-3 rendez-vous/semaine, 1-2 closes (vocal 4 800 $ + 750 $/mois OU chatbot 2-4k)
- [ ] Backlog site web (section 8) — idéalement refait avant d'avoir besoin de "proof"

---

## 7. KPIs à suivre (rapport hebdo auto par email)

| Métrique | Cible réaliste | Calcul |
|---|---|---|
| Taux de réponse | 3-8 % | réponses / envoyés |
| Taux YES | 20-40 % des réponses | YES / réponses |
| Meetings bookés | 1 par 1-3 jours à 50 envois/jour | |
| Taux de skip (enrichissement) | < 30 % | sinon friction trop stricte |
| Bounce rate | < 2 % | sinon nettoyage liste |
| Spam complaints | 0-1/1 000 | opt-out honoré + pertinence |
| COGS vocal réel | ≤ 270 $/mois | usage API réel |

---

## 8. Backlog site web (plus tard — ne pas oublier)

- [ ] Une page/offre par niche : Dentistes (vocal + chatbot), Concessionnaires, HVAC (avec liens vers vos sandboxes démos)
- [ ] Ajouter l'offre SEO + pSEO (complémentaire aux sites web)
- [ ] Section "preuve" : prototypes audio/vidéo 45-60 s (votre proxy proof), logique + cadre de livraison 14 jours
- [ ] CTA de réservation de démo (Calendly) — connecté à votre flow YES
- [ ] Version française optimisée (marché QC), cas échéant bilingue

---

## 9. Règles d'or (résumé)

1. 1 friction, 1 page, 1 lane — sinon skip.
2. Le nom du décideur = seulement si vérifié sur 2 sources.
3. Jamais de chiffres de conversion inventés; chaîne cause-effet sans chiffres.
4. Subject line = micro-oui.
5. Répondre vite à toute réponse (le YES-flow gagne).
6. Warmup d'abord, toujours. Volume > vitesse.
7. Opt-out = immédiat. CASL = non négociable.
8. Prix : jamais sous le plancher (coûts × 3). Le vocal à 4 800 $ + 750 $/mois est défendable — les coûts API réels (60-270 $/mois) le confirment.
