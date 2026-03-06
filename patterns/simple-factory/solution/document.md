## Description

The Simple Factory pattern uses a single function or static method to encapsulate the creation of objects. The caller specifies what kind of object it needs (usually via a string or enum), and the factory returns the appropriate concrete instance behind a shared interface. The caller never references or imports the concrete classes directly.

## The Problem It Solves

When client code directly instantiates concrete classes using `new`, it becomes tightly coupled to those implementations. Adding a new variant (e.g., adding ship transportation to a logistics app that only handled trucks) means updating every place that calls `new`. The Simple Factory centralizes object creation in one place, so the rest of the codebase depends only on the common interface. Unlike the full Factory Method pattern (which uses subclass inheritance to vary the created type), Simple Factory uses a single function with conditional logic — simpler but less extensible.

## How It Works

1. Define a common interface (or abstract class) that all product variants implement.
2. Create concrete classes that implement the interface.
3. Write a factory function that takes a discriminator (e.g., a string type) and returns the corresponding concrete instance typed as the common interface.
4. Client code calls the factory function instead of using `new` directly, receiving an object it can use through the interface without knowing the underlying class.

## When to Use It

- When you have several classes that share an interface and the choice of which to instantiate depends on a runtime value (e.g., user input, configuration, or a type field).
- When you want to hide instantiation details from client code and reduce coupling.
- When adding new variants should require changes in only one place (the factory) rather than across the entire codebase.
- When the creation logic is straightforward and does not require the full machinery of the Factory Method or Abstract Factory patterns.
