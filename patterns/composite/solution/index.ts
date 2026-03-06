// Composite Pattern
// Composes objects into tree structures and lets clients treat
// individual objects and compositions uniformly through a shared interface.

// --- Component interface ---

interface OrgEntity {
  getTotalSalary(): number;
  display(indent?: string): void;
  getHeadcount(): number;
}

// --- Leaf ---

class Employee implements OrgEntity {
  constructor(
    private name: string,
    private title: string,
    private salary: number,
  ) {}

  getTotalSalary(): number {
    return this.salary;
  }

  display(indent = ""): void {
    console.log(`${indent}${this.name} -- ${this.title} -- $${this.salary.toLocaleString()}`);
  }

  getHeadcount(): number {
    return 1;
  }
}

// --- Composite ---

class Department implements OrgEntity {
  private members: OrgEntity[] = [];

  constructor(private name: string) {}

  add(entity: OrgEntity): void {
    this.members.push(entity);
  }

  getTotalSalary(): number {
    return this.members.reduce((sum, member) => sum + member.getTotalSalary(), 0);
  }

  display(indent = ""): void {
    console.log(`${indent}${this.name} (Department)`);
    for (const member of this.members) {
      member.display(indent + "  ");
    }
  }

  getHeadcount(): number {
    return this.members.reduce((count, member) => count + member.getHeadcount(), 0);
  }
}

// --- Usage ---
// Client code calls getTotalSalary(), display(), or getHeadcount() on any
// entity without knowing whether it is an employee or a department.

const backend = new Department("Backend Team");
backend.add(new Employee("Bob", "Senior Dev", 150000));
backend.add(new Employee("Carol", "Junior Dev", 90000));

const frontend = new Department("Frontend Team");
frontend.add(new Employee("Dave", "Senior Dev", 145000));
frontend.add(new Employee("Eve", "Intern", 50000));

const engineering = new Department("Engineering");
engineering.add(new Employee("Alice", "CTO", 200000));
engineering.add(backend);
engineering.add(frontend);

console.log("=== Organization Chart ===");
engineering.display();

console.log(`\nTotal salary cost: $${engineering.getTotalSalary().toLocaleString()}`);
console.log(`Headcount: ${engineering.getHeadcount()}`);
