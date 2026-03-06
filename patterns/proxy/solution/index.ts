// Proxy Pattern
// Provides a substitute for another object to control access to it.
// The proxy implements the same interface, so the client doesn't know
// whether it's talking to the real object or the proxy.

// This example uses a virtual proxy for lazy-loading expensive images.

// --- Subject interface ---

interface Image {
  display(): string;
  getFilename(): string;
}

// --- Real subject (expensive to create) ---

class RealImage implements Image {
  private data: string;

  constructor(private filename: string) {
    this.data = this.loadFromDisk(filename); // Expensive operation
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

// --- Proxy ---
// Delays creation of the RealImage until display() is first called.
// Once loaded, the real image is cached for subsequent calls.
// getFilename() works immediately without triggering a load.

class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {
    // Note: the real image is NOT loaded here — that's the point.
    console.log(`  [Proxy] Created proxy for ${this.filename}`);
  }

  display(): string {
    if (!this.realImage) {
      console.log(`  [Proxy] First display() call — loading real image...`);
      this.realImage = new RealImage(this.filename);
    } else {
      console.log(`  [Proxy] Using cached image for ${this.filename}`);
    }
    return this.realImage.display();
  }

  // Works immediately without triggering a load
  getFilename(): string {
    return this.filename;
  }
}

// --- Usage ---
// The client works with the Image interface. It doesn't know whether
// it has a RealImage or a ProxyImage.

console.log('=== Creating gallery (no images loaded yet) ===');
const images: Image[] = [
  new ProxyImage('photo1.jpg'),
  new ProxyImage('photo2.jpg'),
  new ProxyImage('photo3.jpg'),
];

// getFilename() works without triggering a load
console.log('\n=== Checking filenames (no loading) ===');
for (const img of images) {
  console.log(`  Filename: ${img.getFilename()}`);
}

// Only load images that the user actually clicks on
console.log('\n=== User clicks photo1 ===');
console.log(`  Data: ${images[0].display()}`);

console.log('\n=== User clicks photo1 again (cached) ===');
console.log(`  Data: ${images[0].display()}`);

console.log('\n=== User clicks photo3 ===');
console.log(`  Data: ${images[2].display()}`);

// photo2.jpg is never loaded because display() was never called on it
console.log('\n=== photo2 was never loaded — saving bandwidth ===');
