import React from "react";
import _ from "lodash";
import Layout from "./Automation";
import { getIncomers, getOutgoers } from "react-flow-renderer";
import { initialElements } from "./Data/Elements1";
import { getUpdatedElementsAfterNodeAddition } from "./Utils/WorkflowElementUtils";
import "antd/dist/antd.css";
import "./index.scss";
import NodeSidebar from "./components/NodeSidebar/NodeSidebar";

const App = () => {
  const [elements, setElements] = React.useState([]);
  const [selectedNode, setSelectedNode] = React.useState(null);

  const onAddNodeCallback = ({ id, type }) => {
    setElements((elements) =>
      getUpdatedElementsAfterNodeAddition({
        elements,
        targetEdgeId: id,
        type,
        onDeleteNodeCallback,
        onNodeClickCallback,
        onAddNodeCallback,
      })
    );
  };

  const onDeleteNodeCallback = (id) => {
    setElements((elements) => {
      const clonedElements = _.cloneDeep(elements);
      const incomingEdges = clonedElements.filter((x) => x.target === id);
      const outgoingEdges = clonedElements.filter((x) => x.source === id);
      const updatedIncomingEdges = incomingEdges.map((x) => ({
        ...x,
        target: outgoingEdges[0].target,
      }));
      const filteredElements = clonedElements.filter(
        (x) =>
          x.id !== id &&
          x.target !== incomingEdges[0].target &&
          x.source !== outgoingEdges[0].source
      );
      filteredElements.push(...updatedIncomingEdges);
      return filteredElements;
    });
  };

  const onNodeClickCallback = (nodeId) => {
    const node = elements.find(el => el.id === nodeId);
    setSelectedNode(node);
  };

  const handleSidebarClose = () => {
    setSelectedNode(null);
  };

  const handleSidebarSave = (nodeId, properties) => {
    setElements(els => 
      els.map(el => 
        el.id === nodeId 
          ? { ...el, data: { ...el.data, properties } }
          : el
      )
    );
    setSelectedNode(null);
  };

  React.useEffect(() => {
    const nodes = initialElements
      .filter((x) => !x.target)
      .map((x) => ({
        ...x,
        data: { 
          ...x.data, 
          onDeleteNodeCallback, 
          onNodeClickCallback 
        },
      }));
    const edges = initialElements
      .filter((x) => x.target)
      .map((x) => ({ ...x, data: { ...x.data, onAddNodeCallback } }));
    setElements([...nodes, ...edges]);
  }, []);

  return (
    <div className="App">
      <Layout 
        elements={elements}
        onElementsChange={setElements}
        onNodeClick={onNodeClickCallback}
      />
      {selectedNode && (
        <NodeSidebar
          node={selectedNode}
          onClose={handleSidebarClose}
          onSave={handleSidebarSave}
        />
      )}
    </div>
  );
};

export default App;
