## Description

The Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing. Also known as Event-Subscriber or Listener.

## The Problem It Solves

When one object's state changes need to trigger updates in other objects, but the set of dependent objects isn't known beforehand or changes dynamically. Without this pattern, you either waste resources constantly polling for changes, or tightly couple the objects together, or spam every possible interested party.

## How It Works

1. The **Publisher** (subject) maintains a list of subscribers and provides methods to add/remove subscribers from the list.
2. **Subscribers** implement a common interface with an `update()` method.
3. When something important happens in the publisher, it iterates over its subscriber list and calls the notification method on each subscriber.
4. The publisher passes context data to subscribers through method parameters, or the subscriber can query the publisher directly for details.
5. Subscribers can join or leave the subscription list at runtime without modifying the publisher.

## When to Use It

- When changes in the state of one object may require changing other objects, and the actual set of objects is unknown beforehand or changes dynamically.
- When some objects in your app must observe others, but only for a limited time or in specific cases.
- When you need a publish-subscribe mechanism for decoupled event handling (e.g., UI components reacting to data changes).