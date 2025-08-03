import { Row, Col, Nav, Container } from 'react-bootstrap';
import CONFIG from '../../config';
import FooterLink from '../FooterLink';
import './Footer.css';

function Footer() {
  return (
    <div id="Footer" className="Footer">
      <Container>
        <Row>
          <Col>
            <Nav className="flex-column">
              <FooterLink href="https://www.upwork.com/freelancers/~01cdec15ee8f487bec">
                UpWork
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/in/filip-ivanovic-575a0a171/">
                LinkedIn
              </FooterLink>
              <FooterLink href={`mailto:${CONFIG.email}`}>
                Send Email
              </FooterLink>
              <p className="FooterText">{CONFIG.email}</p>
              <br />
              <p className="FooterText">Like this website?</p>
              <FooterLink href="https://github.com/merchantry/filip-ivanovic-portfolio">
                View source code
              </FooterLink>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
