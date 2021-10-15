import { Cloud, CloudRain, CloudSnow, Sun } from "react-feather";
import {
  Container,
  Update,
  WeatherBodyDayCell,
  WeatherBodyInfoCell,
  WeatherBodyInfoSVGWrapper,
  WeatherBodyInfoTempCell,
  WeatherBodyInfoTempValue,
  WeatherBodyRow,
  WeatherHeadCell,
  WeatherTable,
} from "@styles/weather";
import React, { useState } from "react";
import { TDailyWeather, THourlyWeather, TWeather } from "@typings/weather";

import type { NextPage } from "next";
import { tempFeel } from "@lib/tempFeel";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import { weatherType } from "@lib/weatherType";

const DAYS: {
  [key: number]: string;
} = {
  0: "오늘",
  1: "내일",
  2: "모레",
};

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}-${day}`;
};

const WeatherSVG = (code: string) => {
  const options = {
    width: "80%",
    height: "80%",
    strokeWidth: "1",
  };

  switch (code) {
    case "rain":
      return <CloudRain size={24} {...options} strokeWidth="2" />;
    case "snow":
      return <CloudSnow size={24} {...options} />;
    case "cloud":
      return <Cloud size={24} {...options} />;
    default:
      return <Sun size={24} {...options} />;
  }
};

const Home: NextPage = () => {
  const route = useRouter();
  const [updateTime, setUpdateTime] = useState<Date>(new Date());

  const fetcher = (url: string) => {
    setUpdateTime(new Date());
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.weather);
  };

  const { data, error } = useSWR<TWeather>(
    `https://wttr.in/${route.query.location}?lang=en&format=j1`,
    fetcher,
    { refreshInterval: 1000 * 60 * 60 * 3 }
  );

  if (!data)
    return (
      <Container>
        loading...
        <progress />
      </Container>
    );
  if (error) return <Container>failed to load</Container>;

  return (
    <Container>
      <WeatherTable>
        <thead>
          <tr className="times row">
            <WeatherHeadCell className="time"></WeatherHeadCell>
            <WeatherHeadCell className="time">0</WeatherHeadCell>
            <WeatherHeadCell className="time">3</WeatherHeadCell>
            <WeatherHeadCell className="time">6</WeatherHeadCell>
            <WeatherHeadCell className="time">9</WeatherHeadCell>
            <WeatherHeadCell className="time">12</WeatherHeadCell>
            <WeatherHeadCell className="time">15</WeatherHeadCell>
            <WeatherHeadCell className="time">18</WeatherHeadCell>
            <WeatherHeadCell className="time">21</WeatherHeadCell>
          </tr>
        </thead>
        <tbody>
          {data?.map((daily: TDailyWeather, index: number) => (
            <WeatherBodyRow className="days row" key={daily.date}>
              <WeatherBodyDayCell className="day">
                {formatDate(new Date(daily.date))}
              </WeatherBodyDayCell>
              {daily.hourly.map((hourly: THourlyWeather) => (
                <WeatherBodyInfoCell className="hour" key={hourly.time}>
                  <div>
                    <WeatherBodyInfoTempCell
                      className="temp-container"
                      temperature={tempFeel(Number(hourly.tempC))}
                    >
                      <WeatherBodyInfoTempValue
                        className={`temp-value ${tempFeel(
                          Number(hourly.tempC)
                        )}`}
                      >
                        {hourly.tempC}
                      </WeatherBodyInfoTempValue>
                      <span className="temp-degree">℃</span>
                    </WeatherBodyInfoTempCell>
                    <WeatherBodyInfoSVGWrapper
                      weather={weatherType(hourly.weatherCode)}
                    >
                      {WeatherSVG(weatherType(hourly.weatherCode))}
                    </WeatherBodyInfoSVGWrapper>
                  </div>
                </WeatherBodyInfoCell>
              ))}
            </WeatherBodyRow>
          ))}
        </tbody>
      </WeatherTable>
      {error && <div>에러가 발생했습니다.</div>}
      <Update>
        <span>Update: {updateTime.toLocaleString()}</span>
      </Update>
    </Container>
  );
};

export default Home;
