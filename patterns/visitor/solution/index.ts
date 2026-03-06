// Visitor Pattern
// Adds new operations to an object structure without modifying the objects.
// Each element accepts a visitor; the visitor holds the operation logic.

// Example: an e-commerce system where different calculators (tax, discount,
// shipping) operate on products without the products knowing about them.

// --- Visitor interface ---

interface ProductCalculator {
  visitBook(product: Book): number;
  visitElectronics(product: Electronics): number;
  visitFood(product: Food): number;
  visitClothing(product: Clothing): number;
}

// --- Element interface ---

interface Product {
  accept(calculator: ProductCalculator): number;
  getDisplayName(): string;
}

// --- Concrete elements ---
// Each product only knows how to accept a calculator — no tax/discount logic here.

class Book implements Product {
  constructor(
    public title: string,
    public price: number,
    public weight: number,
    public isEducational: boolean,
  ) {}

  accept(calculator: ProductCalculator): number {
    return calculator.visitBook(this);
  }

  getDisplayName(): string { return this.title; }
}

class Electronics implements Product {
  constructor(
    public name: string,
    public price: number,
    public weight: number,
    public category: "phone" | "laptop" | "accessory",
  ) {}

  accept(calculator: ProductCalculator): number {
    return calculator.visitElectronics(this);
  }

  getDisplayName(): string { return this.name; }
}

class Food implements Product {
  constructor(
    public name: string,
    public price: number,
    public weight: number,
    public isOrganic: boolean,
    public isImported: boolean,
  ) {}

  accept(calculator: ProductCalculator): number {
    return calculator.visitFood(this);
  }

  getDisplayName(): string { return this.name; }
}

class Clothing implements Product {
  constructor(
    public name: string,
    public price: number,
    public weight: number,
    public isLuxury: boolean,
  ) {}

  accept(calculator: ProductCalculator): number {
    return calculator.visitClothing(this);
  }

  getDisplayName(): string { return this.name; }
}

// --- Concrete visitors ---
// Each visitor is a new operation across ALL product types.

class TaxCalculator implements ProductCalculator {
  visitBook(product: Book): number {
    // Educational books: 0% tax. Non-educational: 5%
    const rate = product.isEducational ? 0 : 0.05;
    return product.price * rate;
  }

  visitElectronics(product: Electronics): number {
    // 15% base tax. Phones get an extra 3% surcharge.
    let rate = 0.15;
    if (product.category === "phone") rate += 0.03;
    return product.price * rate;
  }

  visitFood(product: Food): number {
    // 0% if domestic, 8% if imported
    const rate = product.isImported ? 0.08 : 0;
    return product.price * rate;
  }

  visitClothing(product: Clothing): number {
    // 10% base tax, luxury items get 20%
    const rate = product.isLuxury ? 0.20 : 0.10;
    return product.price * rate;
  }
}

class DiscountCalculator implements ProductCalculator {
  visitBook(product: Book): number {
    // 10% discount for educational books
    return product.isEducational ? product.price * 0.10 : 0;
  }

  visitElectronics(product: Electronics): number {
    // 5% discount for accessories
    return product.category === "accessory" ? product.price * 0.05 : 0;
  }

  visitFood(product: Food): number {
    // 15% discount for organic food
    return product.isOrganic ? product.price * 0.15 : 0;
  }

  visitClothing(): number {
    // No discounts for clothing
    return 0;
  }
}

class ShippingEstimator implements ProductCalculator {
  visitBook(product: Book): number {
    // $0.50 per kg (media mail rate)
    return product.weight * 0.50;
  }

  visitElectronics(product: Electronics): number {
    // $2.00 per kg + $5.00 fragile handling
    return product.weight * 2.00 + 5.00;
  }

  visitFood(product: Food): number {
    // $3.00 per kg (refrigerated shipping)
    return product.weight * 3.00;
  }

  visitClothing(product: Clothing): number {
    // $1.00 per kg
    return product.weight * 1.00;
  }
}

// --- Shopping cart (object structure) ---

class ShoppingCart {
  private items: Product[] = [];

  add(product: Product): void {
    this.items.push(product);
  }

  calculate(calculator: ProductCalculator): { details: { name: string; amount: number }[]; total: number } {
    const details: { name: string; amount: number }[] = [];
    let total = 0;

    for (const item of this.items) {
      const amount = item.accept(calculator);
      details.push({ name: item.getDisplayName(), amount });
      total += amount;
    }

    return { details, total };
  }
}

// --- Usage ---
// Build a cart once, run many different calculations via visitors.

const cart = new ShoppingCart();
cart.add(new Book("TypeScript Handbook", 30.00, 0.5, true));
cart.add(new Electronics("iPhone 15", 995.00, 0.2, "phone"));
cart.add(new Food("Organic Avocados", 10.00, 1.5, true, true));
cart.add(new Clothing("Designer Jacket", 300.00, 1.2, true));

// Tax calculation
console.log("=== Tax Calculation ===");
const taxCalc = new TaxCalculator();
const taxResult = cart.calculate(taxCalc);
for (const item of taxResult.details) {
  console.log(`  "${item.name}": $${item.amount.toFixed(2)} tax`);
}
console.log(`  Total tax: $${taxResult.total.toFixed(2)}`);

// Discount calculation
console.log("\n=== Discount Calculation ===");
const discountCalc = new DiscountCalculator();
const discountResult = cart.calculate(discountCalc);
for (const item of discountResult.details) {
  console.log(`  "${item.name}": $${item.amount.toFixed(2)} discount`);
}
console.log(`  Total savings: $${discountResult.total.toFixed(2)}`);

// Shipping estimation
console.log("\n=== Shipping Estimation ===");
const shippingCalc = new ShippingEstimator();
const shippingResult = cart.calculate(shippingCalc);
for (const item of shippingResult.details) {
  console.log(`  "${item.name}": $${item.amount.toFixed(2)} shipping`);
}
console.log(`  Total shipping: $${shippingResult.total.toFixed(2)}`);
