import { Card } from 'react-bootstrap';
import './TechCard.css';

function TechCard({ icon, text, hidden, highlight, transparent }) {
  return (
    <Card
      className={`TechCard BoxShadow ${hidden && 'Hidden'} ${
        highlight && 'Highlight'
      } ${transparent && 'Transparent'}`}
    >
      {icon}
      <span>{text}</span>
    </Card>
  );
}

export default TechCard;
