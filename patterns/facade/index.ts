// Facade Pattern
// Provides a simplified interface to a complex subsystem.
// The subsystem classes still exist and can be used directly,
// but the facade offers a convenient shortcut for common workflows.

// --- Subsystem classes ---
// Each one handles a specific concern. The client shouldn't need
// to know the correct order or wiring between them.

class InventoryService {
  check(productId: string, quantity: number): boolean {
    const inStock = quantity <= 5;
    console.log(`  [Inventory] ${productId}: ${inStock ? "in stock" : "out of stock"}`);
    return inStock;
  }

  reserve(productId: string, quantity: number): void {
    console.log(`  [Inventory] Reserved ${quantity}x ${productId}`);
  }
}

class PaymentService {
  charge(userId: string, amount: number): { transactionId: string; success: boolean } {
    const success = amount > 0;
    const transactionId = `txn_${Math.random().toString(36).slice(2, 8)}`;
    console.log(`  [Payment] Charged $${amount} to ${userId}: ${success ? "OK" : "FAILED"} (${transactionId})`);
    return { transactionId, success };
  }

  refund(transactionId: string): void {
    console.log(`  [Payment] Refunded ${transactionId}`);
  }
}

class InvoiceService {
  create(userId: string, productId: string, amount: number, transactionId: string): string {
    const invoiceId = `inv_${Math.random().toString(36).slice(2, 8)}`;
    console.log(`  [Invoice] Created ${invoiceId} for ${userId}`);
    return invoiceId;
  }
}

class EmailService {
  sendConfirmation(userId: string, invoiceId: string): void {
    console.log(`  [Email] Order confirmation sent to ${userId} (${invoiceId})`);
  }

  sendFailure(userId: string): void {
    console.log(`  [Email] Payment failure notice sent to ${userId}`);
  }
}

class ShippingService {
  schedule(userId: string, productId: string, quantity: number): void {
    console.log(`  [Shipping] Scheduled ${quantity}x ${productId} for ${userId}`);
  }
}

// --- The Facade ---
// Orchestrates the subsystems in the correct order.
// The client makes one call instead of five.

class OrderFacade {
  private inventory = new InventoryService();
  private payment = new PaymentService();
  private invoice = new InvoiceService();
  private email = new EmailService();
  private shipping = new ShippingService();

  placeOrder(userId: string, productId: string, quantity: number, price: number): boolean {
    const amount = quantity * price;

    // 1. Check inventory
    if (!this.inventory.check(productId, quantity)) {
      console.log("  Order failed: out of stock");
      return false;
    }

    // 2. Reserve stock
    this.inventory.reserve(productId, quantity);

    // 3. Charge payment
    const payment = this.payment.charge(userId, amount);
    if (!payment.success) {
      this.email.sendFailure(userId);
      return false;
    }

    // 4. Create invoice
    const invoiceId = this.invoice.create(userId, productId, amount, payment.transactionId);

    // 5. Schedule shipping
    this.shipping.schedule(userId, productId, quantity);

    // 6. Send confirmation
    this.email.sendConfirmation(userId, invoiceId);

    return true;
  }
}

// --- Usage ---
// The client doesn't know about inventory, payment, invoicing,
// shipping, or email. It just places an order.

const shop = new OrderFacade();

console.log("=== Order 1: Success ===");
shop.placeOrder("user_alice", "keyboard_mx", 2, 149.99);

console.log("\n=== Order 2: Out of stock ===");
shop.placeOrder("user_bob", "monitor_4k", 10, 599.99);
