import { Container, Row } from 'react-bootstrap';
import './Projects.css';
import projects from '../../data/projects.json';
import ProjectCard from '../ProjectCard/ProjectCard';
import { forwardRef } from 'react';
import SubTitle from '../SubTitle';

const Projects = forwardRef(({ onTechStackClick }, ref) => {
  return (
    <Row>
      <Container className="Projects">
        <SubTitle>Previous work</SubTitle>
        <Row className="ProjectList" ref={ref}>
          {projects.map((props) => (
            <ProjectCard
              onTechStackClick={onTechStackClick}
              {...props}
              key={props.folder}
            />
          ))}
        </Row>
      </Container>
    </Row>
  );
});

export default Projects;
