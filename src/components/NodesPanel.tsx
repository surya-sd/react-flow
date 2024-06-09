import React from "react";
import SettingsPanel from "./SettingsPanel";

interface NodesPanelProps {
  selectedNode: any;
  onSave: () => void;
  handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NodesPanel = ({ selectedNode, onSave, handleLabelChange }: NodesPanelProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, "textNode")} draggable>
        Text Node
      </div>
      <button className="save-button" onClick={onSave}>Save</button>
      {selectedNode && <SettingsPanel label={selectedNode.data.label} onLabelChange={handleLabelChange} />}
    </div>
  );
};

export default NodesPanel;
