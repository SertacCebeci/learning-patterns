# Problem: Application Configuration Manager

You are building a backend service that reads configuration from a JSON file at startup. The configuration includes database credentials, API keys, feature flags, and rate-limit settings.

## Requirements

1. Create a `ConfigManager` class that loads configuration data from a given object (simulating file read).
2. The configuration must be loaded only once. Any subsequent request for the configuration -- from any module, service, or handler -- must return the exact same instance with the same data.
3. If one part of the application updates a feature flag on the config object, every other part must immediately see that change (because they all share the same instance).
4. It should be impossible to create a second `ConfigManager` by calling `new` directly.

## Example Usage

```ts
const config1 = ConfigManager.getInstance({ dbHost: "localhost", dbPort: 5432, featureX: true });
const config2 = ConfigManager.getInstance({ dbHost: "remote-server", dbPort: 3306, featureX: false });

// config2 should be the same object as config1
console.log(config1 === config2); // true
console.log(config2.get("dbHost")); // "localhost" (first initialization wins)
```

## Acceptance Criteria

- Calling `getInstance` multiple times always returns the same object.
- The constructor is not directly accessible from outside the class.
- Configuration data provided after the first call is ignored.
- Provide a `get(key: string)` method to retrieve individual config values.
