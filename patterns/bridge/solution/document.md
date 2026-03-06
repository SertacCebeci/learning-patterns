## Description

The Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies — abstraction and implementation — which can be developed independently of each other.

## The Problem It Solves

When you extend a class in two independent dimensions (e.g., Shape by form and by color), you get an exponential explosion of subclasses (BlueCircle, RedSquare, etc.). Without Bridge, you'd need N×M classes. The pattern reduces this to N+M by extracting one dimension into a separate hierarchy.

## How It Works

1. Identify the orthogonal dimensions in a class (e.g., shape form and rendering platform).
2. Extract one dimension into a separate class hierarchy (the implementation).
3. The original class (the abstraction) holds a reference to the implementation object.
4. The abstraction delegates platform-specific work to the implementation object via a common interface.
5. Both hierarchies are connected via composition, not inheritance, so they can vary independently.

## When to Use It

- When you want to divide and organize a monolithic class that has several variants of some functionality (e.g., working with various database servers).
- When you need to extend a class in several independent dimensions.
- When you need to be able to switch implementations at runtime.