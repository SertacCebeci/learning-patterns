# Problem: E-Commerce Tax and Discount Calculator

## Scenario

You are building an e-commerce system with different product types. You need to perform various calculations across all products in a shopping cart -- tax calculation, discount application, shipping weight estimation -- without adding these calculation methods directly to the product classes.

## Requirements

1. Define a product hierarchy with these types (each has its own properties):
   - **Book**: `title`, `price`, `weight`, `isEducational` (boolean)
   - **Electronics**: `name`, `price`, `weight`, `category` ("phone" | "laptop" | "accessory")
   - **Food**: `name`, `price`, `weight`, `isOrganic` (boolean), `isImported` (boolean)
   - **Clothing**: `name`, `price`, `weight`, `isLuxury` (boolean)

2. Each product must have an `accept(calculator)` method that passes itself to the calculator. Products must NOT contain any tax, discount, or shipping logic.

3. Implement three calculator classes that operate on all product types:

   - **TaxCalculator**: Calculates tax per item based on type-specific rules:
     - Books: 0% tax (tax-exempt), unless non-educational, then 5%
     - Electronics: 15% tax, phones get an extra 3% surcharge
     - Food: 0% if domestic, 8% if imported
     - Clothing: 10% tax, luxury items get 20%

   - **DiscountCalculator**: Applies discounts based on type-specific rules:
     - Books: 10% discount for educational books
     - Electronics: 5% discount for accessories
     - Food: 15% discount for organic food
     - Clothing: no discounts

   - **ShippingEstimator**: Estimates shipping cost based on type-specific rules:
     - Books: $0.50 per kg (media mail rate)
     - Electronics: $2.00 per kg + $5.00 fragile handling
     - Food: $3.00 per kg (refrigerated shipping)
     - Clothing: $1.00 per kg

4. Build a `ShoppingCart` that holds products and can run any calculator across all items, collecting results.

5. Demonstrate: Create a cart with one of each product type. Run all three calculators and display results.

## Expected Behavior

```
=== Tax Calculation ===
  "TypeScript Handbook" (Book, educational): $0.00 tax
  "iPhone 15" (Electronics, phone): $179.10 tax (15% + 3%)
  "Organic Avocados" (Food, imported): $0.80 tax
  "Designer Jacket" (Clothing, luxury): $60.00 tax
  Total tax: $239.90

=== Discount Calculation ===
  "TypeScript Handbook": $3.00 discount (educational)
  "iPhone 15": $0.00 discount
  "Organic Avocados": $1.50 discount (organic)
  "Designer Jacket": $0.00 discount
  Total savings: $4.50

=== Shipping Estimation ===
  Total shipping: $18.50
```

## Constraints

- Product classes must remain unchanged when adding new calculations. A new calculation (e.g., InsuranceCalculator) should only require a new class, not modifications to Book, Electronics, Food, or Clothing.
- Each calculator groups all its type-specific logic in one place rather than scattering it across product classes.
- The ShoppingCart must work with any calculator without knowing what calculation is being performed.
