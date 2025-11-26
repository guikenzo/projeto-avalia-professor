import z from './zod';

export const TestSchema = z.object({
  name: z.string().min(1, 'Adicione um nome'),
  date: z.string().min(1, 'Insira uma data pra prova'),
  teacher: z.number(),
  type: z.string().min(1, 'Insira o tipo da avaliação'),
  time: z.string().min(1, 'Insira a duração da prova'),
  weight: z.string().min(1, 'Insira o peso da prova'),
  questions: z.array(z.number()).min(1, 'Selecione ao menos uma questão'),
});

export type TestForm = z.infer<typeof TestSchema>;
