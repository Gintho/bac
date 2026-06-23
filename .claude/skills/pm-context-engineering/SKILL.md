---
name: pm-context-engineering
description: Use when you're building AI-powered features and need to distinguish context stuffing (adding volume) from context engineering (managing AI attention deliberately).
intent: Diagnose and fix context management in AI products — shifting from volume-based approaches to attention-optimized architectures that improve quality while reducing latency and cost.
type: interactive
---

# Context Engineering Advisor

## Purpose
Help product managers distinguish context stuffing (adding volume without strategy) from context engineering (deliberately structuring information to optimize AI attention). Applies to both building AI products and working effectively with AI tools.

**The fundamental shift:** Stop treating AI as a static tool. Treat it as an **attention-management system** where context is a scarce resource, not a free buffer.

**When to use:** AI feature underperforming despite "enough" context, high latency/cost on AI calls, AI giving inconsistent outputs, or designing a new AI product feature.

## Key Concepts

**Context Stuffing vs. Context Engineering:**

| | Context Stuffing | Context Engineering |
|---|---|---|
| Assumption | Volume = quality | Attention = scarce resource |
| Approach | Add everything that might help | Include only what this decision requires |
| Result | High token cost, inconsistent quality | Lower cost, higher precision |
| Failure mode | Context rot, contradictory instructions | Over-pruning relevant signals |

**Quantitative reality:** Research shows using 25% of available tokens preserves 95% accuracy while significantly reducing latency and cost. More context is not better context.

**Two-layer memory architecture:**
- **Short-term (session context):** Active interaction history, current task parameters, immediate decisions
- **Long-term (retrieved context):** Persistent facts and behavioral patterns fetched via semantic search only when needed

## Application

### Step 1: Diagnose the Problem

Ask these five diagnostic questions about the AI feature or workflow:

1. **Decision clarity:** "What specific decision does this context support?" (If you can't answer, the context is wrong)
2. **Persistence strategy:** "Could retrieval replace persistence here?" (Is this something you load once vs. something you fetch on demand?)
3. **Boundary ownership:** "Who owns the context boundary — the developer or the runtime?"
4. **Falsification test:** "What breaks if we exclude this element?" (If nothing breaks, it shouldn't be in context)
5. **Structural honesty:** "Are we using context to fix a structural problem we're avoiding?"

### Step 2: Identify the Anti-Pattern

After diagnosis, identify which anti-pattern is present:

**Anti-pattern 1 — Context Hoarding:** Including everything "just in case." Signs: context window >50% full before user input, token costs rising without quality improvement.

**Anti-pattern 2 — Static Context:** Same context loaded for every query regardless of task. Signs: irrelevant system prompt sections for many query types.

**Anti-pattern 3 — Context Rot:** Stale or contradictory information in persistent context. Signs: model giving inconsistent answers over time.

**Anti-pattern 4 — Structure Avoidance:** Using context to patch unclear prompts or bad data models. Signs: 10-paragraph system prompts, frequent instruction updates.

### Step 3: Recommend Architecture (offer 3-5 numbered options)

```
Based on your context pattern ([anti-pattern]), here are your options:

1. [Retrieval-augmented approach] — fetch relevant context per query instead of loading everything
2. [Context compression] — summarize persistent context to high-density facts only
3. [Research→Plan→Reset cycle] — use context-heavy research phase, then compress to plan, then start fresh
4. [Two-layer memory] — separate session context from retrieved long-term memory

Which fits your architecture? Or describe your constraint and I'll adapt.
```

### Step 4: Implement the Research → Plan → Reset Cycle

For complex AI workflows where context rot is the problem:

**Phase 1 — Research (messy context ok):**
Let the context grow. Gather information, run sub-tasks, explore. Context quality doesn't matter here.

**Phase 2 — Plan (compression):**
Synthesize everything into a high-density SPEC or PLAN document. Every sentence in the plan earns its place by making Phase 3 more accurate.

**Phase 3 — Reset:**
Clear the entire context window. Start fresh with only the Plan.

**Phase 4 — Implement:**
Execute against the Plan. The compressed context is now authoritative. No accumulated noise.

### Step 5: Validate the Architecture

Test metrics for context engineering quality:
- Token count before/after restructure (target: >40% reduction)
- Output consistency across 10 identical queries (target: >90% similar outputs)
- Task success rate (target: maintained or improved vs. stuffed context)
- P95 latency (should decrease with smaller context)

## Examples

**Before (context stuffing):**
System prompt: 8,000 tokens of product documentation, FAQs, policy docs, user history for the past 90 days, and 3 conflicting instructions about tone.
Result: Model gives generic answers, occasionally contradicts itself, P95 latency 8s.

**After (context engineering):**
System prompt: 400 tokens of role definition + current session parameters.
Retrieved on demand: Relevant product docs (semantic search), last 5 user interactions, current policy for this query type.
Result: Consistent answers, no contradictions, P95 latency 2.1s, 73% token cost reduction.

**The Research → Plan → Reset in practice:**
Building a competitive analysis feature:
- Phase 1: Analyst ingests 20 competitor documents (large context, slow)
- Phase 2: Compress to 800-token structured competitive matrix
- Phase 3: Reset, load only the matrix
- Phase 4: Answer competitive questions from clean context — fast, accurate, cheap

## Common Pitfalls

- **Confusing compression with truncation:** Truncating removes information. Compression distills it to higher density. One degrades quality; the other improves it.
- **Static retrieval:** Semantic search that always returns the same top-3 documents is just slow static loading. True retrieval adapts to query type.
- **Over-engineering early:** For simple use cases, a well-crafted 200-token prompt outperforms a complex retrieval architecture. Engineer when you have a real problem.
- **Ignoring the falsification test:** If you can't articulate what breaks when you remove a context element, remove it.

## References
- Dean Peters, "Context Stuffing Is Not Context Engineering" (Substack)
- Teresa Torres — 5 AI PM disciplines
- pm-agent-orchestration — for multi-agent context management
- Dean Peters, Product Manager Skills — context-engineering-advisor skill
