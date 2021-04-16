import { useSelector } from 'react-redux';
import { isLoggedIn } from '@store/auth/auth.selectors';

export const useLoggedIn = (): boolean => useSelector(isLoggedIn);
