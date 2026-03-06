// Bridge Pattern
// Splits a class into two separate hierarchies — abstraction and implementation —
// that can vary independently. Prevents class explosion when you have
// multiple dimensions of variation.

// Without Bridge you'd need: NormalEmail, NormalSlack, UrgentEmail, UrgentSlack...
// With Bridge: Notification × Channel — two small hierarchies instead of one big one.

// --- Implementation hierarchy (the "how") ---

interface MessageChannel {
  sendMessage(title: string, body: string): void;
}

class EmailChannel implements MessageChannel {
  constructor(private address: string) {}

  sendMessage(title: string, body: string): void {
    console.log(`  [Email → ${this.address}] ${title}: ${body}`);
  }
}

class SlackChannel implements MessageChannel {
  constructor(private webhook: string) {}

  sendMessage(title: string, body: string): void {
    console.log(`  [Slack → ${this.webhook}] ${title}: ${body}`);
  }
}

// --- Abstraction hierarchy (the "what") ---

class Notification {
  constructor(protected channel: MessageChannel) {}

  send(message: string): void {
    this.channel.sendMessage("Notice", message);
  }
}

class UrgentNotification extends Notification {
  send(message: string): void {
    this.channel.sendMessage("URGENT", message.toUpperCase());
    this.channel.sendMessage("URGENT (follow-up)", "Please respond immediately.");
  }
}

// --- Usage ---
// Mix and match any notification type with any channel.

const email = new EmailChannel("dev@company.com");
const slack = new SlackChannel("#alerts");

console.log("=== Normal via Email ===");
new Notification(email).send("Deployment completed successfully.");

console.log("\n=== Normal via Slack ===");
new Notification(slack).send("Deployment completed successfully.");

console.log("\n=== Urgent via Email ===");
new UrgentNotification(email).send("Database is down!");

console.log("\n=== Urgent via Slack ===");
new UrgentNotification(slack).send("Database is down!");
