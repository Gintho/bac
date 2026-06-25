# Rapport de Pilotage — Projet Atlas
**Date d'édition :** 2026-06-25
**Période couverte :** Janvier 2026 – Juin 2026 (Sprint 18 → Sprint 29)

---

## Synthèse Exécutive

| Domaine | Statut | Signal principal |
|---------|--------|-----------------|
| Budget | 🔴 Critique | Dépassements cumulés sur Développement et Conduite du changement |
| Delivery | 🔴 Critique | Vélocité en chute libre depuis Sprint 22 (–38 % sur 12 sprints) |
| Capacité | 🔴 Critique | Sur-allocations persistantes et aggravées sur le Lead Développeur |
| Risques | 🟠 Elevé | 2 risques ouverts dont 1 à probabilité élevée, 1 sans plan de mitigation |

**Conclusion synthétique :** Le Projet Atlas présente des signaux dégradés sur l'ensemble des quatre domaines surveillés. La convergence d'une vélocité en baisse, de dépassements budgétaires structurels sur le Développement, et d'une sur-allocation croissante constitue un pattern de risque combiné à traiter en urgence.

---

## 1. Budget

### 1.1 Données brutes (EUR)

| Période | Catégorie | Prévu | Consommé | Engagé non facturé | Exposition totale | Écart vs prévu |
|---------|-----------|------:|----------:|-------------------:|------------------:|---------------:|
| 2026-01 | Développement | 18 000 | 17 200 | 1 500 | 18 700 | +700 |
| 2026-01 | Design | 6 000 | 5 800 | 0 | 5 800 | -200 |
| 2026-01 | Conduite du changement | 3 000 | 2 100 | 0 | 2 100 | -900 |
| 2026-02 | Développement | 18 000 | 18 900 | 2 200 | 21 100 | +3 100 |
| 2026-02 | Design | 6 000 | 4 200 | 500 | 4 700 | -1 300 |
| 2026-02 | Conduite du changement | 3 000 | 2 400 | 0 | 2 400 | -600 |
| 2026-03 | Développement | 18 000 | 21 500 | 3 100 | 24 600 | +6 600 |
| 2026-03 | Design | 6 000 | 3 900 | 0 | 3 900 | -2 100 |
| 2026-03 | Conduite du changement | 3 000 | 2 800 | 300 | 3 100 | +100 |
| 2026-04 | Développement | 18 000 | 23 800 | 4 200 | 28 000 | +10 000 |
| 2026-04 | Design | 4 000 | 3 100 | 0 | 3 100 | -900 |
| 2026-04 | Conduite du changement | 3 000 | 3 300 | 0 | 3 300 | +300 |
| 2026-05 | Développement | 18 000 | 26 100 | 5 400 | 31 500 | +13 500 |
| 2026-05 | Design | 3 000 | 2 400 | 0 | 2 400 | -600 |
| 2026-05 | Conduite du changement | 2 500 | 3 100 | 200 | 3 300 | +800 |
| 2026-06 | Développement | 18 000 | 27 900 | 6 800 | 34 700 | +16 700 |
| 2026-06 | Design | 2 000 | 1 800 | 0 | 1 800 | -200 |
| 2026-06 | Conduite du changement | 2 500 | 2 900 | 0 | 2 900 | +400 |

### 1.2 Cumuls par catégorie (janvier–juin 2026)

| Catégorie | Budget prévu total | Consommé total | Engagé non facturé total | Exposition totale | Écart cumulé |
|-----------|--------------------|----------------|--------------------------|-------------------|--------------|
| Développement | 108 000 | 135 400 | 23 200 | 158 600 | **+50 600** |
| Design | 27 000 | 21 200 | 500 | 21 700 | -5 300 |
| Conduite du changement | 17 000 | 16 600 | 500 | 17 100 | +100 |
| **TOTAL PROJET** | **152 000** | **173 200** | **24 200** | **197 400** | **+45 400** |

### 1.3 Analyse et alertes budget

**Développement — Alerte critique**
- Dépassement cumulé sur le consommé seul : +27 400 EUR (+25,4 % sur le prévu de 108 000 EUR).
- En intégrant les engagés non facturés (23 200 EUR), l'exposition totale atteint 158 600 EUR, soit +50 600 EUR au-dessus du budget prévu (+46,9 %).
- La tendance est aggravante : l'écart mensuel sur le consommé progresse de 700 EUR (janvier) à 16 700 EUR (juin). Il n'y a pas de signe d'inflexion dans les données disponibles.

**Design — Sous-consommation**
- Sous-consommation régulière tout au long de la période (-5 300 EUR cumulés). Cela peut refléter un glissement du travail de design ou une réduction volontaire de l'allocation (corroboré par la baisse du taux d'allocation de UX-A de 60 % en janvier à 30 % en juin).

**Conduite du changement — Légère dérive**
- Dépassements ponctuels en avril et mai (+300, +800 EUR). Cumul quasi-équilibré (+100 EUR). À surveiller, non critique en l'état.

**Projection budgétaire (extrapolation, non engagement)**
> En extrapolant la tendance de consommation mensuelle sur Développement (croissance linéaire observée de +2 100 EUR/mois sur le consommé), le dépassement cumulé pourrait atteindre 60 000–70 000 EUR d'ici fin T3 2026 si aucune action correctrice n'est engagée. Cette projection est une extrapolation des données passées et ne constitue pas un engagement de chiffre.

---

## 2. Delivery (Sprints Jira)

### 2.1 Données brutes

| Sprint | Début | Fin | Points engagés | Points livrés | Tickets engagés | Tickets livrés | Vélocité (pts) | Taux complétion pts | Taux complétion tickets |
|--------|-------|-----|---------------:|---------------:|----------------:|----------------:|---------------:|--------------------:|------------------------:|
| Sprint 18 | 2026-01-05 | 2026-01-16 | 42 | 40 | 18 | 17 | 40 | 95,2 % | 94,4 % |
| Sprint 19 | 2026-01-19 | 2026-01-30 | 45 | 43 | 19 | 19 | 43 | 95,6 % | 100,0 % |
| Sprint 20 | 2026-02-02 | 2026-02-13 | 44 | 41 | 18 | 16 | 41 | 93,2 % | 88,9 % |
| Sprint 21 | 2026-02-16 | 2026-02-27 | 46 | 38 | 20 | 15 | 38 | 82,6 % | 75,0 % |
| Sprint 22 | 2026-03-02 | 2026-03-13 | 44 | 34 | 19 | 14 | 34 | 77,3 % | 73,7 % |
| Sprint 23 | 2026-03-16 | 2026-03-27 | 45 | 33 | 19 | 13 | 33 | 73,3 % | 68,4 % |
| Sprint 24 | 2026-03-30 | 2026-04-10 | 43 | 30 | 18 | 12 | 30 | 69,8 % | 66,7 % |
| Sprint 25 | 2026-04-13 | 2026-04-24 | 44 | 29 | 19 | 11 | 29 | 65,9 % | 57,9 % |
| Sprint 26 | 2026-04-27 | 2026-05-08 | 42 | 28 | 18 | 11 | 28 | 66,7 % | 61,1 % |
| Sprint 27 | 2026-05-11 | 2026-05-22 | 40 | 27 | 17 | 10 | 27 | 67,5 % | 58,8 % |
| Sprint 28 | 2026-05-25 | 2026-06-05 | 40 | 26 | 17 | 10 | 26 | 65,0 % | 58,8 % |
| Sprint 29 | 2026-06-08 | 2026-06-19 | 38 | 25 | 16 | 9 | 25 | 65,8 % | 56,3 % |

### 2.2 Tendances clés

| Indicateur | Sprint 18-19 (réf. Jan) | Sprint 28-29 (réf. Jun) | Évolution |
|------------|------------------------:|------------------------:|-----------|
| Vélocité moyenne (pts livrés) | 41,5 | 25,5 | **-38,6 %** |
| Taux complétion moyen (pts) | 95,4 % | 65,4 % | **-30 pts** |
| Tickets livrés / engagés | 97,4 % | 57,5 % | **-39,9 pts** |

### 2.3 Analyse et alertes delivery

**Alerte critique — Effondrement de la vélocité**
- La vélocité est passée de 43 points (Sprint 19, pic) à 25 points (Sprint 29), soit une perte de 18 points (-41,9 %) sur 10 sprints consécutifs.
- La dégradation est continue et sans inflexion depuis Sprint 21 (mi-février 2026).
- Le nombre de points engagés diminue également légèrement (46 → 38), ce qui peut indiquer une adaptation de la planification à la baisse de capacité réelle — mais le taux de livraison se dégrade aussi, donc la réduction de scope ne suffit pas à compenser.

**Corrélation capacity / delivery**
- La chute de vélocité est synchrone avec la montée des sur-allocations et des incidents sur le rôle Lead Développeur (voir section 3). Ce croisement suggère un lien de causalité probable, bien que les données disponibles ne permettent pas de l'affirmer avec certitude.

---

## 3. Capacité et Allocation

### 3.1 Données brutes

| Période | Identifiant | Rôle | Allocation (%) | Livrable | Incidents | Temps résolution moyen (h) |
|---------|-------------|------|---------------:|----------|----------:|---------------------------:|
| 2026-01 | Dev-Lead-A | Lead Développeur | 95 | API Paiement | 2 | 4 |
| 2026-01 | Dev-B | Développeur | 80 | Front Portail | 1 | 2 |
| 2026-01 | Dev-C | Développeur | 75 | Front Portail | 0 | 0 |
| 2026-01 | UX-A | Designer | 60 | Parcours Client | 0 | 0 |
| 2026-02 | Dev-Lead-A | Lead Développeur | 105 | API Paiement | 3 | 5 |
| 2026-02 | Dev-B | Développeur | 85 | Front Portail | 1 | 3 |
| 2026-02 | Dev-C | Développeur | 70 | Front Portail | 1 | 2 |
| 2026-02 | UX-A | Designer | 55 | Parcours Client | 0 | 0 |
| 2026-03 | Dev-Lead-A | Lead Développeur | 110 | API Paiement | 4 | 6 |
| 2026-03 | Dev-B | Développeur | 90 | Front Portail | 2 | 4 |
| 2026-03 | Dev-C | Développeur | 65 | Front Portail | 1 | 3 |
| 2026-03 | UX-A | Designer | 50 | Parcours Client | 0 | 0 |
| 2026-04 | Dev-Lead-A | Lead Développeur | 115 | API Paiement | 5 | 7 |
| 2026-04 | Dev-B | Développeur | 90 | Front Portail | 2 | 5 |
| 2026-04 | Dev-C | Développeur | 60 | Front Portail | 1 | 3 |
| 2026-04 | UX-A | Designer | 40 | Parcours Client | 0 | 0 |
| 2026-05 | Dev-Lead-A | Lead Développeur | 120 | API Paiement | 6 | 8 |
| 2026-05 | Dev-B | Développeur | 95 | Front Portail | 3 | 6 |
| 2026-05 | Dev-C | Développeur | 55 | Front Portail | 2 | 4 |
| 2026-05 | UX-A | Designer | 35 | Parcours Client | 0 | 0 |
| 2026-06 | Dev-Lead-A | Lead Développeur | 120 | API Paiement | 7 | 9 |
| 2026-06 | Dev-B | Développeur | 95 | Front Portail | 3 | 6 |
| 2026-06 | Dev-C | Développeur | 50 | Front Portail | 2 | 5 |
| 2026-06 | UX-A | Designer | 30 | Parcours Client | 0 | 0 |

### 3.2 Synthèse des tendances par profil

| Profil | Allocation janv. | Allocation juin | Tendance | Incidents janv. | Incidents juin | Tendance incidents |
|--------|---------------:|---------------:|----------|---------------:|---------------:|-------------------|
| Dev-Lead-A (Lead Dev) | 95 % | 120 % | ↑ aggravation | 2 | 7 | ↑ x3,5 |
| Dev-B (Développeur) | 80 % | 95 % | ↑ aggravation | 1 | 3 | ↑ x3 |
| Dev-C (Développeur) | 75 % | 50 % | ↓ désengagement | 0 | 2 | ↑ nouvelle apparition |
| UX-A (Designer) | 60 % | 30 % | ↓ forte réduction | 0 | 0 | stable |

### 3.3 Analyse et alertes capacité

**Dev-Lead-A — Sur-allocation critique et persistante**
- En sur-allocation depuis février 2026 (105 %), atteignant 120 % en mai et juin.
- Les incidents imputés à ce livrable (API Paiement) progressent de manière quasi-linéaire : 2 en janvier, 7 en juin. Le temps moyen de résolution suit la même progression (4 h → 9 h).
- Cette combinaison (charge > 100 %, incidents croissants, temps résolution dégradé) constitue un signal de saturation avéré sur ce rôle.

**Dev-B — Pression croissante**
- Allocation passée de 80 % à 95 %. Incidents en hausse (1 → 3). Signal à surveiller mais non encore critique.

**Dev-C — Désengagement progressif**
- Allocation en baisse continue (75 % → 50 %). Apparition d'incidents en fin de période (2 en juin) malgré la charge réduite. Ce signal mérite une investigation : changement de mission ? Problème qualité sur le livrable ?
- Note : aucun jugement sur la ressource n'est formulé à partir de ces seules données.

**UX-A — Sous-utilisation**
- Allocation divisée par deux (60 % → 30 %). Cohérent avec la sous-consommation budgétaire Design. Corroboré par le risque R-02 (périmètre Parcours Client mouvant). Aucun incident signalé.

---

## 4. Risques

### 4.1 Registre des risques

| ID | Titre | Probabilité | Impact | Statut | Plan de mitigation |
|----|-------|-------------|--------|--------|-------------------|
| R-01 | Dépendance API tierce paiement non stabilisée | Moyenne | Elevé | Ouvert | Tests d'intégration renforcés prévus Sprint 30 |
| R-02 | Turnover possible sur poste Designer | Faible | Moyen | Surveillé | **Aucun plan formalisé à ce jour** |
| R-03 | Périmètre fonctionnel Parcours Client encore mouvant | Elevée | Moyen | Ouvert | Atelier de cadrage prévu avec le client en juillet |

### 4.2 Analyse et alertes risques

**R-01 — Dépendance API Paiement (Probabilité Moyenne / Impact Elevé)**
- Ce risque est directement croisé avec la sur-allocation et le volume d'incidents sur Dev-Lead-A, dont le livrable principal est précisément l'API Paiement.
- Le plan de mitigation (tests d'intégration renforcés Sprint 30) est identifié mais non encore réalisé. Le risque reste ouvert.
- Criticité renforcée : la ressource en charge de ce livrable est en saturation documentée depuis 4 mois.

**R-02 — Turnover Designer (Probabilité Faible / Impact Moyen)**
- Statut "Surveillé" mais aucun plan de mitigation formalisé. Cette absence est elle-même un risque opérationnel.
- La forte réduction d'allocation de UX-A (60 % → 30 %) et la sous-consommation budgétaire Design peuvent être un signal précurseur. Donnée manquante : aucune information dans les fichiers fournis sur les causes de cette réduction.

**R-03 — Périmètre Parcours Client mouvant (Probabilité Elevée / Impact Moyen)**
- Probabilité élevée = le risque est quasi-certain. L'atelier de cadrage en juillet est la seule action prévue.
- Ce risque explique potentiellement la sous-utilisation du Designer (UX-A) et peut générer du retravail futur.

---

## 5. Alertes Combinées (Croisement de Signaux)

Les signaux isolés par domaine se renforcent mutuellement et forment trois patterns de risque combiné :

### Alerte combinée n°1 — Effondrement opérationnel sur l'API Paiement
- **Sources croisées :** Capacité (Dev-Lead-A à 120 %, 7 incidents/mois, délai résolution 9 h) + Risque R-01 (API tierce non stabilisée) + Delivery (vélocité –38 % depuis Sprint 22, date coïncidant avec le début de la montée en charge)
- **Lecture :** La ressource critique du livrable à plus fort risque technique est en saturation depuis 4 mois. La vélocité de l'équipe dégrade simultanément. Le plan de mitigation du risque dépend de la disponibilité de cette même ressource (tests Sprint 30).
- **Niveau :** Critique — action immédiate requise.

### Alerte combinée n°2 — Dérive budgétaire structurelle non pilotée
- **Sources croisées :** Budget (Développement +46,9 % d'exposition, tendance aggravante chaque mois) + Capacité (sur-allocations croissantes non corrigées) + Delivery (vélocité en baisse : plus de coût pour moins de livraison)
- **Lecture :** Le projet paie de plus en plus pour produire de moins en moins. L'écart entre coût consommé et valeur livrée se creuse. En l'absence de données sur le scope restant, il n'est pas possible de calculer un EAC (Estimate At Completion) — donnée manquante.
- **Niveau :** Critique.

### Alerte combinée n°3 — Risque de décrochage sur le Parcours Client
- **Sources croisées :** Risque R-03 (périmètre mouvant, probabilité élevée) + Risque R-02 (Designer sans plan de mitigation) + Capacité (UX-A allocation 30 %, réduction continue) + Budget Design (sous-consommation de 5 300 EUR)
- **Lecture :** Le livrable Parcours Client cumule un périmètre non stabilisé, une ressource design en forte réduction, et aucun filet de sécurité en cas de turnover. Les livrables de design risquent d'être incomplets ou de nécessiter un rattrapage coûteux.
- **Niveau :** Elevé.

---

## 6. Actions Recommandées

> Ces recommandations sont formulées à partir des données disponibles. Leur priorisation et faisabilité doivent être validées par l'équipe projet.

| Priorité | Action | Domaine | Horizon |
|----------|--------|---------|---------|
| 1 — Urgent | Réaliser une revue de charge sur le rôle Lead Développeur : arbitrer entre réduction de scope API Paiement, renfort, ou report de livrables | Capacité / Budget | Avant Sprint 30 |
| 2 — Urgent | Formaliser un plan de mitigation pour R-02 (Turnover Designer) — donnée manquante à combler | Risque | Avant fin juillet 2026 |
| 3 — Important | Lancer une revue budgétaire projet avec le sponsor : présenter l'exposition réelle (197 400 EUR) vs budget initial | Budget | Sprint 30 |
| 4 — Important | Investiguer la cause de la chute de vélocité : distinguer cause capacité, cause technique (dette, blocages), cause scope | Delivery | Sprint 30 |
| 5 — Important | S'assurer que l'atelier de cadrage Parcours Client (R-03, juillet) aboutit à un périmètre gelé — sans gel, le risque reste à probabilité élevée | Risque | Juillet 2026 |
| 6 — Suivi | Réduire les points engagés par sprint à la vélocité réelle observée (≈25 pts) pour retrouver un planning réaliste | Delivery | Sprint 30 |

---

## 7. Données Manquantes et Limites du Rapport

Les points suivants n'ont pas pu être analysés faute de données dans les fichiers fournis :

- **Scope restant :** Absence de backlog global ou de nombre de sprints restants. Impossible de calculer un EAC (Estimate At Completion) ou un SPI (Schedule Performance Index) sur la durée totale du projet.
- **Budget total alloué au projet :** Seuls les budgets mensuels par catégorie sont disponibles. L'enveloppe globale du projet n'est pas connue, ce qui empêche de calculer un taux de consommation global.
- **Cause de la réduction d'allocation de UX-A :** Les données ne permettent pas de distinguer une décision volontaire d'une sortie partielle du projet.
- **Nature des incidents capacity :** Le champ `nb_incidents` n'est pas qualifié (incidents de production ? blocages techniques ? demandes hors sprint ?). Son interprétation est donc prudente.
- **Statut des livrables fonctionnels :** Aucune donnée sur l'avancement par epic ou feature. La vélocité en points ne peut pas être traduite en pourcentage d'avancement fonctionnel.

---

*Rapport généré le 2026-06-25 — Données source : export-budget-projet-atlas.csv, export-jira-sprints-projet-atlas.csv, export-allocation-projet-atlas.csv, registre-risques-projet-atlas.csv*
