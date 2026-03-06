## Description

The Prototype Registry extends the basic Prototype pattern by adding a centralized registry that stores frequently-used pre-configured prototypes. Instead of holding direct references to prototype objects, clients look up prototypes by name from the registry, clone them, and optionally register their customized versions as new prototypes. This creates a dynamic, extensible catalog of clonable objects.

## The Problem It Solves

In the basic Prototype pattern, the client must hold a direct reference to the prototype object it wants to clone. This becomes unwieldy when there are many prototypes or when prototypes are created dynamically at runtime. The registry centralizes storage and lookup, allowing any part of the system to register new prototypes and any other part to discover and clone them by name -- without tight coupling between producer and consumer.

## How It Works

1. Objects implement a `clone()` method that returns an independent deep copy.
2. A `Registry` class maintains a `Map<string, Prototype>` of named prototypes.
3. `register(key, object)` stores a clone of the object (so the original can continue to be modified independently).
4. `spawn(key)` looks up the prototype by name and returns a clone of it.
5. Clients can customize a spawned clone and register it back as a new prototype, building up the catalog at runtime.

## When to Use It

- When you need a growing catalog of pre-configured objects that can be cloned on demand.
- When prototypes are created dynamically (e.g., user-customized configurations) and should be reusable later.
- When different parts of the system need to share prototypes without passing direct object references.
- When you want to decouple prototype producers from consumers through a name-based lookup mechanism.
