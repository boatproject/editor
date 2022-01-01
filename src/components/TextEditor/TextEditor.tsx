import { CSSProperties } from "react";
import { Stack, styled } from "@mui/material";
import { AnyObject } from "../../types";
import { TextEditorBase, TextEditorBaseProps } from "./TextEditorBase";
import { ErrorBoundary } from "react-error-boundary";
import TextEditorFallback from "./TextEditorFallback";
import { LoggerContext, Logger, defaultLogger } from "../LoggerContext";

export const TextEditorRoot = styled(Stack, {
  name: "TextEditor",
  slot: "Root",
})(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  lineHeight: "1.4375em",
  position: "relative",
  cursor: "text",
  boxSizing: "border-box",
  padding: "4px 0 5px",
  width: "100%",
}));

export interface TextEditorProps<T = AnyObject> extends TextEditorBaseProps<T> {
  className?: string;
  style?: CSSProperties;
  logger?: Logger;
}

export function TextEditor<T = AnyObject>(props: TextEditorProps<T>) {
  const {
    className,
    style,
    logger = defaultLogger,
    ...textEditorProps
  } = props;

  return (
    <LoggerContext.Provider value={logger}>
      <ErrorBoundary FallbackComponent={TextEditorFallback}>
        <TextEditorRoot className={className} style={style}>
          <TextEditorBase {...textEditorProps} />
        </TextEditorRoot>
      </ErrorBoundary>
    </LoggerContext.Provider>
  );
}

export default TextEditor;
