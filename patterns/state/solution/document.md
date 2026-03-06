## Description

Lets an object alter its behavior when its internal state changes. Each state becomes its own class instead of conditionals.

## The Problem It Solves

Objects that behave differently per state end up with massive conditionals scattered across every method.

## How It Works

Each state is a separate class implementing a common interface. The context delegates to the current state object. States transition by swapping the state object.

## When to Use It

An object behaves differently depending on state. You have large conditionals checking the same state variable.
