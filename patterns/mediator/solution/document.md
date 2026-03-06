## Description

Reduces chaotic dependencies between objects by forcing them to communicate only through a mediator. Components don't talk to each other directly.

## The Problem It Solves

Multiple components interacting directly create a web of dependencies. Adding or changing one means touching all others.

## How It Works

Components notify the mediator of events. The mediator contains coordination logic and notifies relevant components.

## When to Use It

Components have too many direct dependencies. You can't reuse a component because it references too many others.
