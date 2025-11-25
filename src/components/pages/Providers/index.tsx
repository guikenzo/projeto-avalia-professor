'use client';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify/unstyled';

import { DefaultModal } from '@/components/ui';
import { AuthProvider } from '@/contexts/authContext';
import { handleError } from '@/utils/handleError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      retry: false,
      initialDataUpdatedAt: 0,
    },
    mutations: {
      onError: err => handleError(err),
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidateQueries,
        });
      }
    },
  }),
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}

        <DefaultModal />

        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
