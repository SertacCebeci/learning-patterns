## Description

The Decorator is a structural design pattern that lets you attach new behaviors to objects by placing them inside special wrapper objects that contain the behaviors. Multiple decorators can be stacked to combine behaviors.

## The Problem It Solves

When you need to combine multiple optional features in various ways (e.g., a notification library supporting email, SMS, Slack in any combination), using inheritance leads to a combinatorial explosion of subclasses. Inheritance is also static — you can't change behavior at runtime or extend `final` classes.

## How It Works

1. Define a component interface that declares common operations.
2. A concrete component provides the base behavior.
3. A base decorator class implements the same interface, holds a reference to a wrapped object, and delegates all operations to it.
4. Concrete decorators extend the base decorator and add extra behavior before or after delegating to the wrapped object.
5. The client wraps objects in any combination of decorators, stacking them like layers. Each layer adds its behavior while the client interacts through the common interface.

## When to Use It

- When you need to assign extra behaviors to objects at runtime without breaking the code that uses them.
- When extending behavior via inheritance is impractical or impossible (e.g., `final` classes).
- When you want to combine several optional behaviors flexibly instead of creating subclasses for every combination.