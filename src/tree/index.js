import React, { useCallback } from "react";
import { useImmer } from "use-immer";

import TreeNode from "../treeNode";
import "./index.css";
import data from "./data.json";
import { addNode, deleteNode, deleteNodeRecursively } from "../utils/treeUtils";
export default function Tree() {
  const [treeData, setTreeData] = useImmer(data);

  const handleAddChild = useCallback(
    (parentId, newChildName) => {
      setTreeData((draft) => {
        addNode(parentId, { name: newChildName, children: [] }, draft);
      });
    },
    [setTreeData]
  );

  const handleDeleteChild = useCallback(
    (nodeId) => {
      setTreeData((draft) => {
        deleteNodeRecursively(nodeId, draft);
      });
    },
    [setTreeData]
  );

  return (
    <div className="tree">
      <TreeNode
        node={treeData}
        onAddChild={handleAddChild}
        onDeleteChild={handleDeleteChild}
      />
    </div>
  );
}
