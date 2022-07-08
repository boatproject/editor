import { colors } from "@mui/material";

export const {
  common: { white, black },
  brown,
  lime,
  lightGreen,
  green,
  teal,
  yellow,
  amber,
  orange,
  deepOrange,
  pink,
  red,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  blueGrey,
  grey,
} = colors;

export interface ColorOption {
  name: string;
  value: string;
}

export const DEFAULT_COLOR_OPTIONS = [
  { name: "black", value: black },
  { name: "brown", value: brown[500] },
  { name: "teal", value: teal[500] },
  { name: "green", value: green[500] },
  { name: "light green", value: lightGreen[500] },
  { name: "lime", value: lime[500] },
  { name: "yellow", value: yellow[500] },
  { name: "amber", value: amber[500] },
  { name: "orange", value: orange[500] },
  { name: "deep orange", value: deepOrange[500] },
  { name: "red", value: red[500] },
  { name: "pink", value: pink[500] },
  { name: "purple", value: purple[500] },
  { name: "deep purple", value: deepPurple[500] },
  { name: "indigo", value: indigo[500] },
  { name: "blue", value: blue[500] },
  { name: "light blue", value: lightBlue[500] },
  { name: "cyan", value: cyan[500] },
  { name: "blue grey", value: blueGrey[500] },
  { name: "grey", value: grey[500] },
];

export default colors;
