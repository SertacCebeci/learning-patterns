## Description

The Builder with Director pattern adds a Director class on top of the basic Builder pattern. The Director defines the order in which to execute the building steps and encapsulates predefined construction routines (recipes), so the client does not need to call individual builder steps. The client simply chooses a builder (which determines the concrete parts) and a director recipe (which determines the combination of steps), and receives a fully assembled product. The Director is optional — the client can call builder steps directly — but it's useful for reusing construction routines.

## The Problem It Solves

In the basic Builder pattern, the client still needs to know which steps to call and in what order. When the same construction sequences are used in multiple places, this leads to duplicated step-by-step code. The Director centralizes these recipes, making them reusable and ensuring consistency. It also separates "what to build" (the builder) from "how to assemble it" (the director).

## How It Works

1. Define a builder interface with step methods (e.g., `addMain()`, `addSide()`) and a `getResult()` method.
2. Implement concrete builders that produce different variants of the product through the same interface.
3. Create a Director class that accepts a builder and exposes high-level methods (e.g., `buildQuickLunch()`, `buildFullCombo()`), each calling a specific sequence of builder steps.
4. The client instantiates a concrete builder, passes it to the director, and calls a recipe method. The director orchestrates the builder steps and returns the product.

## When to Use It

- When you have multiple predefined configurations of a product that are built from the same steps in different combinations.
- When you want to reuse construction recipes across different parts of the codebase without duplicating step sequences.
- When you want to decouple the assembly algorithm from the concrete parts being assembled (swapping the builder changes the product family; swapping the recipe changes the combination).
- When the number of builder steps is large enough that calling them manually in client code becomes error-prone.
