import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Three from './three';

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>hello</h1>

        <h1>hello</h1>
      </div>
      <Canvas id="three-canvas-container" shadows="PCFsoft">
        <Suspense fallback={<></>} />
        <Three />
      </Canvas>
    </div>
  );
}

export default App;
