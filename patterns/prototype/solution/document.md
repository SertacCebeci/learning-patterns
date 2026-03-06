## Description

The Prototype pattern creates new objects by copying (cloning) an existing instance rather than constructing one from scratch. The original object serves as a prototype, and clones can then be customized independently without affecting the original. This avoids the need to know the concrete class or repeat complex initialization logic.

## The Problem It Solves

Sometimes creating an object is expensive -- it may involve reading from a database, parsing configuration, or performing heavy computation. Repeating this setup every time a new instance is needed is wasteful. Additionally, client code may not know the exact class of the object it needs to duplicate. The Prototype pattern solves both problems by letting you copy a pre-configured instance and tweak it, rather than building from zero.

## How It Works

1. Define a `clone()` method (often through an interface like `Cloneable`) that returns a copy of the object.
2. Inside `clone()`, perform a deep copy of the object so that reference-type fields (arrays, nested objects) are not shared between the original and the clone.
3. Create and configure prototype instances once (e.g., at startup or from configuration).
4. When a new object is needed, call `clone()` on the appropriate prototype and modify the clone as needed.

## When to Use It

- When object creation is expensive and you want to avoid repeating the initialization cost.
- When you need many similar objects with small variations and want to start from a common base.
- When client code should not depend on the concrete class of the objects it duplicates.
- When you want to avoid subclassing just to create slightly different configurations of the same object.
