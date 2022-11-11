import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { newArray } from '../../helpers/arrayUtils';
import {
  randomFloat,
  randomInt,
  randomPositionAtHeight,
} from '../../helpers/helpers';
import Bitcoin from './Bitcoin';
import { FLOOR_NAME } from './Floor';

const NUM_OF_COINS = 20;

function createStack(startPosition) {
  const maxOffset = 0.1;
  const maxRotation = Math.PI / 12;
  const numOfCoins = NUM_OF_COINS + randomInt(-5, 5);

  const newPosition = (index) =>
    new Vector3(
      randomFloat(-maxOffset, maxOffset),
      index * 0.5,
      randomFloat(-maxOffset, maxOffset)
    ).add(startPosition);

  const newRotation = () =>
    new Vector3(
      randomFloat(-maxRotation, maxRotation),
      Math.PI / 2 + randomFloat(-maxRotation, maxRotation),
      randomFloat(-maxRotation, maxRotation)
    );

  const newVelocity = (index) => new Vector3(0, -(numOfCoins - index) * 0.3);

  return newArray(numOfCoins, (i) => ({
    position: newPosition(i),
    rotation: newRotation(),
    velocity: newVelocity(i),
  }));
}

function BitcoinStack({ height }) {
  const [objectData, setObjectData] = useState(
    createStack(new Vector3(...randomPositionAtHeight(height)))
  );
  const coinsFellRef = useRef({});

  const onCoinCollide = (e) => {
    if (e.body.name !== FLOOR_NAME) return;
    const coinUuid = e.target.uuid;
    if (coinUuid in coinsFellRef.current) return;
    coinsFellRef.current[coinUuid] = true;
    const coinKeys = Object.keys(coinsFellRef.current);
    if (coinKeys.length < objectData.length * (1 / 2)) return;

    coinsFellRef.current = {};
    setObjectData(createStack(new Vector3(...randomPositionAtHeight(height))));
  };

  return objectData.map(({ position, rotation, velocity }) => (
    <Bitcoin
      position={position.toArray()}
      rotation={rotation.toArray()}
      velocity={velocity.toArray()}
      onCollide={onCoinCollide}
      key={position.toArray().join(',')}
    />
  ));
}

export default BitcoinStack;
