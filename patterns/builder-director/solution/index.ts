// Builder Pattern with Director
// The Director encapsulates common construction sequences so they can be
// reused across the program. The client doesn't call builder steps directly --
// it picks a recipe from the Director.

// --- The product ---

class Computer {
  parts: string[] = [];

  display(): void {
    console.log('Computer: ' + this.parts.join(', '));
  }
}

// --- Builder interface ---

interface ComputerBuilder {
  addCPU(): void;
  addRAM(): void;
  addStorage(): void;
  addGPU(): void;
  addCooling(): void;
  getResult(): Computer;
}

// --- Concrete builders ---

class GamingPCBuilder implements ComputerBuilder {
  private computer = new Computer();

  addCPU(): void {
    this.computer.parts.push('Intel i9');
  }
  addRAM(): void {
    this.computer.parts.push('32GB DDR5');
  }
  addStorage(): void {
    this.computer.parts.push('2TB NVMe SSD');
  }
  addGPU(): void {
    this.computer.parts.push('RTX 4090');
  }
  addCooling(): void {
    this.computer.parts.push('Liquid Cooling');
  }
  getResult(): Computer {
    const result = this.computer;
    this.computer = new Computer();
    return result;
  }
}

class OfficePCBuilder implements ComputerBuilder {
  private computer = new Computer();

  addCPU(): void {
    this.computer.parts.push('Intel i5');
  }
  addRAM(): void {
    this.computer.parts.push('16GB DDR4');
  }
  addStorage(): void {
    this.computer.parts.push('512GB SSD');
  }
  addGPU(): void {
    this.computer.parts.push('Integrated Graphics');
  }
  addCooling(): void {
    this.computer.parts.push('Stock Fan');
  }
  getResult(): Computer {
    const result = this.computer;
    this.computer = new Computer();
    return result;
  }
}

// --- The Director ---
// Knows HOW to build common PC configurations.
// Works with ANY builder through the interface.

class ComputerDirector {
  private builder: ComputerBuilder;

  constructor(builder: ComputerBuilder) {
    this.builder = builder;
  }

  setBuilder(builder: ComputerBuilder): void {
    this.builder = builder;
  }

  // Basic PC -- CPU + RAM + Storage (no GPU, no extra cooling)
  buildBasicPC(): Computer {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addStorage();
    return this.builder.getResult();
  }

  // Full PC -- all components
  buildFullPC(): Computer {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addStorage();
    this.builder.addGPU();
    this.builder.addCooling();
    return this.builder.getResult();
  }

  // Workstation -- CPU + RAM + Storage + Cooling (no dedicated GPU)
  buildWorkstation(): Computer {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addStorage();
    this.builder.addCooling();
    return this.builder.getResult();
  }
}

// --- Usage ---
// The client picks a builder (what tier of parts) and a director recipe
// (what combination). Same recipes work across all builders.

const gamingBuilder = new GamingPCBuilder();
const officeBuilder = new OfficePCBuilder();
const director = new ComputerDirector(gamingBuilder);

console.log('=== Gaming Full PC ===');
director.buildFullPC().display();

console.log('\n=== Gaming Basic PC ===');
director.buildBasicPC().display();

console.log('\n=== Office Basic PC ===');
director.setBuilder(officeBuilder);
director.buildBasicPC().display();

console.log('\n=== Office Workstation ===');
director.buildWorkstation().display();

console.log('\n=== Gaming Workstation ===');
director.setBuilder(gamingBuilder);
director.buildWorkstation().display();
