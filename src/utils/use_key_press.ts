import { useEffect } from 'react';

export const useKeypress = (key: string, action: () => void): void => {
  useEffect(keyPressHandler.bind(this, key, action), []);
};

export const keyPressHandler = (key: string, action: () => void): (() => void) => {
  function onKeyup(e: KeyboardEvent) {
    if (e.key === key) {
      action();
    }
  }
  window.addEventListener('keyup', onKeyup);
  return () => window.removeEventListener('keyup', onKeyup);
};
