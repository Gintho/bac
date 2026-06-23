---
name: pm-business-health
description: Use when diagnosing overall SaaS business health across growth, retention, unit economics, and capital efficiency — for board prep, quarterly reviews, or fundraising readiness.
intent: Deliver a holistic SaaS health rating by analyzing metrics together rather than in isolation, surfacing systemic issues before they become crises.
type: interactive
---

# Business Health Diagnostic

## Purpose
Comprehensive SaaS business assessment across four dimensions: growth & retention, unit economics, capital efficiency, and strategic position. Produces one of four health ratings with prioritized action plan.

**When to use:** Board preparation, quarterly business reviews, fundraising diligence, post-acquisition integration, or when leadership disagrees on "how we're really doing."
**Key principle:** Single-metric health checks are dangerous. A company with great NRR and terrible CAC payback is not healthy — it's fragile.

## Key Concepts

**Four assessment dimensions:**
1. **Growth & Retention:** Revenue trajectory, NRR, gross/net churn, cohort retention
2. **Unit Economics:** CAC, LTV, LTV:CAC ratio, payback period, gross margin
3. **Capital Efficiency:** Burn rate, runway, Rule of 40, Magic Number
4. **Strategic Position:** Market concentration, competitive moats, revenue concentration risk

**Stage-appropriate benchmarks:**

| Metric | Early ($0-10M ARR) | Growth ($10-50M) | Scale ($50M+) |
|--------|-------------------|------------------|----------------|
| ARR Growth | >100% | >40% | >25% |
| NRR | >100% | >110% | >120% |
| Gross Margin | >60% | >70% | >75% |
| CAC Payback | <18 months | <12 months | <9 months |
| Rule of 40 | N/A | >40 | >50 |
| Runway | >12 months | >18 months | >24 months |

**Health ratings:**
- 🟢 **Healthy:** All dimensions at/above benchmarks, no critical red flags
- 🟡 **Moderate:** 1-2 dimensions with fixable issues, clear action path
- 🟠 **Concerning:** Multiple critical problems, requires urgent intervention
- 🔴 **Critical:** Existential threats, immediate drastic action required

## Application

### Step 1: Collect Metrics

Ask the user to provide (or estimate) the following:

**Growth & Retention Block:**
- Current ARR and MoM/YoY growth rate
- Net Revenue Retention (NRR)
- Gross churn rate (logo and revenue)
- Customer count and new logo velocity

**Unit Economics Block:**
- Customer Acquisition Cost (blended, by channel if available)
- Average Contract Value (ACV)
- Gross margin %
- Average customer lifetime (or churn-implied LTV)

**Capital Efficiency Block:**
- Monthly burn rate
- Cash on hand / runway
- Rule of 40 score (growth rate + EBITDA margin)
- Magic Number ((Current Qtr ARR - Prior Qtr ARR) × 4 / Prior Qtr S&M spend)

**Strategic Position Block:**
- Top 3 customer % of revenue
- Primary competitive differentiation
- Key product/market risks

### Step 2: Flag Red Flags

**Critical flags (require immediate action):**
- Runway < 6 months
- LTV:CAC < 1.5:1
- NRR < 90%
- Accelerating gross churn (worse QoQ for 2+ quarters)

**High priority flags:**
- Rule of 40 < 25
- CAC payback > 24 months
- Gross margin < 60%
- Magic Number < 0.75

**Medium priority flags:**
- NRR between 90-100%
- Revenue concentration > 30% in top 3 customers
- Negative operating leverage (costs growing faster than revenue)

### Step 3: Assess by Dimension

For each of the four dimensions, rate: ✅ On track / ⚠️ Watch / 🔴 Critical.

### Step 4: Synthesize Health Rating

Apply the rating rubric:
- All ✅ → 🟢 Healthy
- 1-2 ⚠️, no 🔴 → 🟡 Moderate
- Any 🔴 OR 3+ ⚠️ → 🟠 Concerning
- Multiple 🔴 → 🔴 Critical

### Step 5: Prioritize Actions

Offer 3-5 numbered recommendations ordered by urgency:

```
Given your [health rating] status, here are your priority actions:

1. [Most urgent action] — addresses [red flag], target [metric] by [timeframe]
2. [Second priority] — …
3. [Third priority] — …

Which would you like to model out or discuss in depth?
```

## Examples

**Scenario: Growing company, 🟠 Concerning**

Inputs: NRR 98%, ARR growth 45%, CAC payback 26 months, gross margin 64%, runway 8 months.

Assessment: Growth & Retention ⚠️ (NRR below 100%, concerning), Unit Economics 🔴 (payback too long), Capital ⚠️ (runway tight), Strategic ✅.

Rating: 🟠 Concerning — unit economics threaten growth sustainability.

Top actions:
1. Immediately model Series B timeline — 8 months runway at current burn is dangerous
2. Audit CAC by channel — identify if one channel is dragging the blended average
3. Review expansion revenue motion — NRR at 98% means contraction is eating new ARR

## Common Pitfalls

- **Benchmarking against the wrong stage:** A $5M ARR company with 30% growth is failing. A $100M ARR company with 30% growth is thriving.
- **Ignoring cohort behavior:** Average NRR hides cohort deterioration. Run vintage analysis.
- **Rule of 40 theater:** Companies in hypergrowth often argue Rule of 40 doesn't apply. It does — but the split between growth and margin matters (100%/−60% is very different from 50%/−10%).
- **Treating Magic Number as gospel:** It's a proxy, not a law. Highly seasonal businesses distort it.

## References
- pm-organic-growth — growth path analysis when growth is the primary constraint
- Benchmark sources: OpenView SaaS benchmarks, Bessemer Cloud Index, Iconiq Growth reports
- Dean Peters, Product Manager Skills — business-health-diagnostic skill
