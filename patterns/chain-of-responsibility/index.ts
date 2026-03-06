// Chain of Responsibility Pattern
// Passes a request along a chain of handlers. Each handler either
// processes the request or passes it to the next handler.

// Example: an HTTP middleware pipeline that validates, authenticates,
// rate-limits, and then handles the request.

// --- Request object ---

interface HttpRequest {
  path: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  ip: string;
}

interface HttpResponse {
  status: number;
  body: string;
}

// --- Handler interface ---

abstract class Middleware {
  private next: Middleware | null = null;

  setNext(handler: Middleware): Middleware {
    this.next = handler;
    return handler; // allows chaining: a.setNext(b).setNext(c)
  }

  handle(req: HttpRequest): HttpResponse {
    if (this.next) {
      return this.next.handle(req);
    }
    return { status: 404, body: "No handler found" };
  }
}

// --- Concrete handlers ---

class RateLimiter extends Middleware {
  private requestCounts = new Map<string, number>();
  private limit: number;

  constructor(limit: number) {
    super();
    this.limit = limit;
  }

  handle(req: HttpRequest): HttpResponse {
    const count = (this.requestCounts.get(req.ip) ?? 0) + 1;
    this.requestCounts.set(req.ip, count);

    if (count > this.limit) {
      console.log(`  [RateLimiter] BLOCKED ${req.ip} (${count}/${this.limit})`);
      return { status: 429, body: "Too many requests" };
    }

    console.log(`  [RateLimiter] OK (${count}/${this.limit})`);
    return super.handle(req);
  }
}

class AuthMiddleware extends Middleware {
  handle(req: HttpRequest): HttpResponse {
    const token = req.headers["authorization"];

    if (!token) {
      console.log("  [Auth] REJECTED — no token");
      return { status: 401, body: "Unauthorized" };
    }

    if (!token.startsWith("Bearer ")) {
      console.log("  [Auth] REJECTED — invalid token format");
      return { status: 401, body: "Invalid token" };
    }

    console.log("  [Auth] OK");
    return super.handle(req);
  }
}

class ValidationMiddleware extends Middleware {
  handle(req: HttpRequest): HttpResponse {
    if (req.method === "POST" && !req.body) {
      console.log("  [Validation] REJECTED — POST with no body");
      return { status: 400, body: "Request body required" };
    }

    console.log("  [Validation] OK");
    return super.handle(req);
  }
}

class RouteHandler extends Middleware {
  handle(req: HttpRequest): HttpResponse {
    console.log(`  [Router] Handling ${req.method} ${req.path}`);
    return { status: 200, body: `Handled ${req.method} ${req.path}` };
  }
}

// --- Build the chain ---

const rateLimiter = new RateLimiter(2);
const auth = new AuthMiddleware();
const validation = new ValidationMiddleware();
const router = new RouteHandler();

// Link: RateLimiter → Auth → Validation → Router
rateLimiter.setNext(auth).setNext(validation).setNext(router);

// --- Usage ---

function sendRequest(req: HttpRequest): void {
  console.log(`\n>>> ${req.method} ${req.path} from ${req.ip}`);
  const res = rateLimiter.handle(req);
  console.log(`<<< ${res.status}: ${res.body}`);
}

// 1. Valid request — passes through all handlers
sendRequest({
  path: "/api/users",
  method: "GET",
  headers: { authorization: "Bearer abc123" },
  ip: "192.168.1.1",
});

// 2. No auth token — stopped at AuthMiddleware
sendRequest({
  path: "/api/users",
  method: "GET",
  headers: {},
  ip: "192.168.1.2",
});

// 3. POST with no body — stopped at ValidationMiddleware
sendRequest({
  path: "/api/users",
  method: "POST",
  headers: { authorization: "Bearer abc123" },
  ip: "192.168.1.3",
});

// 4-5. Rate limiting — third request from same IP gets blocked
sendRequest({
  path: "/api/users",
  method: "GET",
  headers: { authorization: "Bearer abc123" },
  ip: "192.168.1.1",
});

sendRequest({
  path: "/api/users",
  method: "GET",
  headers: { authorization: "Bearer abc123" },
  ip: "192.168.1.1",
});
