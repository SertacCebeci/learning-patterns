// Command Pattern
// Turns requests into stand-alone objects, enabling undo support,
// logging, and decoupling the invoker from the receiver.

// --- Receiver classes (the devices that do the actual work) ---

class Light {
  private isOn = false;
  private brightness = 100;

  constructor(private location: string) {}

  turnOn(): boolean {
    if (this.isOn) {
      console.log(`  ${this.location} light turned ON (already on, no change)`);
      return false; // no state change
    }
    this.isOn = true;
    console.log(`  ${this.location} light turned ON`);
    return true;
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`  ${this.location} light turned OFF`);
  }

  dim(level: number): void {
    this.brightness = level;
    console.log(`  ${this.location} light dimmed to ${level}%`);
  }

  getBrightness(): number {
    return this.brightness;
  }

  getIsOn(): boolean {
    return this.isOn;
  }
}

class Thermostat {
  private temperature = 68;

  setTemperature(degrees: number): number {
    const previous = this.temperature;
    this.temperature = degrees;
    console.log(`  Thermostat set to ${degrees}°F`);
    return previous;
  }

  getTemperature(): number {
    return this.temperature;
  }
}

class MusicPlayer {
  private currentSong: string | null = null;

  play(song: string): void {
    this.currentSong = song;
    console.log(`  Playing "${song}"`);
  }

  stop(): string | null {
    const wasSong = this.currentSong;
    this.currentSong = null;
    console.log(`  Stopped music playback`);
    return wasSong;
  }

  getCurrentSong(): string | null {
    return this.currentSong;
  }
}

// --- Action interface ---

interface Action {
  execute(): void;
  undo(): void;
  description(): string;
}

// --- Concrete actions ---

class LightOnAction implements Action {
  private wasAlreadyOn = false;

  constructor(private light: Light) {}

  execute(): void {
    this.wasAlreadyOn = this.light.getIsOn();
    this.light.turnOn();
  }

  undo(): void {
    if (!this.wasAlreadyOn) {
      this.light.turnOff();
      console.log(`  [Undo] Light turned off`);
    }
  }

  description(): string {
    return "Turn on light";
  }
}

class LightOffAction implements Action {
  private wasOn = false;

  constructor(private light: Light) {}

  execute(): void {
    this.wasOn = this.light.getIsOn();
    this.light.turnOff();
  }

  undo(): void {
    if (this.wasOn) {
      this.light.turnOn();
    }
  }

  description(): string {
    return "Turn off light";
  }
}

class LightDimAction implements Action {
  private previousLevel = 100;

  constructor(
    private light: Light,
    private level: number,
  ) {}

  execute(): void {
    this.previousLevel = this.light.getBrightness();
    this.light.dim(this.level);
  }

  undo(): void {
    this.light.dim(this.previousLevel);
    console.log(`  [Undo] Light brightness restored to ${this.previousLevel}%`);
  }

  description(): string {
    return `Dim light to ${this.level}%`;
  }
}

class SetTemperatureAction implements Action {
  private previousTemp = 68;

  constructor(
    private thermostat: Thermostat,
    private degrees: number,
  ) {}

  execute(): void {
    this.previousTemp = this.thermostat.setTemperature(this.degrees);
  }

  undo(): void {
    this.thermostat.setTemperature(this.previousTemp);
    console.log(`  [Undo] Thermostat restored to ${this.previousTemp}°F`);
  }

  description(): string {
    return `Set thermostat to ${this.degrees}°F`;
  }
}

class PlayMusicAction implements Action {
  private previousSong: string | null = null;

  constructor(
    private player: MusicPlayer,
    private song: string,
  ) {}

  execute(): void {
    this.previousSong = this.player.getCurrentSong();
    this.player.play(this.song);
  }

  undo(): void {
    if (this.previousSong) {
      this.player.play(this.previousSong);
    } else {
      this.player.stop();
    }
  }

  description(): string {
    return `Play "${this.song}"`;
  }
}

class StopMusicAction implements Action {
  private wasSong: string | null = null;

  constructor(private player: MusicPlayer) {}

  execute(): void {
    this.wasSong = this.player.getCurrentSong();
    this.player.stop();
  }

  undo(): void {
    if (this.wasSong) {
      this.player.play(this.wasSong);
      console.log(`  [Undo] Resumed playing "${this.wasSong}"`);
    }
  }

  description(): string {
    return "Stop music";
  }
}

// --- Invoker (the remote control) ---

interface ActionLogEntry {
  timestamp: Date;
  description: string;
}

class RemoteControl {
  private slots = new Map<number, Action>();
  private history: Action[] = [];
  private log: ActionLogEntry[] = [];

  assignButton(slot: number, action: Action): void {
    this.slots.set(slot, action);
    console.log(`  Assigned button ${slot}: "${action.description()}"`);
  }

  pressButton(slot: number): void {
    const action = this.slots.get(slot);
    if (!action) {
      console.log(`  Button ${slot} is not assigned.`);
      return;
    }

    console.log(`[Button ${slot}]`);
    action.execute();
    this.history.push(action);
    this.log.push({ timestamp: new Date(), description: action.description() });
  }

  undoLastAction(): void {
    const action = this.history.pop();
    if (!action) {
      console.log("  Nothing to undo.");
      return;
    }

    console.log(`[Undo]`);
    action.undo();
    this.log.push({ timestamp: new Date(), description: `Undo: ${action.description()}` });
  }

  printLog(): void {
    console.log("\n=== Action Log ===");
    for (const entry of this.log) {
      const time = entry.timestamp.toLocaleTimeString();
      console.log(`  [${time}] ${entry.description}`);
    }
  }
}

// --- Usage ---
// The RemoteControl has no knowledge of specific device types.
// Adding a new device only requires creating new Action classes.

const livingRoomLight = new Light("Living room");
const thermostat = new Thermostat();
const musicPlayer = new MusicPlayer();

const remote = new RemoteControl();

console.log("=== Setting up remote ===");
remote.assignButton(1, new LightOnAction(livingRoomLight));
remote.assignButton(2, new SetTemperatureAction(thermostat, 72));
remote.assignButton(3, new PlayMusicAction(musicPlayer, "Jazz playlist"));

console.log("\n=== Pressing buttons 1, 2, 3 ===");
remote.pressButton(1);
remote.pressButton(2);
remote.pressButton(3);

console.log("\n=== Undoing last two actions ===");
remote.undoLastAction();
remote.undoLastAction();

console.log("\n=== Pressing button 1 again ===");
remote.pressButton(1);

remote.printLog();
