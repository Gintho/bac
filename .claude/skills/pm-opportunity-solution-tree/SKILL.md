---
name: pm-opportunity-solution-tree
description: Use when you need to move from a vague product request or business outcome to structured discovery — mapping customer problems to solutions and testable experiments.
intent: Build an Opportunity Solution Tree that connects business outcomes to validated customer problems, candidate solutions, and proof-of-concept experiments.
type: component
---

# Opportunity Solution Tree (OST)

## Purpose
Connect business outcomes to customer problems, candidate solutions, and experiments in a single visual structure. Prevents the two most common PM failure modes: solving the wrong problem (jumping to solutions) and solving too narrow a problem (missing opportunity space).

**When to use:** New product area, ambiguous feature request, fuzzy strategic goal, or stakeholder "we should build X" demands that need problem validation.
**When to skip:** Already-validated problem with clear solution, routine bug fixes, or when stakeholders demand a specific solution and problem alignment isn't negotiable.

## Key Concepts

**Tree structure:**
```
Business Outcome (root)
├── Opportunity 1 (customer problem)
│   ├── Solution 1A → Experiment
│   ├── Solution 1B → Experiment
│   └── Solution 1C → Experiment
├── Opportunity 2
│   ├── Solution 2A → Experiment
│   └── ...
└── Opportunity 3
    └── ...
```

**Deliberate scoping:** The 3×3 limit (3 opportunities, 3 solutions each) is intentional. More branches = analysis paralysis. The OST forces prioritization.

**Experiments beat opinions:** Every solution candidate needs a testable assumption. No experiments = no OST, just a features wishlist.

## Application

### Step 1: Define the Business Outcome (Root)

Must be:
- Measurable: `Reduce 30-day churn by 15% in Q3`
- Not a feature: `Launch mobile app` is not an outcome
- Aligned to company OKRs

Ask: "What business metric are we trying to move? What's our target and timeline?"

Common trap: Teams define outcomes as `Improve the onboarding experience`. That's directional, not measurable. Push for: `Increase Week-1 activation rate from 42% to 60%`.

### Step 2: Generate Opportunities (3 per outcome)

Opportunities = **customer problems or needs** that, if addressed, would move the metric.

Generation method:
1. List customer struggles from recent discovery interviews
2. Identify drop-off points from analytics (where do users fail to reach activation?)
3. Mine support tickets for top 3 complaint clusters

Filter criteria for opportunities:
- Real: "I have heard customers describe this pain"
- Relevant: "Solving this plausibly moves the metric"
- Distinct: "This is not a rephrasing of another opportunity"

Output: Three named, distinct opportunities. Example for Week-1 activation:
- Opportunity 1: Users don't understand what to do first after signup
- Opportunity 2: Users can't connect their existing data (integration friction)
- Opportunity 3: Users don't see value before hitting a paywall

### Step 3: Generate Solutions (3 per opportunity)

Solutions = **product changes** that address the opportunity.

Rules:
- Solutions address *one* opportunity (no silver bullets)
- Solutions must be buildable (not just "make it better")
- Solutions should be meaningfully different from each other

Example for Opportunity 1 (users don't know what to do first):
- Solution 1A: Guided setup wizard with 3-step onboarding flow
- Solution 1B: Personalized checklist based on user role on signup
- Solution 1C: In-app coach marks triggered on first meaningful action

### Step 4: Design Experiments (1 per solution candidate)

For each solution, identify the **riskiest assumption** and design the cheapest experiment to test it.

Experiment types by cost:
1. **Customer interview:** "If we built X, would that help?" (fast, weak signal)
2. **Concierge MVP:** Do the thing manually for 3-5 users before building
3. **Prototype test:** Clickable mockup with 5 users
4. **Fake door:** Landing page or button that measures intent before building
5. **Wizard of Oz:** Real UX, manual backend

Output per experiment:
```
Solution: [1A]
Riskiest assumption: [Users will follow a 3-step wizard if surfaced on Day 1]
Experiment: [Show wizard to 20% of new users for 2 weeks]
Success metric: [>60% completion rate AND activation rate increase for cohort]
```

### Step 5: Select the Best PoC

Evaluate all 9 solution candidates (3 opportunities × 3 solutions) against:
- **Feasibility (1-5):** Engineering effort and technical risk
- **Desirability (1-5):** Evidence customers actually want this
- **Impact (1-5):** Probability of moving the business metric

Select the 1-2 highest-scoring candidates. Run the experiment. Revisit the tree based on results.

### Step 6: Iterate

OSTs are living documents. After each experiment cycle:
- Kill branches with no signal
- Add new opportunities uncovered in research
- Promote validated solutions to PRD

## Examples

**Business outcome:** Increase upgrade rate from free to paid by 20% in 6 months

**Opportunities:**
1. Free users don't reach the "aha moment" before trial ends
2. Pricing page doesn't map features to user jobs-to-be-done
3. Users don't know about collaboration features until they invite someone

**Solutions for Opportunity 1:**
- 1A: Reduce time-to-aha by surfacing key feature on Day 2 (email + in-app)
- 1B: Segment onboarding by role to show relevant use case immediately
- 1C: Shorten free trial from 14 to 7 days to increase urgency

**Chosen experiment:** Concierge test — manually guide 10 free users to aha moment via DM. Measure conversion vs. control group.

## Common Pitfalls

- **Treating solutions as opportunities:** "Add a mobile app" is a solution, not an opportunity. Opportunity: "Users can't access key data on the go." Mixing levels corrupts the tree.
- **Vague outcomes:** "Improve activation" doesn't tell you when you've succeeded.
- **Skipping divergent exploration:** If your first brainstorm produces 3 nearly identical opportunities, push harder. The OST requires distinct branches.
- **Jumping to build after one experiment:** One experiment result is a signal, not a verdict. Run 2-3 experiments before committing.

## References
- Teresa Torres, *Continuous Discovery Habits* — source framework
- pm-discovery-process — provides the customer evidence that fuels Step 2
- pm-product-strategy — OST is used in Phase 3 (Solution Exploration)
- Dean Peters, Product Manager Skills — opportunity-solution-tree skill
