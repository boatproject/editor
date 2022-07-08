import { Box } from "@mui/material";
import { createRoot } from "react-dom/client";
import ColorPicker from "../src/components/ColorPicker";

const App = () => {
  return (
    <Box height={300} width={300} position="absolute">
      <ColorPicker />
    </Box>
  );
};

const appElement = document.getElementById("app");
if (appElement) {
  createRoot(appElement).render(<App />);
}
