import React, { useState, useEffect } from "react";

import List from "../../components/list";
import Loader from "../../components/loader";
import Stub from "../../components/stub";

import weatherService, { WeatherItem } from "../../services/weather-service";

import DayWeatherItem from "./day-weather-item";

function DaysWeatherContainer() {
  const [weatherItems, setWeatherItems] = useState<WeatherItem[]>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    weatherService
      .getWeatherByDays()
      .then(weatherItems => {
        setWeatherItems(weatherItems);
        setLoaded(true);
      })
      .catch(error => {
        setError(error.message);
        setLoaded(true);
      });
  }, [setWeatherItems, setLoaded, setError]);

  if (!loaded) return <Loader delay={50} />;
  if (error) return <Stub>{error}</Stub>;
  if (!weatherItems || weatherItems.length === 0)
    return <Stub>Данные отсутствуют</Stub>;

  return (
    <List
      data={weatherItems}
      itemRenderer={({ rowData }) => (
        <DayWeatherItem
          date={rowData.date}
          minTemp={rowData.minTemp}
          maxTemp={rowData.maxTemp}
          iconUrl={rowData.iconUrl}
          state={rowData.state}
        />
      )}
    />
  );
}

export default DaysWeatherContainer;
