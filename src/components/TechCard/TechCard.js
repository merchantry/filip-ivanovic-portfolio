import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import './TechCard.css';

function TechCard({ icon, text, hidden, highlight, transparent }) {
  const ref = useRef();

  const [leftBGOffset, setLeftBGOffset] = useState(0);
  useEffect(() => {
    const { left } = ref.current.getBoundingClientRect();
    setLeftBGOffset(left);
  });

  return (
    <Card
      ref={ref}
      className={`TechCard ${hidden && 'Hidden'} ${highlight && 'Highlight'} ${
        transparent && 'Transparent'
      }`}
      style={{
        backgroundPositionX: leftBGOffset,
      }}
    >
      {icon}
      <span>{text}</span>
    </Card>
  );
}

export default TechCard;
