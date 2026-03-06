// Adapter Pattern
// Converts the interface of a class into another interface the client expects.
// Lets classes work together that couldn't otherwise because of incompatible interfaces.

// --- The interface our app expects ---

interface WeatherProvider {
  getCurrentTemperature(city: string): number;
  getHumidity(city: string): number;
  getForecast(city: string, days: number): string[];
}

// --- A third-party weather SDK with a completely different API ---

class OpenMeteoSDK {
  fetchWeatherData(params: { location: string; units: "metric" | "imperial" }): {
    temp_c: number;
    humidity_pct: number;
  } {
    // Simulated weather data based on location
    console.log(`  [OpenMeteoSDK] Fetching weather for "${params.location}" (${params.units})`);
    return { temp_c: 22, humidity_pct: 65 };
  }

  fetchForecastData(params: { location: string; num_days: number; units: "metric" | "imperial" }): {
    daily_summaries: string[];
  } {
    console.log(`  [OpenMeteoSDK] Fetching ${params.num_days}-day forecast for "${params.location}"`);
    const summaries = Array.from({ length: params.num_days }, (_, i) => `Day ${i + 1}: Partly cloudy`);
    return { daily_summaries: summaries };
  }
}

// --- The Adapter ---
// Wraps the incompatible SDK and exposes our WeatherProvider interface.

class OpenMeteoAdapter implements WeatherProvider {
  private sdk: OpenMeteoSDK;

  constructor(sdk: OpenMeteoSDK) {
    this.sdk = sdk;
  }

  // Convert city name to the format expected by the SDK:
  // "New York" -> "new_york"
  private formatLocation(city: string): string {
    return city.toLowerCase().replace(/\s+/g, "_");
  }

  // Convert Celsius to Fahrenheit: F = C * 9/5 + 32
  private celsiusToFahrenheit(celsius: number): number {
    return celsius * 9 / 5 + 32;
  }

  getCurrentTemperature(city: string): number {
    const data = this.sdk.fetchWeatherData({
      location: this.formatLocation(city),
      units: "metric",
    });
    return this.celsiusToFahrenheit(data.temp_c);
  }

  getHumidity(city: string): number {
    const data = this.sdk.fetchWeatherData({
      location: this.formatLocation(city),
      units: "metric",
    });
    return data.humidity_pct;
  }

  getForecast(city: string, days: number): string[] {
    const data = this.sdk.fetchForecastData({
      location: this.formatLocation(city),
      num_days: days,
      units: "metric",
    });
    return data.daily_summaries;
  }
}

// --- Client code ---
// Works only with WeatherProvider. Doesn't know or care that OpenMeteoSDK is behind it.

function showDashboard(provider: WeatherProvider, city: string): void {
  console.log(`\nWeather Dashboard for ${city}`);
  console.log("─".repeat(35));

  const temp = provider.getCurrentTemperature(city);
  console.log(`  Temperature: ${temp}°F`);

  const humidity = provider.getHumidity(city);
  console.log(`  Humidity: ${humidity}%`);

  const forecast = provider.getForecast(city, 3);
  console.log(`  Forecast:`);
  forecast.forEach((day) => console.log(`    - ${day}`));
}

const sdk = new OpenMeteoSDK();
const provider = new OpenMeteoAdapter(sdk);

showDashboard(provider, "New York");
showDashboard(provider, "San Francisco");
