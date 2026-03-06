// Singleton Pattern
// Ensures a class has only one instance and provides a global point of access to it.

class Singleton {
  private static instance: Singleton;

  private constructor(private value: string) {}

  static getInstance(value: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(value);
    }
    return Singleton.instance;
  }

  getValue(): string {
    return this.value;
  }
}

// Usage
const a = Singleton.getInstance("first");
const b = Singleton.getInstance("second");

console.log(a.getValue()); // "first"
console.log(b.getValue()); // "first"
console.log(a === b);      // true
