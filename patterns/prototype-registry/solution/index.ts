// Prototype Pattern — Prototype Registry
// Creates new objects by cloning registered prototypes from a central catalog.
// The registry stores clones (not references), and spawning returns independent
// copies, so modifications never leak back into the templates.

// --- ServerConfig (the Prototype) ---

class ServerConfig {
  constructor(
    public name: string,
    public cpu: number,
    public memoryGB: number,
    public diskGB: number,
    public packages: string[],
  ) {}

  // Deep copy — especially important for the packages array
  clone(): ServerConfig {
    return new ServerConfig(
      this.name,
      this.cpu,
      this.memoryGB,
      this.diskGB,
      [...this.packages],
    );
  }

  addPackage(pkg: string): void {
    this.packages.push(pkg);
  }

  // Adds to existing values (not replaces)
  upgradeSpecs(cpu: number, memory: number, disk: number): void {
    this.cpu += cpu;
    this.memoryGB += memory;
    this.diskGB += disk;
  }

  display(): void {
    console.log(
      `  ${this.name} | CPU: ${this.cpu} cores | RAM: ${this.memoryGB} GB | Disk: ${this.diskGB} GB | Packages: [${this.packages.join(", ")}]`,
    );
  }
}

// --- ServerRegistry ---
// Stores named server templates. Registration stores a clone, and spawning
// returns a clone, so the registry is always isolated from outside mutations.

class ServerRegistry {
  private templates = new Map<string, ServerConfig>();

  register(key: string, config: ServerConfig): void {
    // Store a clone so the caller can keep modifying the original
    // without affecting the registered template
    this.templates.set(key, config.clone());
    console.log(`Registered template: "${key}"`);
  }

  spawn(key: string): ServerConfig {
    const template = this.templates.get(key);
    if (!template) {
      throw new Error(`Unknown template: "${key}"`);
    }
    return template.clone();
  }

  listTemplates(): void {
    console.log("Available templates:");
    for (const [key, config] of this.templates) {
      process.stdout.write(`  [${key}] `);
      config.display();
    }
  }
}

// --- Demo: Cloud infrastructure provisioning workflow ---

const registry = new ServerRegistry();

// Register base templates with sensible defaults
registry.register("web-server", new ServerConfig("Web Server", 2, 4, 50, ["nginx"]));
registry.register("database-server", new ServerConfig("Database Server", 4, 16, 200, ["postgresql", "pgbouncer"]));

console.log("");
registry.listTemplates();

// Spawn a web server and customize it into an API gateway
console.log("\n=== Customizing a web server into an API gateway ===");
const apiGw = registry.spawn("web-server");
apiGw.name = "API Gateway";
apiGw.addPackage("node");
apiGw.addPackage("redis");
apiGw.upgradeSpecs(2, 4, 50);
apiGw.display();

// Save the customized config as a new template
console.log("\n=== Registering API gateway as a new template ===");
registry.register("api-gateway", apiGw);

console.log("");
registry.listTemplates();

// Spawn multiple api-gateway instances and customize individually
console.log("\n=== Spawning API gateway instances ===");
const gw1 = registry.spawn("api-gateway");
gw1.name = "API Gateway #1";
gw1.addPackage("monitoring-agent");

const gw2 = registry.spawn("api-gateway");
gw2.name = "API Gateway #2";
gw2.addPackage("rate-limiter");
gw2.upgradeSpecs(2, 8, 0);

gw1.display();
gw2.display();

// Prove the registry template is unchanged
console.log("\n=== Registry template unchanged? ===");
registry.spawn("api-gateway").display();
// Still shows 3 packages: nginx, node, redis — not 4 or 5
