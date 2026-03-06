// Strategy Pattern
// Defines a family of interchangeable algorithms. The client picks
// which one to use at runtime without changing the context.

// Example: a text storage service where the compression algorithm
// varies by content type and can be swapped at runtime.

// --- Strategy interface ---

interface CompressionStrategy {
  compress(input: string): string;
  decompress(compressed: string): string;
  name(): string;
}

// --- Concrete strategies ---

class RunLengthEncoding implements CompressionStrategy {
  name(): string { return "RunLengthEncoding"; }

  compress(input: string): string {
    if (input.length === 0) return "";

    let result = "";
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
      if (i < input.length && input[i] === input[i - 1]) {
        count++;
      } else {
        result += `${count}${input[i - 1]}`;
        count = 1;
      }
    }

    return result;
  }

  decompress(compressed: string): string {
    let result = "";
    let i = 0;

    while (i < compressed.length) {
      // Parse the count (may be multiple digits)
      let numStr = "";
      while (i < compressed.length && compressed[i] >= "0" && compressed[i] <= "9") {
        numStr += compressed[i];
        i++;
      }
      const count = parseInt(numStr, 10);
      const char = compressed[i];
      result += char.repeat(count);
      i++;
    }

    return result;
  }
}

class DictionaryCompression implements CompressionStrategy {
  // Common English words mapped to short tokens
  private dictionary: Map<string, string> = new Map([
    ["the", "$1"],
    ["quick", "$2"],
    ["brown", "$3"],
    ["fox", "$4"],
    ["jumps", "$5"],
    ["over", "$6"],
    ["lazy", "$7"],
    ["dog", "$8"],
    ["and", "$9"],
    ["is", "$10"],
    ["a", "$11"],
    ["that", "$12"],
    ["it", "$13"],
    ["for", "$14"],
    ["was", "$15"],
  ]);

  // Reverse dictionary for decompression
  private reverseDictionary: Map<string, string>;

  constructor() {
    this.reverseDictionary = new Map();
    for (const [word, token] of this.dictionary) {
      this.reverseDictionary.set(token, word);
    }
  }

  name(): string { return "DictionaryCompression"; }

  compress(input: string): string {
    let result = input;
    for (const [word, token] of this.dictionary) {
      result = result.split(word).join(token);
    }
    return result;
  }

  decompress(compressed: string): string {
    let result = compressed;
    // Replace tokens back to words (process longer tokens first to avoid partial matches)
    const sortedTokens = [...this.reverseDictionary.entries()].sort(
      (a, b) => b[0].length - a[0].length,
    );
    for (const [token, word] of sortedTokens) {
      result = result.split(token).join(word);
    }
    return result;
  }
}

class NoCompression implements CompressionStrategy {
  name(): string { return "NoCompression"; }

  compress(input: string): string {
    return input;
  }

  decompress(compressed: string): string {
    return compressed;
  }
}

// --- Context ---

class StorageService {
  private strategy: CompressionStrategy;
  private store_: Map<string, { compressed: string; originalSize: number }> = new Map();

  constructor(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }

  setCompression(strategy: CompressionStrategy): void {
    this.strategy = strategy;
    console.log(`  Switched compression to: ${strategy.name()}`);
  }

  store(key: string, data: string): void {
    const compressed = this.strategy.compress(data);
    this.store_.set(key, { compressed, originalSize: data.length });

    const ratio = data.length > 0
      ? Math.round((1 - compressed.length / data.length) * 100)
      : 0;

    console.log(`  Stored "${key}" (original: ${data.length} chars, compressed: ${compressed.length} chars, ratio: ${ratio}%)`);
  }

  retrieve(key: string): string {
    const entry = this.store_.get(key);
    if (!entry) {
      throw new Error(`Key "${key}" not found`);
    }
    return this.strategy.decompress(entry.compressed);
  }

  getStats(key: string): void {
    const entry = this.store_.get(key);
    if (!entry) {
      console.log(`  No data stored for "${key}"`);
      return;
    }

    const ratio = entry.originalSize > 0
      ? Math.round((1 - entry.compressed.length / entry.originalSize) * 100)
      : 0;

    console.log(`  "${key}" — original: ${entry.originalSize} chars, compressed: ${entry.compressed.length} chars, ratio: ${ratio}%`);
  }
}

// --- Usage ---
// Same storage service, different compression strategies produce different results.

const storage = new StorageService(new RunLengthEncoding());

console.log("=== RunLengthEncoding ===");
const binaryData = "aaaaabbbbccccccccdddd";
storage.store("binary", binaryData);
const retrieved1 = storage.retrieve("binary");
console.log(`  Retrieved: "${retrieved1}" ${retrieved1 === binaryData ? "\u2713" : "\u2717"}`);

console.log("\n=== DictionaryCompression ===");
storage.setCompression(new DictionaryCompression());
const essay = "the quick brown fox jumps over the lazy dog";
storage.store("essay", essay);
const retrieved2 = storage.retrieve("essay");
console.log(`  Retrieved: "${retrieved2}" ${retrieved2 === essay ? "\u2713" : "\u2717"}`);

console.log("\n=== NoCompression ===");
storage.setCompression(new NoCompression());
const config = "debug=true;level=5";
storage.store("config", config);
const retrieved3 = storage.retrieve("config");
console.log(`  Retrieved: "${retrieved3}" ${retrieved3 === config ? "\u2713" : "\u2717"}`);

console.log("\n=== Stats ===");
storage.getStats("binary");
storage.getStats("essay");
storage.getStats("config");
