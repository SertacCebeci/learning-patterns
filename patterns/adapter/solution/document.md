## Description

Converts the interface of a class into another interface the client expects. Lets classes work together that couldn't otherwise because of incompatible interfaces.

## The Problem It Solves

You want to use an existing class but its interface doesn't match what your code expects. You can't modify the third-party class.

## How It Works

The adapter wraps the incompatible object, implements the target interface, and translates calls between them.

## When to Use It

Integrating third-party libraries, legacy code, or external APIs with different interfaces.
