import { useEffect, useRef, useState } from 'react';
import { Row } from 'react-bootstrap';
import { AiOutlineDown } from 'react-icons/ai';
import { yDistanceToElement } from '../../helpers/helpers';
import { useOnScroll } from '../../helpers/hooks';
import BaseButton from '../BaseButton';
import './ScrollButton.css';

function ScrollButton({ onClickDown, onClickUp }) {
  const [goesUp, setGoesUp] = useState(false);
  const [overFooter, setOverFooter] = useState(false);

  const rowRef = useRef();
  const buttonRef = useRef();

  const updateIsOverFooter = () => {
    const { top: footerTop } = document
      .getElementById('Footer')
      .getBoundingClientRect();
    const { top: buttonTop } = buttonRef.current.getBoundingClientRect();

    setOverFooter(footerTop < buttonTop);
  };

  useOnScroll(() => {
    const toCenter = yDistanceToElement(rowRef.current);
    setGoesUp(toCenter > 0.4);
    updateIsOverFooter();
  });

  useEffect(() => {
    setTimeout(() => {
      updateIsOverFooter();
    }, 1000);
  }, [goesUp]);

  return (
    <Row ref={rowRef}>
      <BaseButton
        ref={buttonRef}
        className={`ScrollButton Bounce ${goesUp && 'GoUp'} ${
          overFooter && 'OverFooter'
        }`}
        onClick={() => {
          if (goesUp) onClickUp();
          else onClickDown();
        }}
      >
        <AiOutlineDown />
      </BaseButton>
    </Row>
  );
}

export default ScrollButton;
