import { Cloud, CloudRain, CloudSnow, Sun } from "react-feather";
import { TDailyWeather, THourlyWeather, TWeather } from "@typings/weather";

import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import useSWR from "swr";
import { useState } from "react";
import { weatherType } from "@lib/weatherType";

const DAYS: {
  [key: number]: string;
} = {
  0: "오늘",
  1: "내일",
  2: "모레",
};

const Home: NextPage = () => {
  const [updateTime, setUpdateTime] = useState<Date>(new Date());

  const fetcher = (url: string) => {
    setUpdateTime(new Date());
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.weather);
  };

  const { data, error } = useSWR<TWeather>(
    "https://wttr.in/yeongju?lang=en&format=j1",
    fetcher,
    { refreshInterval: 1000 * 60 * 60 * 3 }
  );

  return (
    <div className={styles.container}>
      <table className={styles.weatherTable}>
        <thead className={styles.header}>
          <tr>
            <th></th>
            <th>0</th>
            <th>3</th>
            <th>6</th>
            <th>9</th>
            <th>12</th>
            <th>15</th>
            <th>18</th>
            <th>21</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((dailyWeather: TDailyWeather, index: number) => (
            <tr key={dailyWeather.date} className={styles.weatherDaily}>
              <td className={styles.day}>{DAYS[index]}</td>
              {dailyWeather.hourly.map((hourlyWeather: THourlyWeather) => (
                <td key={hourlyWeather.time} className={styles.weatherHourly}>
                  <div className={styles.temperature}>
                    <span className={styles.tempValue}>
                      {hourlyWeather.FeelsLikeC}
                    </span>
                    <span className={styles.degree}>℃</span>
                  </div>
                  <span className={styles.weatherIcon}>
                    {weatherType(hourlyWeather.weatherCode) === "rain" ? (
                      <CloudRain
                        size={24}
                        strokeWidth="2"
                        className={styles.rain}
                      />
                    ) : weatherType(hourlyWeather.weatherCode) === "snow" ? (
                      <CloudSnow
                        size={24}
                        strokeWidth="1"
                        className={styles.snow}
                      />
                    ) : weatherType(hourlyWeather.weatherCode) === "cloud" ? (
                      <Cloud
                        size={24}
                        strokeWidth="1"
                        className={styles.cloud}
                      />
                    ) : (
                      <Sun size={24} strokeWidth="1" className={styles.sun} />
                    )}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.update}>
        <span>Update: {updateTime.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Home;
