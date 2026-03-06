# Problem: Email Message Builder

You are building an email service that constructs email messages. An email can have many optional parts, and different use cases require different combinations.

## Requirements

1. Create an `Email` class (the product) with the following fields:
   - `from: string` (required)
   - `to: string[]` (required, at least one recipient)
   - `subject: string` (default: `"(no subject)"`)
   - `body: string` (default: `""`)
   - `cc: string[]` (default: `[]`)
   - `bcc: string[]` (default: `[]`)
   - `attachments: string[]` (default: `[]`)
   - `isHtml: boolean` (default: `false`)

2. Create an `EmailBuilder` class that:
   - Accepts `from` in the constructor (since it is always required).
   - Provides chainable setter methods: `addTo(address)`, `setSubject(subject)`, `setBody(body)`, `addCc(address)`, `addBcc(address)`, `addAttachment(filename)`, `setHtml(isHtml)`.
   - Has a `build()` method that returns the finished `Email` object.

3. The `Email` class should have a `display()` method that prints all non-empty fields in a readable format.

## Example Usage

```ts
const email = new EmailBuilder("noreply@shop.com")
  .addTo("customer@example.com")
  .setSubject("Your Order Confirmation")
  .setBody("<h1>Thank you!</h1><p>Your order #1234 has been placed.</p>")
  .setHtml(true)
  .addAttachment("receipt.pdf")
  .build();

email.display();
```

## Acceptance Criteria

- The builder allows constructing emails with any combination of optional fields.
- Method chaining works for all setter methods.
- The `build()` method returns a fully constructed `Email` object.
- Building a minimal email (just `from` and `to`) works without setting any optional fields.
