// Singleton Pattern
// Ensures a class has only one instance and provides a global point of access to it.
// Here it manages application configuration that must be shared across
// all modules, services, and handlers.

// --- ConfigManager (Singleton) ---

class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, unknown>;

  // Private constructor — prevents direct instantiation with `new`
  private constructor(initialConfig: Record<string, unknown>) {
    this.config = { ...initialConfig };
    console.log("  [ConfigManager] Instance created with config:", this.config);
  }

  // Returns the single instance. The first call initializes with the
  // provided config; subsequent calls ignore the argument and return
  // the existing instance.
  static getInstance(initialConfig: Record<string, unknown>): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager(initialConfig);
    } else {
      console.log("  [ConfigManager] Instance already exists — ignoring new config");
    }
    return ConfigManager.instance;
  }

  // Retrieve individual config values by key
  get(key: string): unknown {
    return this.config[key];
  }
}

// --- Usage ---
// First initialization sets the config for the entire application lifetime.

console.log("=== First getInstance call ===");
const config1 = ConfigManager.getInstance({
  dbHost: "localhost",
  dbPort: 5432,
  featureX: true,
});

console.log("\n=== Second getInstance call (different data — ignored) ===");
const config2 = ConfigManager.getInstance({
  dbHost: "remote-server",
  dbPort: 3306,
  featureX: false,
});

// Both references point to the exact same object
console.log("\n=== Verification ===");
console.log(`  config1 === config2: ${config1 === config2}`); // true
console.log(`  dbHost: ${config2.get("dbHost")}`);            // "localhost" (first init wins)
console.log(`  dbPort: ${config2.get("dbPort")}`);            // 5432
console.log(`  featureX: ${config2.get("featureX")}`);        // true
