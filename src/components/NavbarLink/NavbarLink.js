import './NavbarLink.css';
import { forwardRef, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useWindowEvent } from '../../helpers/hooks';

const NavbarLink = forwardRef(
  ({ href, children, onClick, newWindow, ...rest }, ref) => {
    const [active, setActive] = useState(false);
    useWindowEvent('replaceState', (e) => {
      setActive(href === e.detail);
    });
    return (
      <Nav.Link
        className={`NavbarLink ${active && 'TextShadow'}`}
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
