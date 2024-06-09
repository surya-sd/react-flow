import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onDelete }) => (
  <div className="context-menu" style={{ top: y, left: x }}>
    <button onClick={onDelete}>Delete Node</button>
  </div>
);

export default ContextMenu;