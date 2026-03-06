# Problem: Document Template System

You are building a document management system where users create documents from pre-configured templates. Setting up a template from scratch is expensive because it involves loading styles, headers, footers, and default content. Once a template exists, users should be able to quickly create copies and customize them.

## Requirements

1. Create a `Document` class with the following fields:
   - `title: string`
   - `content: string`
   - `styles: string[]` (e.g., `["font: Arial", "size: 12pt", "margin: 1in"]`)
   - `metadata: Record<string, string>` (e.g., `{ author: "System", createdAt: "2025-01-01" }`)

2. Implement a `clone(): Document` method that returns a deep copy of the document. Modifying the clone's `styles` array or `metadata` object must not affect the original.

3. Create two base template prototypes:
   - `reportTemplate`: title "Untitled Report", empty content, styles `["font: Times New Roman", "size: 11pt", "margin: 1.5in"]`, metadata `{ type: "report", department: "General" }`.
   - `memoTemplate`: title "Untitled Memo", empty content, styles `["font: Helvetica", "size: 10pt", "margin: 0.75in"]`, metadata `{ type: "memo", priority: "normal" }`.

4. Demonstrate cloning each template, customizing the clones (changing title, adding content, modifying metadata), and showing that the originals remain unchanged.

## Example Usage

```ts
const myReport = reportTemplate.clone();
myReport.title = "Q4 Sales Report";
myReport.content = "Revenue exceeded expectations...";
myReport.metadata.department = "Sales";

reportTemplate.display(); // Still shows "Untitled Report", department "General"
myReport.display();       // Shows "Q4 Sales Report", department "Sales"
```

## Acceptance Criteria

- Cloning produces an independent copy -- changes to clones do not affect prototypes.
- Deep copy is correctly implemented for arrays and nested objects.
- The `clone()` method preserves the prototype chain (instanceof checks still pass).
