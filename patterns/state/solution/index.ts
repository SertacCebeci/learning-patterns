// State Pattern
// Each state is its own class. The context delegates behavior to the
// current state object. State transitions swap the state object,
// eliminating conditionals.

// Example: a document workflow — Draft → Review → Published,
// where each state changes what actions are allowed.

// --- State interface ---

interface DocumentState {
  edit(doc: DocumentContext, content: string): void;
  submit(doc: DocumentContext): void;
  approve(doc: DocumentContext): void;
  reject(doc: DocumentContext): void;
  publish(doc: DocumentContext): void;
  getName(): string;
}

// --- Context ---

class DocumentContext {
  private state: DocumentState;
  public content: string;
  public title: string;

  constructor(title: string) {
    this.title = title;
    this.content = "";
    this.state = new DraftState();
    console.log(`  "${this.title}" created in ${this.state.getName()} state.`);
  }

  setState(state: DocumentState): void {
    console.log(`  "${this.title}" transitioned: ${this.state.getName()} → ${state.getName()}`);
    this.state = state;
  }

  // Delegates to current state
  edit(content: string): void { this.state.edit(this, content); }
  submit(): void { this.state.submit(this); }
  approve(): void { this.state.approve(this); }
  reject(): void { this.state.reject(this); }
  publish(): void { this.state.publish(this); }

  display(): void {
    console.log(`  [${this.state.getName()}] "${this.title}": ${this.content || "(empty)"}`);
  }
}

// --- Concrete states ---

class DraftState implements DocumentState {
  getName(): string { return "Draft"; }

  edit(doc: DocumentContext, content: string): void {
    doc.content = content;
    console.log(`  Edited draft: "${content}"`);
  }

  submit(doc: DocumentContext): void {
    if (!doc.content) {
      console.log("  Cannot submit — document is empty.");
      return;
    }
    doc.setState(new ReviewState());
  }

  approve(): void {
    console.log("  Cannot approve — document is still a draft. Submit first.");
  }

  reject(): void {
    console.log("  Cannot reject — document is still a draft.");
  }

  publish(): void {
    console.log("  Cannot publish — document must be approved first.");
  }
}

class ReviewState implements DocumentState {
  getName(): string { return "Review"; }

  edit(): void {
    console.log("  Cannot edit — document is under review.");
  }

  submit(): void {
    console.log("  Already submitted for review.");
  }

  approve(doc: DocumentContext): void {
    console.log("  Document approved!");
    doc.setState(new ApprovedState());
  }

  reject(doc: DocumentContext): void {
    console.log("  Document rejected — returning to draft.");
    doc.setState(new DraftState());
  }

  publish(): void {
    console.log("  Cannot publish — document must be approved first.");
  }
}

class ApprovedState implements DocumentState {
  getName(): string { return "Approved"; }

  edit(): void {
    console.log("  Cannot edit — document is approved. Create a new revision.");
  }

  submit(): void {
    console.log("  Already approved — no need to submit.");
  }

  approve(): void {
    console.log("  Already approved.");
  }

  reject(doc: DocumentContext): void {
    console.log("  Approval revoked — returning to draft.");
    doc.setState(new DraftState());
  }

  publish(doc: DocumentContext): void {
    console.log("  Document published!");
    doc.setState(new PublishedState());
  }
}

class PublishedState implements DocumentState {
  getName(): string { return "Published"; }

  edit(): void {
    console.log("  Cannot edit — document is published.");
  }

  submit(): void {
    console.log("  Cannot submit — document is already published.");
  }

  approve(): void {
    console.log("  Cannot approve — document is already published.");
  }

  reject(): void {
    console.log("  Cannot reject — document is already published.");
  }

  publish(): void {
    console.log("  Already published.");
  }
}

// --- Usage ---
// Same method calls, completely different behavior depending on state.

const doc = new DocumentContext("Design Patterns Guide");

console.log("\n=== Try invalid actions in Draft ===");
doc.approve();
doc.publish();
doc.submit(); // empty doc

console.log("\n=== Edit and submit ===");
doc.edit("An introduction to design patterns...");
doc.display();
doc.submit();

console.log("\n=== Try editing during review ===");
doc.edit("Trying to sneak in changes...");

console.log("\n=== Reject back to draft ===");
doc.reject();
doc.edit("Revised introduction to design patterns...");
doc.submit();

console.log("\n=== Approve and publish ===");
doc.approve();
doc.display();
doc.publish();
doc.display();

console.log("\n=== Try everything on published doc ===");
doc.edit("New content");
doc.submit();
doc.approve();
doc.reject();
doc.publish();
