## Description

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. Each concrete factory produces a complete set of products that belong together, ensuring consistency within a family while allowing the entire family to be swapped out at once.

## The Problem It Solves

When a system must work with multiple families of related objects (e.g., UI components for different platforms), directly instantiating concrete classes scatters platform-specific decisions throughout the codebase. If you later need to add a new family or switch between families, you must hunt down and change every instantiation point. The Abstract Factory groups all related creation logic into a single factory, so the client code remains platform-agnostic and changes are localized.

## How It Works

1. Define abstract product interfaces for each kind of object in the family (e.g., `Button`, `Input`).
2. Define an abstract factory interface with a creation method for each product (e.g., `createButton`, `createInput`).
3. For each family, implement concrete product classes and a concrete factory that returns them.
4. Client code receives a factory through its interface and calls the creation methods. It never references concrete classes, so switching families means swapping the factory -- nothing else changes.

## When to Use It

- When your system must support multiple families of related objects (e.g., cross-platform UI toolkits, themed component sets, or environment-specific services).
- When you want to guarantee that products from the same family are used together and never mixed.
- When you want to add new families without modifying existing client code.
- When object creation details should be decoupled from the code that uses the objects.
