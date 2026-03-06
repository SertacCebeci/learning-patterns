## Description

The Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects. Clients treat individual objects and compositions uniformly through a shared interface.

## The Problem It Solves

When your model forms a tree structure (e.g., products and boxes containing products or other boxes), calculating totals or performing operations requires knowing concrete class types and handling nesting manually. Without Composite, the code must distinguish between simple and complex elements at every level, making it fragile and hard to extend.

## How It Works

1. Define a common component interface that declares operations meaningful for both simple and complex elements (e.g., `getPrice()`).
2. Leaf classes implement the interface directly — they are basic elements with no sub-elements.
3. Container (composite) classes also implement the interface but hold a list of children. They delegate work to sub-elements recursively (e.g., a box asks each item for its price, then returns a total).
4. The client works exclusively through the component interface, without needing to know whether it's dealing with a leaf or a composite.

## When to Use It

- When your app's core model can be represented as a tree structure.
- When you want client code to treat both simple and complex elements uniformly, without type-checking or distinguishing between them.