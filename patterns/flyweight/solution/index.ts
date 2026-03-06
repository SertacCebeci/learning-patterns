// Flyweight Pattern
// Minimizes memory by sharing common state (intrinsic) across many objects
// instead of duplicating it. Unique state (extrinsic) is passed in by the client.

// --- Flyweight (shared state) ---
// One instance per tree type. Holds the heavy, repeated data.

class TreeType {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly texture: string, // imagine this is a large bitmap
  ) {}

  draw(x: number, y: number): void {
    console.log(`  [${this.name}] color=${this.color} texture=${this.texture} at (${x}, ${y})`);
  }
}

// --- Flyweight Factory ---
// Ensures only one TreeType exists per unique combination.

class TreeTypeFactory {
  private types = new Map<string, TreeType>();

  getType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`;

    if (!this.types.has(key)) {
      this.types.set(key, new TreeType(name, color, texture));
      console.log(`  [Factory] Created new TreeType: ${name}`);
    }

    return this.types.get(key)!;
  }

  get count(): number {
    return this.types.size;
  }
}

// --- Context (unique state) ---
// Each tree has its own position, but shares the TreeType flyweight.

class Tree {
  constructor(
    private x: number,
    private y: number,
    private type: TreeType,
  ) {}

  draw(): void {
    this.type.draw(this.x, this.y);
  }
}

// --- The forest ---

class Forest {
  private trees: Tree[] = [];
  private factory = new TreeTypeFactory();

  plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    const type = this.factory.getType(name, color, texture);
    this.trees.push(new Tree(x, y, type));
  }

  draw(): void {
    for (const tree of this.trees) {
      tree.draw();
    }
  }

  get stats(): { treeCount: number; typeCount: number } {
    return {
      treeCount: this.trees.length,
      typeCount: this.factory.count,
    };
  }
}

// --- Usage ---
// 12 trees planted, but only 3 TreeType objects created in memory.

const forest = new Forest();

console.log("=== Planting trees ===");
// Plant oaks
forest.plantTree(10, 20, "Oak", "green", "oak_bark.png");
forest.plantTree(50, 80, "Oak", "green", "oak_bark.png");
forest.plantTree(90, 30, "Oak", "green", "oak_bark.png");
forest.plantTree(120, 60, "Oak", "green", "oak_bark.png");

// Plant pines
forest.plantTree(15, 45, "Pine", "dark-green", "pine_bark.png");
forest.plantTree(70, 10, "Pine", "dark-green", "pine_bark.png");
forest.plantTree(110, 90, "Pine", "dark-green", "pine_bark.png");
forest.plantTree(30, 70, "Pine", "dark-green", "pine_bark.png");

// Plant birches
forest.plantTree(25, 55, "Birch", "light-green", "birch_bark.png");
forest.plantTree(60, 40, "Birch", "light-green", "birch_bark.png");
forest.plantTree(95, 75, "Birch", "light-green", "birch_bark.png");
forest.plantTree(140, 20, "Birch", "light-green", "birch_bark.png");

console.log("\n=== Drawing forest ===");
forest.draw();

const { treeCount, typeCount } = forest.stats;
console.log(`\n=== Memory savings ===`);
console.log(`  Trees rendered: ${treeCount}`);
console.log(`  TreeType objects in memory: ${typeCount}`);
console.log(`  Without flyweight: ${treeCount} full objects`);
console.log(`  With flyweight: ${typeCount} shared + ${treeCount} lightweight wrappers`);
