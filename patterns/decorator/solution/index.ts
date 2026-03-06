// Decorator Pattern
// Attaches new behaviors to objects by wrapping them in decorator objects
// that implement the same interface. Decorators can be stacked — each one
// adds a layer of behavior while delegating the core work to the wrapped object.

// --- Component interface ---
// Both base drinks and add-ons share this interface.

interface Beverage {
  cost(): number;
  description(): string;
}

// --- Concrete components (base drinks) ---

class Espresso implements Beverage {
  cost(): number {
    return 2.0;
  }

  description(): string {
    return 'Espresso';
  }
}

class HouseBlend implements Beverage {
  cost(): number {
    return 1.5;
  }

  description(): string {
    return 'House Blend';
  }
}

// --- Concrete decorators (add-ons) ---
// Each add-on wraps a Beverage and enhances its cost and description.
// No base decorator class needed — each add-on directly implements Beverage.

class Milk implements Beverage {
  constructor(private beverage: Beverage) {}

  cost(): number {
    return this.beverage.cost() + 0.5;
  }

  description(): string {
    return this.beverage.description() + ', Milk';
  }
}

class Whip implements Beverage {
  constructor(private beverage: Beverage) {}

  cost(): number {
    return this.beverage.cost() + 0.7;
  }

  description(): string {
    return this.beverage.description() + ', Whip';
  }
}

class Caramel implements Beverage {
  constructor(private beverage: Beverage) {}

  cost(): number {
    return this.beverage.cost() + 0.6;
  }

  description(): string {
    return this.beverage.description() + ', Caramel';
  }
}

class ExtraShot implements Beverage {
  constructor(private beverage: Beverage) {}

  cost(): number {
    return this.beverage.cost() + 0.8;
  }

  description(): string {
    return this.beverage.description() + ', Extra Shot';
  }
}

// --- Usage ---
// Stack add-ons in any combination. The client always sees a Beverage.

console.log('=== Simple Espresso ===');
const simple: Beverage = new Espresso();
console.log(`  ${simple.description()} — $${simple.cost().toFixed(2)}`);

console.log('\n=== House Blend with Milk ===');
let blend: Beverage = new HouseBlend();
blend = new Milk(blend);
console.log(`  ${blend.description()} — $${blend.cost().toFixed(2)}`);

console.log('\n=== Espresso with double Milk and Caramel ===');
let fancy: Beverage = new Espresso();
fancy = new Milk(fancy);
fancy = new Milk(fancy);
fancy = new Caramel(fancy);
console.log(`  ${fancy.description()} — $${fancy.cost().toFixed(2)}`);

console.log('\n=== House Blend with everything ===');
let loaded: Beverage = new HouseBlend();
loaded = new Milk(loaded);
loaded = new Whip(loaded);
loaded = new Caramel(loaded);
loaded = new ExtraShot(loaded);
console.log(`  ${loaded.description()} — $${loaded.cost().toFixed(2)}`);
