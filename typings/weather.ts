export type THourlyWeather = {
  FeelsLikeC: string;
  chanceofrain: string;
  time: string;
  weatherCode: string;
};

export type TDailyWeather = {
  hourly: THourlyWeather[];
  date: string;
};

export type TWeather = TDailyWeather[];
