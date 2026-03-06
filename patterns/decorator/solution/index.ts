// Decorator Pattern
// Attaches new behaviors to objects by wrapping them in decorator objects
// that implement the same interface. Decorators can be stacked — each one
// adds a layer of behavior while delegating the core work to the wrapped object.

// --- Component interface ---

interface DataSource {
  write(data: string): void;
  read(): string;
}

// --- Concrete component ---

class InMemoryDataSource implements DataSource {
  private data = "";

  write(data: string): void {
    this.data = data;
  }

  read(): string {
    return this.data;
  }
}

// --- Base decorator ---

class DataSourceDecorator implements DataSource {
  constructor(protected wrapped: DataSource) {}

  write(data: string): void {
    this.wrapped.write(data);
  }

  read(): string {
    return this.wrapped.read();
  }
}

// --- Concrete decorators ---

class LoggingDecorator extends DataSourceDecorator {
  write(data: string): void {
    console.log(`  [LOG] Writing ${data.length} chars`);
    super.write(data);
  }

  read(): string {
    const result = super.read();
    console.log(`  [LOG] Reading ${result.length} chars`);
    return result;
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  write(data: string): void {
    const encrypted = this.encrypt(data);
    console.log(`  [ENC] Encrypted data`);
    super.write(encrypted);
  }

  read(): string {
    const data = super.read();
    const decrypted = this.decrypt(data);
    console.log(`  [ENC] Decrypted data`);
    return decrypted;
  }

  private encrypt(data: string): string {
    return Buffer.from(data).toString("base64");
  }

  private decrypt(data: string): string {
    return Buffer.from(data, "base64").toString("utf-8");
  }
}

class CompressionDecorator extends DataSourceDecorator {
  write(data: string): void {
    const compressed = this.compress(data);
    console.log(`  [ZIP] Compressed: ${data.length} → ${compressed.length} chars`);
    super.write(compressed);
  }

  read(): string {
    const data = super.read();
    const decompressed = this.decompress(data);
    console.log(`  [ZIP] Decompressed: ${data.length} → ${decompressed.length} chars`);
    return decompressed;
  }

  // Simulated compression (doubles every other char removal — just for demo)
  private compress(data: string): string {
    return Buffer.from(data, "utf-8").toString("hex");
  }

  private decompress(data: string): string {
    return Buffer.from(data, "hex").toString("utf-8");
  }
}

// --- Usage ---
// Stack decorators in any combination. The client always sees a DataSource.

const message = "aaabbbcccdddeeefffggg";

console.log("=== Plain write & read ===");
const plain = new InMemoryDataSource();
plain.write(message);
console.log(`  Result: ${plain.read()}`);

console.log("\n=== Logging only ===");
const logged = new LoggingDecorator(new InMemoryDataSource());
logged.write(message);
console.log(`  Result: ${logged.read()}`);

console.log("\n=== Logging + Compression ===");
const loggedAndCompressed = new LoggingDecorator(
  new CompressionDecorator(new InMemoryDataSource()),
);
loggedAndCompressed.write(message);
console.log(`  Result: ${loggedAndCompressed.read()}`);

console.log("\n=== Logging + Encryption + Compression ===");
const fullyWrapped = new LoggingDecorator(
  new EncryptionDecorator(
    new CompressionDecorator(new InMemoryDataSource()),
  ),
);
fullyWrapped.write(message);
console.log(`  Result: ${fullyWrapped.read()}`);
