# Problem: Beverage Brewing System

## Scenario

You are building a smart beverage machine. The machine prepares different drinks (coffee, tea, hot chocolate) that all follow the same general preparation process but differ in specific steps.

## Requirements

1. Every beverage follows this exact preparation sequence:
   - `boilWater()` — heat water to the appropriate temperature
   - `brew()` — the main preparation step (different per drink)
   - `pourInCup()` — pour the prepared beverage into a cup
   - `addCondiments()` — add toppings or extras (different per drink)
   - `beforeServe()` — an optional step that does nothing by default but can be overridden

2. Create a base class `Beverage` with a `prepare()` method that calls the above steps in the fixed order shown. The `prepare()` method itself must not be overridable.

3. Implement three concrete beverage classes:

   - **Coffee**:
     - `boilWater`: heats water to 96C
     - `brew`: "Dripping coffee through filter"
     - `addCondiments`: "Adding sugar and milk"

   - **Tea**:
     - `boilWater`: heats water to 85C
     - `brew`: "Steeping tea bag for 3 minutes"
     - `addCondiments`: "Adding lemon"
     - `beforeServe`: prints "Removing tea bag"

   - **HotChocolate**:
     - `boilWater`: heats water to 70C
     - `brew`: "Mixing cocoa powder"
     - `addCondiments`: "Adding whipped cream and marshmallows"
     - `beforeServe`: prints "Stirring thoroughly"

4. The base class should provide a default implementation for `boilWater` (100C) and `pourInCup` ("Pouring into cup"). The `brew` and `addCondiments` steps must be abstract (no defaults).

## Expected Behavior

```
=== Preparing Coffee ===
  Heating water to 96°C
  Dripping coffee through filter
  Pouring into cup
  Adding sugar and milk
  Ready to serve!

=== Preparing Tea ===
  Heating water to 85°C
  Steeping tea bag for 3 minutes
  Pouring into cup
  Adding lemon
  Removing tea bag
  Ready to serve!

=== Preparing Hot Chocolate ===
  Heating water to 70°C
  Mixing cocoa powder
  Pouring into cup
  Adding whipped cream and marshmallows
  Stirring thoroughly
  Ready to serve!
```

## Constraints

- The preparation sequence must be enforced by the base class and cannot be changed by subclasses.
- Adding a new beverage (e.g., Matcha Latte) should only require creating a new subclass, not modifying the base class.
- Subclasses must not be able to skip steps or reorder them.
- The `beforeServe` hook should be optional -- subclasses that do not need it should not have to implement it.
