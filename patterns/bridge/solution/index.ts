// Bridge Pattern
// Splits a class into two separate hierarchies — abstraction and implementation —
// that can vary independently. Prevents class explosion when you have
// multiple dimensions of variation.

// Without Bridge you'd need: SVGCircle, SVGRectangle, SVGTriangle,
// CanvasCircle, CanvasRectangle, CanvasTriangle — 6 classes (N x M).
// With Bridge: 3 shapes + 2 renderers = 5 classes (N + M).

// --- Implementation hierarchy (Renderers) ---

interface Renderer {
  renderCircle(radius: number): string;
  renderRectangle(width: number, height: number): string;
  renderTriangle(base: number, height: number): string;
}

class SVGRenderer implements Renderer {
  renderCircle(radius: number): string {
    return `<circle r="${radius}" />`;
  }

  renderRectangle(width: number, height: number): string {
    return `<rect width="${width}" height="${height}" />`;
  }

  renderTriangle(base: number, height: number): string {
    return `<polygon points="0,${height} ${base / 2},0 ${base},${height}" />`;
  }
}

class CanvasRenderer implements Renderer {
  renderCircle(radius: number): string {
    return `ctx.arc(0, 0, ${radius}, 0, Math.PI * 2)`;
  }

  renderRectangle(width: number, height: number): string {
    return `ctx.fillRect(0, 0, ${width}, ${height})`;
  }

  renderTriangle(base: number, height: number): string {
    return `ctx.moveTo(0, ${height}); ctx.lineTo(${base / 2}, 0); ctx.lineTo(${base}, ${height}); ctx.closePath()`;
  }
}

// --- Abstraction hierarchy (Shapes) ---

abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract render(): string;
}

class Circle extends Shape {
  constructor(private radius: number, renderer: Renderer) {
    super(renderer);
  }

  render(): string {
    return this.renderer.renderCircle(this.radius);
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number, renderer: Renderer) {
    super(renderer);
  }

  render(): string {
    return this.renderer.renderRectangle(this.width, this.height);
  }
}

class Triangle extends Shape {
  constructor(private base: number, private height: number, renderer: Renderer) {
    super(renderer);
  }

  render(): string {
    return this.renderer.renderTriangle(this.base, this.height);
  }
}

// --- Usage ---
// Mix and match any shape with any renderer.

const svgRenderer = new SVGRenderer();
const canvasRenderer = new CanvasRenderer();

console.log("=== SVG Renderer ===");
console.log(new Circle(10, svgRenderer).render());
console.log(new Rectangle(20, 15, svgRenderer).render());
console.log(new Triangle(30, 20, svgRenderer).render());

console.log("\n=== Canvas Renderer ===");
console.log(new Circle(10, canvasRenderer).render());
console.log(new Rectangle(20, 15, canvasRenderer).render());
console.log(new Triangle(30, 20, canvasRenderer).render());
