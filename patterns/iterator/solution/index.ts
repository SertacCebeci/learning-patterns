// Iterator Pattern
// Provides sequential access to elements of a collection without
// exposing its underlying structure. Different iterators can traverse
// the same collection in different ways.

// Example: an organization chart (tree structure) that can be traversed
// depth-first or breadth-first using different iterators.

// --- The data structure ---

class Employee {
  subordinates: Employee[] = [];

  constructor(
    public name: string,
    public role: string,
  ) {}

  addSubordinate(employee: Employee): void {
    this.subordinates.push(employee);
  }
}

// --- Iterator interface ---

interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

// --- Concrete iterators ---

class DepthFirstIterator implements Iterator<Employee> {
  private stack: Employee[];

  constructor(root: Employee) {
    this.stack = [root];
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  next(): Employee {
    const current = this.stack.pop()!;
    // Push in reverse so leftmost child is visited first
    for (let i = current.subordinates.length - 1; i >= 0; i--) {
      this.stack.push(current.subordinates[i]);
    }
    return current;
  }
}

class BreadthFirstIterator implements Iterator<Employee> {
  private queue: Employee[];

  constructor(root: Employee) {
    this.queue = [root];
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }

  next(): Employee {
    const current = this.queue.shift()!;
    for (const sub of current.subordinates) {
      this.queue.push(sub);
    }
    return current;
  }
}

// --- Iterable collection ---
// Implements Symbol.iterator so it works with for...of natively.

class OrgChart {
  constructor(private root: Employee) {}

  depthFirst(): IterableWrapper<Employee> {
    return new IterableWrapper(() => new DepthFirstIterator(this.root));
  }

  breadthFirst(): IterableWrapper<Employee> {
    return new IterableWrapper(() => new BreadthFirstIterator(this.root));
  }

  // Default iteration is depth-first
  [Symbol.iterator](): globalThis.Iterator<Employee> {
    return this.depthFirst()[Symbol.iterator]();
  }
}

// Bridges our Iterator interface to JS's Symbol.iterator protocol
class IterableWrapper<T> {
  constructor(private createIterator: () => Iterator<T>) {}

  [Symbol.iterator](): globalThis.Iterator<T> {
    const iter = this.createIterator();
    return {
      next(): IteratorResult<T> {
        if (iter.hasNext()) {
          return { value: iter.next(), done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

// --- Build an org chart ---
//
//              CEO
//           /       \
//        CTO        CFO
//       /   \         \
//   Dev Lead  QA Lead  Accountant
//    /    \
//  Dev1   Dev2

const ceo = new Employee("Alice", "CEO");

const cto = new Employee("Bob", "CTO");
const cfo = new Employee("Eve", "CFO");
ceo.addSubordinate(cto);
ceo.addSubordinate(cfo);

const devLead = new Employee("Charlie", "Dev Lead");
const qaLead = new Employee("Diana", "QA Lead");
cto.addSubordinate(devLead);
cto.addSubordinate(qaLead);

const dev1 = new Employee("Frank", "Developer");
const dev2 = new Employee("Grace", "Developer");
devLead.addSubordinate(dev1);
devLead.addSubordinate(dev2);

const accountant = new Employee("Hank", "Accountant");
cfo.addSubordinate(accountant);

const org = new OrgChart(ceo);

// --- Usage ---
// Same for...of syntax, different traversal order.

console.log("=== Depth-First (dive deep, then backtrack) ===");
for (const emp of org.depthFirst()) {
  console.log(`  ${emp.role}: ${emp.name}`);
}

console.log("\n=== Breadth-First (level by level) ===");
for (const emp of org.breadthFirst()) {
  console.log(`  ${emp.role}: ${emp.name}`);
}

console.log("\n=== Default iteration (for...of on OrgChart) ===");
for (const emp of org) {
  console.log(`  ${emp.name}`);
}
