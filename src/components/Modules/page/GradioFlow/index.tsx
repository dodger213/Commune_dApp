import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useEdgesState,
    useNodesState,
    useReactFlow,
    updateEdge,
    EdgeChange,
    Connection,
    Edge,
    useKeyPress,
    NodeDragHandler,
    OnEdgesDelete,
    OnNodesDelete,
    SelectionDragHandler,
    useOnViewportChange,
    OnSelectionChangeParams,
    OnNodesChange,
    ReactFlowProvider
  } from "reactflow";


export default function GradioFlowPage({}){


    // const { types, reactFlowInstance, setReactFlowInstance, templates } =
    // useContext(typesContext);

    const reactFlowWrapper = useRef(null);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }, []);

    
      return (
        <>
        </>
      )

}