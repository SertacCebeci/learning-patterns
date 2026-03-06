// Proxy Pattern
// Provides a substitute for another object to control access to it.
// The proxy implements the same interface, so the client doesn't know
// whether it's talking to the real object or the proxy.

// This example shows all three common proxy types working together:
// virtual (lazy loading), caching, and protection.

// --- Subject interface ---

interface Database {
  query(sql: string): string[];
}

// --- Real subject (expensive to create) ---

class PostgresDatabase implements Database {
  constructor() {
    // Simulate expensive connection setup
    console.log("  [Postgres] Connecting to database... (slow operation)");
    console.log("  [Postgres] Connection established.");
  }

  query(sql: string): string[] {
    console.log(`  [Postgres] Executing: ${sql}`);
    // Simulate query results
    if (sql.includes("users")) {
      return ["alice", "bob", "charlie"];
    }
    if (sql.includes("orders")) {
      return ["order_1", "order_2"];
    }
    return [];
  }
}

// --- Proxy ---
// Combines lazy initialization, access control, and caching.

class DatabaseProxy implements Database {
  private realDb: PostgresDatabase | null = null;
  private cache = new Map<string, string[]>();
  private userRole: string;

  constructor(userRole: string) {
    this.userRole = userRole;
    // Note: the real database is NOT created here — that's the point.
    console.log(`  [Proxy] Created for role: ${this.userRole}`);
  }

  query(sql: string): string[] {
    // Protection: check access
    if (sql.includes("DROP") || sql.includes("DELETE")) {
      if (this.userRole !== "admin") {
        console.log(`  [Proxy] ACCESS DENIED: ${this.userRole} cannot run destructive queries`);
        return [];
      }
    }

    // Caching: return cached result if available
    if (this.cache.has(sql)) {
      console.log(`  [Proxy] Cache hit for: ${sql}`);
      return this.cache.get(sql)!;
    }

    // Virtual: create real DB only when first needed
    if (!this.realDb) {
      console.log("  [Proxy] First query — initializing real database...");
      this.realDb = new PostgresDatabase();
    }

    // Delegate to real database
    const result = this.realDb.query(sql);

    // Cache the result
    this.cache.set(sql, result);
    console.log(`  [Proxy] Cached result for: ${sql}`);

    return result;
  }
}

// --- Usage ---
// The client works with the Database interface. It doesn't know
// whether it has a real database or a proxy.

function runQueries(db: Database): void {
  console.log("  Result:", db.query("SELECT * FROM users"));
  console.log("  Result:", db.query("SELECT * FROM users")); // cache hit
  console.log("  Result:", db.query("SELECT * FROM orders"));
  db.query("DROP TABLE users");
}

console.log("=== Viewer role ===");
const viewerDb = new DatabaseProxy("viewer");
runQueries(viewerDb);

console.log("\n=== Admin role ===");
const adminDb = new DatabaseProxy("admin");
adminDb.query("DROP TABLE users");
