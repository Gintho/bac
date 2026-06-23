---
name: pm-prioritization-advisor
description: Use when you need to choose or apply a prioritization framework (RICE, ICE, Kano, MoSCoW, etc.) based on your product stage, team context, and data availability.
intent: Help product managers select and apply the right prioritization framework for their specific context — pre-PMF, scaling, mature, or multi-product.
type: interactive
---

# Prioritization Advisor

## Purpose
No single prioritization framework fits all contexts. This advisor diagnoses your situation across four dimensions — product stage, team dynamics, decision challenge, and data availability — then recommends the right framework with a concrete implementation template.

**When to use:** Backlog overload, stakeholder conflicts, data gaps, or strategic tradeoffs demanding rigor.
**When to skip:** Single obvious next step, or you've already validated the framework for your context.

## Key Concepts

**Framework landscape:**
- **Scoring approaches:** RICE (data-driven), ICE (lightweight), Value/Effort matrix (visual), Weighted Scoring (custom)
- **Strategic methods:** Kano Model, Opportunity Scoring, Buy-a-Feature, MoSCoW
- **Contextual tools:** Cost of Delay, Impact Mapping, Story Mapping

**Anti-pattern — Framework Whiplash:** Switching frameworks every quarter destroys institutional learning. Pick one for a cycle, learn it deeply, then evolve.

**Anti-pattern — Score as Verdict:** RICE scores are inputs to judgment, not replacements for it. Outliers that score low but feel strategically essential deserve explicit override discussions.

## Application

### Step 1: Gather Context (ask one at a time)

**Q1 — Product stage:**
1. Pre-PMF — still searching for product-market fit
2. Early scaling — PMF found, now growing
3. Mature — optimizing and expanding
4. Multi-product — managing a portfolio

**Q2 — Team context:**
1. Small / fully aligned (≤10 people, shared mental model)
2. Growing / partially aligned (10-50 people, some silos)
3. Misaligned (competing priorities between teams)
4. Complex org (multiple BUs, exec stakeholders, dependencies)

**Q3 — Primary decision challenge:**
1. Filtering an overloaded backlog
2. Aligning stakeholders with different priorities
3. Making decisions with sparse data
4. Resolving strategic tradeoffs (build vs. buy, core vs. expansion)

**Q4 — Data availability:**
1. Minimal — gut feel and anecdotes
2. Some — basic usage metrics, qualitative feedback
3. Rich — quantitative analytics, cohort data, revenue attribution

### Step 2: Recommend (offer 3-5 numbered options with context)

After gathering answers, synthesize and present:

```
Based on [product stage] + [challenge] + [data level], here are your best options:

1. [Framework A] — best when [condition]; scoring template: [formula]
2. [Framework B] — best when [condition]; use when stakeholders need [need]
3. [Framework C] — best when [condition]; lighter-weight alternative

Choose a number, combine approaches (e.g. "1 & 3"), or describe your own constraint.
```

### Step 3: Implement

For the chosen framework, provide:
- Scoring template with example filled in
- Common pitfalls specific to this framework
- How to handle ties and overrides
- When to revisit the framework choice

## Examples

**Pre-PMF + minimal data:** Avoid RICE (requires data you don't have). Use **Impact/Effort matrix** as a lightweight forcing function, then graduate to ICE once you have 3+ weeks of usage data.

**Scaling + stakeholder misalignment:** **Buy-a-Feature** workshop brings stakeholders into the prioritization conversation. Gives everyone $100 to "buy" backlog items. Reveals true preferences faster than meetings.

**Mature + rich data + strategic tradeoffs:** **Weighted Scoring** with custom dimensions (strategic fit, revenue potential, retention impact, technical debt cost). Weights the dimensions against company OKRs for that quarter.

## Common Pitfalls

- **Applying RICE pre-PMF:** The formula requires confidence intervals you don't have. Outputs false precision.
- **MoSCoW without stakeholder consensus:** "Must Have" list inflates to 80% of scope without shared commitment to what "Must" means.
- **Ignoring Cost of Delay:** Every week a high-value item sits unprioritized has a real cost. Make it visible.
- **Not recalibrating weights:** Weighted Scoring dimensions set in Q1 may be irrelevant by Q3 if strategy shifted.

## References
- Teresa Torres, *Continuous Discovery Habits* — Opportunity Solution Tree as context for prioritization
- Opportunity Score (Kano variant) — from [pm-opportunity-solution-tree]
- Dean Peters, Product Manager Skills — prioritization-advisor skill
