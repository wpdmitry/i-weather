import React from "react";

import { bcm, dateToolkit } from "../../tools";
import weatherService from "../../services/weather-service";

import styles from "./day-weather.module.scss";

const b = bcm(styles);

type DayWeatherProps = {
  iconUrl: string;
  temp: number;
  date: Date;
  title: string;
  state: "cloudy" | "rain" | "snow" | "clear";
};

function DayWeather({ title, temp, iconUrl, date, state }: DayWeatherProps) {
  return (
    <div className={b()}>
      <div className={b("background", { state })} />
      <img src={iconUrl} className={b("icon")} alt="Иконка погоды" />
      <div className={b("temperature")}>{weatherService.formatTemp(temp)}</div>
      <div className={b("time")}>{dateToolkit.format(date, "HH:mm")}</div>
      <div className={b("location")}>{title}</div>
    </div>
  );
}

export default DayWeather;
