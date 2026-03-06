// Mediator Pattern
// Components communicate through a central mediator instead of directly.
// The mediator contains the coordination logic, keeping components decoupled.

// Example: a chat room where users communicate through a central coordinator.
// Users have no direct references to each other — all messages and
// notifications flow through the ChatRoom.

// --- Mediator interface ---

interface ChatMediator {
  registerUser(user: User): void;
  sendMessage(from: User, content: string): void;
  sendPrivateMessage(from: User, toName: string, content: string): void;
  changeStatus(user: User, status: "online" | "away" | "offline"): void;
}

// --- Colleague: User ---
// Users only know about the mediator, never about other users.

class User {
  public status: "online" | "away" | "offline" = "online";

  constructor(
    public readonly name: string,
    private chatRoom: ChatMediator,
  ) {}

  sendMessage(content: string): void {
    console.log(`[${this.name} -> Room] "${content}"`);
    this.chatRoom.sendMessage(this, content);
  }

  sendPrivateMessage(toName: string, content: string): void {
    console.log(`[${this.name} -> ${toName}] "${content}"`);
    this.chatRoom.sendPrivateMessage(this, toName, content);
  }

  receiveMessage(from: string, content: string): void {
    console.log(`  ${this.name} received: [${from}] "${content}"`);
  }

  receiveNotification(notification: string): void {
    console.log(`  ${this.name} received notification: "${notification}"`);
  }

  setStatus(status: "online" | "away" | "offline"): void {
    this.chatRoom.changeStatus(this, status);
  }
}

// --- Concrete mediator: ChatRoom ---
// Contains ALL the coordination logic. Users never reference each other.

class ChatRoom implements ChatMediator {
  private users = new Map<string, User>();
  private messageHistory: { from: string; to: string; content: string }[] = [];

  registerUser(user: User): void {
    this.users.set(user.name, user);
    console.log(`[ChatRoom] ${user.name} joined the room`);

    // Notify all other online users
    for (const [name, other] of this.users) {
      if (name !== user.name && other.status === "online") {
        other.receiveNotification(`${user.name} joined the room`);
      }
    }
  }

  sendMessage(from: User, content: string): void {
    this.messageHistory.push({ from: from.name, to: "Room", content });

    // Deliver to all other online users
    for (const [name, user] of this.users) {
      if (name !== from.name && user.status === "online") {
        user.receiveMessage(from.name, content);
      }
    }
  }

  sendPrivateMessage(from: User, toName: string, content: string): void {
    const target = this.users.get(toName);

    if (!target) {
      from.receiveNotification(`User "${toName}" not found`);
      return;
    }

    if (target.status === "offline") {
      from.receiveNotification(`${toName} is currently offline`);
      return;
    }

    this.messageHistory.push({ from: from.name, to: toName, content });
    target.receiveMessage(`DM from ${from.name}`, content);
  }

  changeStatus(user: User, status: "online" | "away" | "offline"): void {
    const oldStatus = user.status;
    user.status = status;
    console.log(`[${user.name}] Status changed to ${status}`);

    // Notify other online users about relevant status changes
    if (status === "offline") {
      for (const [name, other] of this.users) {
        if (name !== user.name && other.status === "online") {
          other.receiveNotification(`${user.name} went offline`);
        }
      }
    } else if (status === "online" && oldStatus !== "online") {
      for (const [name, other] of this.users) {
        if (name !== user.name && other.status === "online") {
          other.receiveNotification(`${user.name} came online`);
        }
      }
    }
  }

  getMessageHistory(): { from: string; to: string; content: string }[] {
    return [...this.messageHistory];
  }
}

// --- Usage ---
// Users never reference each other. All communication goes through the ChatRoom.

const chatRoom = new ChatRoom();

const alice = new User("Alice", chatRoom);
const bob = new User("Bob", chatRoom);

chatRoom.registerUser(alice);
chatRoom.registerUser(bob);

console.log();
alice.sendMessage("Hey everyone!");

console.log();
bob.sendPrivateMessage("Alice", "Hi Alice, private message");

console.log();
alice.setStatus("offline");

console.log();
bob.sendPrivateMessage("Alice", "Are you there?");

console.log();
console.log("=== Message History ===");
for (const msg of chatRoom.getMessageHistory()) {
  console.log(`  ${msg.from} -> ${msg.to}: "${msg.content}"`);
}
