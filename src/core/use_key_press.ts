import { useEffect } from 'react';

export const useKeypress = (key: string, action: () => void): void => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) {
        action();
      }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
};
