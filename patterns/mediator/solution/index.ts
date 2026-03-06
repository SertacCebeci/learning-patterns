// Mediator Pattern
// Components communicate through a central mediator instead of directly.
// The mediator contains the coordination logic, keeping components decoupled.

// Example: an airport control tower coordinating planes on runways.

// --- Mediator interface ---

interface AirTrafficControl {
  requestLanding(plane: Plane): void;
  requestTakeoff(plane: Plane): void;
  notifyRunwayClear(runway: Runway): void;
}

// --- Colleague: Plane ---

class Plane {
  constructor(
    public readonly callsign: string,
    private tower: AirTrafficControl,
  ) {}

  requestLanding(): void {
    console.log(`  [${this.callsign}] Requesting landing.`);
    this.tower.requestLanding(this);
  }

  requestTakeoff(): void {
    console.log(`  [${this.callsign}] Requesting takeoff.`);
    this.tower.requestTakeoff(this);
  }

  land(runway: Runway): void {
    console.log(`  [${this.callsign}] Landing on runway ${runway.id}.`);
  }

  takeoff(runway: Runway): void {
    console.log(`  [${this.callsign}] Taking off from runway ${runway.id}.`);
  }

  holdPosition(): void {
    console.log(`  [${this.callsign}] Holding position — no runway available.`);
  }
}

// --- Colleague: Runway ---

class Runway {
  public occupied = false;

  constructor(
    public readonly id: string,
    private tower: AirTrafficControl,
  ) {}

  reserve(): void {
    this.occupied = true;
    console.log(`  [Runway ${this.id}] Now occupied.`);
  }

  release(): void {
    this.occupied = false;
    console.log(`  [Runway ${this.id}] Now clear.`);
    this.tower.notifyRunwayClear(this);
  }
}

// --- Concrete mediator ---
// Contains ALL the coordination logic. Planes and runways
// don't know about each other — only the tower does.

class ControlTower implements AirTrafficControl {
  private runways: Runway[] = [];
  private landingQueue: Plane[] = [];
  private takeoffQueue: Plane[] = [];

  addRunway(runway: Runway): void {
    this.runways.push(runway);
  }

  requestLanding(plane: Plane): void {
    const runway = this.findFreeRunway();
    if (runway) {
      runway.reserve();
      plane.land(runway);
      // Simulate: runway is freed after landing
      runway.release();
    } else {
      this.landingQueue.push(plane);
      plane.holdPosition();
    }
  }

  requestTakeoff(plane: Plane): void {
    const runway = this.findFreeRunway();
    if (runway) {
      runway.reserve();
      plane.takeoff(runway);
      runway.release();
    } else {
      this.takeoffQueue.push(plane);
      plane.holdPosition();
    }
  }

  notifyRunwayClear(runway: Runway): void {
    // Landing has priority over takeoff
    if (this.landingQueue.length > 0) {
      const plane = this.landingQueue.shift()!;
      console.log(`  [Tower] Runway ${runway.id} free — assigning to queued ${plane.callsign} for landing.`);
      runway.reserve();
      plane.land(runway);
      runway.release();
    } else if (this.takeoffQueue.length > 0) {
      const plane = this.takeoffQueue.shift()!;
      console.log(`  [Tower] Runway ${runway.id} free — assigning to queued ${plane.callsign} for takeoff.`);
      runway.reserve();
      plane.takeoff(runway);
      runway.release();
    }
  }

  private findFreeRunway(): Runway | undefined {
    return this.runways.find((r) => !r.occupied);
  }
}

// --- Usage ---
// Planes never reference runways. Runways never reference planes.
// All coordination goes through the tower.

const tower = new ControlTower();

const runway1 = new Runway("09L", tower);
tower.addRunway(runway1);

const flight1 = new Plane("AA-101", tower);
const flight2 = new Plane("BA-202", tower);
const flight3 = new Plane("LH-303", tower);

console.log("=== Three planes request landing (one runway) ===");
flight1.requestLanding();
console.log();
flight2.requestLanding();
console.log();
flight3.requestLanding();

console.log("\n=== Adding a second runway ===");
const runway2 = new Runway("27R", tower);
tower.addRunway(runway2);

console.log("\n=== Takeoff request with two runways available ===");
flight1.requestTakeoff();
