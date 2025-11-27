import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { IDiscipline } from '@/interfaces/disciplines';

import { http } from '../http';

const BASE_URL = 'https://projeto-avalia-hh2z.onrender.com/disciplinas';

export const useDisciplines = () => {
  const disciplines = async () => {
    const { data } = await http.get<IDiscipline[]>(BASE_URL);
    return data;
  };

  return useQuery({
    queryKey: queryKeys.disciplines.all,
    queryFn: disciplines,
  });
};
