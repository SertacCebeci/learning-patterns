## Description

The Singleton pattern ensures that a class has only one instance throughout the entire application and provides a global point of access to that instance. The constructor is made private so that no external code can create new instances directly; instead, a static method controls instance creation and always returns the same object.

## The Problem It Solves

The Singleton pattern solves two problems at once (which is why it's sometimes considered a violation of the Single Responsibility Principle):

1. **Ensure a single instance**: Certain resources must exist as a single shared instance (e.g., a database connection, configuration store). Without Singleton, code can independently create multiple instances leading to inconsistent state.
2. **Provide a global access point**: While similar to global variables, Singleton protects the instance from being overwritten by other code and centralizes access.

## How It Works

1. The class declares a private static field to hold its single instance.
2. The constructor is marked private (or protected) so it cannot be called from outside.
3. A public static method (commonly `getInstance`) checks whether the instance already exists. If not, it creates one; if so, it returns the existing instance.
4. All consumers call this static method instead of using `new`, so they always receive the same object.

## When to Use It

- When exactly one instance of a class is needed to coordinate actions across the system (e.g., a shared database connection).
- When you need stricter control over global variables.
- When you need to control concurrent access to a shared resource.
- Note: Singleton requires special handling in multithreaded environments and can complicate unit testing.
