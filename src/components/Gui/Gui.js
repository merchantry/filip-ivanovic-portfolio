import { useEffect, useState } from 'react';
import DatGui, { DatNumber } from 'react-dat-gui';
import GuiSettigns, { GuiSettigns as GSClass } from './GuiSettings';
import { usePrevious, useWindowEvent } from '../../helpers/hooks';
import './Gui.css';

const Gui = () => {
  const [controls, setControls] = useState({});
  const [state, setState] = useState({});

  const prevState = usePrevious(state);

  useWindowEvent('updatedGuiSettings', () => {
    setControls(GuiSettigns.controls);

    setState((currentState) => {
      const newState = { ...currentState };

      Object.entries(GuiSettigns.controls).forEach(
        ([name, { initialState }]) => {
          if (name in newState) return;
          newState[name] = initialState;
        }
      );

      return newState;
    });
  });

  useEffect(() => {
    Object.entries({ ...prevState, ...state }).forEach(([name, value]) => {
      if (value === prevState[name]) return;

      GSClass.triggerControlEvent(name, value);
    });
  }, [state]);

  if (Object.keys(controls).length === 0) return <></>;

  return (
    <div className="DatGuiContainer">
      <DatGui data={state} onUpdate={setState}>
        {Object.entries(controls).map(
          ([name, { initialState, type, ...rest }]) => {
            switch (type) {
              case 'number':
                const { min, max, step } = rest;
                return (
                  <DatNumber
                    key={name}
                    path={name}
                    label={name}
                    min={min}
                    max={max}
                    step={step}
                  />
                );

              default:
                return undefined;
            }
          }
        )}
      </DatGui>
    </div>
  );
};

export default Gui;
