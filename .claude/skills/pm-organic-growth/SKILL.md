---
name: pm-organic-growth
description: Use when organic growth is stalling and you need to diagnose which of the four McKinsey Growth Pyramid paths (new segments, geographies, channels, or products) to pursue.
intent: Triage organic growth constraints using a 3-question diagnostic that maps your situation to the right growth path — avoiding the common trap of jumping to new products before exhausting adjacent opportunities.
type: interactive
---

# Organic Growth Advisor

## Purpose
Diagnose where organic growth constraints actually live using the McKinsey Growth Pyramid, then prescribe the right L2–L5 growth path based on your specific context.

**Core principle:** Risk scales with distance from your core. Most teams overinvest in L5 (new products) before exhausting L2 (new segments) and L4 (new channels). This skill forces that honest audit.

**When to use:** Growth stalling, multiple viable paths exist, team debate on which direction to prioritize.
**When to skip:** Pre-PMF, already executing a validated growth path with strong signal, or you lack basic customer knowledge (discovery first).

## Key Concepts

**The McKinsey Growth Pyramid (L2–L5):**

| Level | Growth Path | Customer Context | Product Change |
|-------|-------------|-----------------|----------------|
| L2 | New Customer Segments | Known market, adjacent buyers | Low — same product |
| L4 | New Distribution Channels | Known context, new access | Medium — adapt for channel |
| L3 | New Geographies | Less known, product travels | Medium — local adaptation |
| L5 | New Products/Services | Less known, new problem | High — substantial evolution |

**Growth Path Matrix (the diagnostic tool):**

```
                    Customer/Market Context
                    Known            Less Known
Degree of     Low  L2: New Segments  L3: New Geographies
Product       High L4: New Channels  L5: New Products
Change
```

**Why this order matters:** L2 and L4 leverage existing product and market knowledge. L3 and L5 introduce compounding unknowns. Starting at L5 before validating L2 is the most expensive mistake in growth strategy.

## Application

### Step 1: Opening Context

Ask: "Tell me about your current growth situation — what's working, what's stalling, and what growth paths you've been considering."

Listen for: current ARR/users, growth rate, what the team is debating.

### Step 2: Market Familiarity (3 options)

Ask: "How well do you understand the target customer/market you're considering?"

1. **Well-known** — We have customer data, sales experience, and product usage in this segment
2. **Partially known** — We have some signal (sales calls, inbound interest) but limited direct experience
3. **Largely unknown** — This is genuinely new territory for us

### Step 3: Product Change Required (3 options)

Ask: "How much does the product need to change to serve this new path?"

1. **Minimal** — Core product travels as-is; at most configuration or packaging changes
2. **Moderate** — Meaningful feature additions or UI changes, but same platform
3. **Substantial** — New capabilities, potentially new architecture or data model

### Step 4: Map to Growth Path and Recommend

**Known + Minimal → L2: New Customer Segments**

Diagnostic questions:
- Which adjacent buyer personas have inbound intent but haven't converted?
- What use cases does your product solve that you haven't marketed to?
- Are there segments using the product in unexpected ways you haven't supported?

First experiments this week:
1. Audit conversion data for non-ICP buyers who self-serve
2. Interview 5 customers in adjacent segment using your product today
3. Create one segment-specific landing page and measure conversion

Watch-outs: Don't over-customize the product before validating willingness to pay. Segment validation precedes product adaptation.

**Known + Moderate or Substantial → L4: New Distribution Channels**

Diagnostic questions:
- Which channels do your target customers already use to discover solutions like yours?
- Where are you losing deals because you don't have the right integration, partnership, or reseller?
- What's your current CAC by channel and which has headroom?

First experiments:
1. Map your top 10 lost-deal reasons to channel gaps
2. Identify 3 potential channel partners and run a 30-day pilot with one
3. Test a marketplace listing (AWS, Salesforce AppExchange, etc.) with minimal investment

**Less Known + Minimal → L3: New Geographies**

Diagnostic questions:
- What's the localization requirement (language, compliance, payment methods)?
- Do you have any organic inbound from this geography already?
- Who would own the go-to-market in this market — you or a local partner?

First experiments:
1. Measure existing organic traffic and trial signups from target geography
2. Identify one local partner with distribution and run a co-sell pilot
3. Test localized landing page before building full localization

**Less Known + Substantial → L5: New Products**

Warning: This is the highest-risk path. Confirm you've exhausted L2 and L4 before committing.

Diagnostic questions:
- What customer problem adjacency justifies this new product?
- Do you have discovery evidence (not just exec intuition) for the new problem?
- What's the minimum viable product to validate the thesis without full build?

First experiments:
1. Run 10 discovery interviews in the new problem space before any building
2. Map the opportunity solution tree for the new problem
3. Test with a concierge MVP (manual before automated)

### Step 5: Confirm Fit and Offer Next Steps

```
Based on your situation ([context summary]), the highest-probability path is [L#: Growth Path].

Here are your recommended next steps:
1. [Specific action this week]
2. [Experiment to validate hypothesis]
3. [Metric to track that will tell you if this path is right]

Would you like to go deeper on any of these, or explore an alternative path?
```

## Common Pitfalls

- **Starting at L5 before exhausting L2:** New products require discovering new problems, validating new solutions, and building new capabilities. The error rate is 3-5x higher than adjacent segment expansion.
- **Confusing "new channel" with "new segment":** Channel is how you reach customers. Segment is who you're reaching. These are independent variables.
- **Geography as escape hatch:** Teams exhausted by domestic competition sometimes choose international expansion to avoid fixing the domestic problem. It doesn't travel.
- **Skipping the experiment phase:** Growth path selection is a hypothesis, not a strategy. Validate with minimum-viable experiments before committing budget.

## References
- McKinsey & Company, Growth Pyramid framework
- pm-business-health — if growth constraint is financial, diagnose there first
- pm-discovery-process — for L5 paths requiring new problem discovery
- Dean Peters, Product Manager Skills — organic-growth-advisor skill
