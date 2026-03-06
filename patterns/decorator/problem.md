# Coffee Shop Order System

## Background

You are building an ordering system for a coffee shop. The system needs to calculate the cost and generate a description for each drink order.

## The Challenge

The shop offers a base drink and various add-ons:

**Base drinks:**
- `Espresso` — $2.00
- `HouseBlend` — $1.50

**Add-ons (can be combined in any order and quantity):**
- `Milk` — adds $0.50 and appends ", Milk" to the description
- `Whip` — adds $0.70 and appends ", Whip" to the description
- `Caramel` — adds $0.60 and appends ", Caramel" to the description
- `ExtraShot` — adds $0.80 and appends ", Extra Shot" to the description

All drinks and add-ons share the same interface:

```typescript
interface Beverage {
  cost(): number;
  description(): string;
}
```

## Requirements

1. Implement the `Beverage` interface for both base drinks and add-ons
2. Add-ons should wrap a `Beverage` and enhance its cost and description
3. Add-ons must be stackable in any combination — e.g., an Espresso with double Milk and Caramel
4. The `cost()` method should return the total price including all add-ons
5. The `description()` method should return the full drink description (e.g., "Espresso, Milk, Milk, Caramel")

## Example Usage

```typescript
let drink: Beverage = new Espresso();
drink = new Milk(drink);
drink = new Milk(drink);
drink = new Caramel(drink);

console.log(drink.description()); // "Espresso, Milk, Milk, Caramel"
console.log(drink.cost());        // 3.60
```

## Constraints

- Do not use inheritance to create classes like `EspressoWithMilk` or `HouseBlendWithWhipAndCaramel`
- Each add-on class must implement the same `Beverage` interface
- Adding a new add-on should require only one new class, with no changes to existing code
