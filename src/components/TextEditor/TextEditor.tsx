import { Stack, styled } from "@mui/material";
import { type Value } from "@udecode/plate-core";
import { type CSSProperties, memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoggerContext, { type Logger } from "./LoggerContext";
import TextEditorBase, { type TextEditorBaseProps } from "./TextEditorBase";
import TextEditorFallback from "./TextEditorFallback";

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
  width: "100%",
}));

export interface TextEditorProps<V extends Value = Value>
  extends TextEditorBaseProps<V> {
  /**
   * CSS class passed to root of the component
   */
  className?: string;
  /**
   * CSS styles passed to root of the component
   */
  style?: CSSProperties;
  /**
   * Optionally pass a custom logger to log messages
   */
  logger?: Logger;
}

export const TextEditor = memo(function TextEditor<V extends Value = Value>(
  props: TextEditorProps<V>
) {
  const { className, style, logger = console, ...textEditorProps } = props;

  return (
    <TextEditorRoot className={className} style={style}>
      <LoggerContext.Provider value={logger}>
        <ErrorBoundary FallbackComponent={TextEditorFallback}>
          <TextEditorBase<V> {...textEditorProps} />
        </ErrorBoundary>
      </LoggerContext.Provider>
    </TextEditorRoot>
  );
});

export default TextEditor;
