import { useRef, useState } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { newArray } from '../../helpers/arrayUtils';
import { randomInt, yDistanceToElement } from '../../helpers/helpers';
import { useOnScroll } from '../../helpers/hooks';
import './ProjectCard.css';

function ProjectCard({
  folder,
  numOfPics,
  title,
  description,
  link,
  techStack,
  onTechStackClick,
}) {
  const [opacity, setOpacity] = useState(0);

  const ref = useRef();

  useOnScroll(() => {
    const opacityBreakPoint = 0.2;
    const breakPoint = 0.3;
    const toCenter = Math.abs(yDistanceToElement(ref.current));
    const addedOpacity =
      (1 - opacityBreakPoint) * ((breakPoint - toCenter) / breakPoint);

    const newOpacity =
      opacityBreakPoint + (toCenter < breakPoint ? addedOpacity : 0);

    setOpacity(newOpacity);
  });

  return (
    <Card ref={ref} className="ProjectCard" style={{ opacity }}>
      <Card.Header>
        <h3>
          <a href={link} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>
      </Card.Header>
      <Carousel variant="dark" interval={randomInt(7000, 12000)}>
        {newArray(numOfPics, (i) => {
          const url = `project_screenshots/${folder}/${i + 1}.png`;
          return (
            <Carousel.Item key={i + 1}>
              <a href={url} target="_blank" rel="noreferrer">
                <img
                  className="d-block w-100"
                  alt={`${folder}_${i + 1}`}
                  src={url}
                />
              </a>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Card.Body>{description}</Card.Body>
      <Card.Footer>
        <span
          onClick={() => {
            onTechStackClick(techStack);
          }}
        >
          See tech stack
        </span>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
