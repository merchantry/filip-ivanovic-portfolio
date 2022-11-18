import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const modelPath = 'models/glowing_crystals/scene.gltf';

function GlowingCrystalB(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useBox(() => ({
    angularVelocity: [-0.4, 0, 0],
    type: 'Kinematic',
    ...props,
  }));

  return (
    <group ref={ref} dispose={null}>
      <group
        rotation={[-Math.PI / 2, -Math.PI * 0.09, 0]}
        position={[-1.74, -0.39, 0.0]}
        scale={2.3}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.lambert1}
          />
        </group>
      </group>
    </group>
  );
}

export default GlowingCrystalB;

useGLTF.preload(modelPath);
