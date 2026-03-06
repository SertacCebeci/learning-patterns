# Problem: Drawing Canvas with Version History

## Scenario

You are building a simple vector drawing application. Users draw shapes on a canvas and need the ability to save snapshots of the entire canvas at any point, and restore to any previously saved snapshot.

## Requirements

1. Define a `Canvas` class that maintains internal state:
   - A list of shapes, where each shape has: `type` ("circle" | "rectangle" | "line"), `x`, `y`, `width`, `height`, and `color`
   - A `backgroundColor` property
   - A `zoom` level (number)

2. The `Canvas` class should support these operations:
   - `addShape(shape)` — adds a shape to the canvas
   - `removeLastShape()` — removes the most recently added shape
   - `setBackground(color: string)` — changes the background color
   - `setZoom(level: number)` — changes the zoom level
   - `display()` — prints current canvas state (shape count, background, zoom)

3. Implement a snapshot mechanism:
   - The `Canvas` creates snapshots of its own state. The snapshot must be a deep copy (modifying the canvas after saving must not affect the snapshot).
   - Snapshots should expose only a label (e.g., timestamp + shape count) but NOT the actual canvas data to outside code.
   - Only the `Canvas` itself can read snapshot data and restore from it.

4. Build a `VersionHistory` manager that:
   - Stores multiple snapshots
   - Can restore the canvas to any saved snapshot (not just the last one) by index
   - Can list all saved snapshots by their labels
   - Can clear all history

5. Demonstrate this workflow:
   - Create a canvas, add 3 shapes, save snapshot
   - Change background and zoom, add 2 more shapes, save snapshot
   - Remove shapes and change settings (mess things up)
   - Restore to the first snapshot — canvas should match its state at that time exactly

## Expected Behavior

```
=== Snapshot 1 saved: "3 shapes, bg: white, zoom: 1x" ===
=== Snapshot 2 saved: "5 shapes, bg: navy, zoom: 1.5x" ===
=== After modifications: 2 shapes, bg: red, zoom: 3x ===
=== Restored to Snapshot 1: 3 shapes, bg: white, zoom: 1x ===
```

## Constraints

- The snapshot class must not expose shape data or canvas settings via public methods (except the label).
- External code (the VersionHistory manager) must not be able to read or modify canvas internals through the snapshot.
- Restoring a snapshot must fully replace the canvas state, not merge with it.
