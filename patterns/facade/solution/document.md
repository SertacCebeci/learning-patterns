## Description

The Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes. It doesn't hide the subsystem — it offers a convenient shortcut for the most common use cases.

## The Problem It Solves

When working with a complex subsystem (e.g., a video conversion library with dozens of classes), you need to initialize many objects, manage dependencies, and call methods in the correct order. This tightly couples your business logic to subsystem details, making the code hard to understand and maintain.

## How It Works

1. Create a facade class that provides a simple interface to the most-needed features of the subsystem.
2. The facade initializes subsystem objects, manages their dependencies, and delegates client calls to the appropriate subsystem methods in the correct order.
3. The client interacts only with the facade instead of directly with dozens of subsystem classes.
4. The subsystem remains fully accessible for clients that need advanced features — the facade is a convenience, not a restriction.

## When to Use It

- When you need a simple entry point to a complex subsystem and only use a fraction of its features.
- When you want to structure a subsystem into layers, with facades defining entry points to each level.
- When you want to reduce coupling between your code and a complex third-party library or framework.