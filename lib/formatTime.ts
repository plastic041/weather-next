export const formatTime = (time: string): string => {
  const timesInHHMM: {
    [key: string]: string;
  } = {
    "0": "0",
    "300": "3",
    "600": "6",
    "900": "9",
    "1200": "12",
    "1500": "3",
    "1800": "6",
    "2100": "9",
  };

  return timesInHHMM[time];
};
