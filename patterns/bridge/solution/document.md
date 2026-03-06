## Description

Splits a class into two separate hierarchies — abstraction and implementation — that can vary independently. Prevents class explosion when you have multiple dimensions of variation.

## The Problem It Solves

You have two independent dimensions of variation. Without Bridge, you'd need N×M classes. With it, you need N+M.

## How It Works

The abstraction holds a reference to the implementation. Both have their own hierarchies. They're connected via composition, not inheritance.

## When to Use It

You have multiple dimensions that vary independently. You want to switch implementations at runtime.
