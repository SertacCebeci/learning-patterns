// Composite Pattern
// Composes objects into tree structures and lets clients treat
// individual objects and compositions uniformly through a shared interface.

// --- Component interface ---

interface FileSystemNode {
  name: string;
  getSize(): number;
  print(indent?: string): void;
}

// --- Leaf ---

class File implements FileSystemNode {
  constructor(
    public name: string,
    private size: number,
  ) {}

  getSize(): number {
    return this.size;
  }

  print(indent = ""): void {
    console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
  }
}

// --- Composite ---

class Folder implements FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(public name: string) {}

  add(node: FileSystemNode): void {
    this.children.push(node);
  }

  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  print(indent = ""): void {
    console.log(`${indent}📁 ${this.name} (${this.getSize()} KB)`);
    for (const child of this.children) {
      child.print(indent + "  ");
    }
  }
}

// --- Usage ---
// Client code calls getSize() and print() on any node without
// caring whether it's a file or a folder.

const src = new Folder("src");
src.add(new File("index.ts", 4));
src.add(new File("app.ts", 8));

const components = new Folder("components");
components.add(new File("Header.tsx", 3));
components.add(new File("Footer.tsx", 2));

const utils = new Folder("utils");
utils.add(new File("format.ts", 1));
utils.add(new File("validate.ts", 2));

src.add(components);
src.add(utils);

const root = new Folder("project");
root.add(src);
root.add(new File("package.json", 1));
root.add(new File("tsconfig.json", 1));

root.print();
console.log(`\nTotal size: ${root.getSize()} KB`);
