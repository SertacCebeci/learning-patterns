// Abstract Factory Pattern
// Provides an interface for creating families of related objects
// without specifying their concrete classes.

// --- Abstract products ---

interface Button {
  render(): void;
}

interface Input {
  render(): void;
}

// --- Abstract factory ---

interface UIFactory {
  createButton(label: string): Button;
  createInput(placeholder: string): Input;
}

// --- Web family ---

class WebButton implements Button {
  constructor(private label: string) {}
  render(): void {
    console.log(`<button class="btn">${this.label}</button>`);
  }
}

class WebInput implements Input {
  constructor(private placeholder: string) {}
  render(): void {
    console.log(`<input type="text" placeholder="${this.placeholder}" />`);
  }
}

class WebUIFactory implements UIFactory {
  createButton(label: string): Button {
    return new WebButton(label);
  }
  createInput(placeholder: string): Input {
    return new WebInput(placeholder);
  }
}

// --- Mobile family ---

class MobileButton implements Button {
  constructor(private label: string) {}
  render(): void {
    console.log(`[TouchableOpacity] ${this.label}`);
  }
}

class MobileInput implements Input {
  constructor(private placeholder: string) {}
  render(): void {
    console.log(`[TextInput] placeholder="${this.placeholder}"`);
  }
}

class MobileUIFactory implements UIFactory {
  createButton(label: string): Button {
    return new MobileButton(label);
  }
  createInput(placeholder: string): Input {
    return new MobileInput(placeholder);
  }
}

// --- Application code ---
// Works entirely through the UIFactory interface.
// Swapping the factory switches the entire component family at once.

function renderLoginForm(factory: UIFactory): void {
  const usernameInput = factory.createInput("Enter username");
  const passwordInput = factory.createInput("Enter password");
  const submitButton = factory.createButton("Log In");

  usernameInput.render();
  passwordInput.render();
  submitButton.render();
}

console.log("=== Web ===");
renderLoginForm(new WebUIFactory());

console.log("\n=== Mobile ===");
renderLoginForm(new MobileUIFactory());
