import { LoginForm } from '@/validation/login.validation';

import { http } from '../http';

const BASE_URL = '/auth';

export const authService = {
  login: async (form: LoginForm) => {
    const { data } = await http.post<{ token: string }>(
      `${BASE_URL}/login`,
      form,
    );
    return data;
  },
};
