import { styled } from "@mui/material";
import {
  getMark,
  getPluginType,
  removeMark,
  setMarks,
  usePlateEditorState,
  usePlateEditorRef,
  isMarkActive,
} from "@udecode/plate";
import { useCallback, useEffect, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useMenu } from "../../../hooks";
import { ColorPickerMenu } from "../../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

const ColorPickerButton = styled(ToolbarButton, {
  name: "ColorPicker",
  slot: "ToolbarButton",
  shouldForwardProp: (prop) => prop !== "selectedColor",
})<{ selectedColor?: string }>(({ selectedColor }) => ({
  "&.Mui-selected": {
    color: selectedColor,
  },
}));

export interface ColorPickerToolbarButtonProps
  extends Partial<ToolbarButtonProps> {
  pluginKey: string;
}

/**
 * ColorPicker toolbar component
 * @param props
 */
export function ColorPickerToolbarButton(props: ColorPickerToolbarButtonProps) {
  const { pluginKey, title: tooltip, ...buttonProps } = props;

  const baseId = "color-picker";
  const menuId = `${baseId}-menu-${pluginKey}`;
  const buttonId = `${baseId}-button-${pluginKey}`;

  const editor = usePlateEditorState();
  const editorRef = usePlateEditorRef();
  const type = getPluginType(editor, pluginKey);
  const color: string = editorRef && getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [anchorProps, menuProps] = useMenu(menuId);

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

  const actualColor = selectedColor || color;
  const selected = Boolean(editor?.selection) && isMarkActive(editor, type);

  return (
    <>
      <ColorPickerButton
        {...anchorProps}
        id={buttonId}
        selectedColor={actualColor}
        value={type}
        title={tooltip}
        selected={selected}
        {...buttonProps}
      />
      <ColorPickerMenu
        {...menuProps}
        color={actualColor}
        onSelectColor={updateColor}
        onClearColor={clearColor}
      />
    </>
  );
}

export default ColorPickerToolbarButton;
