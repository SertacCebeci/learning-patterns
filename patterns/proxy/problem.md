# Image Gallery with Lazy Loading

## Background

You are building a web-based image gallery application. The gallery displays thumbnails, and when the user clicks a thumbnail, the full-resolution image is loaded and displayed.

## The Challenge

Full-resolution images are expensive to load — each one requires a network request that takes 2-3 seconds. The gallery may contain hundreds of images, and loading all of them upfront would be extremely slow and waste bandwidth.

You have an existing `RealImage` class:

```typescript
class RealImage implements Image {
  private data: string;

  constructor(private filename: string) {
    this.data = this.loadFromDisk(filename);  // Expensive operation
  }

  private loadFromDisk(filename: string): string {
    console.log(`  [RealImage] Loading ${filename} from disk... (expensive)`);
    return `<image-data:${filename}>`;
  }

  display(): string {
    console.log(`  [RealImage] Displaying ${this.filename}`);
    return this.data;
  }

  getFilename(): string {
    return this.filename;
  }
}
```

The interface both classes must implement:

```typescript
interface Image {
  display(): string;
  getFilename(): string;
}
```

## Requirements

1. Create a class that implements the `Image` interface and acts as a stand-in for `RealImage`
2. The real image should NOT be loaded in the constructor — only when `display()` is first called
3. Once loaded, subsequent calls to `display()` should reuse the already-loaded image (no re-loading)
4. `getFilename()` should work immediately without triggering a load
5. Add logging so it's clear when the real image is being loaded vs. when a cached version is used

## Example Usage

```typescript
const images: Image[] = [
  new ProxyImage("photo1.jpg"),
  new ProxyImage("photo2.jpg"),
  new ProxyImage("photo3.jpg"),
];

// No images loaded yet at this point
console.log(images[0].getFilename()); // "photo1.jpg" — no loading triggered

images[0].display(); // Loads photo1.jpg, then displays it
images[0].display(); // Uses cached version, no reload
images[2].display(); // Loads photo3.jpg, then displays it
// photo2.jpg is never loaded because display() was never called on it
```

## Constraints

- Do not modify the `RealImage` class
- Your class must implement the same `Image` interface
- The client code should not need to know whether it is working with a real image or your stand-in
- Loading should happen at most once per image, regardless of how many times `display()` is called
