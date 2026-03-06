// Simple Factory Pattern
// A factory function encapsulates object creation so the caller
// doesn't need to know about concrete classes.

// --- Common interface ---

interface Notifier {
  send(to: string, message: string): void;
}

// --- Concrete implementations ---

class EmailNotifier implements Notifier {
  send(to: string, message: string): void {
    console.log(`[EMAIL] To: ${to} | Subject: Notification | Body: ${message}`);
  }
}

class SmsNotifier implements Notifier {
  send(to: string, message: string): void {
    console.log(`[SMS] To: ${to} | Message: ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(to: string, message: string): void {
    console.log(`[PUSH] To device: ${to} | Alert: ${message}`);
  }
}

// --- The Factory ---

type Channel = "email" | "sms" | "push";

function createNotifier(channel: Channel): Notifier {
  switch (channel) {
    case "email":
      return new EmailNotifier();
    case "sms":
      return new SmsNotifier();
    case "push":
      return new PushNotifier();
  }
}

// --- Usage ---
// The caller only depends on the Notifier interface and the factory.
// It never imports or instantiates concrete classes directly.

const channels: Channel[] = ["email", "sms", "push"];

for (const channel of channels) {
  const notifier = createNotifier(channel);
  notifier.send("alice", "Your order has shipped!");
}
