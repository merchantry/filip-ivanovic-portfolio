import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import CONFIG from '../../config';

const modelPath = '/models/crystals/scene.gltf';

function CrystalA(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const ref = useRef();

  return (
    <group ref={ref} dispose={null} {...props}>
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
