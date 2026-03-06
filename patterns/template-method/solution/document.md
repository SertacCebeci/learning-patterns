## Description

The Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps without changing the overall algorithm's structure.

## The Problem It Solves

When multiple classes implement nearly identical algorithms with minor variations (e.g., a data mining app processing PDF, DOC, and CSV files shares parsing logic but differs in file-format handling), code gets duplicated across classes. Changes to the shared algorithm require updating multiple classes, and the overall structure can drift between implementations.

## How It Works

1. Analyze the algorithm and break it into discrete steps, each becoming a method.
2. Define a **template method** in the base class that calls these steps in a fixed order. Make it `final` so subclasses can't change the structure.
3. Steps can be of three types:
   - **Abstract steps**: Must be implemented by every subclass (the varying parts).
   - **Optional steps**: Have a default implementation that subclasses may override.
   - **Hooks**: Empty methods that serve as extension points — subclasses can optionally plug in behavior before/after key steps.
4. Subclasses override only the steps they need to customize, inheriting the rest.

## When to Use It

- When you want clients to extend only particular steps of an algorithm, not the whole algorithm or its structure.
- When you have several classes with nearly identical algorithms and want to eliminate duplicated code by pulling the shared structure into a superclass.
- When you need to enforce a fixed order of operations while allowing variation in individual steps.