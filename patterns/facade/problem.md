# Home Theater System

## Background

You are building a smart home application that controls a home theater setup. The system has multiple independent components that must be orchestrated in the correct order.

## The Challenge

The home theater consists of these subsystem classes:

```typescript
class Amplifier {
  on(): void;
  off(): void;
  setVolume(level: number): void;
  setInput(source: string): void;
}

class Projector {
  on(): void;
  off(): void;
  setResolution(res: "720p" | "1080p" | "4K"): void;
}

class StreamingPlayer {
  on(): void;
  off(): void;
  play(movie: string): void;
  stop(): void;
}

class TheaterLights {
  dim(level: number): void;  // 0-100
  on(): void;
}

class Subwoofer {
  on(): void;
  off(): void;
  setBass(level: number): void;
}
```

To watch a movie, the user currently needs to:
1. Turn on the projector and set resolution to 4K
2. Turn on the amplifier, set input to "streaming", and set volume to 7
3. Turn on the subwoofer and set bass to 8
4. Dim the lights to 20%
5. Turn on the streaming player and play the movie

To end the movie:
1. Stop the streaming player and turn it off
2. Turn off the subwoofer
3. Turn off the amplifier
4. Turn off the projector
5. Turn the lights back on (full brightness)

## Requirements

1. Create a class that provides two simple methods:
   - `watchMovie(movie: string)` — performs all the setup steps in the correct order
   - `endMovie()` — performs all the shutdown steps in the correct order
2. Each method should log what it's doing (e.g., `console.log("Getting ready to watch a movie...")`)
3. The subsystem classes should still be usable independently if needed
4. The client should only need to call one method to start or stop a movie

## Constraints

- Do not modify the subsystem classes
- The client code should not need to know about the individual subsystems or the order of operations
- All subsystem instances should be created inside your class or injected via the constructor
