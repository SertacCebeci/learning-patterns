## Description

The Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all data in each object.

## The Problem It Solves

When your application creates a huge number of similar objects (e.g., particles in a game — bullets, missiles, shrapnel), each storing duplicate data like color and sprite, memory consumption becomes excessive. The redundant data stored across thousands of objects can cause crashes on machines with limited RAM.

## How It Works

1. Split the object's state into two parts: **intrinsic state** (shared, immutable data like color and sprite) and **extrinsic state** (unique, context-specific data like coordinates and velocity).
2. Keep only the intrinsic state inside the flyweight object. Make it immutable — set its state only via constructor parameters.
3. Move extrinsic state out to a context object or pass it as method parameters.
4. Use a flyweight factory that manages a pool of existing flyweights. The factory returns an existing flyweight for a given set of intrinsic state or creates a new one if none exists.
5. The client stores or computes extrinsic state and passes it to flyweight methods when needed.

## When to Use It

- When your application must create a huge number of similar objects that drain all available RAM.
- When objects contain duplicate state that can be extracted and shared.
- When the memory savings from sharing outweigh the added complexity of splitting state.