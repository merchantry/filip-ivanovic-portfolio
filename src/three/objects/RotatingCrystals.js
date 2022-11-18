import { useCompoundBody } from '@react-three/cannon';
import React, { useEffect } from 'react';
import { Vector3 } from 'three';
import { useYRotation } from '../../helpers/hooks';
import GlowingCrystalA from './GlowingCrystalA';
import GlowingCrystalB from './GlowingCrystalB';

const rotation = [0, 0, Math.PI / 2];
const GCGap = 5;
const refVector = new Vector3(5, 0, 0);
const getSpeedFromDistance = (d) =>
  Math.max(-(1 / (800 * (Math.abs(d) + 2.5))) + 0.4, 0);

function RotatingCrystals({ rotateTo, ...rest }) {
  const [groupRef, api] = useCompoundBody(() => ({
    type: 'Kinematic',
    shapes: [
      {
        type: 'Cylinder',
        args: [0.71, 0.65, 4.05],
        position: [GCGap, 0, 0],
        rotation: rotation,
      },
      {
        type: 'Cylinder',
        args: [0.71, 0.65, 4.05],
        position: [-GCGap, 0, 0],
        rotation: rotation,
      },
      {
        type: 'Cylinder',
        args: [0.8, 0.8, 4.7],
        rotation: rotation,
      },
    ],
    ...rest,
  }));

  const [getYRotation, setYRotation] = useYRotation(api);

  useEffect(() => {
    if (!groupRef.current || !rotateTo) return;
    const angleTo = rotateTo.angleTo(refVector);
    const rotateY = (rotateTo.z > 0 ? -angleTo : angleTo) + 0.2;
    const currentRotation = getYRotation();
    setYRotation(rotateY);

    const rotationDiff = Math.abs(rotateY - currentRotation);
    const leftToRotate = -Math.min(rotationDiff, Math.PI * 2 - rotationDiff);
    const v = -getSpeedFromDistance(leftToRotate);
    api.angularVelocity.set(0, v, 0);
  }, [rotateTo]);

  return (
    <group ref={groupRef}>
      <GlowingCrystalA rotation={rotation} />
      <GlowingCrystalB position={[GCGap, 0, 0]} rotation={rotation} />
      <GlowingCrystalB position={[-GCGap, 0, 0]} rotation={rotation} />
    </group>
  );
}

export default React.memo(RotatingCrystals);
