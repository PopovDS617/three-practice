import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../utils/angle';
import { useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Three = () => {
  const { scene } = useThree();

  const texture = useLoader(TextureLoader, 'public/space2.jpg');

  scene.background = texture;

  const orbitControlsRef = useRef(null);
  ///////////////////////////////////////////////////////
  // useFrame((state) => {
  //   if (!!orbitControlsRef.current) {
  //     const { x, y } = state.mouse;
  //     orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
  //     orbitControlsRef.current.setPolarAngle(y + 1 * angleToRadians(90 - 30));
  //     orbitControlsRef.current.update();
  //   }
  // });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls ref={orbitControlsRef} />
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#3b4ab0" />
      </mesh>
      {/* <ambientLight args={['#ffffff', 0.25]} /> */}
      <spotLight
        args={['#ffffff', 1]}
        position={[-3, 3, 0]}
        penumbra={1}
        distance={20}
        decay={2}
        angle={angleToRadians(90)}
        castShadow
      />
      {/* 
      <Environment background path="/public" files={['space2.jpg']}>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
      </Environment> */}
    </>
  );
};

export default Three;
