export const tempFeel = (
  temp: number
): "hottest" | "hot" | "warm" | "mild" | "cool" | "cold" => {
  if (temp < 5) {
    return "cold";
  } else if (temp < 10) {
    return "cool";
  } else if (temp < 20) {
    return "mild";
  } else if (temp < 30) {
    return "warm";
  } else if (temp < 40) {
    return "hot";
  } else {
    return "hottest";
  }
};
