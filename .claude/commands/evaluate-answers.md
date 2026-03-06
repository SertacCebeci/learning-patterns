# Evaluate Design Pattern Answers

## Overview

Evaluates a user's design pattern implementation and documentation against the reference solution. Reads both the user's answer and the solution, then provides structured feedback.

## Process

1. **Read all four files** for the given pattern name under `patterns/<pattern-name>/`:
   - `answer/index.ts` — user's code implementation
   - `answer/document.md` — user's pattern description
   - `solution/index.ts` — reference implementation
   - `solution/document.md` — reference description

2. **Read the problem** from `patterns/<pattern-name>/problem.md` to understand what was asked.

3. **Evaluate the code** (`answer/index.ts` vs `solution/index.ts`):
   - Does it solve the problem described in `problem.md`?
   - Does it correctly implement the design pattern?
   - Are the pattern's key participants present (interface, concrete classes, client)?
   - Does it compile and run? Execute with `npx ts-node patterns/<pattern-name>/answer/index.ts`
   - Note: the user's approach does NOT need to match the reference solution exactly. Different examples are fine as long as the pattern is correctly applied.

4. **Evaluate the documentation** (`answer/document.md` vs `solution/document.md`):
   - **Description**: Does it accurately describe what the pattern is?
   - **The problem it solves**: Does it identify the correct motivation?
   - **How it works**: Does it explain the mechanism correctly?
   - **When to use it**: Does it list appropriate use cases?
   - Compare against reference for completeness and accuracy, but accept different wording.

5. **Output a structured report**:

```
## Evaluation: <pattern-name>

### Code Implementation
- **Pattern correctness**: [Correct / Partially correct / Incorrect] — explanation
- **Problem solved**: [Yes / Partially / No] — does it address problem.md?
- **Runs successfully**: [Yes / No] — result of executing the file
- **Feedback**: specific suggestions if needed

### Documentation
- **Description**: [Complete / Partial / Missing] — feedback
- **Problem it solves**: [Complete / Partial / Missing] — feedback
- **How it works**: [Complete / Partial / Missing] — feedback
- **When to use it**: [Complete / Partial / Missing] — feedback

### Overall: [Pass / Needs revision]
summary and encouragement
```

## Important

- Be encouraging but honest. The goal is learning.
- Accept valid alternative implementations — there's no single correct example for a pattern.
- Focus on whether the user understands the pattern's intent, not whether they matched the reference word-for-word.
- If code doesn't run, show the error and suggest a fix.
- If documentation fields are empty, note them as "Missing" and suggest what should go there.
