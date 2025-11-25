import { useMutation } from '@tanstack/react-query';

import { authService } from '@/services/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};
