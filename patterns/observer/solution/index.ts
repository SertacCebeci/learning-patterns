// Observer Pattern
// Defines a one-to-many dependency: when the subject changes state,
// all subscribed observers are notified automatically.

// Example: a weather station with multiple display units that update
// whenever new sensor readings arrive. Displays can be added or
// removed at any time without modifying the WeatherStation.

// --- Observer interface ---
// All display types must implement this common interface.

interface WeatherDisplay {
  update(temperature: number, humidity: number, pressure: number): void;
  display(): void;
}

// --- Subject: WeatherStation ---
// Tracks sensor data and notifies registered displays on changes.

class WeatherStation {
  private displays = new Set<WeatherDisplay>();
  private temperature = 0;
  private humidity = 0;
  private pressure = 0;

  registerDisplay(display: WeatherDisplay): void {
    this.displays.add(display);
  }

  removeDisplay(display: WeatherDisplay): void {
    this.displays.delete(display);
  }

  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number,
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyDisplays();
  }

  private notifyDisplays(): void {
    for (const display of this.displays) {
      display.update(this.temperature, this.humidity, this.pressure);
    }
  }
}

// --- Concrete observers ---
// Each display reacts to the same data in its own way.

class CurrentConditionsDisplay implements WeatherDisplay {
  private temperature = 0;
  private humidity = 0;

  update(temperature: number, humidity: number, _pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(
      `Current: ${this.temperature}C, ${this.humidity.toFixed(1)}% humidity`,
    );
  }
}

class StatisticsDisplay implements WeatherDisplay {
  private temperatures: number[] = [];

  update(temperature: number, _humidity: number, _pressure: number): void {
    this.temperatures.push(temperature);
    this.display();
  }

  display(): void {
    const min = Math.min(...this.temperatures);
    const max = Math.max(...this.temperatures);
    const avg =
      this.temperatures.reduce((sum, t) => sum + t, 0) /
      this.temperatures.length;
    console.log(
      `Stats: Avg/Max/Min = ${parseFloat(avg.toFixed(1))}/${max}/${min}`,
    );
  }
}

class ForecastDisplay implements WeatherDisplay {
  private lastPressure = 0;
  private currentPressure = 0;
  private firstReading = true;

  update(_temperature: number, _humidity: number, pressure: number): void {
    this.lastPressure = this.currentPressure;
    this.currentPressure = pressure;

    if (this.firstReading) {
      this.lastPressure = pressure; // no previous reading to compare
      this.firstReading = false;
    }

    this.display();
  }

  display(): void {
    if (this.currentPressure > this.lastPressure) {
      console.log('Forecast: Improving weather ahead');
    } else if (this.currentPressure < this.lastPressure) {
      console.log('Forecast: Cooler, rainy weather ahead');
    } else {
      console.log('Forecast: More of the same');
    }
  }
}

// --- Usage ---
// The WeatherStation knows nothing about specific display types.
// Adding a new display type requires no changes to WeatherStation.

const station = new WeatherStation();

const currentDisplay = new CurrentConditionsDisplay();
const statsDisplay = new StatisticsDisplay();
const forecastDisplay = new ForecastDisplay();

station.registerDisplay(currentDisplay);
station.registerDisplay(statsDisplay);
station.registerDisplay(forecastDisplay);

console.log('=== Reading 1: 26.5C, 65%, 1013.1hPa ===');
station.setMeasurements(26.5, 65, 1013.1);

console.log('\n=== Reading 2: 28.2C, 70%, 1012.5hPa ===');
station.setMeasurements(28.2, 70, 1012.5);

console.log('\n=== Reading 3: 24.1C, 90%, 1009.2hPa ===');
station.setMeasurements(24.1, 90, 1009.2);

console.log('\n=== Removed StatisticsDisplay ===');
station.removeDisplay(statsDisplay);

console.log('\n=== Reading 4: 22.0C, 85%, 1007.8hPa ===');
station.setMeasurements(22.0, 85, 1007.8);
console.log('(No stats displayed — that display was removed)');
