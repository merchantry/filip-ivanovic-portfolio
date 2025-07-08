import { useCallback, useEffect, useRef } from 'react';

export function useOnScroll(callback) {
  const prevScrollY = useRef(window.scrollY);

  useEffect(() => {
    const scrollCallback = (e) => {
      const currentScrollY = window.scrollY;
      callback(e, currentScrollY, currentScrollY - prevScrollY.current);
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, [callback]);
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

  const setYRotation = (v, update) => {
    if (rotateY.current === undefined || update) {
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

export function useOncePerInterval(fn, interval, deps) {
  const timeRef = useRef(0);
  const callback = useCallback(fn, deps);

  const intervalCallback = (...args) => {
    const time = Date.now();

    if (time - timeRef.current < interval) return;
    timeRef.current = time;
    callback(...args);
  };

  return intervalCallback;
}
