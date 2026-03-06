// Builder Pattern with Director
// The Director encapsulates common construction sequences so they can be
// reused across the program. The client doesn't call builder steps directly —
// it picks a recipe from the Director.

// --- The product ---

class Meal {
  parts: string[] = [];

  display(): void {
    console.log("Meal: " + this.parts.join(", "));
  }
}

// --- Builder interface ---

interface MealBuilder {
  addMain(): void;
  addSide(): void;
  addDrink(): void;
  addDessert(): void;
  getResult(): Meal;
}

// --- Concrete builders ---

class BurgerMealBuilder implements MealBuilder {
  private meal = new Meal();

  addMain(): void {
    this.meal.parts.push("Cheeseburger");
  }
  addSide(): void {
    this.meal.parts.push("Fries");
  }
  addDrink(): void {
    this.meal.parts.push("Cola");
  }
  addDessert(): void {
    this.meal.parts.push("Apple Pie");
  }
  getResult(): Meal {
    const result = this.meal;
    this.meal = new Meal();
    return result;
  }
}

class VeganMealBuilder implements MealBuilder {
  private meal = new Meal();

  addMain(): void {
    this.meal.parts.push("Veggie Wrap");
  }
  addSide(): void {
    this.meal.parts.push("Sweet Potato Wedges");
  }
  addDrink(): void {
    this.meal.parts.push("Smoothie");
  }
  addDessert(): void {
    this.meal.parts.push("Fruit Salad");
  }
  getResult(): Meal {
    const result = this.meal;
    this.meal = new Meal();
    return result;
  }
}

// --- The Director ---
// Knows HOW to build common meal configurations.
// Works with ANY builder through the interface.

class MealDirector {
  private builder: MealBuilder;

  constructor(builder: MealBuilder) {
    this.builder = builder;
  }

  setBuilder(builder: MealBuilder): void {
    this.builder = builder;
  }

  // A quick lunch — just main and drink
  buildQuickLunch(): Meal {
    this.builder.addMain();
    this.builder.addDrink();
    return this.builder.getResult();
  }

  // A full combo — everything
  buildFullCombo(): Meal {
    this.builder.addMain();
    this.builder.addSide();
    this.builder.addDrink();
    this.builder.addDessert();
    return this.builder.getResult();
  }

  // Kids meal — main, side, dessert (no coffee for kids)
  buildKidsMeal(): Meal {
    this.builder.addMain();
    this.builder.addSide();
    this.builder.addDessert();
    return this.builder.getResult();
  }
}

// --- Usage ---
// The client picks a builder (what kind of food) and a director recipe
// (what combination). Same recipes work across all builders.

const burgerBuilder = new BurgerMealBuilder();
const veganBuilder = new VeganMealBuilder();
const director = new MealDirector(burgerBuilder);

console.log("=== Burger Quick Lunch ===");
director.buildQuickLunch().display();

console.log("\n=== Burger Full Combo ===");
director.buildFullCombo().display();

console.log("\n=== Vegan Kids Meal ===");
director.setBuilder(veganBuilder);
director.buildKidsMeal().display();

console.log("\n=== Vegan Full Combo ===");
director.buildFullCombo().display();
