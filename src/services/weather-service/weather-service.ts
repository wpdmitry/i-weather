import { dateToolkit } from "../../tools";

import {
  WeatherApiItem,
  SummaryWeatherApiResponse,
  WeatherItem
} from "./models";
import { normalizeWeatherItem } from "./normalizers";

function getCorsProxyingUrl(url: string) {
  return `https://cors-anywhere.herokuapp.com/${url}`;
}

type Cache = {
  itemIds: string[];
  itemById: { [key: string]: WeatherItem };
  lastTimestamp: number;
  lastTimestampById: { [key: string]: number };
  expireTime: number;
  getItems(): WeatherItem[] | null;
  saveItems(items: WeatherItem[]): void;
  getItem(date: Date): WeatherItem | null;
  setItem(item: WeatherItem): void;
  getKey(date: Date): string;
};

const cache: Cache = {
  itemIds: [],
  itemById: {},
  lastTimestamp: 0,
  lastTimestampById: {},
  expireTime: 60 * 1000,
  getItems() {
    const { lastTimestamp, itemIds, itemById } = this;

    const currentTimestamp = Date.now();
    const diff = currentTimestamp - lastTimestamp;

    if (diff < this.expireTime) {
      return itemIds.map(id => itemById[id]);
    }

    return null;
  },
  saveItems(items) {
    this.itemIds = items.map(item => this.getKey(item.date));
    this.itemById = items.reduce(
      (res, item) => ({ ...res, [this.getKey(item.date)]: item }),
      {}
    );
    this.lastTimestamp = Date.now();
  },
  getItem(date) {
    const { lastTimestampById, itemById } = this;
    const currentTimestamp = Date.now();
    const key = this.getKey(date);
    const lastTimestamp = lastTimestampById[key] || 0;
    const diff = currentTimestamp - lastTimestamp;

    if (diff < this.expireTime) {
      return itemById[key];
    }

    return null;
  },
  setItem(item) {
    const key = this.getKey(item.date);
    this.itemById[key] = item;
    this.lastTimestampById[key] = Date.now();
  },
  getKey(date) {
    return dateToolkit.format(date, "yyyy/MM/dd");
  }
};

export default {
  id: 2122265,
  getCityName() {
    return "Москва";
  },
  async getWeatherByDays() {
    const weatherItems = cache.getItems();

    if (weatherItems) {
      return weatherItems;
    }

    return fetch(
      getCorsProxyingUrl(`https://www.metaweather.com/api/location/${this.id}`)
    )
      .then<SummaryWeatherApiResponse>(reponse => reponse.json())
      .then(weatherData => weatherData.consolidated_weather)
      .then(weatherItems => weatherItems.map(normalizeWeatherItem))
      .then(weatherItems => {
        cache.saveItems(weatherItems);
        return weatherItems;
      });
  },
  async getWeatherByDay(date: Date = new Date()) {
    const weatherItem = cache.getItem(date);

    if (weatherItem) {
      return weatherItem;
    }

    const dataPrams = dateToolkit.format(date, "yyyy/MM/dd");
    return fetch(
      getCorsProxyingUrl(
        `https://www.metaweather.com/api/location/${this.id}/${dataPrams}`
      )
    )
      .then<WeatherApiItem[]>(reponse => reponse.json())
      .then<WeatherApiItem>(weatherItems => weatherItems[0])
      .then(normalizeWeatherItem)
      .then(weatherItem => {
        cache.setItem(weatherItem);
        return weatherItem;
      });
  },
  formatTemp(temp: number): string {
    const roundTemp = Math.round(temp);
    return roundTemp > 0 ? `+${roundTemp}` : `${roundTemp}`;
  }
};
