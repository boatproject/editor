import { RestartAlt } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import type { FallbackProps } from "react-error-boundary";
import { useLogger } from "./LoggerContext";

/**
 * Simple fallback to display if a rendering error occurs within the editor
 * @param props
 */
export default function TextEditorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const logger = useLogger();

  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      logger.error(error);
      hasLogged.current = true;
    }
  }, [logger, error]);

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
