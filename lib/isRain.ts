export const weatherType = (
  code: string
): "rain" | "snow" | "cloud" | "sun" => {
  const wwoCode = {
    rain: [
      "176",
      "179",
      "182",
      "185",
      "200",
      "263",
      "281",
      "284",
      "293",
      "296",
      "299",
      "302",
      "305",
      "308",
      "311",
      "314",
      "317",
      "350",
      "353",
      "356",
      "359",
      "362",
      "365",
      "374",
      "377",
      "389",
    ],
    cloud: ["116", "119", "122"],
    snow: [
      "227",
      "230",
      "320",
      "323",
      "326",
      "329",
      "332",
      "335",
      "338",
      "368",
      "371",
      "392",
      "395",
    ],
  };
  if (wwoCode.rain.includes(code)) {
    return "rain";
  }
  if (wwoCode.cloud.includes(code)) {
    return "cloud";
  }
  if (wwoCode.snow.includes(code)) {
    return "snow";
  }
  return "sun";
};
