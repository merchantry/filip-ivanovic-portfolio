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
  const [isScrollingAuto, setIsScrollingAuto] = useState(false);

  const scrollToElement = (element) => {
    if (!element) return;

    setIsScrollingAuto(true);
    return scrollTo(element).then(() => {
      setIsScrollingAuto(false);
    });
  };

  const scrollToHero = () => scrollToElement(heroRef.current);

  const scrollToProjects = () => {
    if (!projectsRef.current.children.length) return;

    return scrollToElement(projectsRef.current.children[0]);
  };

  const scrollToTechStack = (techName) => {
    const element = techName
      ? [...techStackRef.current.children]
          .flatMap((child) => [...child.children])
          .find((node) => node.innerText === techName) ?? techStackRef.current
      : techStackRef.current;
    return scrollToElement(element);
  };

  const scrollToFooter = () =>
    scrollToElement(document.getElementById('Footer'));

  const onUrlChange = (hash) => {
    switch (hash) {
      case '':
        scrollToHero();
        break;
      case '#previous-work':
        scrollToProjects();
        break;
      case '#tech-stack':
        scrollToTechStack();
        break;
      case '#contacts':
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

  const updateTechStackHighlight = () => {
    const techStackDistance = yDistanceToElement(techStackRef.current);
    if (techStackDistance < -0.5) setHighlightTechStack([]);
  };

  const findNextProjectIndex = (delta) => {
    const projectDistances = [...projectsRef.current.children].map((child) =>
      yDistanceToElement(child)
    );

    if (delta > 0) {
      return projectDistances.findIndex((distance) => distance < 0);
    }

    projectDistances.reverse();

    const reverseIndex = projectDistances.findIndex((distance) => distance > 0);

    return reverseIndex === -1
      ? -1
      : projectDistances.length - 1 - reverseIndex;
  };

  const onProjectsScroll = (delta) => {
    if (isScrollingAuto) return;

    const windowHeight = window.innerHeight;
    const projectsRect = projectsRef.current.getBoundingClientRect();
    const isInProjects =
      projectsRect.top <= windowHeight / 3 &&
      projectsRect.bottom >= windowHeight / 3;

    if (!isInProjects) return;
    const nextProjectIndex = findNextProjectIndex(delta);

    if (nextProjectIndex === -1) return;

    scrollToElement(projectsRef.current.children[nextProjectIndex]);
  };

  useOnScroll((_e, _s, delta) => {
    updateTechStackHighlight();

    onProjectsScroll(delta);
  });

  useWindowEvent('replaceState', () => {
    onUrlChange(window.location.hash);
  });

  useEffect(() => {
    onUrlChange(window.location.hash);
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
