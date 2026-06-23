---
name: pm-product-strategy
description: Use when kicking off or resetting a product strategy — covering positioning, problem validation, solution exploration, and roadmap sequencing over a 2-4 week arc.
intent: Guide product managers through the full product strategy arc from strategic ambiguity to validated direction with a prioritized roadmap.
type: workflow
---

# Product Strategy Session

## Purpose
Transform vague strategic direction into validated product strategy with clear positioning, target customers, and prioritized roadmap. Designed for major initiatives — product launches, repositioning, annual strategic cycles — not tactical feature work.

**Duration:** 2–4 weeks across six phases.
**Critical prerequisite:** Executive sponsorship. Without it, the output won't stick.

## Key Concepts

**Six-phase arc:**
1. Positioning & Market Context
2. Problem Framing & Validation
3. Solution Exploration
4. Prioritization & Roadmap Planning
5. Stakeholder Alignment
6. Execution Planning

**Core principle:** Validate problems before exploring solutions. The number-one cause of failed product strategy is skipping Phase 2 (problem validation) and jumping to Phase 3.

**Cross-functional requirement:** Strategy built by PMs alone dies in review. Design, engineering, sales, and customer success must participate — especially in Phases 2 and 5.

## Application

### Phase 1: Positioning & Market Context (Days 1-3)

Define who you serve, what problem you solve, and why you win.

**Outputs:**
- Geoffrey Moore positioning statement: `For [target customer] who [need], [product] is a [category] that [benefit]. Unlike [alternative], we [differentiator].`
- Competitive landscape 2×2 (pick axes that reflect customer decision criteria, not internal preferences)
- Initial TAM/SAM/SOM sizing

**Decision checkpoint:** Is the target customer segment validated enough to proceed? If not, stop and run customer interviews before Phase 2.

### Phase 2: Problem Framing & Validation (Days 4-8)

Frame the customer problem rigorously before searching for solutions.

**Use:** MITRE problem framing canvas — Look Inward (what we think we know), Look Outward (what evidence says), Reframe (what the problem actually is).

**Research activities:**
- 5-8 customer interviews (Mom Test protocol — ask about past behavior, not hypotheticals)
- Support ticket analysis (top 10 complaint clusters)
- Product analytics (where users drop off, what they don't return to)

**Output:** Validated problem statement with evidence backing.

**Decision checkpoint:** Is the problem real enough and large enough to warrant solution investment? If uncertain, run one more week of research.

### Phase 3: Solution Exploration (Days 9-12)

Generate a wide solution space before narrowing.

**Use:** Opportunity Solution Tree — 3 opportunities per outcome, 3 solutions per opportunity, 1 proof-of-concept experiment per solution candidate.

**Facilitation:** Run with cross-functional team. Engineering voices constraint; design voices experience; sales voices what customers say they'd pay for.

**Output:** Ranked solution candidates with PoC experiment designs.

### Phase 4: Prioritization & Roadmap Planning (Days 13-16)

Sequence validated solutions into executable releases.

**Framework:** Select based on data availability (see pm-prioritization-advisor). For strategy sessions, Weighted Scoring against OKRs usually works best.

**Roadmap artifact:** Now/Next/Later format — quarters labeled by outcome, not feature names.

**Output:** Committed roadmap with sequenced epics and clear rationale for sequencing decisions.

### Phase 5: Stakeholder Alignment (Days 17-19)

Present strategy, collect objections, refine.

**Use:** stakeholder-mapping to identify who must be in the room, who needs a briefing, and who needs a heads-up.

**Format:** Strategy review doc (Amazon 6-pager style) circulated 48 hours before meeting. Meeting = Q&A and decision, not presentation.

**Output:** Signed-off strategy with objections logged and resolved (or explicitly deferred).

### Phase 6: Execution Planning (Days 20-24)

Break top epics into user stories and sprint plans.

**Use:** epic-breakdown-advisor (Richard Lawrence's 9 splitting patterns), then user-story for Gherkin acceptance criteria.

**Output:** Sprint-ready backlog for the first release cycle.

## Common Pitfalls

- **Skipping problem validation:** The most expensive shortcut. You'll build the wrong thing with conviction.
- **Solo PM work:** Strategy you build alone will be negotiated to death by the team that wasn't involved.
- **Treating roadmap as permanent:** Strategy documents rot. Build in a 6-week review cadence.
- **Executing all phases blindly:** If Phase 2 reveals the problem isn't what you thought, restart — don't continue into Phases 3–6 with a flawed foundation.

## References
- Geoffrey Moore, *Crossing the Chasm* — positioning statement template
- Teresa Torres, *Continuous Discovery Habits* — opportunity solution tree
- pm-prioritization-advisor — framework selection for Phase 4
- pm-stakeholder-mapping — stakeholder analysis for Phase 5
- pm-opportunity-solution-tree — solution exploration for Phase 3
