// Strategy Pattern
// Defines a family of interchangeable algorithms. The client picks
// which one to use at runtime without changing the context.

// Example: a shipping cost calculator where the pricing algorithm
// varies by delivery method.

// --- Strategy interface ---

interface ShippingStrategy {
  calculate(weight: number, distance: number): number;
  getName(): string;
}

// --- Concrete strategies ---

class StandardShipping implements ShippingStrategy {
  getName(): string { return "Standard (5-7 days)"; }

  calculate(weight: number, distance: number): number {
    return weight * 0.5 + distance * 0.01;
  }
}

class ExpressShipping implements ShippingStrategy {
  getName(): string { return "Express (2-3 days)"; }

  calculate(weight: number, distance: number): number {
    return weight * 1.2 + distance * 0.03 + 5.00; // flat surcharge
  }
}

class OvernightShipping implements ShippingStrategy {
  getName(): string { return "Overnight (next day)"; }

  calculate(weight: number, distance: number): number {
    return weight * 2.0 + distance * 0.05 + 15.00;
  }
}

class FreeShipping implements ShippingStrategy {
  getName(): string { return "Free Shipping (promo)"; }

  calculate(): number {
    return 0;
  }
}

// --- Context ---

class ShippingCalculator {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  calculateCost(weight: number, distance: number): number {
    return this.strategy.calculate(weight, distance);
  }

  display(weight: number, distance: number): void {
    const cost = this.calculateCost(weight, distance);
    console.log(`  ${this.strategy.getName()}: $${cost.toFixed(2)}`);
  }
}

// --- Usage ---
// Same calculator, same package — different strategies produce different costs.

const weight = 3.5;   // kg
const distance = 500;  // km

console.log(`=== Package: ${weight}kg, ${distance}km ===\n`);

const calculator = new ShippingCalculator(new StandardShipping());
calculator.display(weight, distance);

calculator.setStrategy(new ExpressShipping());
calculator.display(weight, distance);

calculator.setStrategy(new OvernightShipping());
calculator.display(weight, distance);

calculator.setStrategy(new FreeShipping());
calculator.display(weight, distance);

// --- Real-world scenario: strategy chosen based on business rules ---

console.log("\n=== Cart-based strategy selection ===\n");

interface CartItem {
  name: string;
  price: number;
  weight: number;
}

function selectShippingStrategy(cart: CartItem[], isPremiumMember: boolean): ShippingStrategy {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (isPremiumMember) {
    return new FreeShipping();
  }
  if (total > 100) {
    return new ExpressShipping(); // free upgrade for big orders
  }
  return new StandardShipping();
}

const cart: CartItem[] = [
  { name: "Laptop Stand", price: 45.00, weight: 1.2 },
  { name: "Mechanical Keyboard", price: 89.00, weight: 0.8 },
];
const totalWeight = cart.reduce((sum, item) => sum + item.weight, 0);
const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

console.log(`  Cart total: $${cartTotal.toFixed(2)}, Weight: ${totalWeight}kg`);

// Regular customer with $134 cart → express upgrade
const regularStrategy = selectShippingStrategy(cart, false);
calculator.setStrategy(regularStrategy);
console.log(`  Regular customer:`);
calculator.display(totalWeight, 300);

// Premium member → free shipping
const premiumStrategy = selectShippingStrategy(cart, true);
calculator.setStrategy(premiumStrategy);
console.log(`  Premium member:`);
calculator.display(totalWeight, 300);
