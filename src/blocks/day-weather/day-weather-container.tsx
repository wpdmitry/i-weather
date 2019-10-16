import React, { useState, useEffect } from "react";

import Loader from "../../components/loader";
import Stub from "../../components/stub";

import weatherService, { WeatherItem } from "../../services/weather-service";

import DayWeather from "./day-weather";

function DayWeatherContainer() {
  const [weather, setWeather] = useState<WeatherItem>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    weatherService
      .getWeatherByDay()
      .then(weather => {
        setWeather(weather);
        setLoaded(true);
      })
      .catch(error => {
        setError(error.message);
        setLoaded(true);
      });
  }, [setWeather, setError, setLoaded]);

  if (!loaded) return <Loader delay={50} />;
  if (error) return <Stub>{error}</Stub>;
  if (!weather) return <Stub>Данные отсутствуют</Stub>;

  return (
    <DayWeather
      title={weatherService.getCityName()}
      iconUrl={weather.iconUrl}
      temp={weather.temp}
      date={weather.createdAt}
      state={weather.state}
    />
  );
}

export default DayWeatherContainer;
