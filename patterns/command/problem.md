# Problem: Smart Home Automation Controller

## Scenario

You are building a smart home control system. Users interact with a remote control that has programmable buttons. Each button can be assigned to control different devices (lights, thermostat, speaker). The system must support undoing the last action.

## Requirements

1. Define device classes with the following capabilities:
   - **Light**: `turnOn()`, `turnOff()`, `dim(level: number)`. Tracks whether it is on/off and current brightness level.
   - **Thermostat**: `setTemperature(degrees: number)`. Tracks the current temperature setting.
   - **MusicPlayer**: `play(song: string)`, `stop()`. Tracks current playing song.

2. Create action objects for each operation. Each action must support:
   - `execute()` — performs the action on the device
   - `undo()` — reverses the action, restoring the previous device state
   - `description()` — returns a human-readable string describing the action

3. Build a `RemoteControl` class that:
   - Has numbered button slots where actions can be assigned
   - Can press a button to execute its assigned action
   - Supports undoing the most recent button press
   - Keeps a log of all executed actions with timestamps

4. Demonstrate the following scenario:
   - Assign "turn on living room light" to button 1
   - Assign "set thermostat to 72" to button 2
   - Assign "play Jazz playlist" to button 3
   - Press buttons 1, 2, 3 in sequence
   - Undo the last two actions
   - Press button 1 again

## Expected Behavior

```
[Button 1] Living room light turned ON
[Button 2] Thermostat set to 72°F
[Button 3] Playing "Jazz playlist"
[Undo] Stopped music playback
[Undo] Thermostat restored to 68°F
[Button 1] Living room light turned ON (already on, no change)
```

## Constraints

- Adding a new device type (e.g., SecurityCamera) should only require creating new action classes, not modifying the RemoteControl.
- The RemoteControl should have no knowledge of specific device types.
- Each action must store enough state to fully reverse itself.
