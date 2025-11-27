'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CreateQuestionModal from '@/components/pages/Home/CreateQuestionModal';
import FilterSidebar, {
  FilterState,
} from '@/components/pages/Home/FilterSideBar';
import QuestionItem from '@/components/pages/Home/QuestionItem';
import { Icon } from '@/components/ui';
import SearchBar from '@/components/ui/SearchBar';
import { useAuth } from '@/contexts/authContext';
import { useDebounce } from '@/hooks/common';
import { useCreateQuestion, useQuestions } from '@/services/api/questions';
import colors from '@/theme/colors';
import { QuestionForm } from '@/validation/question.validation';

const Home = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    disciplines: [],
  });

  console.log(activeFilters);

  const { data } = useQuestions({
    title: debouncedSearch,
    disciplinaIds: activeFilters.disciplines,
    professorIds: [],
  });
  const { mutateAsync: createQuestion } = useCreateQuestion();

  const handleCreate = async (data: QuestionForm) => {
    const correctAnswer = () => {
      if (data.answer1.correct) {
        return 'A';
      }

      if (data.answer2.correct) {
        return 'B';
      }

      if (data.answer3.correct) {
        return 'C';
      }

      if (data.answer4.correct) {
        return 'D';
      }

      if (data.answer5.correct) {
        return 'E';
      }

      return 'A';
    };

    const form = {
      title: data.title,
      answerA: data.answer1.label,
      answerB: data.answer2.label,
      answerC: data.answer3.label,
      answerD: data.answer4.label,
      answerE: data.answer5.label,
      correctAnswer: correctAnswer(),
      subjectId: data.discipline,
    };

    await createQuestion(form);
    setCreateModalOpen(false);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const handleExit = () => {
    logout();
    router.replace('/login');
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="fixed left-0 right-0 top-0 z-10 flex h-20 items-center justify-between rounded-b-md bg-blue-900 px-6 text-white">
          <h2 className="text-lg font-semibold md:text-xl">
            Projeto Avalia - Área do Professor
          </h2>

          <div className="flex items-center gap-4 text-lg">
            <button
              className="cursor-pointer text-xl text-white"
              onClick={handleExit}
            >
              <Icon color={colors.neutral.white} name="ExitIcon" size={24} />
            </button>
          </div>
        </header>

        <div
          className="mt-20 flex h-full min-h-screen flex-1 flex-col"
          style={{ backgroundColor: colors.neutral.background }}
        >
          <div className="flex w-full justify-between p-5">
            <div className="flex items-center gap-4">
              <SearchBar
                borderColor={colors.neutral[20]}
                value={search}
                onChangeText={setSearch}
              />

              <div
                className="flex cursor-pointer items-center justify-center rounded-lg pb-2 pl-1 pr-2 pt-1 transition-colors hover:opacity-80"
                style={{ backgroundColor: colors.neutral[20] }}
                onClick={() => setFilterSidebarOpen(true)}
              >
                <Icon color={colors.primary[100]} name="FilterIcon" size={24} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div
                className="flex cursor-pointer items-center justify-center gap-3 transition-opacity hover:opacity-80"
                onClick={() => router.push('home/generateTest')}
              >
                <span
                  className="text-2xl font-semibold"
                  style={{ color: colors.primary[100] }}
                >
                  Gerar prova
                </span>

                <Icon color={colors.primary[100]} name="DocIcon" size={20} />
              </div>

              <div
                className="flex cursor-pointer items-center justify-center gap-3 transition-opacity hover:opacity-80"
                onClick={() => setCreateModalOpen(true)}
              >
                <span
                  className="text-2xl font-semibold"
                  style={{ color: colors.primary[100] }}
                >
                  Adicionar questão
                </span>

                <Icon color={colors.primary[100]} name="AddIcon" size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5">
            {data &&
              data.map(item => (
                <QuestionItem
                  key={item.id}
                  answer1={{
                    label: item.answerA,
                    correct: item.correctAnswer === 'A',
                  }}
                  answer2={{
                    label: item.answerB,
                    correct: item.correctAnswer === 'B',
                  }}
                  answer3={{
                    label: item.answerC,
                    correct: item.correctAnswer === 'C',
                  }}
                  answer4={{
                    label: item.answerD,
                    correct: item.correctAnswer === 'D',
                  }}
                  answer5={{
                    label: item.answerE,
                    correct: item.correctAnswer === 'E',
                  }}
                  date={format(item.updatedAt, 'dd/MM/yyyy')}
                  discipline={item.subject}
                  questionId={item.id}
                  questionText={item.title}
                />
              ))}
          </div>
        </div>
      </div>

      <CreateQuestionModal
        isOpen={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onConfirm={handleCreate}
      />

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onApplyFilters={handleApplyFilters}
        onClose={() => setFilterSidebarOpen(false)}
      />
    </>
  );
};

export default Home;
