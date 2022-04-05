import { styled } from "@mui/material";
import {
  getMark,
  getPluginType,
  removeMark,
  setMarks,
  usePlateEditorState,
  usePlateEditorRef,
  PlateEditor,
} from "@udecode/plate-core";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useEventCallback, useMenu } from "../../../hooks";
import { ColorPickerMenu } from "../../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

function setColorMark(editor: PlateEditor, type: string, color: string) {
  if (editor?.selection) {
    Transforms.select(editor, editor.selection);
    ReactEditor.focus(editor);

    setMarks(editor, { [type]: color });
  }
}

function clearColorMark(editor: PlateEditor, type: string, color: string) {
  if (editor?.selection) {
    Transforms.select(editor, editor.selection);
    ReactEditor.focus(editor);

    if (color) {
      removeMark(editor, { key: type });
    }
  }
}

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
  const color: string = editor && getMark(editor, type);
  const [anchorProps, menuProps] = useMenu(menuId);
  const { onClose } = menuProps;

  const updateColor = useEventCallback(
    (color: string) => {
      setColorMark(editorRef, type, color);
      onClose();
    },
    [editorRef, type, onClose]
  );

  const clearColor = useEventCallback(() => {
    clearColorMark(editorRef, type, color);
    onClose();
  }, [editorRef, type, color, onClose]);

  return (
    <>
      <ColorPickerButton
        {...anchorProps}
        id={buttonId}
        selectedColor={color}
        value={type}
        title={tooltip}
        selected={Boolean(color)}
        {...buttonProps}
      />
      <ColorPickerMenu
        {...menuProps}
        color={color}
        onSelectColor={updateColor}
        onClearColor={clearColor}
      />
    </>
  );
}
