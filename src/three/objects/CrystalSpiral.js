import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { newArray } from '../../helpers/arrayUtils';
import CrystalA from './CrystalA';

const VELOCITY = 5;

const CrystalSpiral = forwardRef((props, ref) => {
  const {
    position = [0, 0, 0],
    circleStartOffset = 0,
    halfCirc = 8,
    inACircle = 20,
    total = 85,
    verticalGap = 4,
  } = props;

  const groupRef = useRef();
  const hitDetectRef = useRef({});

  const zRotation = useMemo(() => {
    const perimiter = halfCirc * Math.PI * Math.PI;
    const length = perimiter / inACircle;
    const hypotenuse = Math.sqrt(length * length + verticalGap * verticalGap);
    return Math.asin(verticalGap / hypotenuse);
  }, [halfCirc, inACircle, verticalGap]);

  const getItemPosition = useCallback(
    (index) => {
      const circleOffset =
        (index * (Math.PI * 2)) / inACircle + circleStartOffset;
      const [x, y, z] = position;

      return [
        Math.sin(circleOffset) * halfCirc + x,
        index * -verticalGap + y,
        Math.cos(circleOffset) * halfCirc + z,
      ];
    },
    [position, inACircle, circleStartOffset, halfCirc, verticalGap]
  );

  const getItemRotation = useCallback(
    (index) => {
      const reverseZ = index % 2 === 0 ? -Math.PI : 0;

      return [
        0,
        ((index % inACircle) / inACircle) * Math.PI * 2 + circleStartOffset,
        -Math.PI / 2 + reverseZ - zRotation,
      ];
    },
    [inACircle, zRotation, circleStartOffset]
  );

  const getPositionAbove = useCallback(
    (position, index) => {
      const difference = getItemPosition(index + 1).reduce((diff, v, i) => {
        diff[i] -= v;
        return diff;
      }, getItemPosition(index));

      return position.map((v, i) => v + difference[i]);
    },
    [getItemPosition]
  );

  const createCrystalData = useCallback(
    (index) => ({
      position: getItemPosition(index),
      rotation: getItemRotation(index % inACircle),
      uuid: generateUUID(),
      index: index % inACircle,
    }),
    [getItemPosition, getItemRotation, inACircle]
  );

  const createCrystalAbovePosition = useCallback(
    (position, index) => ({
      position: getPositionAbove(position, index),
      rotation: getItemRotation(index),
      uuid: generateUUID(),
      index: index % inACircle,
    }),
    [getPositionAbove, getItemRotation, inACircle]
  );

  const [data, setData] = useState(
    newArray(total, (i) => createCrystalData(i))
  );

  const onCollide = (o) => {
    const crystalUuid = o.uuid;
    if (crystalUuid in hitDetectRef.current) return;
    if (Object.keys(hitDetectRef.current).length > inACircle)
      hitDetectRef.current = {};
    hitDetectRef.current[crystalUuid] = true;

    addOneCrystalAbove();
  };

  const getRotationalSpeed = useCallback(() => {
    const circleHeight = verticalGap * inACircle;
    const fullCircleFallTime = (circleHeight / VELOCITY) * 1000;
    return (Math.PI * 2) / (fullCircleFallTime / 1000);
  }, []);

  const addOneCrystalAbove = () => {
    const children = groupRef.current.children;
    const tallestCrystalPos = children[0]
      .getWorldPosition(new Vector3())
      .toArray();

    setData((currentData) => {
      let newIndex = currentData[0].index;
      if (newIndex === 0) newIndex = inACircle - 1;
      else newIndex--;

      return [
        createCrystalAbovePosition(tallestCrystalPos, newIndex),
        ...currentData.slice(0, -1),
      ];
    });
  };

  const getCrystalPositionAtHeight = useCallback(
    (height) => {
      if (!groupRef.current || circleStartOffset) return 0;
      const firstChildHeight = groupRef.current.children[0].getWorldPosition(
        new Vector3()
      ).y;
      const index = Math.min(
        Math.floor((firstChildHeight - height) / verticalGap),
        groupRef.current.children.length - 1
      );

      const child = groupRef.current.children[index];
      return child.getWorldPosition(new Vector3()).setY(0);
    },
    [verticalGap]
  );

  useImperativeHandle(ref, () => ({
    getCrystalPositionAtHeight,
    getRotationalSpeed,
  }));

  return (
    <group ref={ref}>
      <group ref={groupRef}>
        {data.map(({ position, rotation, uuid }) => (
          <CrystalA
            key={uuid}
            position={position}
            rotation={rotation}
            velocity={VELOCITY}
            onCollide={onCollide}
          />
        ))}
      </group>
    </group>
  );
});

export default CrystalSpiral;
