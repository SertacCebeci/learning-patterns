// Observer Pattern
// Defines a one-to-many dependency: when the subject changes state,
// all subscribed observers are notified automatically.

// Example: a stock market ticker where different displays react
// to price changes independently.

// --- Observer interface ---

interface PriceObserver {
  update(symbol: string, price: number): void;
}

// --- Subject ---

class StockTicker {
  private observers = new Map<string, Set<PriceObserver>>();
  private prices = new Map<string, number>();

  subscribe(symbol: string, observer: PriceObserver): void {
    if (!this.observers.has(symbol)) {
      this.observers.set(symbol, new Set());
    }
    this.observers.get(symbol)!.add(observer);
  }

  unsubscribe(symbol: string, observer: PriceObserver): void {
    this.observers.get(symbol)?.delete(observer);
  }

  setPrice(symbol: string, price: number): void {
    const oldPrice = this.prices.get(symbol);
    this.prices.set(symbol, price);

    if (oldPrice !== price) {
      this.notify(symbol, price);
    }
  }

  private notify(symbol: string, price: number): void {
    const subs = this.observers.get(symbol);
    if (subs) {
      for (const observer of subs) {
        observer.update(symbol, price);
      }
    }
  }
}

// --- Concrete observers ---
// Each reacts to the same price update in its own way.

class PriceDisplay implements PriceObserver {
  constructor(private name: string) {}

  update(symbol: string, price: number): void {
    console.log(`  [${this.name}] ${symbol}: $${price.toFixed(2)}`);
  }
}

class PriceAlert implements PriceObserver {
  constructor(
    private symbol: string,
    private threshold: number,
    private direction: "above" | "below",
  ) {}

  update(symbol: string, price: number): void {
    if (symbol !== this.symbol) return;

    if (this.direction === "above" && price > this.threshold) {
      console.log(`  [ALERT] ${symbol} is ABOVE $${this.threshold}! Current: $${price.toFixed(2)}`);
    }
    if (this.direction === "below" && price < this.threshold) {
      console.log(`  [ALERT] ${symbol} is BELOW $${this.threshold}! Current: $${price.toFixed(2)}`);
    }
  }
}

class TradeLogger implements PriceObserver {
  private history: { symbol: string; price: number; time: string }[] = [];

  update(symbol: string, price: number): void {
    this.history.push({
      symbol,
      price,
      time: new Date().toLocaleTimeString(),
    });
  }

  printLog(): void {
    console.log("  [Trade Log]");
    for (const entry of this.history) {
      console.log(`    ${entry.time} | ${entry.symbol}: $${entry.price.toFixed(2)}`);
    }
  }
}

// --- Usage ---

const ticker = new StockTicker();

const mainDisplay = new PriceDisplay("Main Screen");
const mobileDisplay = new PriceDisplay("Mobile App");
const alert = new PriceAlert("AAPL", 180, "above");
const logger = new TradeLogger();

// Subscribe observers to different stocks
ticker.subscribe("AAPL", mainDisplay);
ticker.subscribe("AAPL", mobileDisplay);
ticker.subscribe("AAPL", alert);
ticker.subscribe("AAPL", logger);
ticker.subscribe("GOOG", mainDisplay);
ticker.subscribe("GOOG", logger);

console.log("=== Price updates ===");
ticker.setPrice("AAPL", 175.50);
console.log();
ticker.setPrice("GOOG", 141.20);
console.log();
ticker.setPrice("AAPL", 182.30); // triggers alert
console.log();

console.log("=== Mobile unsubscribes ===");
ticker.unsubscribe("AAPL", mobileDisplay);
ticker.setPrice("AAPL", 178.90);
console.log();

console.log("=== Trade log (collected silently) ===");
logger.printLog();
