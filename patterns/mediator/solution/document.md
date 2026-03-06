## Description

The Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. It restricts direct communications between objects and forces them to collaborate only via a mediator object.

## The Problem It Solves

When UI elements or other components communicate directly with each other (e.g., a checkbox reveals a text field, a submit button validates all fields), they become tightly coupled. Changes to one element may affect all others. This makes components hard to reuse in other contexts because they drag along all their dependencies.

## How It Works

1. Define a mediator interface that declares communication methods (e.g., `notify(sender, event)`).
2. Components store a reference to the mediator instead of references to each other.
3. When something happens in a component (e.g., a button click), it notifies the mediator instead of calling other components directly.
4. The mediator contains the coordination logic — it receives notifications and redirects calls to the appropriate components.
5. Components become independent of each other and only depend on the mediator interface.

## When to Use It

- When classes are so tightly coupled to each other that it's hard to change one without affecting the others.
- When you can't reuse a component in a different program because it depends on too many other components.
- When you find yourself creating lots of component subclasses just to reuse some basic behavior in various contexts.