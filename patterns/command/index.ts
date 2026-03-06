// Command Pattern
// Turns requests into stand-alone objects, enabling undo/redo,
// queueing, and decoupling the invoker from the receiver.

// Example: a text editor with undoable operations.

// --- Receiver (the object that does the actual work) ---

class TextDocument {
  private content = "";

  getContent(): string {
    return this.content;
  }

  insert(position: number, text: string): void {
    this.content = this.content.slice(0, position) + text + this.content.slice(position);
  }

  delete(position: number, length: number): string {
    const deleted = this.content.slice(position, position + length);
    this.content = this.content.slice(0, position) + this.content.slice(position + length);
    return deleted;
  }
}

// --- Command interface ---

interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}

// --- Concrete commands ---

class InsertCommand implements Command {
  constructor(
    private doc: TextDocument,
    private position: number,
    private text: string,
  ) {}

  execute(): void {
    this.doc.insert(this.position, this.text);
  }

  undo(): void {
    this.doc.delete(this.position, this.text.length);
  }

  describe(): string {
    return `Insert "${this.text}" at ${this.position}`;
  }
}

class DeleteCommand implements Command {
  private deletedText = "";

  constructor(
    private doc: TextDocument,
    private position: number,
    private length: number,
  ) {}

  execute(): void {
    // Save deleted text so we can restore it on undo
    this.deletedText = this.doc.delete(this.position, this.length);
  }

  undo(): void {
    this.doc.insert(this.position, this.deletedText);
  }

  describe(): string {
    return `Delete ${this.length} chars at ${this.position}`;
  }
}

// --- Invoker (triggers commands, manages history) ---

class Editor {
  private history: Command[] = [];
  private undone: Command[] = [];

  constructor(private doc: TextDocument) {}

  run(command: Command): void {
    command.execute();
    this.history.push(command);
    this.undone = []; // clear redo stack on new action
    this.printState(command.describe());
  }

  undo(): void {
    const command = this.history.pop();
    if (!command) {
      console.log("  Nothing to undo.");
      return;
    }
    command.undo();
    this.undone.push(command);
    this.printState(`Undo: ${command.describe()}`);
  }

  redo(): void {
    const command = this.undone.pop();
    if (!command) {
      console.log("  Nothing to redo.");
      return;
    }
    command.execute();
    this.history.push(command);
    this.printState(`Redo: ${command.describe()}`);
  }

  private printState(action: string): void {
    console.log(`  ${action}`);
    console.log(`  Document: "${this.doc.getContent()}"`);
    console.log(`  History: ${this.history.length} | Redo stack: ${this.undone.length}`);
    console.log();
  }
}

// --- Usage ---

const doc = new TextDocument();
const editor = new Editor(doc);

console.log("=== Building a sentence ===");
editor.run(new InsertCommand(doc, 0, "Hello"));
editor.run(new InsertCommand(doc, 5, " World"));
editor.run(new InsertCommand(doc, 11, "!"));

console.log("=== Undo last two actions ===");
editor.undo();
editor.undo();

console.log("=== Redo one action ===");
editor.redo();

console.log("=== New action clears redo stack ===");
editor.run(new DeleteCommand(doc, 0, 5));
editor.run(new InsertCommand(doc, 0, "Goodbye"));

console.log("=== Undo everything ===");
editor.undo();
editor.undo();
editor.undo();
editor.undo();
