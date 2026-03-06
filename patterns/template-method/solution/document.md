## Description

Defines the skeleton of an algorithm in a base class. Subclasses override specific steps without changing the overall structure.

## The Problem It Solves

Multiple classes share the same workflow but differ in specific steps, leading to duplicated code.

## How It Works

The base class has a template method calling steps in fixed order. Some steps are abstract (must override), some have defaults (may override).

## When to Use It

Multiple classes share the same algorithm structure but differ in details. You need to enforce operation order.
