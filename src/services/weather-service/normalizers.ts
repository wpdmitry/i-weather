import { WeatherApiItem, WeatherItem } from "./models";

const weatherStates = {
  "sn": "snow",
  "sl": "snow",
  "h": "snow",
  "t": "rain",
  "hr": "rain",
  "lr": "rain",
  "s": "rain",
  "hc": "cloudy",
  "lc": "cloudy",
  "c": "clear"
} as const;

export function normalizeWeatherItem({
  id,
  max_temp,
  min_temp,
  the_temp,
  created,
  weather_state_abbr,
  applicable_date
}: WeatherApiItem): WeatherItem {
  return {
    id: String(id),
    iconUrl: `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`,
    maxTemp: max_temp,
    minTemp: min_temp,
    temp: the_temp,
    createdAt: new Date(created),
    date: new Date(applicable_date),
    state: weatherStates[weather_state_abbr]
  };
}
