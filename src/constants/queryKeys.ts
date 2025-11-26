export const queryKeys = {
  base: {
    all: ['bases'] as const,
    lists: () => [...queryKeys.base.all, 'list'] as const,
  },

  disciplines: {
    all: ['Disciplines'] as const,
    lists: () => [...queryKeys.disciplines.all, 'list'] as const,
    search: (params: { name: string }) =>
      [...queryKeys.disciplines.all, 'search', params] as const,
  },

  questions: {
    all: ['Questions'] as const,
    lists: () => [...queryKeys.questions.all, 'list'] as const,
    search: (params: {
      title: string;
      disciplinaIds: number[];
      professorIds: number[];
    }) => [...queryKeys.questions.all, 'search', params] as const,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
type ExtractQueryKey<T> = T extends (...args: any[]) => infer R ? R : T;

export type TQueryKey = {
  [K in keyof typeof queryKeys]: {
    [P in keyof (typeof queryKeys)[K]]: ExtractQueryKey<
      (typeof queryKeys)[K][P]
    >;
  }[keyof (typeof queryKeys)[K]];
}[keyof typeof queryKeys];
