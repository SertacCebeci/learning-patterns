# Shape Rendering System

## Background

You are building a graphics application that needs to render shapes using different rendering engines. The application must support multiple shape types and multiple rendering backends.

## The Challenge

You need to support the following:

**Shape types:**
- `Circle` — defined by a radius, draws a circular shape
- `Rectangle` — defined by width and height, draws a rectangular shape
- `Triangle` — defined by a base and height, draws a triangular shape

**Rendering engines:**
- `SVGRenderer` — outputs SVG markup strings (e.g., `<circle r="10" />`)
- `CanvasRenderer` — outputs Canvas API calls as strings (e.g., `ctx.arc(0, 0, 10, 0, Math.PI * 2)`)

If you create a separate class for each combination (SVGCircle, SVGRectangle, SVGTriangle, CanvasCircle, CanvasRectangle, CanvasTriangle), you end up with 6 classes. Adding a new renderer or a new shape forces you to add even more classes.

## Requirements

1. Design a system where shapes and renderers can vary independently
2. Adding a new shape should not require changes to existing renderers
3. Adding a new renderer should not require changes to existing shapes
4. Each shape should be able to use any renderer at runtime
5. The `render()` method on each shape should return a string describing the rendered output
6. Each renderer should have a `renderCircle(radius)`, `renderRectangle(width, height)`, and `renderTriangle(base, height)` method

## Example Usage

```typescript
const svgRenderer = new SVGRenderer();
const canvasRenderer = new CanvasRenderer();

const circle = new Circle(10, svgRenderer);
console.log(circle.render()); // SVG circle output

const rect = new Rectangle(20, 15, canvasRenderer);
console.log(rect.render()); // Canvas rectangle output
```

## Constraints

- You should need only N + M classes (not N x M) where N is the number of shapes and M is the number of renderers
- Shapes should accept the renderer through their constructor
