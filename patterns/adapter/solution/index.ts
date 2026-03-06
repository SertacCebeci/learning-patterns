// Adapter Pattern
// Converts the interface of a class into another interface the client expects.
// Lets classes work together that couldn't otherwise because of incompatible interfaces.

// --- The interface our app expects ---

interface PaymentProcessor {
  pay(amount: number, currency: string): void;
  refund(transactionId: string, amount: number): void;
}

// --- A third-party payment SDK with a completely different API ---

class StripeLikeSDK {
  createCharge(opts: { amountInCents: number; cur: string }): { id: string } {
    const id = `ch_${Math.random().toString(36).slice(2, 10)}`;
    console.log(`  [Stripe SDK] Charge created: ${id} — ${opts.amountInCents} cents (${opts.cur})`);
    return { id };
  }

  reverseCharge(chargeId: string, amountInCents: number): void {
    console.log(`  [Stripe SDK] Reversed ${amountInCents} cents on charge ${chargeId}`);
  }
}

// --- The Adapter ---
// Wraps the incompatible SDK and exposes our PaymentProcessor interface.

class StripeAdapter implements PaymentProcessor {
  private sdk: StripeLikeSDK;

  constructor(sdk: StripeLikeSDK) {
    this.sdk = sdk;
  }

  pay(amount: number, currency: string): void {
    // Our app uses whole dollars, but the SDK expects cents
    const amountInCents = Math.round(amount * 100);
    this.sdk.createCharge({ amountInCents, cur: currency.toLowerCase() });
  }

  refund(transactionId: string, amount: number): void {
    const amountInCents = Math.round(amount * 100);
    this.sdk.reverseCharge(transactionId, amountInCents);
  }
}

// --- Client code ---
// Works only with PaymentProcessor. Doesn't know or care that Stripe is behind it.

function checkout(processor: PaymentProcessor): void {
  console.log("Processing payment...");
  processor.pay(49.99, "USD");

  console.log("Issuing refund...");
  processor.refund("ch_abc123", 10.00);
}

const stripeSDK = new StripeLikeSDK();
const processor = new StripeAdapter(stripeSDK);

checkout(processor);
