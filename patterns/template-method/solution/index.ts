// Template Method Pattern
// Defines the skeleton of an algorithm in a base class.
// Subclasses override specific steps without changing the structure.

// Example: a beverage brewing system where coffee, tea, and hot chocolate
// all follow the same preparation sequence but differ in specific steps.

// --- Abstract class with the template method ---

abstract class Beverage {
  // The template method — defines the fixed preparation workflow.
  // Subclasses cannot override this.
  prepare(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
    this.beforeServe();
    console.log('  Ready to serve!');
  }

  // --- Steps with default implementations (can be overridden) ---

  protected boilWater(): void {
    console.log('  Heating water to 100\u00B0C');
  }

  protected pourInCup(): void {
    console.log('  Pouring into cup');
  }

  // --- Steps that subclasses MUST implement ---

  protected abstract brew(): void;
  protected abstract addCondiments(): void;

  // --- Hook: empty by default, subclasses MAY override ---

  protected beforeServe(): void {
    // default: do nothing
  }
}

// --- Concrete implementations ---
// Each beverage overrides only the steps it needs to customize.

class Coffee extends Beverage {
  protected boilWater(): void {
    console.log('  Heating water to 96\u00B0C');
  }

  protected brew(): void {
    console.log('  Dripping coffee through filter');
  }

  protected addCondiments(): void {
    console.log('  Adding sugar and milk');
  }
}

class Tea extends Beverage {
  protected boilWater(): void {
    console.log('  Heating water to 85\u00B0C');
  }

  protected brew(): void {
    console.log('  Steeping tea bag for 3 minutes');
  }

  protected addCondiments(): void {
    console.log('  Adding lemon');
  }

  // Hook override — remove tea bag before serving
  protected beforeServe(): void {
    console.log('  Removing tea bag');
  }
}

class HotChocolate extends Beverage {
  protected boilWater(): void {
    console.log('  Heating water to 70\u00B0C');
  }

  protected brew(): void {
    console.log('  Mixing cocoa powder');
  }

  protected addCondiments(): void {
    console.log('  Adding whipped cream and marshmallows');
  }

  // Hook override — stir before serving
  protected beforeServe(): void {
    console.log('  Stirring thoroughly');
  }
}

// --- Usage ---
// Same prepare() workflow, different beverages customize the steps.

console.log('=== Preparing Coffee ===');
new Coffee().prepare();

console.log('\n=== Preparing Tea ===');
new Tea().prepare();

console.log('\n=== Preparing Hot Chocolate ===');
new HotChocolate().prepare();
