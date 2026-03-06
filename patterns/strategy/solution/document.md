## Description

Defines a family of interchangeable algorithms. The client picks which to use at runtime without changing the context.

## The Problem It Solves

Multiple ways to do the same thing lead to if/else chains. Adding a new algorithm means modifying existing code.

## How It Works

Each algorithm is a class implementing a common interface. The context holds a reference to the current strategy and delegates work to it.

## When to Use It

Multiple algorithms for the same task. You want to isolate algorithm logic from usage code.
