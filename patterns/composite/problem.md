# Organization Chart Calculator

## Background

You are building an HR tool that models a company's organizational structure. The tool needs to calculate total salary costs and display the hierarchy.

## The Challenge

A company has two types of entities:

- **Individual employees** — they have a name, title, and salary
- **Departments** — they have a name and contain either individual employees or sub-departments (or both)

For example:
```
Engineering (Department)
  ├── Alice — CTO — $200,000
  ├── Backend Team (Department)
  │   ├── Bob — Senior Dev — $150,000
  │   └── Carol — Junior Dev — $90,000
  └── Frontend Team (Department)
      ├── Dave — Senior Dev — $145,000
      └── Eve — Intern — $50,000
```

## Requirements

1. Both employees and departments should share a common interface with these methods:
   - `getTotalSalary(): number` — returns the total salary (for an employee, their own salary; for a department, the sum of all salaries within it, including nested sub-departments)
   - `display(indent?: string): void` — prints the entity with proper indentation showing the hierarchy
   - `getHeadcount(): number` — returns the number of employees (1 for an individual, recursive count for departments)

2. Departments should have an `add(entity)` method to add employees or sub-departments

3. Client code should be able to call `getTotalSalary()`, `display()`, or `getHeadcount()` on any entity without knowing whether it is an individual employee or an entire department

4. Build the example org chart above and print:
   - The full hierarchy
   - The total salary cost for the entire Engineering department
   - The headcount of the Engineering department

## Constraints

- Employees and departments must implement the same interface
- The solution must handle arbitrary nesting depth
- Client code must not need type checks to distinguish between employees and departments
