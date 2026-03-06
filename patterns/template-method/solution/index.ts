// Template Method Pattern
// Defines the skeleton of an algorithm in a base class.
// Subclasses override specific steps without changing the structure.

// Example: a data mining pipeline that reads, parses, analyzes, and
// reports data from different file formats.

// --- Abstract class with the template method ---

abstract class DataMiner {
  // The template method — defines the fixed workflow.
  // Subclasses cannot override this.
  mine(path: string): void {
    const raw = this.readFile(path);
    const data = this.parse(raw);
    const result = this.analyze(data);
    this.beforeReport(); // optional hook
    this.report(result);
  }

  // --- Steps that subclasses MUST implement ---

  protected abstract readFile(path: string): string;
  protected abstract parse(raw: string): Record<string, number>[];

  // --- Steps with default implementations (can be overridden) ---

  protected analyze(data: Record<string, number>[]): string {
    const count = data.length;
    const keys = Object.keys(data[0] ?? {});
    const summary = keys.map((key) => {
      const avg = data.reduce((sum, row) => sum + (row[key] ?? 0), 0) / count;
      return `${key}: avg=${avg.toFixed(1)}`;
    });
    return `${count} records — ${summary.join(", ")}`;
  }

  protected report(result: string): void {
    console.log(`  Report: ${result}`);
  }

  // --- Hook: empty by default, subclasses MAY override ---

  protected beforeReport(): void {
    // default: do nothing
  }
}

// --- Concrete implementations ---

class CsvMiner extends DataMiner {
  protected readFile(path: string): string {
    console.log(`  [CSV] Reading file: ${path}`);
    // Simulated CSV content
    return "name,score,hours\nalice,85,40\nbob,92,35\ncharlie,78,45";
  }

  protected parse(raw: string): Record<string, number>[] {
    const [headerLine, ...rows] = raw.split("\n");
    const headers = headerLine.split(",");
    console.log(`  [CSV] Parsed ${rows.length} rows with columns: ${headers.join(", ")}`);

    return rows.map((row) => {
      const values = row.split(",");
      const record: Record<string, number> = {};
      headers.forEach((h, i) => {
        const num = Number(values[i]);
        if (!isNaN(num)) record[h] = num;
      });
      return record;
    });
  }
}

class JsonMiner extends DataMiner {
  protected readFile(path: string): string {
    console.log(`  [JSON] Reading file: ${path}`);
    // Simulated JSON content
    return JSON.stringify([
      { score: 88, hours: 38 },
      { score: 95, hours: 32 },
      { score: 72, hours: 50 },
      { score: 81, hours: 42 },
    ]);
  }

  protected parse(raw: string): Record<string, number>[] {
    const data = JSON.parse(raw);
    console.log(`  [JSON] Parsed ${data.length} objects`);
    return data;
  }

  // Override the hook to add a separator
  protected beforeReport(): void {
    console.log("  [JSON] --- Analysis Complete ---");
  }
}

class ApiMiner extends DataMiner {
  protected readFile(path: string): string {
    console.log(`  [API] Fetching from endpoint: ${path}`);
    // Simulated API response
    return JSON.stringify({
      results: [
        { latency: 120, errors: 2 },
        { latency: 95, errors: 0 },
        { latency: 200, errors: 5 },
      ],
    });
  }

  protected parse(raw: string): Record<string, number>[] {
    const response = JSON.parse(raw);
    console.log(`  [API] Parsed ${response.results.length} results from response`);
    return response.results;
  }

  // Override report to add a warning threshold
  protected report(result: string): void {
    console.log(`  [API] Monitoring Report: ${result}`);
  }
}

// --- Usage ---
// Same mine() workflow, different file formats and behaviors.

console.log("=== CSV Data Mining ===");
new CsvMiner().mine("employees.csv");

console.log("\n=== JSON Data Mining ===");
new JsonMiner().mine("scores.json");

console.log("\n=== API Data Mining ===");
new ApiMiner().mine("https://api.example.com/metrics");
