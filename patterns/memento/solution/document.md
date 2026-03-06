## Description

Captures and externalizes an object's internal state without violating encapsulation, so it can be restored later. A snapshot mechanism.

## The Problem It Solves

You want undo/checkpoints but the object's state is private. Exposing internals breaks encapsulation.

## How It Works

The originator creates mementos from its own state. The caretaker stores them. Only the originator can read/write memento data.

## When to Use It

You need snapshots for undo/redo or checkpoints. Direct field access would violate encapsulation.
