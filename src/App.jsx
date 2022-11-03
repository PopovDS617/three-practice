import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Three from './three';

function App() {
  return (
    <div className="header">
      <h1>hello</h1>
      <Canvas id="three-canvas-container">
        <Suspense fallback={<></>} />
        <Three />
      </Canvas>
    </div>
  );
}

export default App;
