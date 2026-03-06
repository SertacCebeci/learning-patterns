// Abstract Factory Pattern
// Provides an interface for creating families of related objects
// without specifying their concrete classes.

// --- Abstract products ---

interface Connection {
  connect(): void;
}

interface QueryBuilder {
  buildSelect(table: string, columns: string[]): void;
}

// --- Abstract factory ---

interface DatabaseFactory {
  createConnection(): Connection;
  createQueryBuilder(): QueryBuilder;
}

// --- PostgreSQL family ---

class PostgresConnection implements Connection {
  connect(): void {
    console.log("Connecting to PostgreSQL database...");
  }
}

class PostgresQueryBuilder implements QueryBuilder {
  buildSelect(table: string, columns: string[]): void {
    console.log(`SELECT ${columns.join(", ")} FROM ${table}`);
  }
}

class PostgresFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new PostgresConnection();
  }
  createQueryBuilder(): QueryBuilder {
    return new PostgresQueryBuilder();
  }
}

// --- MongoDB family ---

class MongoConnection implements Connection {
  connect(): void {
    console.log("Connecting to MongoDB cluster...");
  }
}

class MongoQueryBuilder implements QueryBuilder {
  buildSelect(table: string, columns: string[]): void {
    const projection = columns.map((col) => `${col}: 1`).join(", ");
    console.log(`db.collection("${table}").find({ ${projection} })`);
  }
}

class MongoFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new MongoConnection();
  }
  createQueryBuilder(): QueryBuilder {
    return new MongoQueryBuilder();
  }
}

// --- Application code ---
// Works entirely through the DatabaseFactory interface.
// Swapping the factory switches the entire product family at once.

function fetchUsers(factory: DatabaseFactory): void {
  const conn = factory.createConnection();
  conn.connect();
  const qb = factory.createQueryBuilder();
  qb.buildSelect("users", ["id", "name", "email"]);
}

console.log("=== PostgreSQL ===");
fetchUsers(new PostgresFactory());
// Connecting to PostgreSQL database...
// SELECT id, name, email FROM users

console.log("\n=== MongoDB ===");
fetchUsers(new MongoFactory());
// Connecting to MongoDB cluster...
// db.collection("users").find({ id: 1, name: 1, email: 1 })
