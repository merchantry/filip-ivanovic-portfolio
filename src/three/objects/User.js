import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { MeshPhysicalMaterial } from 'three';
import { useRepeatableFallingAnimation } from '../../helpers/hooks';

const modelPath = 'models/user/scene.gltf';

function User(props) {
  const { nodes } = useGLTF(modelPath);

  const [ref] = useRepeatableFallingAnimation(
    useCylinder,
    props.height,
    () => ({
      args: [1.6, 1.6, 3],
    })
  );

  const material = new MeshPhysicalMaterial({
    color: '#04265e',
    reflectivity: 0.5,
    clearcoat: 0.3,
  });

  return (
    <group ref={ref} dispose={null} scale={2}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={material}
          position={[0, 0, -0.5]}
        />
      </group>
    </group>
  );
}

export default User;

useGLTF.preload(modelPath);
