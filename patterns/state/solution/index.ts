// State Pattern
// Each state is its own class. The context delegates behavior to the
// current state object. State transitions swap the state object,
// eliminating conditionals.

// Example: a vending machine where the same buttons behave differently
// depending on whether the machine is idle, has money, dispensing, or sold out.

// --- State interface ---

interface VendingState {
  insertCoin(machine: VendingMachine, amount: number): void;
  selectProduct(machine: VendingMachine, name: string): void;
  dispense(machine: VendingMachine): void;
  refund(machine: VendingMachine): void;
  getName(): string;
}

// --- Context ---

class VendingMachine {
  private state: VendingState;
  public currentBalance = 0;
  public inventory: Map<string, { price: number; quantity: number }>;
  public selectedProduct: string | null = null;

  constructor(inventory: Map<string, { price: number; quantity: number }>) {
    this.inventory = inventory;
    this.state = new IdleState();
  }

  setState(state: VendingState): void {
    this.state = state;
  }

  getStateName(): string {
    return this.state.getName();
  }

  // Check if every product has zero quantity
  isAllSoldOut(): boolean {
    for (const [, item] of this.inventory) {
      if (item.quantity > 0) return false;
    }
    return true;
  }

  // Delegates to current state
  insertCoin(amount: number): void { this.state.insertCoin(this, amount); }
  selectProduct(name: string): void { this.state.selectProduct(this, name); }
  dispense(): void { this.state.dispense(this); }
  refund(): void { this.state.refund(this); }
}

// --- Concrete states ---
// Each state handles all actions in its own way.

class IdleState implements VendingState {
  getName(): string { return "Idle"; }

  insertCoin(machine: VendingMachine, amount: number): void {
    machine.currentBalance += amount;
    console.log(`  [Idle] Inserted $${(amount / 100).toFixed(2)} → balance: $${(machine.currentBalance / 100).toFixed(2)}`);
    machine.setState(new HasMoneyState());
  }

  selectProduct(): void {
    console.log("  [Idle] Please insert money first");
  }

  dispense(): void {
    console.log("  [Idle] No product selected");
  }

  refund(): void {
    console.log("  [Idle] No money to refund");
  }
}

class HasMoneyState implements VendingState {
  getName(): string { return "HasMoney"; }

  insertCoin(machine: VendingMachine, amount: number): void {
    machine.currentBalance += amount;
    console.log(`  [HasMoney] Inserted $${(amount / 100).toFixed(2)} → balance: $${(machine.currentBalance / 100).toFixed(2)}`);
  }

  selectProduct(machine: VendingMachine, name: string): void {
    const product = machine.inventory.get(name);

    if (!product) {
      console.log(`  [HasMoney] Product "${name}" not found`);
      return;
    }

    if (product.quantity <= 0) {
      console.log(`  [HasMoney] "${name}" is out of stock`);
      return;
    }

    if (machine.currentBalance < product.price) {
      const needed = product.price - machine.currentBalance;
      console.log(`  [HasMoney] Insufficient funds for "${name}". Need $${(needed / 100).toFixed(2)} more`);
      return;
    }

    // Enough money, product in stock — transition to Dispensing
    machine.selectedProduct = name;
    console.log(`  [HasMoney] Selected "${name}" ($${(product.price / 100).toFixed(2)}) → Ready to dispense`);
    machine.setState(new DispensingState());
  }

  dispense(): void {
    console.log("  [HasMoney] Select a product first");
  }

  refund(machine: VendingMachine): void {
    console.log(`  [HasMoney] Refunding $${(machine.currentBalance / 100).toFixed(2)}`);
    machine.currentBalance = 0;
    machine.setState(new IdleState());
  }
}

class DispensingState implements VendingState {
  getName(): string { return "Dispensing"; }

  insertCoin(): void {
    console.log("  [Dispensing] Please wait, dispensing in progress");
  }

  selectProduct(): void {
    console.log("  [Dispensing] Please wait, dispensing in progress");
  }

  dispense(machine: VendingMachine): void {
    const name = machine.selectedProduct!;
    const product = machine.inventory.get(name)!;

    // Deduct price, decrement inventory
    machine.currentBalance -= product.price;
    product.quantity--;

    const change = machine.currentBalance;

    if (change > 0) {
      console.log(`  [Dispensing] "${name}" dispensed! balance: $${(change / 100).toFixed(2)}`);
    } else {
      console.log(`  [Dispensing] "${name}" dispensed! Change: $${(0 / 100).toFixed(2)} returned`);
    }

    machine.selectedProduct = null;

    // Determine next state
    if (machine.isAllSoldOut()) {
      machine.setState(new SoldOutState());
    } else if (machine.currentBalance > 0) {
      machine.setState(new HasMoneyState());
    } else {
      machine.setState(new IdleState());
    }
  }

  refund(): void {
    console.log("  [Dispensing] Please wait, dispensing in progress");
  }
}

class SoldOutState implements VendingState {
  getName(): string { return "SoldOut"; }

  insertCoin(): void {
    console.log("  [SoldOut] Machine is sold out");
  }

  selectProduct(): void {
    console.log("  [SoldOut] Machine is sold out");
  }

  dispense(): void {
    console.log("  [SoldOut] Machine is sold out");
  }

  refund(machine: VendingMachine): void {
    if (machine.currentBalance > 0) {
      console.log(`  [SoldOut] Refunding $${(machine.currentBalance / 100).toFixed(2)}`);
      machine.currentBalance = 0;
    } else {
      console.log("  [SoldOut] No money to refund");
    }
  }
}

// --- Usage ---
// Same method calls, completely different behavior depending on state.

const inventory = new Map<string, { price: number; quantity: number }>([
  ["Cola", { price: 125, quantity: 2 }],
  ["Water", { price: 100, quantity: 1 }],
  ["Chips", { price: 150, quantity: 1 }],
]);

const machine = new VendingMachine(inventory);

console.log("=== Buy a Cola ===");
machine.insertCoin(100);  // $1.00
machine.insertCoin(50);   // $0.50 → balance: $1.50
machine.selectProduct("Cola"); // $1.25 → Dispensing
machine.dispense();        // Cola dispensed, $0.25 change

console.log("\n=== Insert money, buy Water, refund remaining ===");
machine.insertCoin(200);  // $2.00
machine.selectProduct("Water"); // $1.00 → Dispensing
machine.dispense();        // Water dispensed, balance: $1.00
machine.refund();          // refund $1.00

console.log("\n=== Try invalid actions ===");
machine.selectProduct("Cola"); // no money inserted
machine.dispense();            // no product selected
machine.refund();              // no money

console.log("\n=== Sell remaining items until sold out ===");
machine.insertCoin(150);
machine.selectProduct("Chips");
machine.dispense();

machine.insertCoin(125);
machine.selectProduct("Cola"); // last Cola
machine.dispense();            // now all sold out

console.log("\n=== Machine is sold out ===");
machine.insertCoin(100);
machine.selectProduct("Cola");
machine.dispense();
