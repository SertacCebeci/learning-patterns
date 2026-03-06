# Learning Design Patterns with TypeScript

A hands-on repository for learning Gang of Four design patterns through problem-solving exercises with TypeScript.

## How It Works

Each pattern follows a **problem → solution → answer** structure:

```
pattern-name/
├── problem.md          # Requirements and acceptance criteria
├── solution/
│   ├── index.ts        # Working reference implementation
│   └── document.md     # Pattern explanation
├── answer/
│   ├── index.ts        # Your implementation (empty template)
│   └── document.md     # Your explanation (empty template)
└── resource.md         # External learning resource
```

1. Read `problem.md` to understand requirements
2. Try implementing in `answer/index.ts`
3. Compare with `solution/index.ts`
4. Study `solution/document.md` for deeper understanding

## Patterns

### Creational

| Pattern | Description |
|---------|-------------|
| [Simple Factory](patterns/simple-factory/) | Creates objects without exposing creation logic |
| [Abstract Factory](patterns/abstract-factory/) | Creates families of related objects |
| [Builder](patterns/builder/) | Constructs complex objects step by step |
| [Builder Director](patterns/builder-director/) | Uses a director to encapsulate construction recipes |
| [Prototype](patterns/prototype/) | Clones existing objects |
| [Prototype Registry](patterns/prototype-registry/) | Manages a registry of clonable prototypes |
| [Singleton](patterns/singleton/) | Ensures a class has only one instance |

### Structural

| Pattern | Description |
|---------|-------------|
| [Adapter](patterns/adapter/) | Makes incompatible interfaces work together |
| [Bridge](patterns/bridge/) | Separates abstraction from implementation |
| [Composite](patterns/composite/) | Composes objects into tree structures |
| [Decorator](patterns/decorator/) | Adds behavior to objects dynamically |
| [Facade](patterns/facade/) | Provides a simplified interface to a complex subsystem |
| [Flyweight](patterns/flyweight/) | Shares common state between multiple objects |
| [Proxy](patterns/proxy/) | Controls access to another object |

### Behavioral

| Pattern | Description |
|---------|-------------|
| [Chain of Responsibility](patterns/chain-of-responsibility/) | Passes requests along a chain of handlers |
| [Command](patterns/command/) | Encapsulates requests as objects |
| [Iterator](patterns/iterator/) | Traverses collections without exposing internals |
| [Mediator](patterns/mediator/) | Reduces coupling by centralizing communication |
| [Memento](patterns/memento/) | Captures and restores object state |
| [Observer](patterns/observer/) | Notifies dependents of state changes |
| [State](patterns/state/) | Alters behavior when internal state changes |
| [Strategy](patterns/strategy/) | Defines interchangeable algorithms |
| [Template Method](patterns/template-method/) | Defines algorithm skeleton, deferring steps to subclasses |
| [Visitor](patterns/visitor/) | Adds operations to objects without modifying them |

## Getting Started

```bash
npm install
```

Run any solution:

```bash
npx ts-node patterns/observer/solution/index.ts
```

## Tech Stack

- TypeScript 5.9
- ts-node
- Node.js
