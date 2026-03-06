## Description

The Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable. The client picks which strategy to use at runtime.

## The Problem It Solves

When a class needs to do the same thing in different ways (e.g., a navigation app with driving, walking, public transit, and cycling routes), embedding all algorithm variants in one class makes it bloated and fragile. Each new algorithm requires modifying the same massive class, creating merge conflicts and increasing the risk of breaking existing functionality. Conditional logic (if/else chains) selecting between variants becomes unmaintainable.

## How It Works

1. Define a common strategy interface that declares a method all concrete strategies must implement (e.g., `buildRoute()`).
2. Extract each algorithm into its own class that implements the strategy interface.
3. The original class (the **context**) stores a reference to a strategy object and delegates the algorithmic work to it instead of executing it directly.
4. The context doesn't know which concrete strategy it's working with — it communicates through the strategy interface.
5. The client creates a specific strategy object and passes it to the context. The strategy can be swapped at runtime.

## When to Use It

- When you have many different variants of an algorithm and want to switch between them at runtime.
- When you have a lot of similar classes that only differ in the way they execute some behavior.
- When you want to isolate the business logic of a class from the implementation details of algorithms.
- When your class has a massive conditional operator that switches between different variants of the same algorithm.