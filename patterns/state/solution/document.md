## Description

The State is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class. Each state becomes its own class instead of being handled by conditionals.

## The Problem It Solves

When an object behaves differently depending on its current state (e.g., a Document with Draft, Moderation, and Published states), the same method like `publish()` needs different logic in each state. This leads to massive conditionals scattered across every method, which become harder to maintain as states multiply. Similar states also tend to accumulate duplicate code.

## How It Works

1. Define a state interface that declares methods for all state-specific behaviors.
2. Create concrete state classes for each possible state, implementing the behavior for that state.
3. The original object (the **context**) stores a reference to the current state object and delegates all state-specific work to it.
4. To transition between states, swap the current state object with another. State objects may hold a backreference to the context to trigger transitions themselves.
5. Both the context and concrete states can set the next state, making transitions explicit and localized.

## When to Use It

- When an object behaves differently depending on its current state, the number of states is significant, and state-specific code changes frequently.
- When a class is polluted with massive conditionals that alter behavior based on the current values of its fields.
- When you have a lot of duplicate code across similar states and conditional-based transitions.