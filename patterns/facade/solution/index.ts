// Facade Pattern
// Provides a simplified interface to a complex subsystem.
// The subsystem classes still exist and can be used directly,
// but the facade offers a convenient shortcut for common workflows.

// --- Subsystem classes ---
// Each one handles a specific piece of the home theater.
// The client shouldn't need to know the correct order or wiring between them.

class Amplifier {
  on(): void {
    console.log('  [Amplifier] Turning on');
  }

  off(): void {
    console.log('  [Amplifier] Turning off');
  }

  setVolume(level: number): void {
    console.log(`  [Amplifier] Setting volume to ${level}`);
  }

  setInput(source: string): void {
    console.log(`  [Amplifier] Setting input to ${source}`);
  }
}

class Projector {
  on(): void {
    console.log('  [Projector] Turning on');
  }

  off(): void {
    console.log('  [Projector] Turning off');
  }

  setResolution(res: '720p' | '1080p' | '4K'): void {
    console.log(`  [Projector] Setting resolution to ${res}`);
  }
}

class StreamingPlayer {
  on(): void {
    console.log('  [StreamingPlayer] Turning on');
  }

  off(): void {
    console.log('  [StreamingPlayer] Turning off');
  }

  play(movie: string): void {
    console.log(`  [StreamingPlayer] Playing "${movie}"`);
  }

  stop(): void {
    console.log('  [StreamingPlayer] Stopping playback');
  }
}

class TheaterLights {
  dim(level: number): void {
    console.log(`  [TheaterLights] Dimming to ${level}%`);
  }

  on(): void {
    console.log('  [TheaterLights] Turning on (full brightness)');
  }
}

class Subwoofer {
  on(): void {
    console.log('  [Subwoofer] Turning on');
  }

  off(): void {
    console.log('  [Subwoofer] Turning off');
  }

  setBass(level: number): void {
    console.log(`  [Subwoofer] Setting bass to ${level}`);
  }
}

// --- The Facade ---
// Orchestrates all subsystems in the correct order.
// The client makes one call instead of many.

class HomeTheaterFacade {
  private amplifier: Amplifier;
  private projector: Projector;
  private player: StreamingPlayer;
  private lights: TheaterLights;
  private subwoofer: Subwoofer;

  constructor() {
    this.amplifier = new Amplifier();
    this.projector = new Projector();
    this.player = new StreamingPlayer();
    this.lights = new TheaterLights();
    this.subwoofer = new Subwoofer();
  }

  watchMovie(movie: string): void {
    console.log(`Getting ready to watch "${movie}"...`);

    // 1. Turn on the projector and set resolution to 4K
    this.projector.on();
    this.projector.setResolution('4K');

    // 2. Turn on the amplifier, set input to "streaming", and set volume to 7
    this.amplifier.on();
    this.amplifier.setInput('streaming');
    this.amplifier.setVolume(7);

    // 3. Turn on the subwoofer and set bass to 8
    this.subwoofer.on();
    this.subwoofer.setBass(8);

    // 4. Dim the lights to 20%
    this.lights.dim(20);

    // 5. Turn on the streaming player and play the movie
    this.player.on();
    this.player.play(movie);

    console.log(`Enjoy the movie!`);
  }

  endMovie(): void {
    console.log('Shutting down the home theater...');

    // 1. Stop the streaming player and turn it off
    this.player.stop();
    this.player.off();

    // 2. Turn off the subwoofer
    this.subwoofer.off();

    // 3. Turn off the amplifier
    this.amplifier.off();

    // 4. Turn off the projector
    this.projector.off();

    // 5. Turn the lights back on (full brightness)
    this.lights.on();

    console.log('Home theater shut down. Goodnight!');
  }
}

// --- Usage ---
// The client doesn't know about projectors, amplifiers, subwoofers,
// lights, or streaming players. It just watches a movie.

const theater = new HomeTheaterFacade();

console.log('=== Movie Night ===\n');
theater.watchMovie('Inception');

console.log('\n=== Movie Over ===\n');
theater.endMovie();
