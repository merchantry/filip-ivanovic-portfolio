import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { useRepeatableFallingAnimation } from '../../helpers/hooks';

const modelPath = 'models/mouse/scene.gltf';

function Mouse(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useRepeatableFallingAnimation(useBox, props.height, () => ({
    args: [3, 2.5, 6],
  }));

  return (
    <group ref={ref} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.5}>
          <mesh
            geometry={nodes.polySurface5_MAT_Plastic_0.geometry}
            material={materials.MAT_Plastic}
          />
          <mesh
            geometry={nodes.polySurface2_MAT_Emission_0.geometry}
            material={materials.MAT_Emission}
          />
          <mesh
            geometry={nodes.BOTON_CENTRAL_MAT_Plastic_0.geometry}
            material={materials.MAT_Plastic}
          />
          <mesh
            geometry={nodes.polySurface4_MAT_Details_0.geometry}
            material={materials.MAT_Details}
          />
        </group>
      </group>
    </group>
  );
}

export default Mouse;

useGLTF.preload(modelPath);
