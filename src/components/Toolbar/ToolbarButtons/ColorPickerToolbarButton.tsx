import { styled } from "@mui/material";
import {
  getMark,
  getPluginType,
  removeMark,
  setMarks,
  usePlateEditorState,
  usePlateEditorRef,
} from "@udecode/plate";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { hasMarkSelected } from "../../../plate";
import { ColorPicker } from "../../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface ColorPickerToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  pluginKey: string;
}

const ColorPickerButton = styled(
  (props: Omit<ToolbarButtonProps, "color">) => <ToolbarButton {...props} />,
  {
    name: "ColorPicker",
    slot: "ToolbarButton",
    shouldForwardProp: (prop) => prop !== "color",
  }
)<{ color?: string }>(({ color }) => ({
  "&.Mui-selected": {
    color,
  },
}));

/**
 * ColorPicker toolbar component
 * @param props
 */
export function ColorPickerToolbarButton(props: ColorPickerToolbarButtonProps) {
  const { pluginKey, ...buttonProps } = props;

  const editor = usePlateEditorState();
  const editorRef = usePlateEditorRef();
  const type = getPluginType(editor, pluginKey);
  const color: string = editorRef && getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const updateColor = useCallback(
    (color: string) => {
      if (editorRef && editor && editor.selection) {
        setSelectedColor(color);

        Transforms.select(editorRef, editor.selection);
        ReactEditor.focus(editorRef);

        setMarks(editor, { [type]: color });
      }
    },
    [editorRef, editor, type]
  );

  const clearColor = useCallback(() => {
    if (editorRef && editor && editor.selection) {
      setSelectedColor(undefined);

      Transforms.select(editorRef, editor.selection);
      ReactEditor.focus(editorRef);

      if (selectedColor) {
        removeMark(editor, { key: type });
      }
    }
  }, [editorRef, editor, type, selectedColor]);

  useEffect(() => {
    if (editor?.selection) {
      setSelectedColor(color);
    }
  }, [color, editor?.selection]);

  const menuId = "color-picker-menu";
  const actualColor = selectedColor || color;

  return (
    <>
      <ColorPickerButton
        id="color-picker-button"
        color={actualColor}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleOpen}
        value={type}
        selected={hasMarkSelected(editor, type)}
        {...buttonProps}
      />
      <ColorPicker
        id={menuId}
        open={open}
        anchorEl={anchorEl}
        color={actualColor}
        onSelectColor={updateColor}
        clearColor={clearColor}
        onClose={handleClose}
      />
    </>
  );
}

export default ColorPickerToolbarButton;
