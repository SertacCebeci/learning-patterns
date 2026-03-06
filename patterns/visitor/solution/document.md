## Description

Adds new operations to existing object structures without modifying the objects. Uses double dispatch to select the correct method.

## The Problem It Solves

Adding new operations across a type hierarchy means modifying every class. Elements become bloated with unrelated operations.

## How It Works

Elements accept visitors via accept(visitor). Visitors implement visit methods per element type. New operation = new visitor, no element changes.

## When to Use It

Stable class hierarchy with frequently added operations. Related operations should be grouped together.
