---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "Notion: 01 · Stratégie (vision, POS, OST, roadmap)"
  - "Notion: 02 · Discovery (JTBD, CJM, benchmark)"
  - "Notion: 04 · Delivery (PRD V1/V2/V3)"
  - "Notion: 06 · Growth & Impact (KPIs, modèle revenus)"
  - "_bmad-output/planning-artifacts/research/market-benchmark-associations-collecte-digitale-2026-07-02.md"
workflowType: architecture
project_name: Les Bonnets Gris — Site Web
user_name: Root
date: '2026-07-02'
technicalConstraints:
  - WordPress (CMS imposé)
  - GitHub (versioning imposé)
  - Claude Code (outillage IA imposé)
  - HelloAsso API v5 (don + adhésion MVP)
  - Redirection Loir (e-commerce V1)
---

# Architecture Decision Document — Les Bonnets Gris

> Winston · System Architect (BMad Method) — Juillet 2026
> Contraintes techniques imposées : WordPress · GitHub · Claude Code · HelloAsso API · Loir redirect

---

## 1 · Analyse du Contexte Projet

### Vue d'ensemble des exigences

**Domaine primaire :** Web — site associatif de collecte et d'engagement communautaire

**Complexité :** Moyenne (Medium) — pas de temps réel complexe, pas de multi-tenant, mais intégration API tierce critique (HelloAsso) et exigences de performance/conformité strictes.

**Exigences fonctionnelles clés (V1):**

| Catégorie | Exigence | Complexité architecturale |
| --- | --- | --- |
| Collecte | Page don (ponctuel + récurrent) via HelloAsso API | Moyenne — iframe embed + API sync |
| Communauté | Page adhésion (3 formules) via HelloAsso API | Moyenne — même pattern que don |
| Impact | Compteur temps réel (€ collectés, membres) | Faible — widget API polling |
| Contenu | Pages éditoriales (Home, Maladie, Qui sommes-nous) | Faible — CMS natif |
| Email | Newsletter opt-in + automation Mailchimp | Faible — plugin standard |
| Conformité | RGPD, cookie banner, mentions légales | Faible — plugin standard |

**Exigences non-fonctionnelles critiques :**

- Performance : chargement home < 2s sur mobile 4G, Google PageSpeed ≥ 85
- Accessibilité : WCAG 2.1 niveau AA
- Sécurité : HTTPS, protection formulaires, conformité RGPD
- Éco-conception : hébergeur avec bilan carbone déclaré
- Maintenance : stack maintenable par une petite équipe non-technique

**Préoccupations transverses :**

- RGPD : consent management sur toutes les pages
- Performance mobile : critique pour le persona "curieux touché" (décision en 10 secondes)
- SEO : structure sémantique, Core Web Vitals, schema.org pour les associations
- Sécurité des paiements : délégation totale à HelloAsso (PCI-DSS géré par eux)

---

## 2 · Stack Technique & Starter

### Stack imposée

| Composant | Technologie | Version | Justification |
| --- | --- | --- | --- |
| CMS | **WordPress** | 6.5+ (LTS) | Imposé — équipe non-technique, écosystème plugins riche |
| Versioning | **GitHub** | — | Imposé — collaboration, CI/CD |
| AI Tooling | **Claude Code** | latest | Imposé — développement assisté par IA |
| Collecte MVP | **HelloAsso API v5** | REST v5 | Imposé — 0 commission, confiance associations françaises |
| E-commerce | **Redirection Loir** | — | Imposé — V1, pas de gestion stock |

### Stack choisie (complémentaire)

| Composant | Technologie | Justification |
| --- | --- | --- |
| Thème base | **GeneratePress** (child theme) | Léger (~30KB), performance-first, WCAG-ready, sans page builder lourd |
| Éditeur | **Gutenberg Block Editor** natif | Pas de dépendance Elementor — moins de JS, meilleure perf, futur WordPress |
| Blocs custom | **ACF Pro** (Advanced Custom Fields) | Flexibilité contenu pour les pages éditoriales complexes |
| Hébergement | **OVH Green** (ou Scaleway) | Éco-conception, serveurs en France (RGPD), PHP 8.2+, MySQL 8 |
| CDN + Sécurité | **Cloudflare** (plan Free/Pro) | Performance, DDoS protection, SSL automatique |
| Performance | **WP Rocket** | Cache, minification, lazy load — PageSpeed ≥ 85 garanti si bien configuré |
| RGPD | **Complianz** | Cookie banner conforme, consentement par catégorie, compatible GA4 |
| Email | **Mailchimp** + plugin officiel | Imposé par le PRD — automation newsletter |
| Analytics | **Google Analytics 4** + consent mode v2 | KPIs PRD, compatible Complianz |
| Sécurité WP | **Wordfence** (Free) | Firewall, scan malware, brute force protection |
| SEO | **Yoast SEO** | Standard associatif, schema.org Organisation/Nonprofit |
| Backup | **UpdraftPlus** | Backup automatique GitHub + OVH |
| Formulaires | **CF7** ou **Gravity Forms Lite** | Formulaires contact presse, partenariat |

### Initialisation du projet

```bash
# 1. Clone du repo GitHub
git clone https://github.com/[org]/bonnets-gris-site.git
cd bonnets-gris-site

# 2. Structure WordPress standard
wp core download --locale=fr_FR
wp core config --dbname=bonnets_gris --dbuser=... --dbpass=...
wp core install --url=https://staging.lesbonnetsgris.fr --title="Les Bonnets Gris" --admin_user=...

# 3. Thème GeneratePress + child theme
wp theme install generatepress --activate
# Créer child theme custom dans /wp-content/themes/bonnets-gris/

# 4. Plugins core
wp plugin install generatepress-premium woocommerce-off advanced-custom-fields \
  wp-rocket complianz-gdpr wordfence wordpress-seo mailchimp-for-wp \
  updraftplus --activate
```

---

## 3 · Décisions Architecturales

### ADR-001 : Intégration HelloAsso API

**Contexte :** HelloAsso est la plateforme de collecte MVP pour les dons et adhésions. Deux modes d'intégration possibles : iframe embed (simple, moins de contrôle UX) ou API v5 (plus de contrôle, plus complexe).

**Décision :** **Approche hybride — iframe stylisé V1, API native V2**

| Phase | Mode | Justification |
| --- | --- | --- |
| V1 | Iframe HelloAsso embarqué + CSS override | Lancement rapide, PCI-DSS délégué, 0 risque paiement |
| V2 | API v5 REST pour sync données (compteur impact, stats membres) | Compteur temps réel, personnalisation parcours |

**Implémentation V1 — Iframe :**

```php
// /wp-content/plugins/bonnets-gris-helloasso/helloasso-embed.php
function bonnets_gris_helloasso_shortcode($atts) {
    $atts = shortcode_atts([
        'campaign_slug' => '',
        'type' => 'donation', // donation | membership
        'height' => '700'
    ], $atts);

    $base_url = 'https://www.helloasso.com/associations/les-bonnets-gris/';
    $url = $base_url . $atts['type'] . 's/' . $atts['campaign_slug'] . '/widget';

    return sprintf(
        '<div class="helloasso-embed-wrapper">
            <iframe id="haWidget"
                src="%s"
                style="border:none; width:100%%; height:%spx;"
                allowfullscreen>
            </iframe>
        </div>',
        esc_url($url),
        esc_attr($atts['height'])
    );
}
add_shortcode('helloasso', 'bonnets_gris_helloasso_shortcode');
```

**Implémentation V2 — API Compteur impact :**

```php
// Endpoint: GET /v5/organizations/{organizationSlug}/statistics
// Cache: transient WordPress 1 heure (données non temps-réel acceptable)
function bonnets_gris_get_impact_stats() {
    $cached = get_transient('bonnets_gris_impact_stats');
    if ($cached) return $cached;

    $response = wp_remote_get('https://api.helloasso.com/v5/organizations/les-bonnets-gris/statistics', [
        'headers' => [
            'Authorization' => 'Bearer ' . get_option('helloasso_api_token'),
        ]
    ]);

    if (!is_wp_error($response)) {
        $data = json_decode(wp_remote_retrieve_body($response), true);
        set_transient('bonnets_gris_impact_stats', $data, HOUR_IN_SECONDS);
        return $data;
    }
    return null;
}
```

**Conséquences :**
- ✅ Zéro risque sécurité paiement (PCI-DSS HelloAsso)
- ✅ Lancement V1 sans développement complexe
- ⚠️ Transition UX vers iframe HelloAsso à soigner (décision PRD H2)
- ⚠️ API token HelloAsso à stocker en `wp-config.php` (jamais en base)

---

### ADR-002 : Workflow GitHub → Production

**Décision : Git Flow simplifié avec GitHub Actions pour déploiement automatique**

```
main ────────────────────────────────── Production (lesbonnetsgris.fr)
  │
develop ─────────────────────────────── Staging (staging.lesbonnetsgris.fr)
  │
feature/[epic]-[story-id] ──────────── Local dev → PR → develop
```

**GitHub Actions — Déploiement :**

```yaml
# .github/workflows/deploy.yml
name: Deploy WordPress

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to OVH via rsync
        uses: Burnett01/rsync-deployments@6.0.0
        with:
          switches: -avzr --delete --exclude='.git' --exclude='wp-config.php' --exclude='uploads/'
          path: ./
          remote_path: ${{ github.ref == 'refs/heads/main' && secrets.PROD_PATH || secrets.STAGING_PATH }}
          remote_host: ${{ secrets.REMOTE_HOST }}
          remote_user: ${{ secrets.REMOTE_USER }}
          remote_key: ${{ secrets.SSH_PRIVATE_KEY }}
```

**Convention branches pour Claude Code :**

```
feature/epic-01-home-emotionnelle/story-01-hero-section
feature/epic-02-page-don/story-01-montants-predefinis
feature/epic-03-adhesion/story-01-formules-membre
```

Chaque story = une branche = une session Claude Code = une PR.

**Conséquences :**
- ✅ Déploiement automatique sur push
- ✅ Environnement staging pour validation avant production
- ✅ Historique git complet pour audit
- ⚠️ `wp-config.php` et `uploads/` exclus du déploiement — gérés manuellement en dehors du repo

---

### ADR-003 : Claude Code — Conventions pour agents IA

**Décision : CLAUDE.md avec règles strictes pour la cohérence d'implémentation**

Le fichier `CLAUDE.md` à la racine du projet est la bible que chaque session Claude Code doit lire avant tout développement.

```markdown
# CLAUDE.md — Les Bonnets Gris

## Contexte projet
Site associatif WordPress pour Les Bonnets Gris (lutte contre les tumeurs cérébrales).
Love brand : espoir actif, jamais compassion passive. Zéro image de souffrance.

## Stack
- CMS: WordPress 6.5+ (thème GeneratePress child)
- Éditeur: Gutenberg Block Editor natif (JAMAIS Elementor)
- Collecte: HelloAsso API v5 (iframe V1, API V2)
- Déploiement: GitHub Actions → OVH Green

## Conventions de code
- PHP 8.2+, PSR-12, préfixe `bonnets_gris_` pour toutes les fonctions
- CSS: BEM, variables CSS custom (pas de Sass), mobile-first
- JS: vanilla ES6+ ou wp.element (React) pour les blocs Gutenberg
- Pas de jQuery sauf si absolument nécessaire (WP le fournit mais on l'évite)

## Performance (NON NÉGOCIABLE)
- Toute image : format WebP, max 150KB, attributs width/height obligatoires
- Lazy load sur toutes les images sauf LCP (above the fold)
- Core Web Vitals : LCP < 2.5s, CLS < 0.1, INP < 200ms

## Accessibilité (NON NÉGOCIABLE)
- WCAG 2.1 AA sur chaque composant livré
- Tester avec VoiceOver/NVDA avant de merger
- Contraste couleur min 4.5:1 (texte normal), 3:1 (texte large)

## RGPD (NON NÉGOCIABLE)
- Aucun cookie tiers avant consentement Complianz
- GA4 en mode consent v2 (données anonymisées avant consentement)
- Formulaires HelloAsso : mention RGPD visible au-dessus du CTA

## Sécurité
- Sanitiser toutes les inputs avec sanitize_text_field(), esc_html(), esc_url()
- Nonces WordPress sur tous les formulaires custom
- API tokens HelloAsso uniquement dans wp-config.php (jamais en DB)

## Structure fichiers
wp-content/
  themes/bonnets-gris/      ← child theme GeneratePress
    functions.php
    style.css
    blocks/                  ← blocs Gutenberg custom
    templates/               ← page templates
  plugins/bonnets-gris-core/ ← plugin fonctionnalités métier
    helloasso/               ← intégration HelloAsso
    impact-counter/          ← compteur impact temps réel
    membership/              ← logique adhésion
```

---

### ADR-004 : Architecture des pages — Patterns Gutenberg

**Décision : Blocs Gutenberg natifs + ACF Pro pour contenu dynamique — pas de page builder**

```
Page Home
├── Block: Hero Section (bloc custom avec ACF)
│   ├── Titre émotionnel (texte)
│   ├── Chiffre choc (nombre)
│   └── CTAs (don + rejoindre)
├── Block: Impact Counter (bloc dynamic — API HelloAsso)
├── Block: Testimonial Short (bloc ACF — photo + citation)
├── Block: Who We Are (bloc natif Gutenberg — columns)
└── Block: Newsletter CTA (bloc custom — CF7 intégré)

Page Don
├── Block: Don Header (titre + argument fiscalité)
├── Block: HelloAsso Embed (shortcode iframe)
│   └── Campaign type: donation
└── Block: Trust Signals (logo ICM + témoignages)

Page Adhésion
├── Block: Membership Tiers (bloc ACF — 3 formules)
├── Block: Fiscal Argument (argument 66% réduction)
├── Block: HelloAsso Embed (shortcode iframe)
│   └── Campaign type: membership
└── Block: Member Benefits
```

---

### ADR-005 : Conformité RGPD & Consentement

**Décision : Complianz (plugin) comme couche de consentement unique**

```
Flux de consentement :
1. Visiteur arrive → Complianz banner (opt-in actif)
2. Accepte analytics → GA4 activé (consent mode v2)
3. Accepte marketing → Mailchimp tracking activé
4. Refuse tout → site 100% fonctionnel, zéro cookie tiers

Catégories de cookies :
- Fonctionnel (toujours actif) : session WP, panier HelloAsso
- Analytics (consentement requis) : GA4
- Marketing (consentement requis) : Mailchimp, Meta Pixel (V2 si besoin)

HelloAsso : iframe isolée (cookies HelloAsso = domaine tiers, gérés par Complianz)
```

---

### ADR-006 : Performance — Stratégie

**Décision : WP Rocket + Cloudflare + images WebP + GeneratePress lightweight**

| Levier | Outil | Impact attendu |
| --- | --- | --- |
| Cache page | WP Rocket | LCP -40% |
| CDN | Cloudflare Free | Latence -30% hors France |
| Images | WebP auto + lazy load | LCP -25% |
| CSS/JS | WP Rocket minify + defer | Render blocking -60% |
| Thème | GeneratePress (~30KB CSS) | Base score ≥ 90 |
| Fonts | Google Fonts self-hosted | LCP -0.3s (FOUT évité) |

**Cible Core Web Vitals :**

```
LCP  < 2.5s   ✅ (cible < 2s)
CLS  < 0.1    ✅ (images avec dimensions, pas de layout shift)
INP  < 200ms  ✅ (JS minimal, pas de page builder lourd)
TTFB < 800ms  ✅ (OVH Green PHP 8.2 + cache Cloudflare)
```

---

### ADR-007 : SEO & Schema.org

**Décision : Yoast SEO + schema.org Organization + NonprofitOrganization**

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "NGO"],
  "name": "Les Bonnets Gris",
  "description": "Association de lutte contre les tumeurs cérébrales — 100% reversé à l'ICM",
  "url": "https://lesbonnetsgris.fr",
  "logo": "https://lesbonnetsgris.fr/wp-content/themes/bonnets-gris/assets/logo.svg",
  "sameAs": [
    "https://www.instagram.com/lesbonnetsgris",
    "https://www.facebook.com/lesbonnetsgris"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Institut du Cerveau (ICM)"
  }
}
```

**Structure URL :**

```
/                          ← Home
/qui-sommes-nous/          ← Qui sommes-nous
/la-maladie/               ← La Maladie
/donner/                   ← Page Don
/rejoindre/                ← Page Adhésion
/evenements/               ← Événements (V2)
/cagnottes/                ← Cagnottes (V2)
/presse/                   ← Espace presse (V2)
/boutique/                 ← Redirect Loir (V1) ou Boutique (V3)
/mentions-legales/
/politique-confidentialite/
```

---

### ADR-008 : Redirection Loir (E-commerce V1)

**Décision : Lien simple avec tracking UTM — zéro développement côté WP**

```php
// Page Boutique = page WordPress simple avec bloc "Boutique Redirect"
// URL destination : https://loir.fr/collections/les-bonnets-gris?utm_source=site&utm_medium=boutique&utm_campaign=bonnets-gris-v1

function bonnets_gris_loir_redirect_block() {
    return '<div class="loir-redirect">
        <p>Notre boutique est hébergée chez notre partenaire Loir.</p>
        <a href="https://loir.fr/collections/les-bonnets-gris?utm_source=site&utm_medium=boutique&utm_campaign=v1"
           class="btn-primary"
           target="_blank"
           rel="noopener noreferrer">
           Accéder à la boutique →
        </a>
    </div>';
}
```

**Tracking :** GA4 event `outbound_click` automatique via gtag.js — mesure du trafic envoyé chez Loir sans développement.

---

## 4 · Structure du Projet

```
bonnets-gris-site/
├── .github/
│   └── workflows/
│       ├── deploy.yml            ← CI/CD production + staging
│       └── lint.yml              ← PHP_CodeSniffer + WPCS
├── wp-content/
│   ├── themes/
│   │   └── bonnets-gris/         ← Child theme GeneratePress
│   │       ├── style.css          ← Headers child theme
│   │       ├── functions.php      ← Hooks + enqueue scripts
│   │       ├── blocks/            ← Blocs Gutenberg custom
│   │       │   ├── hero-section/
│   │       │   ├── impact-counter/
│   │       │   ├── membership-tiers/
│   │       │   └── testimonial/
│   │       ├── templates/         ← Page templates custom
│   │       │   ├── template-home.php
│   │       │   ├── template-don.php
│   │       │   └── template-adhesion.php
│   │       └── assets/
│   │           ├── css/           ← CSS organisé BEM
│   │           ├── js/            ← JS vanilla ES6+
│   │           └── images/        ← SVG logos, images statiques
│   └── plugins/
│       └── bonnets-gris-core/    ← Plugin fonctionnalités métier
│           ├── bonnets-gris-core.php
│           ├── helloasso/
│           │   ├── class-helloasso-api.php
│           │   ├── class-helloasso-embed.php
│           │   └── class-helloasso-webhook.php
│           ├── impact-counter/
│           │   └── class-impact-counter.php
│           └── membership/
│               └── class-membership.php
├── CLAUDE.md                     ← Instructions pour agents Claude Code
├── README.md
└── .gitignore                    ← wp-config.php, uploads/, node_modules/
```

---

## 5 · Patterns d'Implémentation

### Pattern 1 : Bloc Gutenberg custom

```php
// blocks/hero-section/block.php
function bonnets_gris_register_hero_block() {
    register_block_type(__DIR__, [
        'render_callback' => 'bonnets_gris_render_hero_block',
    ]);
}
add_action('init', 'bonnets_gris_register_hero_block');

function bonnets_gris_render_hero_block($attributes) {
    $chiffre = esc_html($attributes['chiffre'] ?? '11');
    $titre   = esc_html($attributes['titre'] ?? '');
    $cta_don = esc_url($attributes['ctaDon'] ?? '/donner/');

    return "<section class='hero-section' aria-label='Section principale'>
        <div class='hero-section__chiffre' aria-hidden='true'>{$chiffre}</div>
        <h1 class='hero-section__titre'>{$titre}</h1>
        <div class='hero-section__ctas'>
            <a href='{$cta_don}' class='btn-primary'>Faire un don</a>
            <a href='/rejoindre/' class='btn-secondary'>Rejoindre le mouvement</a>
        </div>
    </section>";
}
```

### Pattern 2 : Compteur impact (polling API HelloAsso)

```javascript
// assets/js/impact-counter.js
class ImpactCounter {
    constructor(element) {
        this.el = element;
        this.endpoint = '/wp-json/bonnets-gris/v1/impact-stats';
        this.refresh();
        setInterval(() => this.refresh(), 3600000); // 1h
    }

    async refresh() {
        try {
            const res = await fetch(this.endpoint);
            const data = await res.json();
            this.render(data);
        } catch (e) {
            // Silent fail — compteur reste avec dernière valeur
        }
    }

    render({ total_amount, member_count, funded_researchers }) {
        this.el.querySelector('[data-stat="amount"]').textContent =
            new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
                .format(total_amount);
        this.el.querySelector('[data-stat="members"]').textContent = member_count;
        this.el.querySelector('[data-stat="researchers"]').textContent = funded_researchers;
    }
}

document.querySelectorAll('.impact-counter')
    .forEach(el => new ImpactCounter(el));
```

### Pattern 3 : Endpoint REST WordPress pour stats

```php
// helloasso/class-helloasso-api.php
class BonnetsGris_HelloAsso_API {
    public function register_routes() {
        register_rest_route('bonnets-gris/v1', '/impact-stats', [
            'methods'  => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_impact_stats'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_impact_stats() {
        $cached = get_transient('bg_impact_stats');
        if ($cached) return new WP_REST_Response($cached, 200);

        $response = wp_remote_get(
            'https://api.helloasso.com/v5/organizations/les-bonnets-gris/statistics',
            ['headers' => ['Authorization' => 'Bearer ' . HELLOASSO_API_TOKEN]]
        );

        if (is_wp_error($response)) {
            return new WP_REST_Response(['error' => true], 503);
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        set_transient('bg_impact_stats', $data, HOUR_IN_SECONDS);
        return new WP_REST_Response($data, 200);
    }
}
```

---

## 6 · Validation d'Implémentation

### Checklist Architecture V1

**Setup :**
- [ ] WordPress 6.5+ installé sur OVH Green
- [ ] Staging sur sous-domaine staging.lesbonnetsgris.fr
- [ ] GitHub repo créé + GitHub Actions configuré
- [ ] CLAUDE.md commité à la racine
- [ ] Domaine lesbonnetsgris.fr + SSL Let's Encrypt (Cloudflare)

**Plugins installés & configurés :**
- [ ] GeneratePress + child theme activé
- [ ] WP Rocket configuré (cache + minification)
- [ ] Cloudflare CDN connecté
- [ ] Complianz configuré (cookie banner, catégories)
- [ ] GA4 connecté via Complianz (consent mode v2)
- [ ] Yoast SEO + schema.org Organization
- [ ] Wordfence actif + règles firewall
- [ ] UpdraftPlus backup quotidien → cloud

**HelloAsso :**
- [ ] Compte HelloAsso créé pour l'association
- [ ] Campagne "Don" créée sur HelloAsso
- [ ] Campagne "Adhésion" (3 formules) créée sur HelloAsso
- [ ] HELLOASSO_API_TOKEN dans wp-config.php
- [ ] Plugin bonnets-gris-core installé

**Conformité :**
- [ ] Politique de confidentialité validée juriste + publiée
- [ ] Mentions légales complètes publiées
- [ ] Cookie banner testé (opt-in/opt-out fonctionnel)
- [ ] WCAG 2.1 AA validé sur toutes les pages V1

**Performance :**
- [ ] Google PageSpeed ≥ 85 mobile ET desktop
- [ ] LCP < 2s mesuré sur mobile 4G simulé
- [ ] Core Web Vitals verts en Google Search Console

---

## 7 · Dépendances Externes & Risques

| Dépendance | Risque | Mitigation |
| --- | --- | --- |
| HelloAsso iframe | Abandon si UX de transition mauvaise (H2 PRD) | Habiller la transition, tester avec 5 users avant launch |
| HelloAsso API v5 | Changements d'API non rétrocompatibles | Versionner les appels, surveiller changelog |
| Loir (e-commerce) | Rupture du partenariat | UTM tracking → données trafic conservées, migration V3 prévue |
| OVH Green | Downtime | Cloudflare cache protège en cas de downtime court |
| GitHub Actions | Déploiement accidentel en prod | Branch protection sur `main` (PR obligatoire, no direct push) |
| WordPress core | Mise à jour cassante | Staging avant toute mise à jour, UpdraftPlus backup quotidien |

---

## 8 · Roadmap Technique par Vague

### V1 — Fondations (0–3 mois)
```
Epic 1 : Setup infrastructure (WordPress + GitHub + OVH + Cloudflare)
Epic 2 : Home émotionnelle (hero + compteur impact + testimonial)
Epic 3 : Page Don (HelloAsso iframe + upsell récurrent)
Epic 4 : Page Adhésion (3 formules + HelloAsso iframe)
Epic 5 : Pages éditoriales (Qui sommes-nous + La maladie)
Epic 6 : Newsletter + footer (Mailchimp + opt-in RGPD)
Epic 7 : Conformité (pages légales + Complianz + WCAG)
Epic 8 : Performance & SEO (WP Rocket + PageSpeed ≥ 85 + schema.org)
```

### V2 — Mouvement (3–8 mois)
```
Epic 9  : Cagnottes peer-to-peer (HelloAsso API + dashboard créateur)
Epic 10 : Événements + inscription en ligne (HelloAsso events API)
Epic 11 : Espace presse (CPT Presse + téléchargements)
Epic 12 : Boutique vitrine (page redirect Loir améliorée + GA4 tracking)
Epic 13 : Newsletter automatisée (Mailchimp sequences)
```

### V3 — Échelle (8–18 mois)
```
Epic 14 : Espace donateur (WooCommerce Memberships ou custom)
Epic 15 : Boutique internalisée (WooCommerce si > 2K membres)
Epic 16 : Carte France/monde des cagnottes (Leaflet.js + API)
Epic 17 : Internationalisation (WPML si trafic étranger > 10%)
```

---

*Architecture produite par Winston · System Architect (BMad Method) — Juillet 2026*
*Basé sur : PRD Les Bonnets Gris V1.0 · Contraintes techniques imposées (WordPress · GitHub · Claude Code · HelloAsso · Loir)*
*→ Prochaine étape : bmad-create-epics-and-stories*
