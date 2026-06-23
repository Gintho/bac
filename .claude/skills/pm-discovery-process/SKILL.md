---
name: pm-discovery-process
description: Use when starting a discovery cycle — from problem hypothesis through validated solution — spanning 3-4 weeks of structured customer research and synthesis.
intent: Run a complete, rigorous discovery cycle that grounds product decisions in real customer evidence rather than assumptions.
type: workflow
---

# Discovery Process

## Purpose
Guide a product team from initial problem hypothesis to validated solution through six structured phases. Not a one-time sprint — designed as a continuous practice running parallel to delivery.

**Duration:** 3–4 weeks typically; 6–8 weeks for complex domains.
**Trigger:** Use when entering a new problem space, launching a new product area, or when existing metrics suggest something is broken but the cause is unclear.

## Key Concepts

**Mom Test principle:** Ask about past behavior, never hypotheticals. "Would you use a feature that…" gets you compliant lies. "Walk me through the last time you…" gets you truth.

**Saturation signal:** Stop interviewing when you hear the same insights across 3+ consecutive interviews. More interviews after saturation are waste.

**Continuous discovery vs. episodic research:** Discovery isn't a phase — it's a practice. Teams doing weekly customer interviews compound insights faster than teams doing quarterly research sprints.

## Application

### Phase 1: Frame the Problem (Days 1-2)

Before talking to customers, make your assumptions explicit.

**Tools:**
- **MITRE Problem Framing Canvas:** Look Inward (internal beliefs) → Look Outward (external evidence) → Reframe (what we actually know)
- **Problem Statement template:** `[Customer] struggles to [job] because [root cause], which results in [consequence]. We'll know we've solved it when [measurable outcome].`
- **Proto-Persona:** Basic sketch of who you're researching — not a detailed UX persona, just enough to recruit the right participants

**Output:** Written problem hypothesis and 5–8 research questions ordered by priority.

### Phase 2: Research Planning (Day 3)

**Recruitment:** Target 5–10 participants matching your proto-persona. Tip: Avoid recruiting friends and fans — they'll validate everything.

**Interview guide (Mom Test format):**
```
Opening: "Tell me about the last time you [context]."
Probe: "What was the hardest part of that?"
History: "How have you tried to solve that in the past?"
Consequence: "What happens when [problem] occurs?"
Priority: "Of everything you've mentioned, what's most painful?"
```

**No leading questions:** Never say "Would it help if we…" in Phase 2. You're listening, not selling.

### Phase 3: Conduct Research (Weeks 1-2)

**Parallel research tracks:**
1. Customer interviews (5-minute rule: never read notes before reviewing your prior assumptions)
2. Support ticket analysis — cluster top 10 complaint themes
3. Product analytics — identify top 3 drop-off or non-return signals

**Saturation test:** After each interview, ask: "Did I learn anything new?" If not for 3 consecutive sessions, stop recruiting.

### Phase 4: Synthesize Insights (End of Week 2)

**Affinity mapping:** Group raw observations into themes without interpretation first. Then name the themes.

**Prioritization matrix:**
```
High Frequency + High Intensity = Top priority (solve this)
High Frequency + Low Intensity = Hygiene fix (quick wins)
Low Frequency + High Intensity = Niche (validate segment size first)
Low Frequency + Low Intensity = Ignore
```

**Output:** Revised problem statement based on evidence, ranked pain points with frequency/intensity data.

### Phase 5: Generate & Validate Solutions (Week 3)

**Use:** pm-opportunity-solution-tree to map 3 opportunities per validated pain point, 3 solutions per opportunity.

**Experiment design per solution candidate:**
- **Concierge test:** Do the thing manually before building it
- **Prototype test:** Clickable mockup with 5 users
- **Landing page test:** Measure signup intent before building
- **Wizard of Oz:** Fake the automation with humans behind the scenes

**Output:** 1–3 validated solution candidates with experiment results.

### Phase 6: Decide & Document (Weeks 3-4)

**Go/no-go decision framework:**
- Green: Strong signal + feasible → write epic hypothesis, start PRD
- Yellow: Weak signal but promising → run one more experiment
- Red: No signal or infeasible → document learnings, kill and move on

**Artifacts:** Epic hypothesis, PRD draft, stakeholder communication with findings summary.

## Common Pitfalls

- **Interviewing existing champions:** They'll validate everything. You need to find people who churned or never converted.
- **Leading questions:** "Would you pay for X?" is not a discovery question. "How are you currently solving X?" is.
- **Skipping saturation check:** 50 interviews with duplicate data isn't rigor — it's delay.
- **Jumping from Phase 2 to Phase 5:** Synthesis isn't optional. Raw observations aren't insights.
- **Building from Phase 5 without Phase 6 decision:** "We have experiment data" and "we have a decision" are different things.

## References
- Rob Fitzpatrick, *The Mom Test* — interview protocol
- Teresa Torres, *Continuous Discovery Habits* — continuous practice model
- pm-opportunity-solution-tree — solution exploration in Phase 5
- pm-prioritization-advisor — prioritization in Phase 4
