// Visitor Pattern
// Adds new operations to an object structure without modifying the objects.
// Each element accepts a visitor; the visitor holds the operation logic.

// Example: a document made of different element types. Visitors perform
// different operations (export to HTML, export to Markdown, word count)
// without touching the element classes.

// --- Visitor interface ---

interface DocumentVisitor {
  visitHeading(el: Heading): void;
  visitParagraph(el: Paragraph): void;
  visitCodeBlock(el: CodeBlock): void;
  visitImage(el: Image): void;
}

// --- Element interface ---

interface DocumentElement {
  accept(visitor: DocumentVisitor): void;
}

// --- Concrete elements ---
// Each element only knows how to accept a visitor — no export logic here.

class Heading implements DocumentElement {
  constructor(
    public text: string,
    public level: number,
  ) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitHeading(this);
  }
}

class Paragraph implements DocumentElement {
  constructor(public text: string) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitParagraph(this);
  }
}

class CodeBlock implements DocumentElement {
  constructor(
    public code: string,
    public language: string,
  ) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitCodeBlock(this);
  }
}

class Image implements DocumentElement {
  constructor(
    public src: string,
    public alt: string,
  ) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitImage(this);
  }
}

// --- Concrete visitors ---
// Each visitor is a new operation across ALL element types.

class HtmlExporter implements DocumentVisitor {
  private output: string[] = [];

  visitHeading(el: Heading): void {
    this.output.push(`<h${el.level}>${el.text}</h${el.level}>`);
  }

  visitParagraph(el: Paragraph): void {
    this.output.push(`<p>${el.text}</p>`);
  }

  visitCodeBlock(el: CodeBlock): void {
    this.output.push(`<pre><code class="${el.language}">${el.code}</code></pre>`);
  }

  visitImage(el: Image): void {
    this.output.push(`<img src="${el.src}" alt="${el.alt}" />`);
  }

  getResult(): string {
    return this.output.join("\n");
  }
}

class MarkdownExporter implements DocumentVisitor {
  private output: string[] = [];

  visitHeading(el: Heading): void {
    this.output.push(`${"#".repeat(el.level)} ${el.text}`);
  }

  visitParagraph(el: Paragraph): void {
    this.output.push(el.text);
  }

  visitCodeBlock(el: CodeBlock): void {
    this.output.push(`\`\`\`${el.language}\n${el.code}\n\`\`\``);
  }

  visitImage(el: Image): void {
    this.output.push(`![${el.alt}](${el.src})`);
  }

  getResult(): string {
    return this.output.join("\n\n");
  }
}

class WordCounter implements DocumentVisitor {
  private count = 0;

  visitHeading(el: Heading): void {
    this.count += el.text.split(/\s+/).length;
  }

  visitParagraph(el: Paragraph): void {
    this.count += el.text.split(/\s+/).length;
  }

  visitCodeBlock(el: CodeBlock): void {
    // code blocks don't count toward word count
  }

  visitImage(): void {
    // images don't count toward word count
  }

  getResult(): number {
    return this.count;
  }
}

// --- The document (object structure) ---

class Document {
  private elements: DocumentElement[] = [];

  add(element: DocumentElement): void {
    this.elements.push(element);
  }

  accept(visitor: DocumentVisitor): void {
    for (const element of this.elements) {
      element.accept(visitor);
    }
  }
}

// --- Usage ---
// Build a document once, run many different operations via visitors.

const doc = new Document();
doc.add(new Heading("Visitor Pattern", 1));
doc.add(new Paragraph("The visitor pattern separates algorithms from the objects they operate on."));
doc.add(new Heading("Example", 2));
doc.add(new CodeBlock('doc.accept(new HtmlExporter())', "typescript"));
doc.add(new Image("diagram.png", "Visitor pattern UML diagram"));
doc.add(new Paragraph("This approach makes adding new operations easy."));

console.log("=== HTML Export ===");
const html = new HtmlExporter();
doc.accept(html);
console.log(html.getResult());

console.log("\n=== Markdown Export ===");
const md = new MarkdownExporter();
doc.accept(md);
console.log(md.getResult());

console.log("\n=== Word Count ===");
const counter = new WordCounter();
doc.accept(counter);
console.log(`  ${counter.getResult()} words`);
