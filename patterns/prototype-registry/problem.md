# Problem: Cloud Infrastructure Template Registry

You are building a cloud infrastructure provisioning tool. System administrators define server configurations as templates, register them in a central catalog, and operations teams spawn new servers by cloning from the catalog. Admins can also customize a spawned server and save it back as a new template.

## Requirements

1. Create a `ServerConfig` class with:
   - `name: string`
   - `cpu: number` (number of cores)
   - `memoryGB: number`
   - `diskGB: number`
   - `packages: string[]` (installed software, e.g., `["nginx", "node", "redis"]`)

2. Implement a `clone(): ServerConfig` method that returns a deep copy (especially for the `packages` array).

3. Add helper methods:
   - `addPackage(pkg: string): void`
   - `upgradeSpecs(cpu: number, memory: number, disk: number): void` -- adds to existing values.
   - `display(): void` -- prints the configuration.

4. Create a `ServerRegistry` class with:
   - `register(key: string, config: ServerConfig): void` -- stores a clone of the config under the given key.
   - `spawn(key: string): ServerConfig` -- returns a clone of the stored prototype.
   - `listTemplates(): void` -- prints all registered template names and their specs.

5. Demonstrate the following workflow:
   - Register base templates: `"web-server"` and `"database-server"` with appropriate defaults.
   - Spawn a web server, customize it (add packages, upgrade specs), and register it as a new template `"api-gateway"`.
   - Spawn multiple `"api-gateway"` instances, customize them individually, and show that the registry template remains unchanged.

## Example Usage

```ts
const registry = new ServerRegistry();
registry.register("web-server", new ServerConfig("Web Server", 2, 4, 50, ["nginx"]));

const apiGw = registry.spawn("web-server");
apiGw.name = "API Gateway";
apiGw.addPackage("node");
apiGw.addPackage("redis");
apiGw.upgradeSpecs(2, 4, 50);
registry.register("api-gateway", apiGw);

const gw1 = registry.spawn("api-gateway");
gw1.name = "API Gateway #1";
gw1.addPackage("monitoring-agent");

gw1.display();
// Shows 4 packages: nginx, node, redis, monitoring-agent

registry.spawn("api-gateway").display();
// Still shows 3 packages: nginx, node, redis (unchanged)
```

## Acceptance Criteria

- The registry stores clones, not references -- modifying the original after registration does not affect the stored template.
- Spawning returns independent clones -- modifying a spawned instance does not affect the registry.
- New templates can be derived from existing ones and registered back into the catalog.
- The `listTemplates()` method shows all available templates including dynamically added ones.
