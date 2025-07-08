import React from 'react';
import { useGLTF } from '@react-three/drei';

const modelPath = '/models/glowing_crystals/scene.gltf';

function GlowingCrystalA(props) {
  const { nodes, materials } = useGLTF(modelPath);

  return (
    <group dispose={null} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.3}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.lambert1}
          />
        </group>
      </group>
    </group>
  );
}

export default GlowingCrystalA;

useGLTF.preload(modelPath);
