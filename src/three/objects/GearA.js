import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { useRepeatableFallingAnimation } from '../../helpers/hooks';

const modelPath = 'models/gears/scene.gltf';

function GearA(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useRepeatableFallingAnimation(
    useCylinder,
    props.height,
    () => ({
      args: [1.4, 1.4, 0.3],
    })
  );

  return (
    <group ref={ref} dispose={null}>
      <group>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.Metal13}
          position={[-11.1, 0, -3.1]}
        />
      </group>
    </group>
  );
}

export default GearA;

useGLTF.preload(modelPath);
