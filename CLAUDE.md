# CLAUDE.md — Les Bonnets Gris

## Contexte produit

Site associatif WordPress pour **Les Bonnets Gris** — association de lutte contre les tumeurs cérébrales (1ère cause de mortalité par cancer chez les < 35 ans en France).

**Love brand :** espoir actif, énergie, audace. JAMAIS compassion passive, culpabilité ou images de souffrance.

**North Star Metric :** Collecte Mensuelle Récurrente (CMR) — cible 1 500€/mois à M12 post-lancement.

**Persona #1 (pilote la home) :** Le curieux touché — décide en 10 secondes. Chaque pixel doit le convaincre de rester.

## Stack technique

| Composant | Technologie |
|---|---|
| CMS | WordPress 6.5+ |
| Thème | GeneratePress + child theme `bonnets-gris/` |
| Éditeur | Gutenberg Block Editor natif (JAMAIS Elementor/Divi) |
| Blocs custom | ACF Pro |
| Collecte | HelloAsso API v5 (iframe V1, API REST V2) |
| E-commerce | Redirection Loir (V1) |
| CI/CD | GitHub Actions → rsync OVH Green |
| Performance | WP Rocket + Cloudflare CDN |
| RGPD | Complianz (cookie banner + consent mode v2) |
| Analytics | Google Analytics 4 (consent mode v2) |
| Email | Mailchimp + plugin officiel |
| SEO | Yoast SEO |
| Sécurité | Wordfence |

## Conventions de code

### PHP
- Version : PHP 8.2+
- Style : PSR-12
- Préfixe obligatoire : `bonnets_gris_` pour toutes les fonctions, classes, hooks, options
- Sanitisation : `sanitize_text_field()`, `esc_html()`, `esc_url()` sur toutes les inputs
- Nonces WordPress sur tous les formulaires custom
- API tokens (HelloAsso) UNIQUEMENT dans `wp-config.php` — jamais en base de données

```php
// ✅ Bon
function bonnets_gris_get_impact_stats() { ... }
add_action('init', 'bonnets_gris_register_blocks');

// ❌ Mauvais
function get_stats() { ... }
add_action('init', 'register_blocks');
```

### CSS
- Méthodologie : BEM strict
- Variables CSS custom (pas de Sass/LESS)
- Mobile-first (min-width breakpoints)
- Pas de `!important` sauf overrides GeneratePress documentés
- Couleurs uniquement via variables CSS (`--bg-primary`, `--text-primary`, etc.)

```css
/* ✅ Bon */
.hero-section__titre { }
.hero-section__cta--primary { }

/* ❌ Mauvais */
.heroTitle { }
#main-cta { }
```

### JavaScript
- ES6+ vanilla uniquement
- Pas de jQuery (WP le fournit mais on l'évite)
- `wp.element` (React) pour les blocs Gutenberg en JS
- Async/await pour les appels API

## Règles NON NÉGOCIABLES

### Performance
- Toute image : format **WebP**, max 150KB, attributs `width` et `height` obligatoires
- Lazy load sur toutes les images SAUF l'image LCP (above the fold)
- LCP < 2s sur mobile 4G simulé
- Core Web Vitals : LCP < 2.5s · CLS < 0.1 · INP < 200ms
- Google PageSpeed ≥ 85 mobile ET desktop — vérifier avant chaque PR

### Accessibilité (WCAG 2.1 AA)
- Contraste min 4.5:1 (texte normal), 3:1 (texte large)
- Attribut `alt` descriptif sur toutes les images (vide `alt=""` si décorative)
- Navigation clavier fonctionnelle sur tous les composants interactifs
- Tester avec VoiceOver (macOS) ou NVDA (Windows) avant de merger
- ARIA labels sur les sections, `aria-hidden` sur les éléments décoratifs

### RGPD
- Zéro cookie tiers chargé avant consentement Complianz
- GA4 en mode consent v2 (anonymisation avant consentement)
- Formulaires HelloAsso : mention RGPD visible AU-DESSUS du CTA
- Opt-in explicite newsletter (case non pré-cochée)

### Sécurité
- Nonces WordPress sur tous les formulaires custom
- Validation côté serveur + côté client (ne jamais se fier uniquement au JS)
- `HELLOASSO_API_TOKEN` dans `wp-config.php`, jamais en base
- Pas de `eval()`, pas d'inclusion de fichiers depuis des inputs utilisateur

## Structure des fichiers

```
wp-content/
├── themes/
│   └── bonnets-gris/                  ← Child theme GeneratePress
│       ├── style.css                   ← En-tête child theme (requis WP)
│       ├── functions.php               ← Hooks + enqueue + setup
│       ├── blocks/                     ← Blocs Gutenberg custom
│       │   ├── hero-section/
│       │   │   ├── block.json
│       │   │   ├── block.php           ← render_callback
│       │   │   ├── edit.js             ← Éditeur Gutenberg
│       │   │   └── style.css
│       │   ├── impact-counter/
│       │   ├── membership-tiers/
│       │   └── testimonial/
│       ├── templates/                  ← Page templates WordPress
│       │   ├── template-home.php
│       │   ├── template-don.php
│       │   └── template-adhesion.php
│       └── assets/
│           ├── css/                    ← CSS global BEM
│           ├── js/                     ← JS vanilla
│           └── images/                 ← SVG + images statiques
└── plugins/
    └── bonnets-gris-core/             ← Plugin fonctionnalités métier
        ├── bonnets-gris-core.php       ← Bootstrap plugin
        ├── helloasso/
        │   ├── class-helloasso-api.php
        │   ├── class-helloasso-embed.php
        │   └── class-helloasso-webhook.php
        ├── impact-counter/
        │   └── class-impact-counter.php
        └── membership/
            └── class-membership.php
```

## Workflow Git

```
main      → Production (lesbonnetsgris.fr) — branch protégée, PR obligatoire
develop   → Staging (staging.lesbonnetsgris.fr)
feature/* → Local dev → PR vers develop
```

**Convention de nommage des branches :**
```
feature/epic-[N]-[slug]/story-[N]-[slug]
# Exemples :
feature/epic-01-home/story-01-hero-section
feature/epic-02-don/story-01-montants-predefinis
feature/epic-03-adhesion/story-01-formules-membre
```

**Chaque story = une branche = une PR. Merger dans `develop`, pas directement dans `main`.**

## HelloAsso — Guide d'intégration

### Shortcodes disponibles
```php
// Page Don
[helloasso campaign_slug="don-les-bonnets-gris" type="donation" height="700"]

// Page Adhésion
[helloasso campaign_slug="adhesion-les-bonnets-gris" type="membership" height="700"]
```

### Endpoint REST pour les stats
```
GET /wp-json/bonnets-gris/v1/impact-stats
→ Retourne : { total_amount, member_count, funded_researchers }
→ Cache : 1 heure (transient WordPress)
```

### Variable d'environnement
```php
// Dans wp-config.php (JAMAIS dans le code)
define('HELLOASSO_API_TOKEN', 'your-token-here');
define('HELLOASSO_CLIENT_ID', 'your-client-id');
define('HELLOASSO_CLIENT_SECRET', 'your-client-secret');
```

## Checklist avant chaque PR

- [ ] `php -l` sans erreur sur tous les fichiers PHP modifiés
- [ ] Google PageSpeed ≥ 85 sur la page affectée (outil : PageSpeed Insights)
- [ ] WCAG AA validé (outil : axe DevTools ou WAVE)
- [ ] Test mobile (375px) + tablet (768px) + desktop (1280px)
- [ ] Zéro cookie tiers avant consentement (vérifier en navigation privée)
- [ ] Images en WebP avec width/height définis
- [ ] Nonces sur les formulaires custom
- [ ] Branch protégée respectée (PR vers develop, jamais push direct sur main)

## Ressources

- **PRD complet :** Notion 04 · Delivery — https://app.notion.com/p/3914b70ec0968145a16ff7a815772e4c
- **Architecture :** Notion 05 · Tech & Architecture — https://app.notion.com/p/3914b70ec0968115a6a2ca8d31c65f3a
- **Vision produit :** Notion 01 · Stratégie — https://app.notion.com/p/3914b70ec0968190b97be8eb2e128537
- **HelloAsso API v5 docs :** https://api.helloasso.com/v5/swagger/ui
- **GeneratePress hooks :** https://generatepress.com/knowledgebase/action-hooks/
