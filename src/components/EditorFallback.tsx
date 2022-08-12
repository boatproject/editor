import RestartAlt from "@mui/icons-material/RestartAlt";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import type { FallbackProps } from "react-error-boundary";

/**
 * Perform an effect once
 */
function useOnce(effect: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      effect();
      hasRun.current = true;
    }
  }, [effect]);
}

/**
 * Simple fallback to display if a rendering error occurs within the editor
 */
export default function EditorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  useOnce(() => {
    console.error(error);
  });

  return (
    <Stack>
      <Alert severity="error">
        <AlertTitle>Editor Error</AlertTitle>
        There was an issue with the text editor.
      </Alert>
      <Button
        onClick={resetErrorBoundary}
        startIcon={<RestartAlt />}
        sx={{ mt: 2 }}
      >
        Reset Editor
      </Button>
    </Stack>
  );
}
