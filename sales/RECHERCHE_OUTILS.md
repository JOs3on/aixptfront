# Outils d'Outreach & Recherche — Recommandations + Prompts

**Basé sur :** PLAN_AUTOMATION_2026.md (moteur Python custom, $0/mois), Sales Outreach.md (Email X + Variable Y), SALES AI notes.md (Proof of Proxy, Pain).

---

## 1. La question « paperclipai »

**Paperclip** (github.com/paperclipai/paperclip) = orchestration d'équipes d'agents IA qui « font tourner une business » (org charts, budgets, gouvernance). C'est de l'infrastructure lourde pour ce dont tu as besoin : envoyer des emails, gérer les réponses, enrichir des leads. On ne prend pas un orchestrateur d'agents pour faire ce qu'un bon pipeline fait déjà.

**La stack recommandée (dans l'ordre d'installation) :**

### 1.1 Envoi + listes + réponses : **OpenOutreach** (github.com/eracle/OpenOutreach)
Le plus proche de ce que tu décris, open-source, self-hosted CLI, une seule install :
- Tu décris ton produit + ton marché → il qualifie et trouve des leads (BetterContact, 40 crédits gratuits) OU tu importes tes propres listes (le `find 0` / export CSV fonctionne avec des colonnes standards : email, first_name, company, website, reason…)
- **Chaque lead sort avec un `reason` en language clair** = exactement ta Variable Y générée automatiquement, que tu valides avant envoi (règle « Module 3 : qualité humaine » du plan)
- Envoie depuis TES boîtes Zoho (SMTP/IMAP — app password), donc tes 5 boîtes warmées restent utilisables
- Guards d'envoi intégrés (limites, protection domaine)
- zéro surface ToS (pas de scraping, pas de compte à se faire bannir)

```bash
uv tool install openoutreach
openoutreach init --product-docs product.md --target target.md
openoutreach find 10 emails   # ou travail sur tes propres CSV
openoutreach send             # envoie selon les guards
```

### 1.2 Réponses IA + tri inbox : **Inbox Zero** (github.com/elie222/inbox-zero)
Self-hostable, open-source. Pre-drafts tes réponses dans ta voix, classe par règles en language naturel (YES / QUESTION / NOT_INTERESTED / OOO / bounce = ton Module 5), gère opt-out. S'intègre à n'importe quelle boîte IMAP. Alternative légère : garder ton Module 5 Python (poll IMAP + classification Gemini) comme prévu au plan.

### 1.3 Alternative simple envoi seul : **Email-automation** (github.com/PaulleDemon/Email-automation)
Django + Celery, UI web, templates Jinja2 avec variables, follow-ups programmés, self-host. Plus lourd à déployer qu'OpenOutreach (Postgres + Redis + worker), mais interface graphique. À prendre seulement si tu veux une UI plutôt qu'un CLI.

**Décision :** OpenOutreach (envoi + enrichissement) + Inbox Zero (réponses) ou ton Module 5 Python (déjà spécifié au plan). Les deux s'installent en moins d'une heure, $0 de licence.

---

## 2. Recherche/analyse de chaque business (personnalisation)

**Principe (Sales Outreach.md)** : la friction doit être observable en <10s sur UNE page, decision-tied. On ne demande pas à l'IA d'analyser — on demande à l'IA de VÉRIFIER une friction précise et de remplir la Variable Y.

### 2.1 Option manuelle : Perplexity / Gemini (grounding web)
Copie-colle ce prompt par prospect (2 min/prospect) :

```
Tu es un chercheur B2B. Pour l'entreprise suivante : [NOM] — [SITE WEB]

Vérifie sur le site (et Google Business Profile si pertinent) et remplis ce JSON :

{
  "decision_maker_name": "Prénom NOM — SEULEMENT si confirmé sur 2 sources (site + annuaire/LinkedIn). Sinon null. Ne devine JAMAIS.",
  "company_name": "nom public exact utilisé sur le site",
  "page_url": "URL EXACTE de la page où vit la friction",
  "friction": "UNE friction visible en moins de 10 secondes sur cette page. Choisir parmi : formulaire sans confirmation de disponibilité / pas de chat / pas d'info sur ce qui arrive en dehors des heures / formulaire sans accusé de réception / numéro d'urgence absent ou caché. Si aucune friction vérifiable → \"skip\": true.",
  "recognizable_reason": "le comportement humain du visiteur, en une phrase. PAS de jargon marketing. Ex : « remplit le formulaire le soir, cherche une confirmation, n'en trouve pas, et ouvre le site du compétiteur »",
  "consequence_mechanism": "chaîne cause-effet en UNE phrase, SANS chiffres : friction → hésitation → rupture de momentum → sortie ou délai → moins de rendez-vous",
  "subject_line": "libellé de décision qui reflète le micro-oui demandé dans l'email (répondable en une ligne)",
  "offer_lane": "chatbot | vocal | seo",
  "consent_basis": "URL exacte où l'adresse courriel a été trouvée"
}

RÈGLES ABSOLUES :
1. Une seule friction, une seule page. Pas une liste, pas un audit.
2. Tout doit être observable ou conditionnel. JAMAIS de chiffres, jamais « votre taux de conversion », jamais « vous perdez X $ ».
3. Pas de langage accusateur — décrire le parcours du visiteur, pas un défaut du propriétaire.
4. Si une variable est faible, retourner "skip": true plutôt que compenser avec plus de mots.
5. Le nom du décideur seulement si on parierait de l'argent dessus.
```

### 2.2 Option automatisée : ce prompt DEVIENT le prompt système du Module 2
Exactement le JSON de PLAN_AUTOMATION_2026.md §2.4 — le prompt ci-dessus est la version « lisible » du même système. Si tu utilises OpenOutreach, le champ `reason` de son export joue le même rôle et tu complètes avec le prompt ci-dessus pour la friction précise.

### 2.3 Comment identifier les flaws d'un site (méthode du doc)
De Sales Outreach.md, la friction valide passe 3 tests :
1. **Visible fast** — tu la constates en <10s sur la page
2. **Logical** — elle vit sur UNE page ou UNE étape
3. **Decision-tied** — elle affecte la volonté/capacité du visiteur de passer à l'action suivante

Frictions type par offre (déjà au plan §2.4) :
- **Chatbot** : « formulaire de contact sans confirmation de disponibilité »
- **Vocal** : « aucune info sur ce qui arrive quand on appelle en soirée / hors heures »
- **SEO** : pas deGBP ou GBP négligé, pas trouvable sur Google local

Le piège documenté : transformer l'email en audit (2+ frictions = l'email devient du travail, le busy person supprime le travail). Une friction, une page, une lane.

---

## 3. Setup ordre du jour ( quand tu es prêt )

1. `uv tool install openoutreach` + `openoutreach init` (30 min : clés API + boîte Zoho app password + product.md)
2. Charger tes listes CSV (dentistes QC, HVAC MTL) — le format d'import est standard
3. Brancher Inbox Zero sur 1 boîte en pilot (ou activer le Module 5 Python du plan)
4. Test : 5 emails vers TES propres adresses → vérifier rendu, footer CASL, lien démo
5. Lundi : premier lot réel (10/jour total, rampe du plan)
