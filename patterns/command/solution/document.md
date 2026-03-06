## Description

The Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as method arguments, delay or queue their execution, and support undoable operations.

## The Problem It Solves

When GUI elements (buttons, menus, shortcuts) directly call business logic, the code becomes tightly coupled and duplicated. For example, copy/paste logic might be duplicated across a toolbar button, a context menu item, and a keyboard shortcut. The Command pattern extracts all request details into a separate command class, decoupling the sender (invoker) from the receiver (business logic).

## How It Works

1. Define a command interface with a single execution method (e.g., `execute()`).
2. Create concrete command classes that encapsulate a specific action along with its parameters and a reference to the receiver object that does the actual work.
3. The sender (invoker) triggers the command without knowing what it does — it only calls `execute()`.
4. The client creates command objects, configures them with receivers, and associates them with senders.
5. For undo support, commands can implement an `undo()` method and store state needed to reverse the operation.

## When to Use It

- When you want to parameterize objects with operations (pass commands as arguments, store them, switch at runtime).
- When you want to queue operations, schedule their execution, or execute them remotely.
- When you want to implement reversible operations (undo/redo) by maintaining a command history.
- When you want to decouple the object that invokes the operation from the object that performs it.