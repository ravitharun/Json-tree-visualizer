import React, { useContext, useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { AppContext } from "./Theme";

function JsonTree({ data }) {
  // console.log("Incoming data:", data);
  const { Dfvalue, setDfvalue, JsonSearch, setsearchJson } =
    useContext(AppContext);
  console.log({ Dfvalue, JsonSearch, setsearchJson });

  const background = [
    "linear-gradient(to right, #4facfe, #00f2fe)", // Blue Sky
    "linear-gradient(to right, #43e97b, #38f9d7)", // Mint Green
    "linear-gradient(to right, #fa709a, #fee140)", // Pink Sunrise
    "linear-gradient(to right, #a18cd1, #fbc2eb)", // Lavender Dream
    "linear-gradient(to right, #f093fb, #f5576c)", // Warm Sunset
    "linear-gradient(to right, #5ee7df, #b490ca)", // Aqua Purple
    "linear-gradient(to right, #667eea, #764ba2)", // Indigo Bloom
    "linear-gradient(to right, #30cfd0, #330867)", // Ocean Deep
    "linear-gradient(to right, #fdfbfb, #ebedee)", // Soft Gray
    "linear-gradient(to right, #ff9a9e, #fad0c4)", // Pastel Pink
  ];

 let randomIndex = Math.floor(Math.random() * background.length);
let Color = background[randomIndex];

  console.log(Color);
  // ✅ safety check — don't process if data is null/undefined/non-object
  if (!data || typeof data !== "object") {
    return <p className="text-center text-red-500">No valid JSON data</p>;
  }

  // ✅ recursive function to convert JSON → nodes + edges
  const createTree = (obj, parent = null, level = 0, index = 0) => {
    const nodes = [];
    const edges = [];

    Object.entries(obj).forEach(([key, value], i) => {
      const id = `${key}-${level}-${i}`;
      const label =
        typeof value === "object" ? key : `${key}: ${String(value)}`;

      // create node
      nodes.push({
        id,
        data: { label },
        position: { x: level * 250, y: (index + i) * 100 },
        style: {
          background: Color,

          border: "1px solid #d1d5db",
          padding: 10,
          borderRadius: 8,
          color: "white",
          fontWeight: "bold",
        },
      });

      // connect parent → child
      if (parent) {
        edges.push({
          id: `${parent}-${id}`,
          source: parent,
          target: id,
          animated: true,
        });
      }

      // if nested object, recurse
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

  const { nodes, edges } = createTree(data);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default JsonTree;
