import { colors } from "@mui/material";

export type ColorOption = [name: string, value: string];

export const DEFAULT_COLOR_OPTIONS: ColorOption[] = [
  ["black", colors.common.black],
  ["brown", colors.brown[500]],
  ["teal", colors.teal[500]],
  ["green", colors.green[500]],
  ["light green", colors.lightGreen[500]],
  ["lime", colors.lime[500]],
  ["yellow", colors.yellow[500]],
  ["amber", colors.amber[500]],
  ["orange", colors.orange[500]],
  ["deep orange", colors.deepOrange[500]],
  ["red", colors.red[500]],
  ["pink", colors.pink[500]],
  ["purple", colors.purple[500]],
  ["deep purple", colors.deepPurple[500]],
  ["indigo", colors.indigo[500]],
  ["blue", colors.blue[500]],
  ["light blue", colors.lightBlue[500]],
  ["cyan", colors.cyan[500]],
  ["blue grey", colors.blueGrey[500]],
  ["grey", colors.grey[500]],
];
