import { Col, Container, Row } from 'react-bootstrap';
import HeroScene from '../../three/scenes/HeroScene';
import './Hero.css';
import { AiOutlineRight } from 'react-icons/ai';
import { Canvas } from '@react-three/fiber';
import { forwardRef } from 'react';
import CONFIG from '../../config';
import BaseButton from '../BaseButton';

const Hero = forwardRef((_, ref) => {
  return (
    <Row>
      <Container className="MainSection" ref={ref}>
        <Row>
          <Col md className="Hero">
            <div className="MainTitle">
              <h1>I work on cool high-end apps</h1>
              <h5>
                Hi, I'm a{' '}
                <strong>
                  <i>full-stack blockchain developer</i>
                </strong>
                . I love exploring new technologies and creating complex
                systems. If you have a project in mind I can help you with,
                <BaseButton
                  href={`mailto:${CONFIG.email}`}
                  className="InlineContactButton"
                >
                  Let's Talk <AiOutlineRight />
                </BaseButton>
              </h5>
            </div>
          </Col>

          <Col md className="CanvasContainer">
            <div className="Block Top" />
            <Canvas camera={{ position: [0, 0, -30], far: 50000 }}>
              <HeroScene />
            </Canvas>
            <div className="Block Bottom" />
          </Col>
        </Row>
      </Container>
    </Row>
  );
});

export default Hero;
