import { useMutation } from '@tanstack/react-query';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/provas';

export type TestForm = {
  titulo: string;
  idsQuestoes: number[];
  dataProva: string;
  tipoAvaliacao: string;
  duracao: number;
  peso: number;
};

export const useCreateTest = () => {
  const createTest = async (form: TestForm) => {
    try {
      const response = await http.post(`${BASE_URL}/gerar`, form, {
        responseType: 'blob',
        validateStatus: status => status < 500, // Aceitar status < 500
      });

      // Se o response é um blob e é um PDF válido
      if (
        response.data instanceof Blob &&
        response.data.type === 'application/pdf'
      ) {
        return response.data;
      }

      // Se não for PDF, pode ser um erro em formato JSON
      if (response.data instanceof Blob) {
        const text = await response.data.text();
        const error = JSON.parse(text);
        throw new Error(error.message || 'Erro ao gerar prova');
      }

      return response.data;
    } catch (error: any) {
      // Se o erro vier como Blob, converter para texto
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.message || 'Erro ao gerar prova');
        } catch {
          throw new Error(text || 'Erro ao gerar prova');
        }
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createTest,
  });
};
