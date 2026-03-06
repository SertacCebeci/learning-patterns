// Chain of Responsibility Pattern
// Passes a request along a chain of handlers. Each handler either
// processes the request or passes it to the next handler.

// --- Request object ---

interface SupportTicket {
  id: number;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  message: string;
  customerTier: "basic" | "premium" | "enterprise";
}

// --- Handler base class ---

abstract class SupportHandler {
  private next: SupportHandler | null = null;

  setNext(handler: SupportHandler): SupportHandler {
    this.next = handler;
    return handler; // allows chaining: a.setNext(b).setNext(c)
  }

  handle(ticket: SupportTicket): string {
    if (this.next) {
      return this.next.handle(ticket);
    }
    // End of chain -- no handler could resolve it
    console.log(`  [No Handler] Ticket #${ticket.id} logged for manual review`);
    return `Ticket #${ticket.id} has been logged for manual review.`;
  }
}

// --- Concrete handlers ---

class FAQBot extends SupportHandler {
  handle(ticket: SupportTicket): string {
    if (ticket.category === "general" && ticket.priority === "low") {
      console.log(`  [FAQ Bot] Handled ticket #${ticket.id} -- sent automated FAQ link`);
      return `Here is an FAQ link that addresses your question: https://support.example.com/faq`;
    }

    console.log(`  [FAQ Bot] Passed ticket #${ticket.id} to next handler`);
    return super.handle(ticket);
  }
}

class JuniorAgent extends SupportHandler {
  handle(ticket: SupportTicket): string {
    if (ticket.priority === "medium") {
      console.log(`  [Junior Agent] Handled ticket #${ticket.id} -- sent template reply`);
      return `Thank you for contacting support. We've received your ${ticket.category} inquiry and a team member will follow up shortly.`;
    }

    console.log(`  [Junior Agent] Passed ticket #${ticket.id} to next handler`);
    return super.handle(ticket);
  }
}

class SeniorAgent extends SupportHandler {
  handle(ticket: SupportTicket): string {
    if (ticket.priority === "high" || ticket.customerTier === "premium") {
      console.log(`  [Senior Agent] Handled ticket #${ticket.id} -- provided personalized response`);
      return `A senior agent has reviewed your ${ticket.category} issue and is working on a personalized resolution.`;
    }

    console.log(`  [Senior Agent] Passed ticket #${ticket.id} to next handler`);
    return super.handle(ticket);
  }
}

class Manager extends SupportHandler {
  handle(ticket: SupportTicket): string {
    if (ticket.priority === "critical" || ticket.customerTier === "enterprise") {
      console.log(`  [Manager] Handled ticket #${ticket.id} -- escalated with dedicated rep`);
      return `Your ticket has been escalated to management. A dedicated representative has been assigned to your case.`;
    }

    console.log(`  [Manager] Passed ticket #${ticket.id} to next handler`);
    return super.handle(ticket);
  }
}

// --- Build the chain ---

const faqBot = new FAQBot();
const juniorAgent = new JuniorAgent();
const seniorAgent = new SeniorAgent();
const manager = new Manager();

// Link: FAQ Bot -> Junior Agent -> Senior Agent -> Manager
faqBot.setNext(juniorAgent).setNext(seniorAgent).setNext(manager);

// --- Usage ---

function submitTicket(ticket: SupportTicket): void {
  console.log(`\n>>> Ticket #${ticket.id} (${ticket.category}, ${ticket.priority}, ${ticket.customerTier})`);
  console.log(`    "${ticket.message}"`);
  const response = faqBot.handle(ticket);
  console.log(`<<< ${response}`);
}

// 1. General low-priority ticket -- handled by FAQ Bot
submitTicket({
  id: 1,
  category: "general",
  priority: "low",
  message: "How do I reset my password?",
  customerTier: "basic",
});

// 2. Billing medium-priority ticket -- passed by FAQ Bot, handled by Junior Agent
submitTicket({
  id: 2,
  category: "billing",
  priority: "medium",
  message: "I was double-charged for my last order.",
  customerTier: "basic",
});

// 3. Technical high-priority from premium customer -- handled by Senior Agent
submitTicket({
  id: 3,
  category: "technical",
  priority: "high",
  message: "My API integration is returning 500 errors.",
  customerTier: "premium",
});

// 4. Critical outage from enterprise customer -- handled by Manager
submitTicket({
  id: 4,
  category: "outage",
  priority: "critical",
  message: "Our entire production environment is down!",
  customerTier: "enterprise",
});

// 5. Legal low-priority from basic customer -- no handler matches, logged for manual review
submitTicket({
  id: 5,
  category: "legal",
  priority: "low",
  message: "I need a copy of your data processing agreement.",
  customerTier: "basic",
});
