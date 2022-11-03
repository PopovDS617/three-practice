import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../utils/angle';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import gsap from 'gsap';

const Three = () => {
  const { scene } = useThree();

  const texture = useLoader(TextureLoader, 'public/space2.jpg');
  texture.encoding = THREE.sRGBEncoding;
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

  const ballRef = useRef(null);

  useEffect(() => {
    if (!!ballRef.current) {
      ballRef.current.position.y = 0.5;
      ballRef.current.position.x = -7;
      console.log(ballRef.current);
      let x = 3;
      gsap.to(ballRef.current.position, {
        delay: 1,
        duration: 2,
        x: 1,
        east: 'easeOut',
      });
    }
  }, [ballRef]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[-10, 5, 6]} />
      <OrbitControls ref={orbitControlsRef} />
      <mesh position={[0, 0.8, 0]} ref={ballRef} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#3b4ab0" />
      </mesh>
      {/* <ambientLight args={['#ffffff', 0.25]} /> */}
      <spotLight
        castShadow
        args={['#ffffff', 1]}
        position={[-3, 5, -5]}
        penumbra={1}
        distance={30}
        decay={2}
        angle={angleToRadians(50)}
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
