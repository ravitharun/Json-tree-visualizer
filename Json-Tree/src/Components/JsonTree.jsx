import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

function JsonTree({ data,theme }) {
    console.log(theme,'theme')
  // Converts JSON into boxes [NodeS] and arrows [edge]
  const createTree = (obj, parent = null, level = 0, index = 0) => {
    const nodes = [];
    const edges = [];

    Object.entries(obj).forEach(([key, value], i) => {
      const id = `${key}-${level}-${i}`;
      const label =
        typeof value === "object" ? key : `${key}: ${String(value)}`;

      // Create one box [node]
      nodes.push({
        id,
        data: { label },
        position: { x: level * 250, y: (index + i) * 100 },
        style: {
          background: "orange",
          border: "1px solid #d1d5db",
          padding: 10,
          borderRadius: 8,
        },
      });

      // Draw arrow from parent → this box
      if (parent) {
        edges.push({
          id: `${parent}-${id}`,
          source: parent,
          target: id,
  
          animated: true,
       
        });
      }

      // If value is an object, go inside it
      if (typeof value === "object" && value !== null) {
        const { nodes: childNodes, edges: childEdges } = createTree(
          value,
          id,
          level + 1,
          index + i + 1
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = createTree(JSON.parse(data));

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default JsonTree;
