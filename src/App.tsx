import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowComponent from './components/FlowComponent';
import './App.css';

const App: React.FC = () => (
  <ReactFlowProvider>
    <FlowComponent />
  </ReactFlowProvider>
);

export default App;