// Prototype Pattern
// Creates new objects by cloning an existing instance (the prototype)
// instead of constructing from scratch. Useful when object setup is
// expensive or when you want copies that can diverge independently.

// --- Prototype interface ---

interface Cloneable {
  clone(): this;
}

// --- Concrete prototypes ---

class Unit implements Cloneable {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public abilities: string[],
  ) {}

  clone(): this {
    // Deep copy: abilities array must not be shared between clones
    const cloned = Object.create(Object.getPrototypeOf(this));
    Object.assign(cloned, this);
    cloned.abilities = [...this.abilities];
    return cloned;
  }

  display(): void {
    console.log(
      `${this.name} | HP:${this.health} ATK:${this.attack} DEF:${this.defense} | ${this.abilities.join(", ")}`,
    );
  }
}

// --- Usage ---
// Configure base prototypes once, then clone and customize.

// Set up prototype units (imagine these come from config files or a database)
const warriorPrototype = new Unit("Warrior", 100, 25, 15, ["Slash", "Shield Block"]);
const magePrototype = new Unit("Mage", 60, 40, 5, ["Fireball", "Frost Nova"]);

// Spawn warriors by cloning
const warrior1 = warriorPrototype.clone();
warrior1.name = "Warrior #1";

const warrior2 = warriorPrototype.clone();
warrior2.name = "Warrior #2";
warrior2.health = 120; // this one is a veteran with extra HP

// Spawn a specialized mage
const archmage = magePrototype.clone();
archmage.name = "Archmage";
archmage.attack = 55;
archmage.abilities.push("Teleport");

console.log("=== Prototypes ===");
warriorPrototype.display();
magePrototype.display();

console.log("\n=== Spawned Units ===");
warrior1.display();
warrior2.display();
archmage.display();

// Prove independence: modifying a clone didn't affect the prototype
console.log("\n=== Prototype unchanged? ===");
magePrototype.display();
// Mage still has 2 abilities, not 3
