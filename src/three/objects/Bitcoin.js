import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { Color } from 'three';

const modelPath = 'models/bitcoin/scene.gltf';

function Bitcoin(props) {
  const { nodes, materials } = useGLTF(modelPath);

  materials.oro2.emissive = new Color('#faf7c0');
  materials.oro2.emissiveIntensity = 0.1;

  const [ref] = useCylinder(() => ({
    args: [1.5, 1.5, 0.4],
    mass: 1,
    ...props,
  }));

  return (
    <group ref={ref} dispose={null} name="BITCOIN">
      <group scale={6}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes['16783_Zeus_v1_NEW001_oro2_0'].geometry}
              material={materials.oro2}
            />
            <mesh
              geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_1'].geometry}
              material={materials.oro2}
            />
            <mesh
              geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_2'].geometry}
              material={materials.oro2}
            />
            <mesh
              geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_3'].geometry}
              material={materials.oro2}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default Bitcoin;

useGLTF.preload(modelPath);
