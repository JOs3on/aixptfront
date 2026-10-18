# Plan d'Action — Jour de Prospection (Lancement)

**État actuel (au moment de la rédaction) :**
- ✅ **Email warmé** — les 5 boîtes Zoho sont prêtes → on peut lancer les **premiers lots réels** (étape "Jours 15-30" de PLAN_AUTOMATION_2026.md).
- ✅ **Démos live demain** — les prototypes audio/vidéo 45-60 s sont en ligne → le **proof proxy** (SALES AI notes.md) devient réel. On peut envoyer de VRAIS liens dans le YES flow.
- ⬜ Lists : dentistes QC + concessionnaires (indépendants qualifiés).

**Rappel de la stratégie (PLAN_AUTOMATION_2026.md) :**
- **Email (cold) → Dentistes** (liste QC immédiate), puis **HVAC** quand la liste MTL est prête.
- **Concessionnaires → canal humain uniquement** (2-3 appels/visites/semaine, jamais de cold email — bassin trop petit, terrain face-à-face).
- **SEO (750-1 000 $)** = produit d'entrée vendu en parallèle.

---

## 1. Préparation du matin (avant 8h — ~45 min)

### Démos live (CRITIQUE — c'est votre preuve)
- [x] Démo vocale Vapi + Twilio en ligne : `/demo/concessionnaire` ou `/demo/[nom-du-client]` + numéro test direct `+1 (581) 807-8332`.
- [x] Intégration fallback audio 45 s + option texte-vers-voix (vapi.send).
- [ ] Tester le lien démo sur mobile ET desktop : `/demo/concessionnaire` et `/sandbox/concessionnaire-demo`.
- [ ] Vérifier que l'audio joue sans téléchargement (lien view-only).
- [ ] Vérifier le flux de prise de RDV (Calendly / consultation) de bout en bout.
- [x] Liens copiés dans les scripts (VENTES IA.md — "Prototype de réception automatisée").

### Infra email (dernier contrôle avant envoi)
- [ ] mail-tester.com : SPF / DKIM / DMARC **pass** sur les 5 boîtes.
- [ ] Template conforme CASL : identification (nom légal + adresse physique + téléphone), lien de désinscription, pertinence (Variable Y), `consent_basis` loggé (URL + date) — Section 4 de PLAN_AUTOMATION_2026.md.
- [ ] Module 4 (envoi) fonctionnel : rotation boîtes, 8h-16h HNE, lun-ven, 10/jour max aujourd'hui.

### Lists & tracking
- [ ] CSV dentistes QC dans `sales/leads/` (colonnes : statut, décideur, site, page, friction, consent_basis).
- [ ] Short list concessionnaires : 2-3 cibles indépendantes qualifiées (nom du DG vérifié sur 2 sources — règle du doc).
- [ ] Tracking sheet prêt (statut : à envoyer / envoyé / répondu-YES / QUESTION / NON / OOO / bounce).

---

## 2. Rythme de la journée

| Heure | Action | Réf. |
|---|---|---|
| 8h-9h | **Lot 1 d'emails** : 10 emails dentistes (validation 10s send test avant envoi) | Sales Outreach.md, Module 4 |
| 9h-12h | **Appels concessionnaires** (2-3) — utiliser `ANGLES_CONCESSIONNAIRES.md` | VENTES IA.md |
| 13h-15h | **Suite appels** + traitement des réponses email (Module 5 : classification) | VENTES IA.md |
| 15h-16h | **YES flow** : envoyer les démos live, 1 instruction, 1 question qualifiante | Sales Outreach.md |
| 16h-17h | **Logging** : tout est dans le tracking sheet. Planifier les suivis J3/J5/J7. | PLAN_AUTOMATION_2026.md §6 |

---

## 3. YES Flow — avec démos live (mis à jour)

Règles inchangées (Sales Outreach.md) : répondre vite, livrer EXACTEMENT ce qui a été promis, 1 seul lien, view-only, 1 instruction de visionnement, 1 question qualifiante, pas de call tant que ce n'est pas gagné.

1. **Confirmer et livrer** : envoyer le lien démo (audio 45 s / sandbox). Pas de re-pitch, pas de nouveau claim.
2. **Réduire la peur du clic** : « C'est un simple lien d'écoute de 45 secondes, rien à télécharger. »
3. **Diriger l'attention** : « Portez attention à la façon dont le système qualifie l'intention avant de prendre le rendez-vous. »
4. **1 question qualifiante** : « Est-ce que récupérer les prospects qui appellent en dehors des heures d'ouverture est une priorité pour ce trimestre, ou c'est un projet pour plus tard ? »
5. **Bridge au call seulement si gagné** : le prospect a vu la démo ET confirmé la douleur → 15 min, 2 créneaux (mardi 10h / mercredi 14h).

**Si ghost après la démo** : 1 suivi avec une nouvelle raison (réduire le temps de visionnement, clarifier quoi regarder, ou rendre la prochaine étape plus petite) — puis question oui/non pour fermer la boucle.

---

## 4. Objectifs de la semaine (KPI — PLAN_AUTOMATION_2026.md §7)

| Métrique | Cible |
|---|---|
| Emails envoyés | ~50 (10/jour × 5) |
| Taux de réponse | 3-8 % → 4-10 réponses |
| Meetings bookés (email) | 1-2 |
| Appels/visites concessionnaires | 2-3 |
| Démo envoyée | 1 par conversation chaude |
| Bounce rate | < 2 % |
| Taux de skip (enrichissement) | < 30 % |

**Règle absolue** : ne jamais dépasser ~10/jour total aujourd'hui (rampe de protection du domaine — §3 de PLAN_AUTOMATION_2026.md).

---

## 5. Règles d'or (rappel — à avoir sous les yeux)

1. 1 friction, 1 page, 1 lane — sinon skip.
2. Décideur = seulement si vérifié sur 2 sources.
3. Jamais de chiffres inventés; chaîne cause-effet sans chiffres.
4. Subject line = micro-oui.
5. Répondre vite à toute réponse (le YES flow gagne).
6. Opt-out = immédiat. CASL = non négociable.
7. Prix : jamais sous le plancher (coûts × 3). L'objection ne fait PAS baisser le prix — elle change de lane ou on sort proprement.
8. Un appel se termine TOUJOURS par : avancer, disqualifier, ou fermer la boucle.

---

## 6. Plan B (si quelque chose casse)

- **Démo en panne** : ne jamais envoyer un lien mort — envoyer un message de report (« la démo est finalisée demain, je vous l'envoie en premier ») OU utiliser la logique proof (SALES AI notes.md) : chaîne cause-effet sans lien.
- **Deliverabilité dégradée** : réduire à 5/jour, revérifier mail-tester, ne jamais forcer le volume.
- **Zéro réponse aux appels concessionnaires** : appliquer les états (Day 1 double dial + voicemail, Day 3, Day 5, Day 7) — la discipline EST la stratégie (Sales Outreach.md).
- **Objection "nos clients rappellent toujours"** : voir `ANGLES_CONCESSIONNAIRES.md` — concéder + changer de lane, jamais argumenter.

---

## 7. Fin de journée (10 min)

- [ ] Mettre à jour le tracking sheet (chaque appel/email a un statut).
- [ ] Programmer les suivis J3/J5/J7 dans le calendrier.
- [ ] Noter ce qui a fonctionné / raté dans les scripts (1-2 lignes, pour ajuster demain).
- [ ] Préparer le lot d'emails de demain (Module 2 : enrichissement des 10 prochains dentistes).
