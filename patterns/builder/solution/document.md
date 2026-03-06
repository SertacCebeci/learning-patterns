## Description

The Builder is a creational design pattern that lets you construct complex objects step by step. It allows producing different types and representations of an object using the same construction code, instead of passing many parameters to a constructor or using multiple overloads.

## The Problem It Solves

Complex objects often have many optional fields. Using a single constructor with numerous parameters leads to a "telescoping constructor" — confusing call sites where callers must supply defaults for fields they do not care about. Alternatively, creating subclasses for every possible configuration leads to class explosion. The Builder pattern lets each caller configure only the parts that matter, producing readable code and preventing invalid partially-constructed objects.

## How It Works

1. Define a builder interface that declares construction steps common to all builders (e.g., `buildWalls()`, `buildDoor()`).
2. Create concrete builder classes that implement these steps differently for various product representations.
3. For each configurable field, expose a setter method that stores the value and returns `this` (enabling method chaining).
4. Provide a `build()` or `getResult()` method that constructs and returns the final product from the accumulated state.
5. The client creates a builder, calls whichever steps are relevant, and retrieves the result.

## When to Use It

- When an object has many optional parameters and you want to avoid telescoping constructors.
- When you want to create different representations of some product (e.g., stone house vs. wooden house) using the same construction steps.
- When constructing composite trees or other complex objects that require step-by-step initialization.
- When you want to enforce that the object is fully valid only after the final build step.