## Description

The Singleton pattern ensures that a class has only one instance throughout the entire application and provides a global point of access to that instance. The constructor is made private so that no external code can create new instances directly; instead, a static method controls instance creation and always returns the same object.

## The Problem It Solves

In many applications, certain resources must exist as a single shared instance -- for example, a configuration manager, a connection pool, or a logging service. Without the Singleton pattern, multiple parts of the code could independently create their own instances, leading to duplicated state, wasted resources, or inconsistent behavior. The pattern guarantees that everyone works with the exact same object.

## How It Works

1. The class declares a private static field to hold its single instance.
2. The constructor is marked private (or protected) so it cannot be called from outside.
3. A public static method (commonly `getInstance`) checks whether the instance already exists. If not, it creates one; if so, it returns the existing instance.
4. All consumers call this static method instead of using `new`, so they always receive the same object.

## When to Use It

- When exactly one instance of a class is needed to coordinate actions across the system (e.g., a logger, configuration store, or cache).
- When you need to control concurrent access to a shared resource.
- When creating the object is expensive and you want to avoid redundant initialization.
- When global state must be accessed consistently from many parts of the application.
