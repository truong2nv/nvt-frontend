import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { login, signup, logout } from '../store/authSlice';

export function useAuthHook() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  console.log('useSelector', user, isAuthenticated, loading, error);
  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (email: string, password: string) => dispatch(login({ email, password })),
    signup: (email: string, password: string, firstName: string, lastName: string) =>
      dispatch(signup({ email, password, firstName, lastName })),
    logout: () => dispatch(logout()),
  };
}