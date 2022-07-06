import {
  getMark,
  getPluginType,
  removeMark,
  setMarks,
  usePlateEditorState,
  usePlateEditorRef,
  focusEditor,
  select,
} from "@udecode/plate-core";
import useEvent from "../../hooks/useEvent";
import useMenu from "../../hooks/useMenu";
import ColorPickerMenu from "../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface ColorPickerToolbarButtonProps
  extends Partial<ToolbarButtonProps> {
  pluginKey: string;
}

/**
 * ColorPicker toolbar component
 * @param props
 */
export default function ColorPickerToolbarButton(
  props: ColorPickerToolbarButtonProps
) {
  const { pluginKey, title: tooltip, ...buttonProps } = props;

  const baseId = "color-picker";
  const menuId = `${baseId}-menu-${pluginKey}`;
  const buttonId = `${baseId}-button-${pluginKey}`;

  const editor = usePlateEditorState();
  const editorRef = usePlateEditorRef();
  const type = editor ? getPluginType(editor, pluginKey) : "";
  const color = editor ? getMark(editor, type) : "";
  const [anchorProps, menuProps] = useMenu(menuId);
  const { onClose } = menuProps;

  const updateColor = useEvent((color: string) => {
    if (!editorRef || !editor || !editor.selection) {
      return;
    }

    select(editor, editor.selection);
    focusEditor(editor);

    setMarks(editor, { [type]: color });
    onClose();
  });

  const clearColor = useEvent(() => {
    if (!editorRef || !editor || !editor.selection) {
      return;
    }

    select(editor, editor.selection);
    focusEditor(editor);

    if (color) {
      removeMark(editor, { key: type });
    }
    onClose();
  });

  return (
    <>
      <ToolbarButton
        {...anchorProps}
        id={buttonId}
        value={type}
        title={tooltip}
        selected={Boolean(color)}
        sx={{
          "&.Mui-selected": {
            color,
          },
        }}
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
