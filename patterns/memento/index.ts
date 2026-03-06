// Memento Pattern
// Captures an object's internal state as an opaque snapshot so it can
// be restored later, without exposing the object's internals.

// Example: a game character with save/load checkpoints.

// --- Memento (the snapshot) ---
// Immutable. Only the originator can read its contents.

class CharacterSnapshot {
  constructor(
    private readonly _name: string,
    private readonly _health: number,
    private readonly _mana: number,
    private readonly _position: { x: number; y: number },
    private readonly _inventory: string[],
    private readonly _timestamp: Date,
  ) {}

  // Only the originator (GameCharacter) uses these
  get name(): string { return this._name; }
  get health(): number { return this._health; }
  get mana(): number { return this._mana; }
  get position(): { x: number; y: number } { return { ...this._position }; }
  get inventory(): string[] { return [...this._inventory]; }

  // The caretaker can see metadata but not game state
  getLabel(): string {
    return `[${this._timestamp.toLocaleTimeString()}] ${this._name} — HP:${this._health} Pos:(${this._position.x},${this._position.y})`;
  }
}

// --- Originator (the object whose state we save) ---

class GameCharacter {
  private name: string;
  private health: number;
  private mana: number;
  private position: { x: number; y: number };
  private inventory: string[];

  constructor(name: string) {
    this.name = name;
    this.health = 100;
    this.mana = 50;
    this.position = { x: 0, y: 0 };
    this.inventory = ["Wooden Sword"];
  }

  // --- Game actions that modify state ---

  move(x: number, y: number): void {
    this.position = { x, y };
    console.log(`  ${this.name} moved to (${x}, ${y})`);
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
    console.log(`  ${this.name} took ${amount} damage — HP: ${this.health}`);
  }

  castSpell(manaCost: number): void {
    this.mana = Math.max(0, this.mana - manaCost);
    console.log(`  ${this.name} cast spell — Mana: ${this.mana}`);
  }

  pickUp(item: string): void {
    this.inventory.push(item);
    console.log(`  ${this.name} picked up: ${item}`);
  }

  display(): void {
    console.log(`  ${this.name} | HP:${this.health} MP:${this.mana} | Pos:(${this.position.x},${this.position.y}) | Items: [${this.inventory.join(", ")}]`);
  }

  // --- Memento methods (only the originator creates/restores snapshots) ---

  save(): CharacterSnapshot {
    return new CharacterSnapshot(
      this.name,
      this.health,
      this.mana,
      { ...this.position },
      [...this.inventory],
      new Date(),
    );
  }

  restore(snapshot: CharacterSnapshot): void {
    this.name = snapshot.name;
    this.health = snapshot.health;
    this.mana = snapshot.mana;
    this.position = snapshot.position;
    this.inventory = snapshot.inventory;
    console.log(`  ${this.name} restored from checkpoint.`);
  }
}

// --- Caretaker (manages checkpoints) ---
// Holds mementos but never inspects their game state.

class CheckpointManager {
  private checkpoints: CharacterSnapshot[] = [];

  save(character: GameCharacter): void {
    const snapshot = character.save();
    this.checkpoints.push(snapshot);
    console.log(`  [Checkpoint saved] ${snapshot.getLabel()}`);
  }

  loadLast(character: GameCharacter): boolean {
    const snapshot = this.checkpoints.pop();
    if (!snapshot) {
      console.log("  No checkpoints available.");
      return false;
    }
    console.log(`  [Loading checkpoint] ${snapshot.getLabel()}`);
    character.restore(snapshot);
    return true;
  }

  listCheckpoints(): void {
    console.log(`  Checkpoints (${this.checkpoints.length}):`);
    for (const cp of this.checkpoints) {
      console.log(`    ${cp.getLabel()}`);
    }
  }
}

// --- Usage ---

const hero = new GameCharacter("Aldric");
const manager = new CheckpointManager();

console.log("=== Starting state ===");
hero.display();

console.log("\n=== Checkpoint 1: before dungeon ===");
manager.save(hero);

console.log("\n=== Exploring dungeon ===");
hero.move(10, 25);
hero.pickUp("Iron Shield");
hero.takeDamage(30);
hero.castSpell(20);
hero.display();

console.log("\n=== Checkpoint 2: mid-dungeon ===");
manager.save(hero);

console.log("\n=== Boss fight goes badly ===");
hero.move(15, 40);
hero.takeDamage(60);
hero.castSpell(25);
hero.display();

console.log("\n=== Load last checkpoint (mid-dungeon) ===");
manager.loadLast(hero);
hero.display();

console.log("\n=== Still bad, load earlier checkpoint (before dungeon) ===");
manager.loadLast(hero);
hero.display();
