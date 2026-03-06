## Description

The Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something before or after the request gets through to the original object.

## The Problem It Solves

When you have a resource-intensive object that's only needed occasionally (e.g., a massive database object), you'd want lazy initialization — but putting that logic everywhere leads to code duplication. You may also need access control, caching, or logging around an object without modifying the object itself, especially when it comes from a third-party library you can't change.

## How It Works

1. Define a service interface that both the real service and the proxy implement.
2. Create a proxy class that holds a reference to the real service object.
3. The proxy intercepts client requests, performs its logic (lazy initialization, access checks, caching, logging), then delegates to the real service.
4. The client works with the proxy through the same interface as the real service, remaining unaware of the substitution.

## When to Use It

- **Lazy initialization (virtual proxy)**: Delay creating a heavyweight object until it's actually needed.
- **Access control (protection proxy)**: Only let specific clients use the service object based on credentials.
- **Local execution of a remote service (remote proxy)**: Handle network communication details transparently.
- **Logging proxy**: Keep a history of requests to the service object.
- **Caching proxy**: Cache results of repeated requests and manage the cache lifecycle.