import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@store/auth/auth.selectors';

export const useLoggedIn = (): boolean => useSelector(selectIsLoggedIn);
