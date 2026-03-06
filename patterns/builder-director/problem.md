# Problem: Computer Assembly System

You run a computer assembly shop. Each computer is built from standard components, but different customer needs call for different configurations. You want to standardize the assembly process.

## Requirements

1. Create a `Computer` class (the product) with a `parts: string[]` array and a `display()` method that prints all parts.

2. Define a `ComputerBuilder` interface with these step methods:
   - `addCPU(): void`
   - `addRAM(): void`
   - `addStorage(): void`
   - `addGPU(): void`
   - `addCooling(): void`
   - `getResult(): Computer`

3. Implement two concrete builders:
   - `GamingPCBuilder` -- uses high-end parts (e.g., "Intel i9", "32GB DDR5", "2TB NVMe SSD", "RTX 4090", "Liquid Cooling").
   - `OfficePCBuilder` -- uses budget parts (e.g., "Intel i5", "16GB DDR4", "512GB SSD", "Integrated Graphics", "Stock Fan").

4. Create a `ComputerDirector` class that accepts a builder and provides these recipes:
   - `buildBasicPC()`: CPU + RAM + Storage (no GPU, no extra cooling).
   - `buildFullPC()`: All components.
   - `buildWorkstation()`: CPU + RAM + Storage + Cooling (no dedicated GPU).

5. The same director recipes must work with any builder -- swapping the builder changes the parts but not the assembly process.

## Example Usage

```ts
const gamingBuilder = new GamingPCBuilder();
const officeBuilder = new OfficePCBuilder();
const director = new ComputerDirector(gamingBuilder);

director.buildFullPC().display();
// Computer: Intel i9, 32GB DDR5, 2TB NVMe SSD, RTX 4090, Liquid Cooling

director.setBuilder(officeBuilder);
director.buildBasicPC().display();
// Computer: Intel i5, 16GB DDR4, 512GB SSD
```

## Acceptance Criteria

- The director centralizes construction recipes -- client code never calls builder steps directly.
- Swapping the builder in the director changes the components but reuses the same recipes.
- Adding a new recipe (e.g., `buildMediaCenter`) requires changes only in the director, not in builders or client code.
- Each builder resets its internal state after `getResult()` so it can be reused for the next build.
