// Simple Factory Pattern
// A factory function encapsulates object creation so the caller
// doesn't need to know about concrete classes.

// --- Common interface ---

interface PaymentProcessor {
  processPayment(amount: number): void;
}

// --- Concrete implementations ---

class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`[Credit Card] Processing payment of $${amount.toFixed(2)}`);
  }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`[PayPal] Processing payment of $${amount.toFixed(2)}`);
  }
}

class CryptoProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`[Crypto] Processing payment of ${amount} BTC`);
  }
}

// --- The Factory ---
// Returns the correct processor based on the method string.
// Adding a new payment method only requires a new class and a new case here.

type PaymentMethod = "credit-card" | "paypal" | "crypto";

function createPaymentProcessor(method: PaymentMethod): PaymentProcessor {
  switch (method) {
    case "credit-card":
      return new CreditCardProcessor();
    case "paypal":
      return new PayPalProcessor();
    case "crypto":
      return new CryptoProcessor();
  }
}

// --- Usage ---
// The checkout code only depends on the PaymentProcessor interface and
// the factory. It never imports or instantiates concrete classes directly.

const methods: PaymentMethod[] = ["credit-card", "paypal", "crypto"];

for (const method of methods) {
  const processor = createPaymentProcessor(method);
  processor.processPayment(49.99);
}

// Individual usage matching the problem's example
console.log("\n=== Individual transactions ===");

const processor1 = createPaymentProcessor("paypal");
processor1.processPayment(49.99);

const processor2 = createPaymentProcessor("crypto");
processor2.processPayment(0.005);
