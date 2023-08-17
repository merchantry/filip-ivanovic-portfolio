import { Container, Row } from 'react-bootstrap';
import SubTitle from '../SubTitle';
import TechCard from '../TechCard';
import { DiReact, DiPhp } from 'react-icons/di';
import { FaVuejs, FaSass } from 'react-icons/fa';
import {
  SiThreedotjs,
  SiTypescript,
  SiMysql,
  SiLaravel,
  SiJava,
  SiSolidity,
  SiWeb3Dotjs,
  SiNodedotjs,
  SiNextdotjs,
} from 'react-icons/si';
import './TechStack.css';
import { forwardRef, useMemo } from 'react';
import { newArray, randomizeElements } from '../../helpers/arrayUtils';

function getTechStackData() {
  const data = [
    [
      { text: 'React', icon: <DiReact /> },
      { text: 'Vue', icon: <FaVuejs /> },
      { text: 'Three.js', icon: <SiThreedotjs /> },
      { text: 'Typescript', icon: <SiTypescript /> },
      { text: 'Sass', icon: <FaSass /> },
      { text: 'Next.js', icon: <SiNextdotjs /> },
    ],
    [
      { text: 'PHP', icon: <DiPhp /> },
      { text: 'MySQL', icon: <SiMysql /> },
      { text: 'Laravel', icon: <SiLaravel /> },
      { text: 'Java', icon: <SiJava /> },
      { text: 'Node.js', icon: <SiNodedotjs /> },
    ],
    [
      { text: 'Solidity', icon: <SiSolidity /> },
      { text: 'Web3', icon: <SiWeb3Dotjs /> },
    ],
  ];

  for (let i = 0; i < data.length; i++) {
    const emptyPlaces = Math.floor(data[i].length / 2);
    data[i].push(...newArray(emptyPlaces, () => ({ hidden: true })));
    data[i] = randomizeElements(data[i]);
  }

  return data;
}

const TechStack = forwardRef(({ highlight }, ref) => {
  const techStackData = useMemo(() => getTechStackData(), []);
  const highlightCards = useMemo(() => highlight.length !== 0, [highlight]);

  return (
    <Row>
      <SubTitle>Tech Stack</SubTitle>
      <Container ref={ref} className="TechStack">
        {techStackData.map((techList, i) => (
          <Row key={i}>
            {techList.map(({ text, icon, hidden }, j) => {
              const isHighlighted = highlight && highlight.includes(text);

              return (
                <TechCard
                  text={text}
                  icon={icon}
                  hidden={hidden ?? false}
                  key={text ?? `hidden-${j}`}
                  highlight={highlightCards && isHighlighted}
                  transparent={highlightCards && !isHighlighted}
                />
              );
            })}
          </Row>
        ))}
      </Container>
    </Row>
  );
});

export default TechStack;
