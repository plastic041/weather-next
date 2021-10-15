import { blue, mauve, orange, tomato } from "@radix-ui/colors";

import { createStitches } from "@stitches/react";

const { styled } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...mauve,
      ...orange,
      ...tomato,
    },
  },
});

export const Container = styled("div", {
  height: "100vh",
  width: "100vw",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  flexDirection: "column",
});

export const WeatherTable = styled("table", {
  borderCollapse: "collapse",
});

export const WeatherHeadCell = styled("th", {
  paddingBottom: "1rem",
  fontSize: "1.25rem",
  fontWeight: "500",

  "&:not(:first-child)": {
    borderBottom: "1px solid $mauve9",
  },
});

export const WeatherBodyRow = styled("tr", {
  "&:not(:last-child) td:not(:first-child)": {
    borderBottom: "1px solid $mauve9",
  },
});

export const WeatherBodyDayCell = styled("td", {
  wordBreak: "keep-all",
  fontSize: "1.5rem",
  padding: "0.5rem",
});

export const WeatherBodyInfoCell = styled("td", {
  "& > div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem 1rem",
    gap: "1rem",
  },
});

export const WeatherBodyInfoTempCell = styled("div", {
  display: "flex",
  flexDirection: "row",
  padding: "0 1rem",

  variants: {
    temperature: {
      cold: {
        backgroundColor: "$blue9",
        color: "$blue1",
        fontWeight: 700,
      },
      cool: {
        backgroundColor: "$blue5",
        color: "$blue12",
      },
      mild: {
        color: "$mauve12",
      },
      warm: {
        backgroundColor: "$orange9",
        color: "$orange1",
        fontWeight: "700",
      },
      hot: {
        backgroundColor: "$tomato9",
        color: "$tomato1",
        fontWeight: "900",
      },
      hottest: {
        backgroundColor: "$tomato9",
        color: "$tomato1",
      },
    },
  },
});

export const WeatherBodyInfoTempValue = styled("span", {
  fontSize: "1.25rem",
});

export const WeatherBodyInfoTempUnit = styled("span", {
  fontSize: "0.75rem",
  fontWeight: 300,
});

export const WeatherBodyInfoSVGWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  variants: {
    weather: {
      sun: {
        color: "$orange7",
      },
      cloud: {
        color: "$mauve9",
      },
      rain: {
        color: "$blue9",
      },
      snow: {
        color: "$tomato4",
      },
    },
  },
});

export const Update = styled("div", {
  marginLeft: "auto",
  color: "$mauve9",
  fontSize: "0.875rem",
});
