// Builder Pattern
// Separates the construction of a complex object from its representation,
// allowing the same construction process to create different configurations.

// --- The product ---

class HttpRequest {
  constructor(
    public readonly url: string,
    public readonly method: string,
    public readonly headers: Record<string, string>,
    public readonly queryParams: Record<string, string>,
    public readonly body: string | null,
    public readonly timeout: number,
  ) {}

  display(): void {
    const query = Object.entries(this.queryParams)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    const fullUrl = query ? `${this.url}?${query}` : this.url;

    console.log(`${this.method} ${fullUrl}`);
    for (const [key, value] of Object.entries(this.headers)) {
      console.log(`  ${key}: ${value}`);
    }
    if (this.body) {
      console.log(`  Body: ${this.body}`);
    }
    console.log(`  Timeout: ${this.timeout}ms`);
  }
}

// --- The builder ---

class HttpRequestBuilder {
  private url: string;
  private method = "GET";
  private headers: Record<string, string> = {};
  private queryParams: Record<string, string> = {};
  private body: string | null = null;
  private timeout = 5000;

  constructor(url: string) {
    this.url = url;
  }

  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  addQueryParam(key: string, value: string): this {
    this.queryParams[key] = value;
    return this;
  }

  setBody(body: object): this {
    this.body = JSON.stringify(body);
    this.headers["Content-Type"] = "application/json";
    return this;
  }

  setTimeout(ms: number): this {
    this.timeout = ms;
    return this;
  }

  build(): HttpRequest {
    return new HttpRequest(
      this.url,
      this.method,
      { ...this.headers },
      { ...this.queryParams },
      this.body,
      this.timeout,
    );
  }
}

// --- Usage ---
// Each request is built step-by-step. Only the relevant parts are set.

console.log("=== Simple GET ===");
const getRequest = new HttpRequestBuilder("https://api.example.com/users")
  .addQueryParam("page", "1")
  .addQueryParam("limit", "10")
  .addHeader("Authorization", "Bearer token123")
  .build();
getRequest.display();

console.log("\n=== POST with body ===");
const postRequest = new HttpRequestBuilder("https://api.example.com/users")
  .setMethod("POST")
  .addHeader("Authorization", "Bearer token123")
  .setBody({ name: "Alice", email: "alice@example.com" })
  .setTimeout(10000)
  .build();
postRequest.display();
