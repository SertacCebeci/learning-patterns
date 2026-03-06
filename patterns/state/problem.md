# Problem: Vending Machine

## Scenario

You are building the control software for a vending machine. The machine behaves very differently depending on its current situation: waiting for money, accepting coin input, dispensing a product, or out of stock. The same physical buttons (insert coin, select product, dispense) do completely different things depending on the machine's current situation.

## Requirements

1. Define a `VendingMachine` class that tracks:
   - `currentBalance` — how much money has been inserted (in cents)
   - `inventory` — a map of product names to `{ price: number, quantity: number }`
   - The current operational mode of the machine

2. The machine supports these actions (via method calls):
   - `insertCoin(amount: number)` — insert money
   - `selectProduct(name: string)` — choose a product
   - `dispense()` — physically dispense the selected product
   - `refund()` — return inserted money

3. The machine operates in four modes, and each action behaves differently per mode:

   - **Idle** (waiting for interaction):
     - `insertCoin`: accepts the coin, transitions to HasMoney
     - `selectProduct`: prints "Please insert money first"
     - `dispense`: prints "No product selected"
     - `refund`: prints "No money to refund"

   - **HasMoney** (coins inserted, no product selected):
     - `insertCoin`: adds to balance
     - `selectProduct`: if product exists and is in stock and balance is sufficient, transitions to Dispensing. If insufficient funds, prints how much more is needed. If out of stock, prints "out of stock".
     - `dispense`: prints "Select a product first"
     - `refund`: returns all money, transitions to Idle

   - **Dispensing** (product selected, releasing item):
     - `insertCoin`: prints "Please wait, dispensing in progress"
     - `selectProduct`: prints "Please wait, dispensing in progress"
     - `dispense`: delivers the product, deducts price from balance, decrements inventory. If remaining balance > 0, transitions to HasMoney. Otherwise transitions to Idle. If that product's quantity reaches 0 and all products are out of stock, transitions to SoldOut.
     - `refund`: prints "Please wait, dispensing in progress"

   - **SoldOut** (all products depleted):
     - All actions print "Machine is sold out" except `refund`, which returns any remaining balance

4. **Do not use if/else or switch statements** on a state variable in any of the action methods. Each mode should be its own self-contained unit.

## Expected Behavior

```
[Idle] Insert $1.00 → balance: $1.00 (HasMoney)
[HasMoney] Insert $0.50 → balance: $1.50 (HasMoney)
[HasMoney] Select "Cola" ($1.25) → Ready to dispense (Dispensing)
[Dispensing] Dispense → "Cola" dispensed! Change: $0.25 returned (Idle)
[Idle] Insert $2.00 → balance: $2.00 (HasMoney)
[HasMoney] Select "Water" ($1.00) → Ready to dispense (Dispensing)
[Dispensing] Dispense → "Water" dispensed! balance: $1.00 (HasMoney)
[HasMoney] Refund → $1.00 returned (Idle)
```

## Constraints

- No conditional branching (if/else/switch) on a state variable inside the action methods.
- Each mode must be a separate, self-contained class.
- Adding a new mode (e.g., "Maintenance") should not require modifying existing mode classes.
- The VendingMachine itself should have minimal logic -- it delegates to the current mode.
