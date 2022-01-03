import { usePlateEditorState } from "@udecode/plate";
import { useEffect, useState } from "react";
import getNodeTypeSet from "./getNodeTypeSet";

/**
 * Get memoized editor selection node types
 */
export default function useNodeTypes() {
  const editor = usePlateEditorState();
  const [nodeTypes, setNodeTypes] = useState<Set<string>>();

  useEffect(() => {
    const selectionNodeTypes = getNodeTypeSet(editor);
    setNodeTypes(selectionNodeTypes);
  }, [editor]);

  return nodeTypes;
}
