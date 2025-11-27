import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { IDiscipline } from '@/interfaces/disciplines';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/disciplinas';

export const useDisciplines = (params: { name: string }) => {
  const disciplines = async () => {
    const { data } = await http.get<IDiscipline[]>(`${BASE_URL}/buscar`, {
      params,
    });
    return data;
  };

  return useQuery({
    queryKey: queryKeys.disciplines.search(params),
    queryFn: disciplines,
  });
};
