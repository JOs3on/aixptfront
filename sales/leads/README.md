# Dépôt des leads (CSV)

Déposez ici les fichiers CSV de leads extraits (PhantomBuster / Google Maps) avant de les injecter dans le moteur d'outreach.

## Convention de nommage

- `dentistes_quebec.csv`
- `dentistes_montreal.csv`
- `hvac_montreal.csv`
- `hvac_quebec.csv`
- `concessionnaires_quebec.csv`
- etc.

## Colonnes attendues (normaliser les exports PhantomBuster)

| Colonne | Exemple | Requis |
|---|---|---|
| `business_name` | Clinique Dentaire XYZ | Oui |
| `website` | https://cliniquexyz.com | Oui (sinon enrichissement seul) |
| `email` | info@cliniquexyz.com | Oui (sinon skip) |
| `phone` | 418-555-1234 | Oui |
| `address` | 1234 rue ..., Québec, QC | Oui (nécessaire pour le pied de page / pertinence) |
| `city` | Québec / Montréal / Lévis | Oui |
| `niche` | dentiste / hvac / concessionnaire | Oui |
| `group` | independant | groupe | Oui (filtrer les chaînes de groupes) |
| `size_hint` | solo / 2+ dentistes / nb d'employés si connu | Non |
| `maps_url` | https://maps.google.com/... | Non mais utile (source de consentement) |
| `source_url` | URL où l'adresse email est publiée (page contact, GBP) | Recommandé — base légale CASL |

## Règles avant envoi dans le moteur

1. Filtrer les **groupes** (chaînes) dès l'import — cible = indépendants uniquement (sauf pour les concessionnaires, voir plan).
2. Le champ `source_url` alimente le champ `consent_basis` exigé par CASL (publication conspicue).
3. Une ligne sans email = enrichissement AI peut tenter de la trouver; sinon `skip`.
4. Dédoublonnage par `website` + `email`.
