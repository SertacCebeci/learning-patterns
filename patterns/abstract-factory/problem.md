# Problem: Cross-Database Data Access Layer

You are building a data access layer for an application that must support both PostgreSQL and MongoDB. Each database requires its own connection object and query builder, but the application logic should be completely unaware of which database is in use.

## Requirements

1. Define two abstract product interfaces:
   - `Connection` with a method `connect(): void` that logs a connection message.
   - `QueryBuilder` with a method `buildSelect(table: string, columns: string[]): void` that logs the generated query syntax.

2. Define a `DatabaseFactory` interface with two methods:
   - `createConnection(): Connection`
   - `createQueryBuilder(): QueryBuilder`

3. Implement a **PostgreSQL family**:
   - `PostgresConnection` logs: `Connecting to PostgreSQL database...`
   - `PostgresQueryBuilder` logs a SQL-style select: `SELECT col1, col2 FROM table`

4. Implement a **MongoDB family**:
   - `MongoConnection` logs: `Connecting to MongoDB cluster...`
   - `MongoQueryBuilder` logs a MongoDB-style query: `db.collection("table").find({ col1: 1, col2: 1 })`

5. Write application-level code (e.g., a `fetchUsers` function) that accepts a `DatabaseFactory`, creates a connection and query builder from it, and uses them -- without any knowledge of which database backend is active.

## Example Usage

```ts
function fetchUsers(factory: DatabaseFactory): void {
  const conn = factory.createConnection();
  conn.connect();
  const qb = factory.createQueryBuilder();
  qb.buildSelect("users", ["id", "name", "email"]);
}

fetchUsers(new PostgresFactory());
// Connecting to PostgreSQL database...
// SELECT id, name, email FROM users

fetchUsers(new MongoFactory());
// Connecting to MongoDB cluster...
// db.collection("users").find({ id: 1, name: 1, email: 1 })
```

## Acceptance Criteria

- Products from the same factory are always used together (you never mix Postgres connection with Mongo query builder).
- Swapping the factory at the call site switches the entire product family.
- Adding a new database (e.g., SQLite) requires only a new factory and product classes, with zero changes to `fetchUsers`.
