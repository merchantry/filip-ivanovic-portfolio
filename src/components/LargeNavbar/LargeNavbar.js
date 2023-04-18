import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { randomFloat } from '../../helpers/helpers';
import MenuButton from '../MenuButton/MenuButton';
import NavbarLink from '../NavbarLink';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import './LargeNavbar.css';

const randomTransitionDelay = () => ({
  transitionDelay: `${randomFloat(0.1, 0.6)}s`,
});

function LargeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const updateMenuOpen = () => {
    setMenuOpen((o) => !o);
  };

  return (
    <Navbar className={`LargeNavbar ${menuOpen && 'NavbarOpen'}`}>
      <Nav className="middle-section">
        <NavbarLink
          className="Name"
          href="/"
          style={randomTransitionDelay()}
        >
          Filip Ivanovic
        </NavbarLink>
        <NavbarLink href="/previous-work" style={randomTransitionDelay()}>
          Previous Work
        </NavbarLink>
        <NavbarLink href="/tech-stack" style={randomTransitionDelay()}>
          Tech Stack
        </NavbarLink>
        <NavbarLink href="/contacts" style={randomTransitionDelay()}>
          Contacts
        </NavbarLink>
        <NavbarLink href="/Filip_Ivanovic_CV.pdf" newWindow>
          My CV <BsFillFileEarmarkPdfFill />
        </NavbarLink>
      </Nav>
      <MenuButton
        className="NavbarToggleButton"
        open={menuOpen}
        onClick={updateMenuOpen}
      />
    </Navbar>
  );
}

export default LargeNavbar;
