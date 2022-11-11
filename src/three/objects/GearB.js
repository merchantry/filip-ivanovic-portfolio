import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { useRepeatableFallingAnimation } from '../../helpers/hooks';

const modelPath = 'models/gears/scene.gltf';

function GearB(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useRepeatableFallingAnimation(
    useCylinder,
    props.height,
    () => ({
      args: [1.5, 1.5, 0.3],
    })
  );

  return (
    <group ref={ref} dispose={null}>
      <group>
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.Metal13}
          position={[-14.2, 0, -3.1]}
        />
      </group>
    </group>
  );
}

export default GearB;

useGLTF.preload(modelPath);
