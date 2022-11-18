import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const modelPath = 'models/glowing_crystals/scene.gltf';

function GlowingCrystalA(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useBox(() => ({
    angularVelocity: [0.4, 0, 0],
    type: 'Kinematic',
    ...props,
  }));

  return (
    <group ref={ref} dispose={null}>
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
