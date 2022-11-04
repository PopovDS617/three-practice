import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../utils/angle';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import gsap from 'gsap';
import { CarModel } from './car';
import { CatModel } from './cat';

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

  const footballBallRef = useRef(null);

  const colorMapTextureFootball = useTexture('ball/ball-texture.png');

  const basketballBallRef = useRef(null);
  const colorMapTextureBasketball = useTexture('ball/ball-texture-2.png');

  const catRef = useRef(null);

  useEffect(() => {
    if (!!footballBallRef.current) {
      gsap.to(footballBallRef.current.position, {
        delay: 1,
        duration: 2,
        x: 3,
        ease: 'power2.out',
      });
    }

    gsap.to(footballBallRef.current.position, {
      delay: 0.65,
      duration: 2,
      y: 1.05,
      ease: 'bounce.out',
    });
  }, [footballBallRef]);

  useEffect(() => {
    if (!!basketballBallRef.current) {
      gsap.to(basketballBallRef.current.position, {
        delay: 1,
        duration: 2,
        x: 8,
        ease: 'power2.out',
      });
      gsap.to(basketballBallRef.current.position, {
        delay: 0.65,
        duration: 2,
        y: 1.2,
        ease: 'bounce.out',
      });
    }
  }, [basketballBallRef]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[-5, 5, -15]} />
      <OrbitControls ref={orbitControlsRef} />
      <mesh
        position={[-11, 6, -8]}
        ref={footballBallRef}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.6}
          roughness={0.2}
          map={colorMapTextureFootball}
        />
      </mesh>
      <mesh position={[20, 10, 3]} ref={basketballBallRef} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.6}
          roughness={0.2}
          map={colorMapTextureBasketball}
        />
      </mesh>
      <CarModel />

      <CatModel
        scale={0.15}
        receiveShadow
        castShadow
        position={[2, 0, -4]}
        rotation={[0, angleToRadians(-55), 0]}
      />

      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#3b4ab0" />
      </mesh>
      {/* <ambientLight args={['#ffffff', 0.25]} /> */}
      <spotLight
        castShadow
        args={['#ffffff', 5]}
        position={[-15, 9, -5]}
        penumbra={1}
        distance={45}
        decay={0.5}
        angle={angleToRadians(45)}
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
