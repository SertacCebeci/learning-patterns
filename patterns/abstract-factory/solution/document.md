## Description

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. Each concrete factory produces a complete set of products that belong together, ensuring consistency within a family while allowing the entire family to be swapped out at once.

## The Problem It Solves

When a system must work with multiple families of related objects (e.g., furniture in Modern, Victorian, or ArtDeco styles), directly instantiating concrete classes scatters variant-specific decisions throughout the codebase. You need a way to create individual objects so that they match other objects of the same family. If you later need to add a new family or switch between families, you must hunt down and change every instantiation point. The Abstract Factory groups all related creation logic into a single factory, so the client code remains variant-agnostic and changes are localized.

## How It Works

1. Define abstract product interfaces for each kind of object in the family (e.g., `Button`, `Input`).
2. Define an abstract factory interface with a creation method for each product (e.g., `createButton`, `createInput`).
3. For each family, implement concrete product classes and a concrete factory that returns them.
4. Client code receives a factory through its interface and calls the creation methods. It never references concrete classes, so switching families means swapping the factory -- nothing else changes.

## When to Use It

- When your code needs to work with multiple families of related products, but you don't want it to depend on concrete classes (they might be unknown beforehand or you want to allow for future extensibility).
- When you want to guarantee that products from the same family are used together and never mixed.
- When you have a class with a set of Factory Methods that blur its primary responsibility.
- When you want to add new product variants (families) without modifying existing client code.
