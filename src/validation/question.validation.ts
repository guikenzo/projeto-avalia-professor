import z from './zod';

export const QuestionSchema = z.object({
  title: z.string().min(1, 'Adicione uma questão'),
  discipline: z.number(),
  answer1: z.object({
    label: z.string().min(1, 'Insira a resposta'),
    correct: z.boolean(),
  }),
  answer2: z.object({
    label: z.string().min(1, 'Insira a resposta'),
    correct: z.boolean(),
  }),
  answer3: z.object({
    label: z.string().min(1, 'Insira a resposta'),
    correct: z.boolean(),
  }),
  answer4: z.object({
    label: z.string().min(1, 'Insira a resposta'),
    correct: z.boolean(),
  }),
  answer5: z.object({
    label: z.string().min(1, 'Insira a resposta'),
    correct: z.boolean(),
  }),
});

export type QuestionForm = z.infer<typeof QuestionSchema>;
