import { forwardRef } from 'react';
import { Row } from 'react-bootstrap';
import './SubTitle.css';

const SubTitle = forwardRef(({ children }, ref) => {
  return (
    <Row ref={ref} className="SubTitle">
      <h1>{children}</h1>
    </Row>
  );
});

export default SubTitle;
