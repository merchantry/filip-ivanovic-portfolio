import { OrbitControls } from '@react-three/drei';
import { AxesHelper } from 'three';
import CrystalDNAAnimation from '../objects/CrystalDNAAnimation';
import { useOnScroll, useWindowEvent } from '../../helpers/hooks';
import { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import CONFIG from '../../config';

const DEBUG = true;

function HeroScene() {
  const [paused, setPaused] = useState(false);

  const orbitControlsRef = useRef();

  const { camera } = useThree();

  const updatePaused = () => {
    if (!DEBUG) return;
    setPaused((current) => !current);
  };

  useOnScroll((_, scroll) => {
    if (!orbitControlsRef.current) return;
    const targetY = -Math.min(scroll / 10, 100);

    orbitControlsRef.current.target.setY(targetY);
    camera.position.setY(targetY);
  });

  useWindowEvent('dblclick', (e) => {
    console.log('Double click detected', e.target.tagName);

    if (e.target.tagName !== 'CANVAS') return;
    updatePaused();
  });

  return (
    <>
      <ambientLight />
      <pointLight color="white" intensity={2} position={[500, 100, -300]} />
      <pointLight color="white" intensity={1} position={[-17, 18, 2]} />
      <pointLight color="white" intensity={1} position={[0, -200, -50]} />
      <primitive object={new AxesHelper(2000)} visible={DEBUG} />
      <CrystalDNAAnimation />
      <OrbitControls
        ref={orbitControlsRef}
        autoRotate={!DEBUG}
        autoRotateSpeed={CONFIG.autoRotateSpeed}
        enableZoom={DEBUG}
        enablePan={DEBUG}
        maxPolarAngle={DEBUG ? undefined : Math.PI / 2}
        minPolarAngle={DEBUG ? undefined : Math.PI / 2}
      />
    </>
  );
}

export default HeroScene;
