import { RootState } from '@store/core/store';

declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}
