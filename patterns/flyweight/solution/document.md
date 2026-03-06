## Description

Minimizes memory usage by sharing common state (intrinsic) across many objects. Unique state (extrinsic) is passed in by the client.

## The Problem It Solves

You have thousands of similar objects with duplicate data consuming excessive memory.

## How It Works

Extract shared state into flyweight objects. A factory ensures one flyweight per unique combination. Clients provide unique state when calling methods.

## When to Use It

Your app creates a huge number of similar objects. Memory is a bottleneck. Objects contain extractable duplicate data.
