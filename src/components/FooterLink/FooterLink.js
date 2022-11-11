import { forwardRef } from 'react';
import { Nav } from 'react-bootstrap';
import './FooterLink.css';

const FooterLink = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Nav.Link target="_blank" className="FooterLink" ref={ref} {...rest}>
      {children}
    </Nav.Link>
  );
});

export default FooterLink;
