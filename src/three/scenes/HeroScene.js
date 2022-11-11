import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { AxesHelper } from 'three';
import FallingObjects from '../objects/FallingObjects';
import { useOnScroll, useWindowEvent } from '../../helpers/hooks';
import TogglableDebug from '../objects/TogglableDebug';
import { useRef, useState } from 'react';
import Floor from '../objects/Floor';
import { useThree } from '@react-three/fiber';
import CONFIG from '../../config';

const DEBUG = false;

function HeroScene() {
  const [paused, setPaused] = useState(false);

  const orbitControlsRef = useRef();

  const { camera } = useThree();

  const updatePaused = () => {
    if (!DEBUG) return;
    setPaused((current) => !current);
  };

  useOnScroll((scroll) => {
    if (!orbitControlsRef.current) return;
    const targetY = -Math.min(scroll / 10, 100);

    orbitControlsRef.current.target.setY(targetY);
    camera.position.setY(targetY);
  });

  useWindowEvent('dblclick', (e) => {
    if (e.target.tagName !== 'CANVAS') return;
    updatePaused();
  });

  return (
    <>
      <ambientLight />
      <pointLight color="white" intensity={20} position={[500, 100, -300]} />
      <pointLight color="white" intensity={10} position={[-17, 18, 2]} />
      <pointLight color="white" intensity={10} position={[0, -200, -50]} />
      <primitive object={new AxesHelper(2000)} visible={DEBUG} />
      <Physics gravity={[0, CONFIG.acceleration, 0]} isPaused={paused}>
        <TogglableDebug color="black" disable={!DEBUG}>
          <FallingObjects debug={DEBUG} />
          <Floor position={[0, CONFIG.floorHeight, 0]} visible={DEBUG} />
        </TogglableDebug>
      </Physics>
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
