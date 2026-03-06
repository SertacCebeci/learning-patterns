## Description

The Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate. It converts the interface of a class into another interface the client expects, letting classes work together that couldn't otherwise because of incompatible interfaces.

## The Problem It Solves

You want to use an existing class (e.g., a third-party analytics library that only works with JSON) but its interface doesn't match what your code expects (e.g., your app works with XML). You can't modify the third-party or legacy class directly.

## How It Works

1. The adapter implements the interface that the client code expects (the target interface).
2. Internally, it wraps the incompatible service object.
3. The adapter receives calls from the client via the target interface and translates them into calls to the wrapped service object in a format it can understand.
4. There are two approaches: **Object Adapter** uses composition (wraps the service object), while **Class Adapter** uses multiple inheritance to inherit from both interfaces (only possible in languages like C++).

## When to Use It

- When you want to use an existing class but its interface isn't compatible with the rest of your code.
- When you want to reuse several existing subclasses that lack some common functionality that can't be added to the superclass.
- When integrating third-party libraries, legacy code, or external APIs with different interfaces.