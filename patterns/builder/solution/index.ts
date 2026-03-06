// Builder Pattern
// Separates the construction of a complex object from its representation,
// allowing the same construction process to create different configurations.

// --- The product ---

class Email {
  constructor(
    public readonly from: string,
    public readonly to: string[],
    public readonly subject: string,
    public readonly body: string,
    public readonly cc: string[],
    public readonly bcc: string[],
    public readonly attachments: string[],
    public readonly isHtml: boolean,
  ) {}

  display(): void {
    console.log(`From: ${this.from}`);
    console.log(`To: ${this.to.join(', ')}`);
    console.log(`Subject: ${this.subject}`);
    if (this.cc.length > 0) {
      console.log(`CC: ${this.cc.join(', ')}`);
    }
    if (this.bcc.length > 0) {
      console.log(`BCC: ${this.bcc.join(', ')}`);
    }
    console.log(`Format: ${this.isHtml ? 'HTML' : 'Plain Text'}`);
    if (this.body) {
      console.log(`Body: ${this.body}`);
    }
    if (this.attachments.length > 0) {
      console.log(`Attachments: ${this.attachments.join(', ')}`);
    }
  }
}

// --- The builder ---

class EmailBuilder {
  private _from: string;
  private _to: string[] = [];
  private _subject = '(no subject)';
  private _body = '';
  private _cc: string[] = [];
  private _bcc: string[] = [];
  private _attachments: string[] = [];
  private _isHtml = false;

  constructor(from: string) {
    this._from = from;
  }

  addTo(address: string): this {
    this._to.push(address);
    return this;
  }

  setSubject(subject: string): this {
    this._subject = subject;
    return this;
  }

  setBody(body: string): this {
    this._body = body;
    return this;
  }

  addCc(address: string): this {
    this._cc.push(address);
    return this;
  }

  addBcc(address: string): this {
    this._bcc.push(address);
    return this;
  }

  addAttachment(filename: string): this {
    this._attachments.push(filename);
    return this;
  }

  setHtml(isHtml: boolean): this {
    this._isHtml = isHtml;
    return this;
  }

  build(): Email {
    return new Email(
      this._from,
      [...this._to],
      this._subject,
      this._body,
      [...this._cc],
      [...this._bcc],
      [...this._attachments],
      this._isHtml,
    );
  }
}

// --- Usage ---
// Each email is built step-by-step. Only the relevant parts are set.

console.log('=== Order Confirmation Email ===');
const orderEmail = new EmailBuilder('noreply@shop.com')
  .addTo('customer@example.com')
  .setSubject('Your Order Confirmation')
  .setBody('<h1>Thank you!</h1><p>Your order #1234 has been placed.</p>')
  .setHtml(true)
  .addAttachment('receipt.pdf')
  .build();
orderEmail.display();

console.log('\n=== Minimal Email ===');
const minimalEmail = new EmailBuilder('admin@company.com')
  .addTo('team@company.com')
  .build();
minimalEmail.display();

console.log('\n=== Full-Featured Email ===');
const fullEmail = new EmailBuilder('ceo@company.com')
  .addTo('board@company.com')
  .addTo('investors@company.com')
  .setSubject('Q4 Results')
  .setBody('Please find the quarterly report attached.')
  .addCc('cfo@company.com')
  .addBcc('legal@company.com')
  .addAttachment('q4-report.pdf')
  .addAttachment('financials.xlsx')
  .build();
fullEmail.display();
