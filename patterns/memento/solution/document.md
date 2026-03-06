## Description

The Memento is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation. It acts as a snapshot mechanism that preserves encapsulation.

## The Problem It Solves

When implementing undo functionality (e.g., in a text editor), you need to capture an object's internal state. But accessing private fields directly to create snapshots violates encapsulation and makes your code fragile — if the object's internal structure changes, all snapshot code breaks. Exposing all state through public getters is equally problematic.

## How It Works

1. The **Originator** is the object whose state needs to be saved. Since it has full access to its own fields, only it can create and restore snapshots.
2. The **Memento** is an immutable value object that acts as a snapshot of the originator's state. Its data is accessible only to the originator.
3. The **Caretaker** manages when and why to capture the originator's state, and when to restore it. It stores mementos but never reads or modifies their contents.
4. When a snapshot is needed, the caretaker asks the originator to produce a memento. To undo, the caretaker passes a stored memento back to the originator, which restores its state from it.

## When to Use It

- When you need to produce snapshots of an object's state to restore it later (undo/redo, checkpoints).
- When direct access to the object's fields/getters/setters would violate its encapsulation.
- When you need transaction rollbacks — restore state when an operation fails.