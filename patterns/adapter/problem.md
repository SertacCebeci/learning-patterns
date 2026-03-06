# Weather Dashboard Integration

## Background

You are building a weather dashboard application. Your app has a unified `WeatherProvider` interface that all components depend on:

```typescript
interface WeatherProvider {
  getCurrentTemperature(city: string): number;
  getHumidity(city: string): number;
  getForecast(city: string, days: number): string[];
}
```

## The Challenge

Your team has decided to switch from the old weather API to a new third-party weather service called `OpenMeteoSDK`. However, the new SDK has a completely different interface:

```typescript
class OpenMeteoSDK {
  fetchWeatherData(params: { location: string; units: "metric" | "imperial" }): {
    temp_c: number;
    humidity_pct: number;
  };

  fetchForecastData(params: { location: string; num_days: number; units: "metric" | "imperial" }): {
    daily_summaries: string[];
  };
}
```

Key differences:
- The SDK uses a single `fetchWeatherData()` method for both temperature and humidity, returning them as an object
- City names need to be converted to lowercase with underscores replacing spaces (e.g., "New York" becomes "new_york")
- Temperature is returned in Celsius by default, but your app expects Fahrenheit
- The forecast method has a different name and parameter structure

## Requirements

1. Your existing dashboard components must continue to use the `WeatherProvider` interface without any changes
2. You cannot modify the `OpenMeteoSDK` class (it's from an npm package)
3. Implement a solution that bridges the gap between your app's expected interface and the SDK's actual interface
4. Handle the temperature conversion from Celsius to Fahrenheit: `F = C * 9/5 + 32`
5. Handle the city name format conversion

## Constraints

- Do not change the `WeatherProvider` interface
- Do not change the `OpenMeteoSDK` class
- Your solution should be a single class that the rest of the app can use as a drop-in replacement
