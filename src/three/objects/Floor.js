import { usePlane } from '@react-three/cannon';
import { DoubleSide } from 'three';

const SIZE = 1000;
const args = [SIZE, SIZE];

function Floor(props) {
  const [ref] = usePlane(() => ({
    args,
    mass: 1,
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={ref} scale={1} name={'FLOOR_PLANE'} visible={props.visible}>
      <planeGeometry args={args} />
      <meshBasicMaterial color="red" wireframe side={DoubleSide} />
    </mesh>
  );
}

export default Floor;
