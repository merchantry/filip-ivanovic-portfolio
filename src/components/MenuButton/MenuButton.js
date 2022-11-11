import './MenuButton.css';
import { forwardRef } from 'react';

const MenuButton = forwardRef(({ open, className, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`MenuButton ${open && 'Open'} ${className}`}
      onClick={onClick}
    >
      <div className="MenuLine"></div>
      <div className="MenuLine"></div>
      <div className="MenuLine"></div>
    </div>
  );
});

export default MenuButton;
