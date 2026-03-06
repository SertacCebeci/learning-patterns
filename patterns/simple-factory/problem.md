# Problem: Payment Processor

You are building an e-commerce checkout system that supports multiple payment methods: credit card, PayPal, and cryptocurrency.

## Requirements

1. Define a common `PaymentProcessor` interface with a method `processPayment(amount: number): void` that logs a message indicating the payment method and amount.
2. Implement three concrete classes: `CreditCardProcessor`, `PayPalProcessor`, and `CryptoProcessor`. Each should log a distinct message format when processing a payment.
3. Write a single factory function `createPaymentProcessor(method: "credit-card" | "paypal" | "crypto"): PaymentProcessor` that returns the correct processor based on the method string.
4. The checkout code should never reference the concrete processor classes directly -- it should only use the factory and the interface.

## Example Usage

```ts
const processor = createPaymentProcessor("paypal");
processor.processPayment(49.99);
// Output: [PayPal] Processing payment of $49.99

const processor2 = createPaymentProcessor("crypto");
processor2.processPayment(0.005);
// Output: [Crypto] Processing payment of 0.005 BTC
```

## Acceptance Criteria

- The factory function returns the correct concrete class for each method string.
- Client code depends only on the `PaymentProcessor` interface.
- Adding a new payment method in the future requires changes only in the factory function and a new class -- not in any calling code.
