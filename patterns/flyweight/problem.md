# Text Editor Character Rendering

## Background

You are building a text editor that renders thousands of characters on screen. Each character needs to store its font family, font size, color (the shared visual style), as well as its unique position (row and column) in the document.

## The Challenge

A document might contain 100,000 characters, but most of them share the same formatting. For example, a typical document might use only 5-10 unique style combinations:

- "Arial", 12, "black" (body text)
- "Arial", 12, "blue" (links)
- "Arial", 16, "black" (headings)
- "Courier", 12, "gray" (code)

Storing the full font family, size, and color on every single character object wastes enormous amounts of memory when the same formatting is repeated tens of thousands of times.

## Requirements

1. Create a `CharacterStyle` class that holds the shared state: `fontFamily`, `fontSize`, and `color`. It should have a `render(row: number, col: number, char: string): string` method that returns a string like `"[Arial 12px black] 'H' at (0, 0)"`

2. Create a `CharacterStyleFactory` class that:
   - Caches and reuses `CharacterStyle` instances
   - Returns an existing instance if one with the same font family, size, and color already exists
   - Has a `count` property that returns the number of unique styles created

3. Create a `Character` class that holds the unique state: `row`, `col`, and the character value (`char`), plus a reference to its shared `CharacterStyle`

4. Create a `Document` class that:
   - Has an `addCharacter(row, col, char, fontFamily, fontSize, color)` method
   - Has a `render()` method that renders all characters
   - Has a `stats` property returning `{ charCount: number; styleCount: number }`

5. Demonstrate with a document containing at least 20 characters using only 3 unique styles, and print the memory savings stats

## Constraints

- Each unique combination of (fontFamily, fontSize, color) should produce exactly one `CharacterStyle` object, no matter how many characters use it
- The `Character` class should NOT store fontFamily, fontSize, or color directly
- The factory must be the only way to obtain `CharacterStyle` instances
