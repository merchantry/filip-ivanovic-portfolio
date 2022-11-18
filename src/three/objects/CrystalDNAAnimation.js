import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { newArray } from '../../helpers/arrayUtils';
import CrystalSpiral from './CrystalSpiral';
import RotatingCrystals from './RotatingCrystals';

const SPIRAL_HEIGHT = 150;
const START = 60;
const GAP = 15;
const AMOUNT = 10;
const RC_HEIGHTS = newArray(AMOUNT, (i) => START - i * GAP);

function CrystalDNAAnimation() {
  const spiralRef = useRef();

  const [crystalsAt, setCrystalsAt] = useState(
    RC_HEIGHTS.map((height) => ({ height, rotateTo: 0 }))
  );

  useFrame(() => {
    setCrystalsAt((currentData) =>
      currentData.map(({ height }) => ({
        height,
        rotateTo: spiralRef.current.getCrystalPositionAtHeight(height),
      }))
    );
  });

  return (
    <>
      <CrystalSpiral ref={spiralRef} position={[0, SPIRAL_HEIGHT, 0]} />
      <CrystalSpiral
        position={[0, SPIRAL_HEIGHT, 0]}
        circleStartOffset={Math.PI}
      />
      {crystalsAt.map(({ height, rotateTo }) => (
        <RotatingCrystals
          key={height}
          position={[0, height, 0]}
          rotateTo={rotateTo}
        />
      ))}
    </>
  );
}

export default React.memo(CrystalDNAAnimation);
