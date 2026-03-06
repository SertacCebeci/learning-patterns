## Description

The Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate. It lets you add new operations to existing object structures without modifying the objects themselves.

## The Problem It Solves

When you need to add a new operation (e.g., XML export) across a complex class hierarchy, you face a dilemma: modifying each class risks breaking existing code and mixes unrelated concerns into data structure classes. Each new export format or operation would require changing the same fragile classes again and again.

## How It Works

1. Define a **Visitor interface** with a `visit` method for each concrete element type in the structure (e.g., `visitCity(City)`, `visitIndustry(Industry)`).
2. Create **concrete visitor** classes that implement the actual behavior for each element type.
3. Add a simple `accept(visitor)` method to each element class. This method calls the visitor's corresponding visit method, passing `this` — a technique called **Double Dispatch**. The element tells the visitor which visit method to call.
4. New operation = new visitor class. No element classes need to change.
5. Visitors can accumulate useful state as they traverse the object structure.

## When to Use It

- When you need to perform an operation on all elements of a complex object structure (e.g., a tree) with diverse element types.
- When you want to clean up the business logic of auxiliary behaviors by extracting them into visitor classes.
- When a behavior makes sense only for some classes in the hierarchy but not others, and you don't want to pollute unrelated classes.