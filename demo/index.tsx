import { Box, Container, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import ColorPicker from "../src/components/ColorPicker";
import Editor from "../src/components/Editor";

const COMPONENTS = {
  ColorPicker,
  Editor,
};

type ComponentKey = keyof typeof COMPONENTS;

const App = () => {
  const [componentKey, setComponentKey] = useState<ComponentKey>("ColorPicker");
  const Component = COMPONENTS[componentKey];

  return (
    <Container>
      <TextField select>
        {Object.keys(COMPONENTS).map((key) => (
          <MenuItem
            key={key}
            onClick={() => {
              setComponentKey(key as ComponentKey);
            }}
          >
            {key}
          </MenuItem>
        ))}
      </TextField>
      <Box height={300} width={300} position="absolute">
        <Component />
      </Box>
    </Container>
  );
};

const appElement = document.getElementById("app");

if (!appElement) {
  throw Error("app element not found");
}

createRoot(appElement).render(<App />);
