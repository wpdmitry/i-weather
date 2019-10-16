export type WeatherApiItem = {
  id: number;
  weather_state_name: string;
  weather_state_abbr:
    | "sn"
    | "sl"
    | "h"
    | "t"
    | "hr"
    | "lr"
    | "s"
    | "hc"
    | "lc"
    | "c";
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
};

export type SummaryWeatherApiResponse = {
  consolidated_weather: WeatherApiItem[];
  time: string;
  sun_rise: string;
  sun_set: string;
  title: string;
};

export type WeatherState = "snow" | "rain" | "cloudy" | "clear";

export type WeatherItem = {
  id: string;
  iconUrl: string;
  maxTemp: number;
  minTemp: number;
  temp: number;
  createdAt: Date;
  state: WeatherState;
  date: Date;
};
