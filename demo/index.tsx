import { Box, Container, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import ColorPicker from "../src/components/ColorPicker";
import Editor from "../src/components/Editor";

const COMPONENTS = {
  Editor,
  ColorPicker,
};

type ComponentKey = keyof typeof COMPONENTS;

const App = () => {
  const [componentKey, setComponentKey] = useState<ComponentKey>("Editor");
  const Component = COMPONENTS[componentKey];

  return (
    <Container>
      <Typography variant="h3">Component Viewer</Typography>
      <TextField
        select
        fullWidth
        value={componentKey}
        onChange={(e) => {
          setComponentKey(e.target.value as ComponentKey);
        }}
      >
        {Object.keys(COMPONENTS).map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
      <Box width="100%">
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
