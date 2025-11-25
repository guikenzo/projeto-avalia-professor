import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const handleCustomErrors = (error: AxiosError<{ message: string }>): string => {
  const errorMessage = error.response?.data?.message;

  if (!errorMessage || typeof errorMessage !== 'string') {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (errorMessage.includes('Too many requests, please try again later.')) {
    return 'Muitas requisições, tente mais tarde.';
  }

  if (errorMessage.includes('Your new password must be different')) {
    return 'Sua nova senha deve ser diferente da senha atual.';
  }

  if (
    errorMessage.includes('Passwords do not match') ||
    errorMessage.includes('The provided current password')
  ) {
    return 'Senha atual inválida';
  }

  if (errorMessage.includes('Invalid identifier or password')) {
    return 'Dados inválidos';
  }

  return errorMessage;
};

export const handleError = (
  err: AxiosError | string | Error | unknown,
): void => {
  if (axios.isAxiosError(err)) {
    toast.error(handleCustomErrors(err));
    return;
  }

  if (err instanceof Error) {
    toast.error(err.message);
    return;
  }

  if (typeof err === 'string') {
    toast.error(err);
    return;
  }

  toast.error('Houve um imprevisto, tente novamente mais tarde');
};

export const handleSuccess = (message: string): void => {
  toast.success(message);
};
