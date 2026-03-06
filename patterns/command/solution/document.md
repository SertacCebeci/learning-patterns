## Description

Turns a request into a stand-alone object containing all information about the request. Enables undo/redo, queueing, and logging.

## The Problem It Solves

You want to decouple the invoker from the receiver. You need to queue, undo, or log operations.

## How It Works

Each action is wrapped in a command object with execute() and undo(). An invoker triggers commands without knowing what they do.

## When to Use It

You need undo/redo, operation queueing, scheduling, or logging.
