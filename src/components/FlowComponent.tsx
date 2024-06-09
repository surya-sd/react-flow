import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import NodesPanel from "./NodesPanel";
import TextNode, { TextNodeData } from "./TextNode";
import ContextMenu from "./ContextMenu";

const nodeTypes = { textNode: TextNode };

const initialNodes: Node<TextNodeData>[] = [
  {
    id: "1",
    type: "textNode",
    position: { x: 250, y: 5 },
    data: { label: "Hello" },
  },
];

const initialEdges: Edge[] = [];

const FlowComponent: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<TextNodeData> | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: Node<TextNodeData> } | null>(null);

  const { project } = useReactFlow();

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = () => {
    const hasDisconnectedNodes = nodes.some(
      (node) => !edges.some((edge) => edge.source === node.id || edge.target === node.id),
    );
    if (hasDisconnectedNodes) {
      alert("Error: There are nodes with empty target handles.");
    } else {
      alert("Flow saved");
      console.log("Flow saved:", { nodes, edges });
      setSelectedNode(null);
    }
  };

  const onNodeClick = (event: React.MouseEvent, node: Node<TextNodeData>) => { 
    console.log(event);
    setSelectedNode(node);
  };

  const onNodeContextMenu = (event: React.MouseEvent, node: Node<TextNodeData>) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, node });
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = (event.target as HTMLDivElement).getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    if (!type) {
      return;
    }

    const position = project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode: Node<TextNodeData> = {
      id: (nodes.length + 1).toString(),
      type,
      position,
      data: { label: `Node ${nodes.length + 1}` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode?.id ? { ...node, data: { ...node.data, label: event.target.value } } : node,
    );
    setNodes(updatedNodes);

    setSelectedNode((prev) => prev && { ...prev, data: { ...prev.data, label: event.target.value } });
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setContextMenu(null);
  };

  useEffect(() => {
    if (selectedNode) {
      const node = nodes.find((n) => n.id === selectedNode.id);
      setSelectedNode(node || null);
    }
  }, [nodes, selectedNode]);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
        {contextMenu && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y} onDelete={() => deleteNode(contextMenu.node.id)} />
        )}
      </div>
      <NodesPanel handleLabelChange={handleLabelChange} onSave={onSave} selectedNode={selectedNode} />
    </div>
  );
};

export default FlowComponent;
