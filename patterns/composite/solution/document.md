## Description

Composes objects into tree structures and lets clients treat individual objects and compositions uniformly through a shared interface.

## The Problem It Solves

You have a tree structure where leaf nodes and branches should be treated the same way by client code.

## How It Works

Both leaves and composites implement the same interface. Composites hold children and delegate operations to them recursively.

## When to Use It

You need to represent part-whole hierarchies. Client code should treat simple and complex elements uniformly.
