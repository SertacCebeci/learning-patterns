## Description

Provides sequential access to elements of a collection without exposing its underlying data structure.

## The Problem It Solves

Collections stored in different structures require different traversal logic, coupling clients to implementations.

## How It Works

The collection returns an iterator with hasNext()/next(). Clients traverse uniformly. Different iterators can traverse the same collection differently.

## When to Use It

You want uniform traversal across different collection types. You need multiple traversal strategies.
