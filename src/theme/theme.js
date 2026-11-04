import { createTheme } from "@mantine/core";

// Paleta inspirada en las calles de una pista de atletismo / piscina
// lane  -> color principal (verde azulado profundo)
// medal -> acento puntual (ámbar)
const lane = [
  "#e6f6f7", "#c5e9eb", "#9fd9dd", "#73c6cc", "#48b1b9",
  "#2497a0", "#0e7c86", "#0b6870", "#08535a", "#053d42",
];

const medal = [
  "#fff6e8", "#feeacc", "#fcd9a3", "#f9c677", "#f5b558",
  "#f2a541", "#d98d2c", "#b37121", "#8c5717", "#663e0e",
];

export const theme = createTheme({
  primaryColor: "lane",
  primaryShade: 6,
  colors: { lane, medal },
  black: "#14213D",
  fontFamily: "Barlow, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily: "'Barlow Semi Condensed', Barlow, system-ui, sans-serif",
    fontWeight: "700",
  },
  defaultRadius: "md",
  cursorType: "pointer",
});
