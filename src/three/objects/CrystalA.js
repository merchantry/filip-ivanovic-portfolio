import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';
import { useMovementAttribute } from '../../helpers/hooks';
import { useFrame } from '@react-three/fiber';
import CONFIG from '../../config';

const modelPath = 'models/crystals/scene.gltf';

function CrystalA({ velocity, onCollide, ...rest }) {
  const { nodes, materials } = useGLTF(modelPath);
  const [ref, api] = useCompoundBody(() => ({
    mass: 1,
    type: 'Kinematic',
    shapes: [
      {
        type: 'Cylinder',
        args: [0.8, 1, 1],
        position: [-0.35, -1.68, 0.09],
        rotation: [0, 0, -Math.PI / 52],
      },
      {
        type: 'Cylinder',
        args: [0.2, 0.8, 1.6],
        position: [-0.22, -0.62, -0.2],
        rotation: [-Math.PI / 8, 0, -Math.PI / 20],
      },
    ],
    velocity: [0, -velocity, 0],
    ...rest,
  }));

  const [position] = useMovementAttribute(api, 'position');

  useFrame(() => {
    if (position[1] <= CONFIG.floorHeight) {
      onCollide && onCollide(ref.current);
    }
  });

  return (
    <group ref={ref} dispose={null}>
      <group position={[-0.42, -2.14, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Group7013_default_0.geometry}
          material={materials['default']}
        />
      </group>
    </group>
  );
}

export default React.memo(CrystalA);

useGLTF.preload(modelPath);
