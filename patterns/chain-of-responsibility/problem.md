# Problem: Customer Support Ticket Router

## Scenario

You are building a customer support system for an e-commerce platform. When a customer submits a support ticket, it needs to be evaluated by multiple departments to determine who should handle it.

## Requirements

1. Define a `SupportTicket` with properties: `id`, `category` (string), `priority` ("low" | "medium" | "high" | "critical"), `message` (string), and `customerTier` ("basic" | "premium" | "enterprise").

2. Implement the following support levels, each of which can either resolve the ticket or pass it along:

   - **FAQ Bot**: Handles tickets where the `category` is "general" and `priority` is "low". Responds with an automated FAQ link.
   - **Junior Agent**: Handles tickets with "medium" or lower priority that the FAQ Bot did not handle. Responds with a template reply.
   - **Senior Agent**: Handles "high" priority tickets or tickets from "premium" customers that were not handled earlier. Provides a personalized response.
   - **Manager**: Handles "critical" priority tickets or tickets from "enterprise" customers. Escalates and assigns a dedicated representative.

3. If no level handles the ticket, return a response indicating the ticket has been logged for manual review.

4. The support levels should be linkable in any order, and adding or removing a level should not require changes to other levels.

5. Each handler should log whether it handled or passed the ticket.

## Expected Behavior

```
Ticket #1 (general, low, basic): FAQ Bot responds with automated link
Ticket #2 (billing, medium, basic): Junior Agent responds with template
Ticket #3 (technical, high, premium): Senior Agent provides personalized response
Ticket #4 (outage, critical, enterprise): Manager escalates with dedicated rep
Ticket #5 (legal, low, basic): No handler found — logged for manual review
```

## Constraints

- Each support level should be a self-contained class.
- The system must be easy to extend with new support levels (e.g., "Legal Department") without modifying existing ones.
- The order of evaluation should be configurable at setup time.
