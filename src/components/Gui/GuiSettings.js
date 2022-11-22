import { useEffect, useState } from 'react';

export class GuiSettigns {
  updatedEvent = 'updatedGuiSettings';

  controls;

  constructor() {
    window.addEventListener('updatedGuiSettings', this.onUpdate);
    this.controls = {};
  }

  static triggerUpdatedEvent() {
    window.dispatchEvent(new Event('updatedGuiSettings'));
  }

  static triggerControlEvent(controlName, newValue) {
    window.dispatchEvent(
      new CustomEvent(this.controlEventName(controlName), { detail: newValue })
    );
  }

  static controlEventName(controlEvent) {
    return `updated-${controlEvent}-settings`;
  }

  addControl(controlName, initialState, options) {
    this.controls[controlName] = {
      type: typeof initialState,
      initialState,
    };

    switch (typeof initialState) {
      case 'number':
        this.controls[controlName].min = Math.min(
          options?.min ?? 0,
          initialState
        );
        this.controls[controlName].max = Math.max(
          options?.max ?? 1,
          initialState
        );
        this.controls[controlName].step = options?.step ?? 0.01;
        break;

      default:
        break;
    }

    GuiSettigns.triggerUpdatedEvent();
    GuiSettigns.triggerControlEvent(controlName, initialState);
  }
}

export function useControl(controlName, initialState, options = undefined) {
  const [state, setState] = useState(initialState);
  const callback = ({ detail }) => {
    setState(detail);
  };

  useEffect(() => {
    const eventName = GuiSettigns.controlEventName(controlName);
    window.addEventListener(eventName, callback);
    guiSettings.addControl(controlName, initialState, options);

    return () => {
      window.removeEventListener(eventName, callback);
    };
  }, []);

  return state;
}

const guiSettings = new GuiSettigns();
export default guiSettings;
