## Description

Attaches new behaviors to objects by wrapping them in decorator objects that implement the same interface. Decorators can be stacked.

## The Problem It Solves

You want to add responsibilities to objects dynamically without affecting others. Inheritance is static and causes subclass explosion.

## How It Works

Decorators wrap the original, implement the same interface, delegate base work to the wrapped object, and add behavior before/after.

## When to Use It

You need to add behavior to objects without modifying their class. You want to combine behaviors dynamically.
