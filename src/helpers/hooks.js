import { useEffect, useRef } from 'react';
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

export function usePrevious(value, deps) {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  }, deps);
  return ref.current;
}

export function useYRotation(api) {
  const rotateY = useRef();
  const rotationRef = useRef(0);

  useEffect(() => {
    const unsubscribe = api.rotation.subscribe((r) => {
      rotationRef.current = r[1];
    });
    return unsubscribe;
  }, []);

  const setYRotation = (v) => {
    if (rotateY.current === undefined) {
      api.rotation.set(0, v, 0);
    }
    rotateY.current = v;
  };

  const getYRotation = () => {
    let currentRotation = rotationRef.current;
    if (currentRotation === undefined) return undefined;

    if (Math.abs(rotateY.current) > Math.PI / 2) {
      currentRotation = Math.sign(currentRotation) * Math.PI - currentRotation;
    }

    return currentRotation;
  };

  return [getYRotation, setYRotation];
}

export function useMovementAttribute(api, attribute) {
  const dataRef = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api[attribute].subscribe((v) => {
      dataRef.current = v;
    });
    return unsubscribe;
  }, []);

  const setAttribute = (...v) => {
    api[attribute].set(...v);
  };

  return [dataRef.current, setAttribute];
}
