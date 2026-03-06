# Problem: Chat Room with User Coordination

## Scenario

You are building a group chat application. Users can send messages, but the system needs to coordinate several features: message delivery, typing indicators, online status updates, and read receipts. Users should not communicate directly with each other.

## Requirements

1. Define a `User` class with properties: `name`, `status` ("online" | "away" | "offline"). A User can:
   - `sendMessage(content: string)` — sends a message to the room
   - `sendPrivateMessage(toName: string, content: string)` — sends a direct message to a specific user
   - `receiveMessage(from: string, content: string)` — receives and displays a message
   - `receiveNotification(notification: string)` — receives a system notification
   - `setStatus(status: string)` — changes online status

2. Build a `ChatRoom` coordinator that:
   - Registers and tracks users
   - When a user sends a message, delivers it to all **other** online users in the room
   - When a user sends a private message, delivers it only to the target user (if online), or notifies the sender that the target is offline
   - When a user changes their status to "offline", notifies all other online users
   - When a user changes their status to "online", notifies all other online users that they joined
   - Maintains a message history log

3. Users must have **no direct references** to each other. All communication goes through the ChatRoom.

## Expected Behavior

```
[ChatRoom] Alice joined the room
[ChatRoom] Bob joined the room
[Alice -> Room] "Hey everyone!"
  Bob received: [Alice] "Hey everyone!"
[Bob -> Alice] "Hi Alice, private message"
  Alice received: [DM from Bob] "Hi Alice, private message"
[Alice] Status changed to offline
  Bob received notification: "Alice went offline"
[Bob -> Alice] "Are you there?"
  Bob received notification: "Alice is currently offline"
```

## Constraints

- Users must not import, reference, or hold pointers to other User instances.
- The ChatRoom must be the only place that knows about all users and their connections.
- Adding a new feature (e.g., "user is typing" indicator) should only require changes to the ChatRoom and User classes, not a rewrite of how users interact.
