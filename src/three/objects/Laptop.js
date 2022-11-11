import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';
import { useRepeatableFallingAnimation } from '../../helpers/hooks';
import { MeshPhysicalMaterial } from 'three';

const modelPath = 'models/laptop/scene.gltf';

function Laptop(props) {
  const { nodes, materials } = useGLTF(modelPath);

  const [ref] = useRepeatableFallingAnimation(
    useCompoundBody,
    props.height,
    () => ({
      mass: 100,
      shapes: [
        { type: 'Box', mass: 1, position: [0, -2.5, 0], args: [9, 0.4, 6] },
        {
          type: 'Box',
          mass: 1,
          position: [0, -0.5, -4.2],
          args: [9, 0.4, 5],
          rotation: [Math.PI / 3, 0, 0],
        },
      ],
    })
  );

  const bodyMaterial = new MeshPhysicalMaterial({
    color: 'black',
    reflectivity: 0.3,
    clearcoat: 0.2,
  });

  const keyboardMaterial = new MeshPhysicalMaterial({
    color: '#0c0c0c',
    roughness: 1,
  });

  return (
    <group ref={ref} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={3}
        position={[0, -2.4, 0]}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[69.21, 318.05, 190.81]}
            rotation={[1.89, 0.88, -2.05]}
            scale={100}
          >
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group
            position={[735.89, 495.83, 692.58]}
            rotation={[-Math.PI, 0.76, 2.68]}
            scale={100}
          />
          <group rotation={[Math.PI / 2, 0, 0]} scale={[100, 152.52, 100]}>
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.Plane_Material002_0.geometry}
              material={bodyMaterial}
            />
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.Plane_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.Plane_Material005_0.geometry}
              material={keyboardMaterial}
            />
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.Plane_Material004_0.geometry}
              material={materials['Material.004']}
            />
          </group>
          <group
            position={[453.29, 201.05, -24.7]}
            rotation={[1.89, 0.88, -2.05]}
            scale={100}
          >
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
        </group>
      </group>
    </group>
  );
}

export default Laptop;

useGLTF.preload(modelPath);
