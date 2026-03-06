// Prototype Pattern — Advanced (Prototype Registry)
// Players start from base classes, customize them, and register the result
// as a new prototype. Future units can be cloned from any registered prototype.

// --- Unit ---

class Unit {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public abilities: string[],
  ) {}

  clone(): Unit {
    return new Unit(
      this.name,
      this.health,
      this.attack,
      this.defense,
      [...this.abilities],
    );
  }

  addAbility(ability: string): void {
    this.abilities.push(ability);
  }

  boostStats(health: number, attack: number, defense: number): void {
    this.health += health;
    this.attack += attack;
    this.defense += defense;
  }

  display(): void {
    console.log(
      `  ${this.name} | HP:${this.health} ATK:${this.attack} DEF:${this.defense} | ${this.abilities.join(", ")}`,
    );
  }
}

// --- Prototype Registry ---
// Stores named prototypes. Anyone can register a customized unit as a new
// prototype, and later spawn clones from it by name.

class UnitRegistry {
  private prototypes = new Map<string, Unit>();

  register(key: string, unit: Unit): void {
    // Store a clone so the original can keep being modified without
    // affecting the registered prototype
    this.prototypes.set(key, unit.clone());
    console.log(`Registered new prototype: "${key}"`);
  }

  spawn(key: string): Unit {
    const proto = this.prototypes.get(key);
    if (!proto) {
      throw new Error(`Unknown unit type: "${key}"`);
    }
    return proto.clone();
  }

  listPrototypes(): void {
    console.log("Available prototypes:");
    for (const [key, unit] of this.prototypes) {
      process.stdout.write(`  [${key}] `);
      unit.display();
    }
  }
}

// --- Gameplay simulation ---

const registry = new UnitRegistry();

// Game ships with base classes
registry.register("warrior", new Unit("Warrior", 100, 25, 15, ["Slash", "Shield Block"]));
registry.register("mage", new Unit("Mage", 60, 40, 5, ["Fireball", "Frost Nova"]));

console.log("");
registry.listPrototypes();

// Player starts with a mage and customizes it
console.log("\n=== Player customizing a Mage ===");
const myUnit = registry.spawn("mage");
myUnit.name = "Archmage";
myUnit.addAbility("Teleport");
myUnit.addAbility("Meteor");
myUnit.boostStats(20, 15, 5);
myUnit.display();

// Player is happy — registers it as a new prototype
console.log("\n=== Player saves custom unit as new prototype ===");
registry.register("archmage", myUnit);

console.log("");
registry.listPrototypes();

// Now archmage can be mass-spawned
console.log("\n=== Spawning archmages from the new prototype ===");
const a1 = registry.spawn("archmage");
a1.name = "Archmage #1";

const a2 = registry.spawn("archmage");
a2.name = "Archmage #2";
a2.addAbility("Time Stop"); // further customization on a single clone

a1.display();
a2.display();

// Original prototype is untouched
console.log("\n=== Registry prototype unchanged? ===");
registry.spawn("archmage").display();
