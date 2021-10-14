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
  minHeight: "100vh",
  height: "100vh",
  width: "100%",
  padding: "2.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Weather = styled("div", {
  display: "flex",
  flexDirection: "column",

  "& > .times": {
    display: "flex",
    flexDirection: "row",

    "& > .time": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.2rem",
      paddingBottom: "1rem",

      "&:not(:first-child)": {
        borderBottom: "1px solid $mauve9",
      },
    },
  },

  "& > .days": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    "& > .day": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem",
    },

    "& > .hour": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem 1rem",
      gap: "1rem",

      "& > .temp-container": {
        "& > .temp-value": {
          fontSize: "1.25rem",

          "&.cold": {
            color: "$blue7",
            fontWeight: "900",
          },
          "&.cool": {
            color: "$blue9",
            fontWeight: "700",
          },
          "&.mild": {
            color: "$mauve12",
          },
          "&.warm": {
            color: "$orange9",
            fontWeight: "700",
          },
          "&.hot": {
            color: "$tomato9",
            fontWeight: "900",
          },
        },

        "& > .temp-degree": {
          fontSize: "0.875rem",
          fontWeight: "300",
        },
      },

      "& > .svg-container": {
        width: "8vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& > .rain": {
          color: "$blue9",
        },
        "& > .snow": {
          color: "$blue4",
        },
        "& > .cloud": {
          color: "$mauve9",
        },
        "& > .sun": {
          color: "$orange8",
        },
      },
    },

    "&:not(:last-child) > .hour": {
      borderBottom: "1px solid $mauve7",
    },
  },

  "& > .row": {
    "& > div": {
      "&:first-child": {
        width: "4%",
      },

      "&:not(:first-child)": {
        width: "12%",
      },
    },
  },
});

export const Update = styled("div", {
  marginLeft: "auto",
  color: "$mauve9",
  fontSize: "0.875rem",
});
