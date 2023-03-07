import React, { useState } from "react";
import { Input, InputGroup } from "reactstrap";
import "./index.css";

export default function TreeNode({ node, onAddChild, onDeleteChild }) {
  const [childName, setChildName] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && childName.trim() !== "") {
      onAddChild(node.id, childName.trim());
      setChildName("");
    }
  };

  const handleDelete = () => {
    onDeleteChild(node.id);
  };

  return (
    <div className="node my-1">
      <div className="d-flex justify-content-start align-items-center gap-2">
        <span>{node.name}</span>
        <div>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter child label"
              value={childName}
              onChange={(event) => setChildName(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Node
            </button>
          </InputGroup>
        </div>
      </div>
      {node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAddChild={onAddChild}
              onDeleteChild={onDeleteChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}
