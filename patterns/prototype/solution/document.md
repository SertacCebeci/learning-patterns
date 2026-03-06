## Description

The Prototype pattern creates new objects by copying (cloning) an existing instance rather than constructing one from scratch. The original object serves as a prototype, and clones can then be customized independently without affecting the original. This avoids the need to know the concrete class or repeat complex initialization logic.

## The Problem It Solves

When you want to create an exact copy of an object, you can't always do it from the outside — some fields may be private and not visible. Even if all fields are accessible, copying requires knowing the object's concrete class, which couples your code to that class. When working with objects through interfaces, you may not even know the concrete class at all. The Prototype pattern delegates cloning to the objects themselves, solving both the encapsulation and coupling problems.

## How It Works

1. Define a `clone()` method (often through an interface like `Cloneable`) that returns a copy of the object.
2. Inside `clone()`, perform a deep copy of the object so that reference-type fields (arrays, nested objects) are not shared between the original and the clone.
3. Create and configure prototype instances once (e.g., at startup or from configuration).
4. When a new object is needed, call `clone()` on the appropriate prototype and modify the clone as needed.

## When to Use It

- When your code shouldn't depend on the concrete classes of objects that you need to copy.
- When you want to reduce the number of subclasses that only differ in the way they initialize their objects.
- When object creation is expensive and you want to avoid repeating the initialization cost.
- When you need many similar objects with small variations and want to start from a pre-configured base.
