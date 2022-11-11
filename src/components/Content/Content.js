import Hero from '../Hero';
import { Container } from 'react-bootstrap';
import './Content.css';
import { useEffect, useRef, useState } from 'react';
import Projects from '../Projects';
import ScrollButton from '../ScrollButton';
import TechStack from '../TechStack';
import { scrollTo, yDistanceToElement } from '../../helpers/helpers';
import { useOnScroll, useWindowEvent } from '../../helpers/hooks';

function Content() {
  const heroRef = useRef();
  const projectsRef = useRef();
  const techStackRef = useRef();

  const [highlightTechStack, setHighlightTechStack] = useState([]);

  const scrollToHero = () => scrollTo(heroRef.current);

  const scrollToProjects = () => {
    if (!projectsRef.current.children.length) return;

    return scrollTo(projectsRef.current.children[0]);
  };

  const scrollToTechStack = (techName) => {
    const element = techName
      ? [...techStackRef.current.children]
          .flatMap((child) => [...child.children])
          .find((node) => node.innerText === techName) ?? techStackRef.current
      : techStackRef.current;
    return scrollTo(element);
  };

  const scrollToFooter = () => scrollTo(document.getElementById('Footer'));

  const onUrlChange = (url) => {
    switch (url) {
      case '/':
        scrollToHero();
        break;

      case '/previous-work':
        scrollToProjects();
        break;

      case '/tech-stack':
        scrollToTechStack();
        break;

      case '/contacts':
        scrollToFooter();
        break;

      default:
        break;
    }
  };

  const onTechStackClick = (techStack) => {
    scrollToTechStack(techStack[0]).then(() => {
      setHighlightTechStack(techStack);
    });
  };

  useOnScroll(() => {
    const techStackDistance = yDistanceToElement(techStackRef.current);
    if (techStackDistance < -0.5) setHighlightTechStack([]);
  });

  useWindowEvent('replaceState', (e) => {
    onUrlChange(e.detail);
  });

  useEffect(() => {
    onUrlChange(window.location.pathname);
  }, []);

  return (
    <Container>
      <Hero ref={heroRef} />
      <ScrollButton onClickDown={scrollToProjects} onClickUp={scrollToHero} />
      <Projects ref={projectsRef} onTechStackClick={onTechStackClick} />
      <TechStack ref={techStackRef} highlight={highlightTechStack} />
    </Container>
  );
}

export default Content;
