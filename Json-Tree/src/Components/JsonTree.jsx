import React, { useContext } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { AppContext } from "./Theme";

function JsonTree({ data, JsonSearch }) {
  const { Dfvalue, JsonSearchContext, setsearchJson } = useContext(AppContext);

  const background = [
    "linear-gradient(to right, #4facfe, #00f2fe)",
    "linear-gradient(to right, #43e97b, #38f9d7)",
    "linear-gradient(to right, #fa709a, #fee140)",
    "linear-gradient(to right, #a18cd1, #fbc2eb)",
    "linear-gradient(to right, #f093fb, #f5576c)",
    "linear-gradient(to right, #5ee7df, #b490ca)",
    "linear-gradient(to right, #667eea, #764ba2)",
    "linear-gradient(to right, #30cfd0, #330867)",
    "linear-gradient(to right, #fdfbfb, #ebedee)",
    "linear-gradient(to right, #ff9a9e, #fad0c4)",
  ];

  let randomIndex = Math.floor(Math.random() * background.length);
  let Color = background[randomIndex];

  if (!data || typeof data !== "object") {
    return <p className="text-center text-red-500">No valid JSON data</p>;
  }

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
  function getValueByPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }

  const x = getValueByPath(data, JsonSearch);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h3 className="flex space-x-1 font-mono text-blue-500 ">
         <b>{JsonSearch}</b>:{x == undefined ? <p className="text-red-500">{JsonSearch}Not found the json value</p> : x}
      </h3>
      
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default JsonTree;
