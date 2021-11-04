import {
  getMark,
  getPlatePluginType,
  isMarkActive,
  removeMark,
  setMarks,
  useEventEditorId,
  useStoreEditorRef,
  useStoreEditorState,
} from "@udecode/plate";
import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { ColorPicker } from "../ColorPicker";
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton";

export interface ToolbarColorPickerProps
  extends Omit<ToolbarButtonProps, "value"> {
  pluginKey?: string;
  icon: ReactNode;
}

/**
 * ColorPicker toolbar component
 * @param props
 */
export function ToolbarColorPicker(props: ToolbarColorPickerProps) {
  const { pluginKey, icon, ...buttonProps } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const editorId = useEventEditorId("focus");
  const editor = useStoreEditorState(editorId);
  const editorRef = useStoreEditorRef(editorId);
  const type = getPlatePluginType(editor, pluginKey);
  const color = editorRef && getMark(editorRef, type);
  const [selectedColor, setSelectedColor] = useState<string>();

  const handleOpenClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
      setSelectedColor(color);

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
        sx={{ color: selectedColor || color }}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleOpenClick}
        value={type}
        selected={!!editor?.selection && isMarkActive(editor, type)}
        {...buttonProps}
      >
        {icon}
      </ToolbarButton>
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

export default ToolbarColorPicker;
