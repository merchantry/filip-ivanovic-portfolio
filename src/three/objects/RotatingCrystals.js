import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useMovementAttribute, useYRotation } from '../../helpers/hooks';
import GlowingCrystalA from './GlowingCrystalA';
import GlowingCrystalB from './GlowingCrystalB';
import { useFrame } from '@react-three/fiber';
import CONFIG from '../../config';

const rotation = [0, 0, Math.PI / 2];
const GCGap = 5;
const refVector = new Vector3(5, 0, 0);

let start = undefined;
let lastRotation = undefined;

function RotatingCrystals({ rotateTo, rotationalSpeed, ...rest }) {
  const ref = useRef();

  useFrame((_, d) => {
    if (!ref.current) return;

    if (!start) {
      start = Date.now();
      lastRotation = start;
      console.log('Start time', start);
    }

    const currentRotation = ref.current.rotation.y;
    const rotateBy = ((2 * Math.PI * CONFIG.speed) / 80) * d;
    const targetRotation = currentRotation - rotateBy;
    const madeFullRotation = targetRotation < -Math.PI * 2;
    const newRotation = madeFullRotation ? 0 : targetRotation;

    if (madeFullRotation) {
      const time = Date.now();
      const diff = time - lastRotation;
      lastRotation = time;
      // console.log('Made full rotation', diff, 'ms');
    }

    ref.current.rotation.y = newRotation;

    // ref.current.rotation.y -= 2 * Math.PI * d;
  });

  return (
    <group ref={ref} {...rest}>
      <GlowingCrystalA rotation={rotation} />
      <GlowingCrystalB position={[GCGap, 0, 0]} rotation={rotation} />
      <GlowingCrystalB position={[-GCGap, 0, 0]} rotation={rotation} />
    </group>
  );
}

export default React.memo(RotatingCrystals);
