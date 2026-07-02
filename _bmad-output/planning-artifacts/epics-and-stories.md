---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "Notion: 01 · Stratégie (vision, POS, OST, roadmap)"
  - "Notion: 02 · Discovery (JTBD, CJM, benchmark)"
  - "Notion: 04 · Delivery (PRD V1/V2/V3)"
  - "Notion: 05 · Tech & Architecture"
  - "Notion: 06 · Growth & Impact (KPIs, modèle revenus)"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/research/market-benchmark-associations-collecte-digitale-2026-07-02.md"
workflowType: epics-and-stories
project_name: Les Bonnets Gris — Site Web
user_name: Root
date: '2026-07-02'
notionDatabase: "https://app.notion.com/p/d70ff01a90a6403ba51b86ae9b5e1e07"
---

# Les Bonnets Gris — Epic & Story Breakdown

> Généré par BMad bmad-create-epics-and-stories — Juillet 2026
> Contraintes MVP : WordPress · GitHub · Claude Code · HelloAsso API · Loir redirect
> North Star Metric : Collecte Mensuelle Récurrente (CMR) — cible 1 500 €/mois à M12

---

## Résumé des Exigences

### Exigences Fonctionnelles

| ID | Catégorie | Exigence | Wave |
|---|---|---|---|
| FR-01 | Collecte | Page don ponctuel + récurrent via HelloAsso iframe | V1 |
| FR-02 | Collecte | Don récurrent — upsell CMR | V1 |
| FR-03 | Adhésion | Page adhésion 3 formules via HelloAsso iframe | V1 |
| FR-04 | Impact | Compteur temps réel (€ collectés, membres, chercheurs) | V1 |
| FR-05 | Contenu | Home émotionnelle (hero + chiffre choc + témoignages) | V1 |
| FR-06 | Contenu | Pages éditoriales (Qui sommes-nous, La Maladie) | V1 |
| FR-07 | Contenu | Page Boutique avec redirection Loir + UTM | V1 |
| FR-08 | Email | Newsletter opt-in + double opt-in Mailchimp | V1 |
| FR-09 | Conformité | RGPD — cookie banner Complianz + pages légales | V1 |
| FR-10 | Analytics | GA4 avec consent mode v2 + events clés | V1 |
| FR-11 | Performance | Core Web Vitals verts + PageSpeed ≥ 85 | V1 |
| FR-12 | SEO | Yoast SEO + schema.org Organization/NGO | V1 |
| FR-13 | Cagnottes | P2P via HelloAsso API — création, dashboard, listing | V2 |
| FR-14 | Événements | Inscriptions en ligne + agenda (CPT + HelloAsso Events) | V2 |
| FR-15 | Presse | Espace presse (CPT communiqués + kit médias) | V2 |
| FR-16 | Email | Séquence automatisée Mailchimp (bienvenue J+0/J+3/J+7) | V2 |
| FR-17 | Espace perso | Donateur — historique + reçus fiscaux | V3 |
| FR-18 | E-commerce | Boutique internalisée WooCommerce (si > 2000 membres) | V3 |
| FR-19 | Carte | Carte interactive cagnottes (Leaflet.js) | V3 |
| FR-20 | I18n | WPML anglais (si trafic étranger > 10%) | V3 |

### Exigences Non-Fonctionnelles

| ID | Catégorie | Exigence | Priorité |
|---|---|---|---|
| NFR-01 | Performance | LCP < 2s mobile 4G, PageSpeed ≥ 85 | Must Have |
| NFR-02 | Performance | CLS < 0.1, INP < 200ms, TTFB < 800ms | Must Have |
| NFR-03 | Accessibilité | WCAG 2.1 niveau AA sur toutes les pages | Must Have |
| NFR-04 | Sécurité | HTTPS, nonces WP, sanitisation inputs | Must Have |
| NFR-05 | RGPD | Consentement actif, 0 cookie tiers avant accord | Must Have |
| NFR-06 | Éco-conception | Hébergement OVH Green, images WebP max 150KB | Should Have |
| NFR-07 | Maintenabilité | Stack accessible équipe non-technique | Must Have |
| NFR-08 | Sécurité | Tokens API uniquement dans wp-config.php | Must Have |

---

## Liste des Epics

| # | Epic | Wave | MVP | Stories | Priorité |
|---|---|---|---|---|---|
| 1 | Infrastructure | V1 | ✅ | 5 | Must Have |
| 2 | Home Émotionnelle | V1 | ✅ | 6 | Must Have |
| 3 | Page Don | V1 | ✅ | 3 | Must Have |
| 4 | Page Adhésion | V1 | ✅ | 2 | Must Have |
| 5 | Pages Éditoriales | V1 | ✅ | 3 | Must Have |
| 6 | Newsletter & Footer | V1 | ✅ | 2 | Must Have |
| 7 | Conformité RGPD & WCAG | V1 | ✅ | 4 | Must Have |
| 8 | Performance & SEO | V1 | ✅ | 4 | Must Have |
| 9 | Cagnottes P2P | V2 | ❌ | 3 | Should Have |
| 10 | Événements | V2 | ❌ | 3 | Should Have |
| 11 | Espace Presse | V2 | ❌ | 2 | Could Have |
| 12 | Boutique Vitrine | V2 | ❌ | 1 | Could Have |
| 13 | Newsletter Auto | V2 | ❌ | 2 | Should Have |
| 14 | Espace Donateur | V3 | ❌ | 1 | Could Have |
| 15 | Boutique Internalisée | V3 | ❌ | 1 | Won't Have (V1) |
| 16 | Carte Cagnottes | V3 | ❌ | 1 | Could Have |
| 17 | Internationalisation | V3 | ❌ | 1 | Won't Have (V1) |

**Total : 44 user stories — Notion Database : https://app.notion.com/p/d70ff01a90a6403ba51b86ae9b5e1e07**

---

## V1 — Fondations (0–3 mois) — 28 stories MVP

### Epic 1 : Setup Infrastructure

**Objectif :** Mettre en place l'infrastructure technique complète (WordPress + GitHub Actions + child theme + plugins core + CLAUDE.md) pour permettre un développement cohérent et des déploiements automatisés.

#### Story 1.1 : Setup WordPress sur OVH Green + PHP 8.2
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que DevOps, je veux installer WordPress 6.5+ sur OVH Green avec PHP 8.2, afin d'avoir une base technique stable.*
- AC : WordPress accessible en HTTPS sur staging, PHP 8.2 actif, SSL Labs A+

#### Story 1.2 : Repo GitHub + GitHub Actions CI/CD
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que développeur, je veux un pipeline CI/CD automatique develop→staging et main→prod via rsync.*
- AC : Déploiement en < 3 min, wp-config.php et uploads/ exclus

#### Story 1.3 : Child theme GeneratePress
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que développeur, je veux créer le child theme bonnets-gris avec structure blocks/templates/assets.*
- AC : PageSpeed ≥ 85 (base vierge), préfixe bonnets_gris_

#### Story 1.4 : Plugins core (WP Rocket, Cloudflare, Complianz, Yoast, Wordfence)
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant qu'admin, je veux tous les plugins core installés et configurés.*
- AC : Cache actif, CDN connecté, cookie banner affiché, firewall actif

#### Story 1.5 : Configuration CLAUDE.md et conventions agents IA ✅ TERMINÉ
- **MoSCoW :** Must Have | **Complexité :** XS | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que tech lead, je veux le CLAUDE.md à la racine avec toutes les conventions.*

---

### Epic 2 : Home Émotionnelle

**Objectif :** Créer la home page qui convertit le "curieux touché" en donateur ou membre en moins de 10 secondes, avec le chiffre choc "11", le compteur d'impact HelloAsso et les témoignages.

#### Story 2.1 : Hero Section — Chiffre choc + CTA
- **MoSCoW :** Must Have | **Complexité :** L | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que visiteur curieux touché, je veux voir le chiffre "11" above the fold avec deux CTAs.*
- AC : LCP < 2.5s, contraste ≥ 4.5:1, WCAG 2.1 AA, image WebP max 150KB

#### Story 2.2 : Header principal — Navigation responsive
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que visiteur, je veux un header avec navigation complète et CTA "Faire un don" sticky mobile.*
- AC : Menu hamburger mobile, CTA sticky, accessible au clavier

#### Story 2.3 : Compteur d'impact temps réel (API HelloAsso)
- **MoSCoW :** Must Have | **Complexité :** L | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que visiteur sympathisant, je veux voir le montant collecté, membres et chercheurs financés.*
- AC : Cache transient 1h, endpoint REST < 200ms, silent fail

#### Story 2.4 : Plugin bonnets-gris-core — Endpoint REST impact-stats
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que développeur, je veux l'endpoint /wp-json/bonnets-gris/v1/impact-stats fonctionnel.*
- AC : Proxifie HelloAsso API v5, cache transient 1h, HELLOASSO_API_TOKEN dans wp-config.php

#### Story 2.5 : Section témoignages — Bloc ACF
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur hésitant, je veux lire des témoignages avec photo et citation.*
- AC : WebP 80KB, carousel accessible clavier, zéro image souffrance

#### Story 2.6 : Section "Qui sommes-nous" courte
- **MoSCoW :** Should Have | **Complexité :** S | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur nouveau, je veux un encart mission + logo ICM + lien "En savoir plus".*

---

### Epic 3 : Page Don

**Objectif :** Maximiser la conversion sur /donner/ avec l'iframe HelloAsso, l'argument fiscal et l'upsell récurrent (driver principal du North Star Metric CMR).

#### Story 3.1 : Page Don — HelloAsso iframe + fiscalité
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que visiteur prêt à donner, je veux l'iframe HelloAsso + argument 66% réduction d'impôt.*
- AC : iframe < 3s, RGPD mention visible, WCAG 2.1 AA, mobile full-width

#### Story 3.2 : Don récurrent — Upsell CMR
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que donateur ponctuel, je veux voir la proposition "18€/mois = chercheur financé".*
- AC : GA4 event 'donate_recurring_click' tracké

#### Story 3.3 : Signaux de confiance (ICM, sécurité HelloAsso)
- **MoSCoW :** Should Have | **Complexité :** XS | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que donateur hésitant, je veux voir logo ICM + "Paiement 100% sécurisé HelloAsso".*

---

### Epic 4 : Page Adhésion

#### Story 4.1 : Page Adhésion — 3 formules + HelloAsso iframe
- **MoSCoW :** Must Have | **Complexité :** L | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que sympathisant engagé, je veux voir les 3 formules avec avantages et iframe adhésion.*
- AC : Formule recommandée visuellement mise en avant, argument fiscal visible

#### Story 4.2 : Bénéfices membres — Section ACF éditable
- **MoSCoW :** Should Have | **Complexité :** S | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant qu'admin, je veux modifier les bénéfices sans modifier le code.*

---

### Epic 5 : Pages Éditoriales

#### Story 5.1 : Page "Qui sommes-nous" — Mission, équipe, ICM
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur curieux, je veux lire la mission "love brand" et le partenariat ICM.*

#### Story 5.2 : Page "La Maladie" — Information tumeurs cérébrales
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur concerné, je veux des infos claires et bienveillantes sans image de souffrance.*

#### Story 5.3 : Plugin bonnets-gris-core — Structure de base
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que développeur, je veux créer le plugin core avec toutes les sous-classes.*
- AC : Passe PHP_CodeSniffer WordPress Coding Standards

---

### Epic 6 : Newsletter & Footer

#### Story 6.1 : Newsletter opt-in Mailchimp — Home + footer
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur pas encore prêt à donner, je veux m'inscrire à la newsletter.*
- AC : Double opt-in, consentement RGPD explicite, event GA4 'newsletter_signup'

#### Story 6.2 : Footer — Navigation secondaire + réseaux sociaux
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur en fin de page, je veux les liens légaux et icônes réseaux sociaux.*
- AC : rel='noopener noreferrer', accessible clavier, logo SVG

---

### Epic 7 : Conformité RGPD & WCAG

#### Story 7.1 : Pages légales — Mentions légales + Politique de confidentialité
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐
- *En tant que visiteur/CNIL, je veux les pages légales complètes et conformes.*
- AC : Validées juriste, responsable de traitement + DPO mentionné

#### Story 7.2 : Cookie banner RGPD — Complianz avec catégories
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐
- *En tant que visiteur, je veux un bandeau cookie avec opt-in actif et catégories.*
- AC : Site 100% fonctionnel si tout refusé, registre Complianz accessible

#### Story 7.3 : Audit WCAG 2.1 AA — Toutes les pages V1
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Critique | **ROI :** ⭐⭐
- *En tant que personne handicapée, je veux accéder à tout le contenu avec lecteur d'écran.*
- AC : 0 erreur axe-core, contraste ≥ 4.5:1, navigation clavier complète

#### Story 7.4 : GA4 — Configuration consent mode v2
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que responsable marketing, je veux GA4 avec events clés et modélisation sans consentement.*
- AC : Events don_initiated, membership_signup, newsletter_signup tracktés

---

### Epic 8 : Performance & SEO

#### Story 8.1 : WP Rocket — Cache + minification + lazy load
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Critique | **ROI :** ⭐⭐⭐
- *En tant que visiteur mobile, je veux la home en < 2.5s sur 4G.*
- AC : PageSpeed ≥ 85 mobile ET desktop, LCP image pas en lazy load

#### Story 8.2 : Yoast SEO — schema.org Organization + NGO
- **MoSCoW :** Must Have | **Complexité :** S | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que responsable SEO, je veux le JSON-LD Organization+NGO correct.*
- AC : Google Rich Results Test sans erreur, meta title/description optimisés

#### Story 8.3 : Core Web Vitals — Images WebP + fonts auto-hébergées
- **MoSCoW :** Must Have | **Complexité :** M | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que développeur performance, je veux tous les CWV au vert.*
- AC : LCP < 2s, CLS < 0.1, INP < 200ms, fonts depuis /assets/

#### Story 8.4 : Page Boutique — Redirection Loir avec UTM
- **MoSCoW :** Must Have | **Complexité :** XS | **Valeur :** Haute | **ROI :** ⭐⭐
- *En tant que visiteur boutique, je veux être redirigé vers Loir avec UTM tracké.*
- AC : GA4 event 'outbound_click', rel='noopener noreferrer'

---

## V2 — Mouvement (3–8 mois) — 11 stories

### Epic 9 : Cagnottes P2P
- **Story 9.1 :** Cagnotte P2P — Création via HelloAsso API v5 (Should Have / XL / Critique / ⭐⭐⭐)
- **Story 9.2 :** Dashboard créateur — Suivi et partage réseaux sociaux (Should Have / L / Haute / ⭐⭐)
- **Story 9.3 :** Page listing des cagnottes actives /cagnottes/ (Should Have / M / Haute / ⭐⭐)

### Epic 10 : Événements
- **Story 10.1 :** Inscription événement en ligne — HelloAsso Events API (Should Have / L / Critique / ⭐⭐⭐)
- **Story 10.2 :** Agenda des événements — Page /evenements/ avec filtre (Should Have / M / Haute / ⭐⭐)
- **Story 10.3 :** CPT Événement — Custom Post Type avec ACF (Should Have / M / Haute / ⭐⭐)

### Epic 11 : Espace Presse
- **Story 11.1 :** Espace presse — CPT communiqués + kit médias (Could Have / M / Moyenne / ⭐)
- **Story 11.2 :** CPT Communiqué de presse — Gestion éditoriale admin (Could Have / S / Moyenne / ⭐)

### Epic 12 : Boutique Vitrine
- **Story 12.1 :** Boutique Vitrine Loir améliorée — Produits avec photos (Could Have / M / Moyenne / ⭐)

### Epic 13 : Newsletter Auto
- **Story 13.1 :** Séquence bienvenue Mailchimp J+0/J+3/J+7 (Should Have / M / Haute / ⭐⭐⭐)
- **Story 13.2 :** Template newsletter mensuelle + automation Mai en Gris (Should Have / M / Haute / ⭐⭐)

---

## V3 — Échelle (8–18 mois) — 4 stories

### Epic 14 : Espace Donateur
- **Story 14.1 :** Espace donateur — Historique dons + reçus fiscaux PDF (Could Have / XL / Haute / ⭐⭐)

### Epic 15 : Boutique Internalisée
- **Story 15.1 :** WooCommerce Memberships — Boutique interne (si > 2000 membres) (Won't Have V1 / XL / Haute / ⭐⭐)

### Epic 16 : Carte Cagnottes
- **Story 16.1 :** Carte interactive cagnottes — Leaflet.js (Could Have / L / Moyenne / ⭐)

### Epic 17 : Internationalisation
- **Story 17.1 :** WPML Anglais — si trafic étranger > 10% (Won't Have V1 / XL / Faible / 〜)

---

## Analyse MoSCoW & ROI

| Priorité | Stories V1 | Stories V2 | Stories V3 |
|---|---|---|---|
| Must Have | 24 | 0 | 0 |
| Should Have | 4 | 7 | 0 |
| Could Have | 0 | 4 | 2 |
| Won't Have (V1) | 0 | 0 | 2 |

### Top 5 ROI — Impact CMR direct

1. **Story 3.2 — Don récurrent upsell** : Impact direct sur North Star CMR, complexité S
2. **Story 2.3 — Compteur impact HelloAsso** : Benchmark iRaiser +19% conversion récurrente
3. **Story 7.4 — GA4 consent mode v2** : Mesure de tout, décisions data-driven
4. **Story 3.1 — Page Don HelloAsso** : Revenue direct, PCI-DSS délégué
5. **Story 13.1 — Séquence bienvenue Mailchimp** : Rétention 71% à 12m (M+R benchmark)

---

*Backlog généré par BMad bmad-create-epics-and-stories (Juillet 2026)*
*→ Notion Database : https://app.notion.com/p/d70ff01a90a6403ba51b86ae9b5e1e07*
*→ 44 user stories · 28 MVP (V1) · 11 V2 · 4 V3*
