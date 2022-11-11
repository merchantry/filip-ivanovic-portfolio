import { forwardRef } from 'react';
import { Button } from 'react-bootstrap';
import './BaseButton.css';

const BaseButton = forwardRef(({ href, children, className, ...rest }, ref) => {
  return (
    <Button
      ref={ref}
      as="a"
      href={href}
      className={`BaseButton ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default BaseButton;
