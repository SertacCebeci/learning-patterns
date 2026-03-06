# Problem: Weather Station with Multiple Displays

## Scenario

You are building a weather monitoring system. A central weather station collects sensor data (temperature, humidity, pressure). Multiple display units need to update automatically whenever new readings arrive. Display units can be added or removed at any time.

## Requirements

1. Define a `WeatherStation` class that:
   - Tracks current `temperature` (Celsius), `humidity` (percentage), and `pressure` (hPa)
   - Allows display units to register and unregister for updates
   - Automatically notifies all registered displays whenever `setMeasurements(temp, humidity, pressure)` is called

2. Implement three different display types:
   - **CurrentConditionsDisplay**: Shows the latest temperature and humidity in a simple format (e.g., "Current: 25.3C, 65% humidity")
   - **StatisticsDisplay**: Tracks and shows min/max/average temperature across all readings received so far
   - **ForecastDisplay**: Compares the current pressure with the previous pressure reading. If pressure is rising, shows "Improving weather ahead". If falling, shows "Cooler, rainy weather ahead". If stable, shows "More of the same".

3. Each display must implement a common interface with an `update(temperature: number, humidity: number, pressure: number)` method and a `display()` method.

4. Demonstrate the following:
   - Create a weather station and register all three displays
   - Push three rounds of measurements
   - Remove the StatisticsDisplay after the second round
   - Push a fourth round and verify that only the remaining two displays update

## Expected Behavior

```
=== Reading 1: 26.5C, 65%, 1013.1hPa ===
Current: 26.5C, 65.0% humidity
Stats: Avg/Max/Min = 26.5/26.5/26.5
Forecast: More of the same

=== Reading 2: 28.2C, 70%, 1012.5hPa ===
Current: 28.2C, 70.0% humidity
Stats: Avg/Max/Min = 27.4/28.2/26.5
Forecast: Cooler, rainy weather ahead

=== Removed StatisticsDisplay ===

=== Reading 3: 24.1C, 90%, 1009.2hPa ===
Current: 24.1C, 90.0% humidity
Forecast: Cooler, rainy weather ahead
(No stats displayed — that display was removed)
```

## Constraints

- The WeatherStation must not have any knowledge of specific display types.
- Adding a new display type (e.g., HeatIndexDisplay) must not require changes to the WeatherStation class.
- Displays should be able to subscribe and unsubscribe at any time without affecting other displays.
