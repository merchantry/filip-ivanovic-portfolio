import { DoubleSide } from 'three';

const SIZE = 1000;
const args = [SIZE, SIZE];

function Floor(props) {
  return (
    <mesh scale={1} name={'FLOOR_PLANE'} visible={props.visible}>
      <planeGeometry args={args} />
      <meshBasicMaterial color="red" wireframe side={DoubleSide} />
    </mesh>
  );
}

export default Floor;
