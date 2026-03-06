## Description

Provides a substitute or placeholder for another object. Controls access to the original, allowing you to perform something before/after the request reaches it.

## The Problem It Solves

You have an object that's expensive to create, needs access control, or should be cached/logged — but you don't want to modify the object itself.

## How It Works

The proxy implements the same interface as the real object. It decides when and how to delegate to the real object.

## When to Use It

Lazy loading, access control, caching, or logging around an existing object.
