## Description

Defines a one-to-many dependency. When the subject changes state, all subscribed observers are notified automatically. A subscription mechanism.

## The Problem It Solves

Objects need to react to state changes in another object without constantly polling or tight coupling.

## How It Works

The subject maintains a subscriber list. On state change, it iterates and calls a notification method on each observer.

## When to Use It

Changes in one object should trigger updates in others. The set of interested objects changes at runtime.
