## Description

Provides a simplified interface to a complex subsystem. Doesn't hide the subsystem — offers a convenient shortcut for common use cases.

## The Problem It Solves

Complex systems have many moving parts. The client shouldn't need to orchestrate subsystems manually.

## How It Works

The facade wraps the complex subsystem behind a single method or small interface, orchestrating the correct order of operations.

## When to Use It

You need a simple entry point to a complex subsystem. You want to decouple client code from subsystem internals.
