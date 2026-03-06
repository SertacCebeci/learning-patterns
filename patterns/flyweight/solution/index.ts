// Flyweight Pattern
// Minimizes memory by sharing common state (intrinsic) across many objects
// instead of duplicating it. Unique state (extrinsic) is kept per instance.

// --- Flyweight (shared state) ---
// One instance per unique style combination. Holds the heavy, repeated data.

class CharacterStyle {
  constructor(
    public readonly fontFamily: string,
    public readonly fontSize: number,
    public readonly color: string,
  ) {}

  render(row: number, col: number, char: string): string {
    return `[${this.fontFamily} ${this.fontSize}px ${this.color}] '${char}' at (${row}, ${col})`;
  }
}

// --- Flyweight Factory ---
// Ensures only one CharacterStyle exists per unique combination.

class CharacterStyleFactory {
  private styles = new Map<string, CharacterStyle>();

  getStyle(
    fontFamily: string,
    fontSize: number,
    color: string,
  ): CharacterStyle {
    const key = `${fontFamily}_${fontSize}_${color}`;

    if (!this.styles.has(key)) {
      this.styles.set(key, new CharacterStyle(fontFamily, fontSize, color));
      console.log(
        `  [Factory] Created new style: ${fontFamily} ${fontSize}px ${color}`,
      );
    }

    return this.styles.get(key)!;
  }

  get count(): number {
    return this.styles.size;
  }
}

// --- Context (unique state) ---
// Each Character has its own position and character value,
// but shares the CharacterStyle flyweight.

class Character {
  constructor(
    private row: number,
    private col: number,
    private char: string,
    private style: CharacterStyle,
  ) {}

  render(): string {
    return this.style.render(this.row, this.col, this.char);
  }
}

// --- Document ---
// Manages all characters and uses the factory to share styles.

class Document {
  private characters: Character[] = [];
  private factory = new CharacterStyleFactory();

  addCharacter(
    row: number,
    col: number,
    char: string,
    fontFamily: string,
    fontSize: number,
    color: string,
  ): void {
    const style = this.factory.getStyle(fontFamily, fontSize, color);
    this.characters.push(new Character(row, col, char, style));
  }

  render(): void {
    for (const character of this.characters) {
      console.log(`  ${character.render()}`);
    }
  }

  get stats(): { charCount: number; styleCount: number } {
    return {
      charCount: this.characters.length,
      styleCount: this.factory.count,
    };
  }
}

// --- Usage ---
// 20+ characters using only 3 unique styles.

const doc = new Document();

console.log('=== Building document ===');

// Body text: Arial 12px black
const bodyText = 'Hello, World!';
for (let i = 0; i < bodyText.length; i++) {
  doc.addCharacter(0, i, bodyText[i], 'Arial', 12, 'black');
}

// Heading: Arial 16px black
const heading = 'Title';
for (let i = 0; i < heading.length; i++) {
  doc.addCharacter(1, i, heading[i], 'Arial', 16, 'black');
}

// Link text: Arial 12px blue
const linkText = 'Click here';
for (let i = 0; i < linkText.length; i++) {
  doc.addCharacter(2, i, linkText[i], 'Arial', 12, 'blue');
}

console.log('\n=== Rendering document ===');
doc.render();

const { charCount, styleCount } = doc.stats;
console.log(`\n=== Memory savings ===`);
console.log(`  Characters rendered: ${charCount}`);
console.log(`  CharacterStyle objects in memory: ${styleCount}`);
console.log(`  Without flyweight: ${charCount} full style objects`);
console.log(
  `  With flyweight: ${styleCount} shared styles + ${charCount} lightweight wrappers`,
);
