'use client';

import { redirect, usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLogin } from '@/hooks/api/useAuthApi';
import { http } from '@/services/http';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  // eslint-disable-next-line no-unused-vars
  login: (form: LoginForm) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isReady, setIsReady] = useState(false);
  const { mutateAsync } = useLogin();

  const logout = () => {
    sessionStorage.removeItem('accessToken');

    if (pathname !== '/login') {
      redirect('/login');
    }
  };

  const login = async (form: LoginForm) => {
    try {
      const { token } = await mutateAsync(form);

      if (token) {
        sessionStorage.setItem('accessToken', token);
        router.replace('/dashboard');
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken && pathname !== '/login') {
        redirect('/login');
      }
    };

    checkToken();
    setIsReady(true);
  }, []);

  http.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }

      if (
        error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE' ||
        error.response?.status === 401
      ) {
        logout();
      }

      return Promise.reject(error);
    },
  );

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
