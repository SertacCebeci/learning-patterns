// Memento Pattern
// Captures an object's internal state as an opaque snapshot so it can
// be restored later, without exposing the object's internals.

// Example: a drawing canvas with version history. Snapshots store
// the full canvas state. Only the Canvas can read snapshot data.

// --- Shape type ---

interface Shape {
  type: "circle" | "rectangle" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// --- Memento (the snapshot) ---
// Immutable. Only the originator (Canvas) can read its contents.

class CanvasSnapshot {
  constructor(
    private readonly _shapes: Shape[],
    private readonly _backgroundColor: string,
    private readonly _zoom: number,
    private readonly _label: string,
  ) {}

  // Only the Canvas uses these to restore state
  get shapes(): Shape[] {
    return this._shapes.map((s) => ({ ...s }));
  }
  get backgroundColor(): string { return this._backgroundColor; }
  get zoom(): number { return this._zoom; }

  // The caretaker can see metadata but NOT the actual canvas data
  getLabel(): string {
    return this._label;
  }
}

// --- Originator: Canvas ---

class Canvas {
  private shapes: Shape[] = [];
  private backgroundColor = "white";
  private zoom = 1;

  addShape(shape: Shape): void {
    this.shapes.push({ ...shape });
    console.log(`  Added ${shape.type} (${shape.color}) at (${shape.x}, ${shape.y})`);
  }

  removeLastShape(): void {
    const removed = this.shapes.pop();
    if (removed) {
      console.log(`  Removed ${removed.type} (${removed.color})`);
    } else {
      console.log("  No shapes to remove.");
    }
  }

  setBackground(color: string): void {
    this.backgroundColor = color;
    console.log(`  Background set to ${color}`);
  }

  setZoom(level: number): void {
    this.zoom = level;
    console.log(`  Zoom set to ${level}x`);
  }

  display(): void {
    console.log(`  Canvas: ${this.shapes.length} shapes, bg: ${this.backgroundColor}, zoom: ${this.zoom}x`);
    for (const s of this.shapes) {
      console.log(`    - ${s.type} (${s.color}) at (${s.x}, ${s.y}) [${s.width}x${s.height}]`);
    }
  }

  // --- Memento methods ---

  save(): CanvasSnapshot {
    const label = `${this.shapes.length} shapes, bg: ${this.backgroundColor}, zoom: ${this.zoom}x`;
    return new CanvasSnapshot(
      this.shapes.map((s) => ({ ...s })), // deep copy each shape
      this.backgroundColor,
      this.zoom,
      label,
    );
  }

  restore(snapshot: CanvasSnapshot): void {
    this.shapes = snapshot.shapes; // getter already returns deep copies
    this.backgroundColor = snapshot.backgroundColor;
    this.zoom = snapshot.zoom;
    console.log(`  Canvas restored from snapshot.`);
  }
}

// --- Caretaker: VersionHistory ---
// Holds snapshots but never inspects canvas data directly.

class VersionHistory {
  private snapshots: CanvasSnapshot[] = [];

  save(canvas: Canvas): void {
    const snapshot = canvas.save();
    this.snapshots.push(snapshot);
    console.log(`=== Snapshot ${this.snapshots.length} saved: "${snapshot.getLabel()}" ===`);
  }

  restore(canvas: Canvas, index: number): boolean {
    if (index < 0 || index >= this.snapshots.length) {
      console.log(`  Invalid snapshot index: ${index}`);
      return false;
    }
    const snapshot = this.snapshots[index];
    console.log(`=== Restored to Snapshot ${index + 1}: ${snapshot.getLabel()} ===`);
    canvas.restore(snapshot);
    return true;
  }

  listSnapshots(): void {
    console.log(`  Snapshots (${this.snapshots.length}):`);
    for (let i = 0; i < this.snapshots.length; i++) {
      console.log(`    ${i + 1}. ${this.snapshots[i].getLabel()}`);
    }
  }

  clear(): void {
    this.snapshots = [];
    console.log("  Version history cleared.");
  }
}

// --- Usage ---

const canvas = new Canvas();
const history = new VersionHistory();

console.log("=== Adding 3 shapes ===");
canvas.addShape({ type: "circle", x: 10, y: 20, width: 50, height: 50, color: "red" });
canvas.addShape({ type: "rectangle", x: 30, y: 40, width: 100, height: 60, color: "blue" });
canvas.addShape({ type: "line", x: 0, y: 0, width: 200, height: 1, color: "black" });

console.log();
history.save(canvas);

console.log("\n=== Modifying canvas ===");
canvas.setBackground("navy");
canvas.setZoom(1.5);
canvas.addShape({ type: "circle", x: 80, y: 90, width: 30, height: 30, color: "yellow" });
canvas.addShape({ type: "rectangle", x: 120, y: 50, width: 40, height: 80, color: "green" });

console.log();
history.save(canvas);

console.log("\n=== Messing things up ===");
canvas.removeLastShape();
canvas.removeLastShape();
canvas.removeLastShape();
canvas.setBackground("red");
canvas.setZoom(3);
console.log();
canvas.display();

console.log("\n=== Listing all snapshots ===");
history.listSnapshots();

console.log("\n=== Restoring to Snapshot 1 ===");
history.restore(canvas, 0);
canvas.display();

console.log("\n=== Restoring to Snapshot 2 ===");
history.restore(canvas, 1);
canvas.display();
