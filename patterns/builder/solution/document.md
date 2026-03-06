## Description

The Builder pattern separates the construction of a complex object from its representation. Instead of passing many parameters to a constructor or using multiple overloads, the builder provides a fluent, step-by-step interface for setting each part of the object. A final `build()` call assembles and returns the fully configured product.

## The Problem It Solves

Complex objects often have many optional fields. Using a single constructor with numerous parameters leads to confusing call sites (what does the 5th argument mean?) and forces callers to supply defaults for fields they do not care about. The Builder pattern lets each caller configure only the parts that matter, producing readable code and preventing invalid partially-constructed objects.

## How It Works

1. Define the product class with all its fields (often as readonly properties set via the constructor).
2. Create a builder class that mirrors those fields with sensible defaults.
3. For each configurable field, expose a setter method that stores the value and returns `this` (enabling method chaining).
4. Provide a `build()` method that constructs and returns the final product from the accumulated state.
5. The client creates a builder, calls whichever setters are relevant, and finishes with `build()`.

## When to Use It

- When an object has many optional parameters and you want to avoid telescoping constructors.
- When you want to enforce that the object is fully valid only after `build()` is called, preventing use of partially-constructed instances.
- When the construction steps should be readable and self-documenting through method chaining.
- When you need to create different configurations of the same object type without multiple constructor overloads.
