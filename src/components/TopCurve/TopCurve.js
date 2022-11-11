/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { debounce } from '../../helpers/helpers';
import { useWindowEvent } from '../../helpers/hooks';
import './TopCurve.css';

function TopCurve() {
  const [yOffset, setYOffset] = useState(-40);
  const [xOffset, setXOffset] = useState(0);
  const [overrideVisibility, setOverrideVisibility] = useState(false);

  const debouncedRemoveOverride = useCallback(
    debounce(() => {
      setOverrideVisibility(false);
    }, 100),
    []
  );

  const onPointerMove = (e) => {
    const height = window.innerHeight;
    const x = e.clientX ?? e.targetTouches[0].clientX;
    const y = e.y ?? e.targetTouches[0].clientY;

    setXOffset(x - 100);
    setYOffset(Math.min(y / height, 0.3) * 100 - 60);

    if (e.pressure < 0.5) return;

    setOverrideVisibility(true);
    debouncedRemoveOverride();
  };

  useWindowEvent('pointermove', onPointerMove);
  useWindowEvent('touchmove', onPointerMove);

  return (
    <div
      className={`CurveContainer ${overrideVisibility && 'OverrideVisibility'}`}
    >
      <div className="TopCurve">
        <div
          className="CurvePart"
          style={{ left: xOffset, top: yOffset }}
        ></div>
      </div>
    </div>
  );
}

export default TopCurve;
