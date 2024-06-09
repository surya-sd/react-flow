import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface TextNodeData {
  label: string;
}

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data }) => (
  <div className="text-node">
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
    <Handle type="target" position={Position.Top} />
  </div>
);

export default TextNode;