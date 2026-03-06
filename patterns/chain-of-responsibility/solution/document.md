## Description

The Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

## The Problem It Solves

When multiple sequential checks or operations need to be performed on a request (e.g., authentication, validation, caching), code becomes tangled, tightly coupled, and hard to maintain. Adding or removing checks requires modifying a monolithic block of conditionals, and reusing individual checks across different parts of the system becomes impossible.

## How It Works

1. Extract each check or processing step into its own handler class.
2. All handlers implement a common interface with a method for processing requests and a reference to the next handler.
3. Link handlers into a chain. Each handler either processes the request and stops (or continues), or passes it to the next handler.
4. The client can compose, reorder, or extend the chain at runtime without modifying existing handlers.
5. A request travels along the chain until a handler processes it or the chain ends.

## When to Use It

- When your program needs to process different kinds of requests in various ways, but the exact types and sequences aren't known beforehand.
- When several handlers must execute in a particular order.
- When the set of handlers and their order should change at runtime.