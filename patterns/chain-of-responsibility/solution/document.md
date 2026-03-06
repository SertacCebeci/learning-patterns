## Description

Passes a request along a chain of handlers. Each handler decides to process the request or pass it to the next.

## The Problem It Solves

Multiple processing steps that should be applied conditionally. Without it, deeply nested if/else or monolithic functions.

## How It Works

Each handler has a reference to the next. It either handles the request and stops, or delegates to the next handler.

## When to Use It

Multiple objects might handle a request. Processing steps should be composable and reorderable.
