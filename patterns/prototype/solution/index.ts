// Prototype Pattern
// Creates new objects by cloning an existing instance (the prototype)
// instead of constructing from scratch. Useful when object setup is
// expensive or when you want copies that can diverge independently.

// Example: a document template system where templates are cloned
// to create new documents. Clones are fully independent — modifying
// a clone's styles or metadata does not affect the original.

// --- Prototype interface ---

interface Cloneable {
  clone(): this;
}

// --- Concrete prototype: Document ---

class Document implements Cloneable {
  constructor(
    public title: string,
    public content: string,
    public styles: string[],
    public metadata: Record<string, string>,
  ) {}

  clone(): this {
    // Deep copy: styles array and metadata object must not be shared
    const cloned = Object.create(Object.getPrototypeOf(this));
    Object.assign(cloned, this);
    cloned.styles = [...this.styles];
    cloned.metadata = { ...this.metadata };
    return cloned;
  }

  display(): void {
    console.log(`  Title: ${this.title}`);
    console.log(`  Content: ${this.content || '(empty)'}`);
    console.log(`  Styles: [${this.styles.join(', ')}]`);
    console.log(`  Metadata: ${JSON.stringify(this.metadata)}`);
  }
}

// --- Base template prototypes ---
// Configured once, then cloned whenever a new document is needed.

const reportTemplate = new Document(
  'Untitled Report',
  '',
  ['font: Times New Roman', 'size: 11pt', 'margin: 1.5in'],
  { type: 'report', department: 'General' },
);

const memoTemplate = new Document(
  'Untitled Memo',
  '',
  ['font: Helvetica', 'size: 10pt', 'margin: 0.75in'],
  { type: 'memo', priority: 'normal' },
);

// --- Usage ---
// Clone templates and customize. Originals stay untouched.

console.log('=== Clone and customize a report ===');
const salesReport = reportTemplate.clone();
salesReport.title = 'Q4 Sales Report';
salesReport.content = 'Revenue exceeded expectations...';
salesReport.metadata.department = 'Sales';
salesReport.styles.push('color: navy');
salesReport.display();

console.log('\n=== Clone and customize a memo ===');
const urgentMemo = memoTemplate.clone();
urgentMemo.title = 'Server Maintenance Notice';
urgentMemo.content = 'All servers will be down for maintenance on Saturday.';
urgentMemo.metadata.priority = 'high';
urgentMemo.metadata.author = 'IT Department';
urgentMemo.display();

console.log('\n=== Original templates unchanged ===');
console.log('Report template:');
reportTemplate.display();
console.log('\nMemo template:');
memoTemplate.display();

// Verify deep copy: clone modifications did not leak to prototypes
console.log('\n=== Independence check ===');
console.log(
  `  Report template styles count: ${reportTemplate.styles.length} (should be 3)`,
);
console.log(
  `  Sales report styles count: ${salesReport.styles.length} (should be 4)`,
);
console.log(
  `  Memo template has "author" key: ${'author' in memoTemplate.metadata} (should be false)`,
);
console.log(
  `  Urgent memo has "author" key: ${'author' in urgentMemo.metadata} (should be true)`,
);
console.log(
  `  salesReport instanceof Document: ${salesReport instanceof Document} (should be true)`,
);
