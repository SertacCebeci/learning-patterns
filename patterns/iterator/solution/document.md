## Description

The Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

## The Problem It Solves

Collections store elements in various data structures (lists, trees, graphs), each requiring different traversal logic. Adding traversal algorithms directly to the collection blurs its primary responsibility of storing data. Client code also becomes coupled to specific collection types, making it hard to switch collections or support multiple traversal strategies.

## How It Works

1. Define an iterator interface with methods like `getNext()` and `hasMore()`.
2. Create concrete iterator classes that implement specific traversal algorithms and track their own traversal state (current position, elements remaining, etc.).
3. Define a collection interface with a method for creating iterators (e.g., `createIterator()`).
4. Concrete collections return the appropriate iterator instance.
5. The client works with both collections and iterators through their interfaces, decoupled from the underlying data structure. Multiple iterators can traverse the same collection independently and simultaneously.

## When to Use It

- When your collection has a complex data structure under the hood and you want to hide its details from clients.
- When you want to reduce duplication of traversal code across your app.
- When you want your code to be able to traverse different data structures or when the types of structures are unknown beforehand.