import {
  getMark,
  getPlatePluginType,
  isMarkActive,
  removeMark,
  setMarks,
  usePlateEditorState,
  usePlateEditorRef,
} from "@udecode/plate";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import hasSelection from "../../../plate/hasSelection";
import { ColorPicker } from "../../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface ColorPickerToolbarButtonProps
  extends Omit<ToolbarButtonProps, "value"> {
  pluginKey?: string;
}

function useMenuAnchor() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
  };
}

/**
 * ColorPicker toolbar component
 * @param props
 */
export function ColorPickerToolbarButton(props: ColorPickerToolbarButtonProps) {
  const { pluginKey, ...buttonProps } = props;

  const { anchorEl, open, handleOpen, handleClose } = useMenuAnchor();

  const editor = usePlateEditorState();
  const editorRef = usePlateEditorRef();
  const type = getPlatePluginType(editor, pluginKey);
  const color = editorRef && getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = useState<string>();

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
      // setSelectedColor(undefined);

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

  return (
    <>
      <ToolbarButton
        id={"color-picker-button"}
        sx={{
          "&.Mui-selected": {
            color: selectedColor || color,
          },
        }}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleOpen}
        value={type}
        selected={hasSelection(editor) && isMarkActive(editor, type)}
        {...buttonProps}
      />
      <ColorPicker
        id={menuId}
        open={open}
        anchorEl={anchorEl}
        color={selectedColor || color}
        onSelectColor={updateColor}
        clearColor={clearColor}
        onClose={handleClose}
      />
    </>
  );
}

export default ColorPickerToolbarButton;
