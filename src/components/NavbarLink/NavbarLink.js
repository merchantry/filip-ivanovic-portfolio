import './NavbarLink.css';
import { forwardRef } from 'react';
import { Nav } from 'react-bootstrap';

const NavbarLink = forwardRef(
  ({ href, children, onClick, newWindow, ...rest }, ref) => {
    return (
      <Nav.Link
        className="NavbarLink"
        ref={ref}
        onClick={(e) => {
          if (onClick) onClick(e);
          if (newWindow) return;
          e.preventDefault();
          window.history.replaceState(null, '', href);
          window.dispatchEvent(
            new CustomEvent('replaceState', { detail: href })
          );
        }}
        href={href}
        target={newWindow ? '_blank' : undefined}
        {...rest}
      >
        {children}
      </Nav.Link>
    );
  }
);

export default NavbarLink;
