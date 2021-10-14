import { Cloud, CloudRain, CloudSnow, Sun } from "react-feather";
import { Container, Update, Weather } from "@styles/weather";
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

  const SVGOptions = {
    width: "80%",
    height: "80%",
    strokeWidth: "1",
  };

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
      <Weather>
        <div className="times row">
          <div className="time"></div>
          <div className="time">0</div>
          <div className="time">3</div>
          <div className="time">6</div>
          <div className="time">9</div>
          <div className="time">12</div>
          <div className="time">15</div>
          <div className="time">18</div>
          <div className="time">21</div>
        </div>
        {data?.map((daily: TDailyWeather, index: number) => (
          <div className="days row" key={daily.date}>
            <div className="day">{DAYS[index]}</div>
            {daily.hourly.map((hourly: THourlyWeather) => (
              <div key={hourly.time} className="hour">
                <div className="temp-container">
                  <span
                    className={`temp-value ${tempFeel(Number(hourly.tempC))}`}
                  >
                    {hourly.tempC}
                  </span>
                  <span className="temp-degree">℃</span>
                </div>
                <div className="svg-container">
                  {weatherType(hourly.weatherCode) === "rain" ? (
                    <CloudRain
                      {...SVGOptions}
                      strokeWidth="2"
                      className="rain"
                    />
                  ) : weatherType(hourly.weatherCode) === "snow" ? (
                    <CloudSnow {...SVGOptions} className="snow" />
                  ) : weatherType(hourly.weatherCode) === "cloud" ? (
                    <Cloud {...SVGOptions} className="cloud" />
                  ) : (
                    <Sun {...SVGOptions} className="sun" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Weather>
      {error && <div>에러가 발생했습니다.</div>}
      <Update>
        <span>Update: {updateTime.toLocaleString()}</span>
      </Update>
    </Container>
  );
};

export default Home;
