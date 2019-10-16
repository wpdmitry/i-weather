import React from "react";

import { bcm, dateToolkit } from "../../tools";
import weatherService from "../../services/weather-service";

import styles from "./day-weather-item.module.scss";

const b = bcm(styles);

type DayWeatherItemProps = {
  date: Date;
  iconUrl: string;
  maxTemp: number;
  minTemp: number;
  state: "cloudy" | "rain" | "snow" | "clear";
};

function DayWeatherItem({
  date,
  iconUrl,
  maxTemp,
  minTemp,
  state
}: DayWeatherItemProps) {
  return (
    <div className={b({ state })}>
      <div className={b("wrapper")}>
        <div>
          <div className={b("weekday-name")}>
            {dateToolkit.formatToWeekName(date, true)}
          </div>
          <div className={b("date")}>{dateToolkit.format(date, "dd MMMM")}</div>
        </div>
        <div className={b("spacer")} />
        <div className={b("temperature")}>{`${weatherService.formatTemp(
          maxTemp
        )} / ${weatherService.formatTemp(minTemp)}`}</div>
        <img src={iconUrl} className={b("icon")} alt="Иконка погоды" />
      </div>
    </div>
  );
}

export default DayWeatherItem;
