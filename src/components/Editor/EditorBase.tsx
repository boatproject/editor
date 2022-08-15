import { type Value } from "@udecode/plate-core";
import { type CSSProperties } from "react";
import { ErrorBoundary } from "react-error-boundary";
import EditorFallback from "../EditorFallback";
import { EditorBaseStack } from "./styled";
import EditorCore, { type EditorCoreProps } from "./EditorCore";

export interface EditorBaseProps<V extends Value = Value>
  extends EditorCoreProps<V> {
  /**
   * CSS class passed to root of the component
   */
  className?: string;
  /**
   * CSS styles passed to root of the component
   */
  style?: CSSProperties;
}

export default function EditorBase<V extends Value = Value>({
  className,
  style,
  ...textEditorProps
}: EditorBaseProps<V>) {
  return (
    <EditorBaseStack className={className} style={style}>
      <ErrorBoundary FallbackComponent={EditorFallback}>
        <EditorCore<V> {...textEditorProps} />
      </ErrorBoundary>
    </EditorBaseStack>
  );
}
