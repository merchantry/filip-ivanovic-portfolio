import { useEffect } from 'react';
import { FLOOR_NAME } from '../three/objects/Floor';
import { randomPositionAtHeight, randomTriple } from './helpers';

export function useOnScroll(callback) {
  useEffect(() => {
    const scrollCallback = () => {
      callback(window.scrollY);
    };
    window.addEventListener('scroll', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, [callback]);
}

export function useRepeatableFallingAnimation(
  useObjectPhysics,
  dropFromHeight,
  fn,
  deps
) {
  const props = fn();

  const newRotation = () => randomTriple(Math.PI);

  const [ref, api] = useObjectPhysics(
    () => ({
      mass: 1,
      position: randomPositionAtHeight(dropFromHeight),
      rotation: newRotation(),
      onCollide: (e) => {
        if (props.onCollide) props.onCollide(e);
        if (e.body.name !== FLOOR_NAME) return;
        api.position.set(...randomPositionAtHeight(dropFromHeight));
        api.rotation.set(...newRotation());
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
      },
      ...props,
    }),
    deps
  );

  return [ref, api];
}

export function useWindowEvent(eventName, callback) {
  useEffect(() => {
    window.addEventListener(eventName, callback);
    return () => {
      window.removeEventListener(eventName, callback);
    };
  }, [eventName, callback]);
}
