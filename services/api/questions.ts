import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { IQuestions } from '@/interfaces/questions';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/questoes';

export const useQuestions = (params: {
  title: string;
  disciplinaIds: number[];
  professorIds: number[];
}) => {
  const questions = async () => {
    const { data } = await http.get<IQuestions[]>(`${BASE_URL}/buscar`, {
      params,
    });
    return data;
  };

  return useQuery({
    queryKey: queryKeys.questions.search(params),
    queryFn: questions,
  });
};

export type CreateQuestionForm = {
  title: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  answerE: string;
  correctAnswer: string;
  subjectId: number;
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  const createQuestion = async (form: CreateQuestionForm) => {
    await http.post(BASE_URL, form);
  };

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.questions.all,
      });
    },
  });
};

export const useEditQuestion = () => {
  const queryClient = useQueryClient();

  const editQuestion = async (variables: {
    id: number;
    form: CreateQuestionForm;
  }) => {
    const { id, form } = variables;
    await http.put(`${BASE_URL}/${id}`, form);
  };

  return useMutation({
    mutationFn: editQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.questions.all,
      });
    },
  });
};
