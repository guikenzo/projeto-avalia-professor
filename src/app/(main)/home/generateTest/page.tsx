'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FilterSidebar, {
  FilterState,
} from '@/components/pages/Home/FilterSideBar';
import QuestionItemWithCheckbox from '@/components/pages/Home/QuestionItemWithCheckBox';
import { Button, Icon, Input } from '@/components/ui';
import SearchBar from '@/components/ui/SearchBar';
import { useDebounce } from '@/hooks/common';
import { useQuestions } from '@/services/api/questions';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { TestForm, TestSchema } from '@/validation/test.validation';
import { useAuth } from '@/contexts/authContext';

const GenerateTest = () => {
  const router = useRouter();
  const {logout} = useAuth();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    disciplines: [],
  });
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const { openModal, closeModal } = useDefaultModal();

  const { data } = useQuestions({
    title: debouncedSearch,
    disciplinaIds: activeFilters.disciplines,
    professorIds: [],
  });

  const { control, handleSubmit, setValue } = useForm<TestForm>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      name: '',
      date: '',
      teacher: 0,
      type: '',
      time: '',
      weight: '',
      questions: [],
    },
  });

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    console.log('Filtros aplicados:', filters);
  };

  const handleQuestionToggle = (questionId: number) => {
    setSelectedQuestions(prev => {
      const newSelection = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];

      setValue('questions', newSelection);

      return newSelection;
    });
  };

  const onSubmit = (data: TestForm) => {
    console.log('Dados da prova:', data);
    console.log('Questões selecionadas:', selectedQuestions);
    router.replace('/home');

    openModal({
      title: 'Sucesso!',
      message: 'Prova gerada com sucesso!',
      confirmText: 'Fechar',
      onConfirm: closeModal,
    });
  };

  const handleExit = async () => {
    await logout()
  }

  return (
    <>
      <div className="flex-col flex-1 items-start min-h-screen">

      <header className="fixed top-0 left-0 right-0 h-20 bg-blue-900 text-white flex justify-between items-center px-6 rounded-b-md z-10">
        <h2 className="text-lg md:text-xl font-semibold">Projeto Avalia - Área do Professor</h2>
        <div className="flex items-center gap-4 text-lg">
          <span>João da Silva Cunha</span>
          <button className="text-white text-xl cursor-pointer" onClick={handleExit}>
            <Icon name='ExitIcon' color={colors.neutral.white} size={24}/>
          </button>
        </div>
      </header>

        <div
          className="flex h-full min-h-screen flex-1 flex-col"
          style={{ backgroundColor: colors.neutral.background }}
        >
          <div
            className="flex items-center justify-between border-b p-5"
            style={{ borderColor: colors.neutral[20] }}
          >
            <h1
              className="text-3xl font-bold"
              style={{ color: colors.neutral[80] }}
            >
              Gerar Prova
            </h1>

            <div className="flex items-center gap-3">
              <Button
                className="rounded-lg px-8 py-2 text-white"
                color={colors.neutral[40]}
                text="Voltar"
                onClick={() => router.back()}
              />

              <Button
                className="rounded-lg px-8 py-2 text-white"
                text="Gerar Prova"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>

          <div
            className="border-b p-5"
            style={{ borderColor: colors.neutral[20] }}
          >
            <h2
              className="mb-4 text-2xl font-semibold"
              style={{ color: colors.neutral[80] }}
            >
              Informações da Prova
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Input
                control={control}
                label="Nome da Prova"
                name="name"
                placeholder="Ex: Prova Bimestral"
              />

              <Input
                control={control}
                label="Data"
                name="date"
                placeholder="DD/MM/AAAA"
                type="date"
              />

              <Input
                control={control}
                label="Tipo de Avaliação"
                name="type"
                placeholder="Ex: Prova, Simulado, Teste"
              />

              <Input
                control={control}
                label="Duração (minutos)"
                name="time"
                placeholder="Ex: 60"
                type="number"
              />

              <Input
                control={control}
                label="Peso"
                name="weight"
                placeholder="Ex: 2.5"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-2xl font-semibold"
                style={{ color: colors.neutral[80] }}
              >
                Selecionar Questões ({selectedQuestions.length} selecionadas)
              </h2>

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
                  <Icon
                    color={colors.primary[100]}
                    name="FilterIcon"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {data && data.length > 0 ? (
                data.map(item => (
                  <QuestionItemWithCheckbox
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
                    isSelected={selectedQuestions.includes(item.id)}
                    questionText={item.title}
                    teacher={item.createdBy.email}
                    onToggle={() => handleQuestionToggle(item.id)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl" style={{ color: colors.neutral[60] }}>
                    Nenhuma questão encontrada
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onApplyFilters={handleApplyFilters}
        onClose={() => setFilterSidebarOpen(false)}
      />
    </>
  );
};

export default GenerateTest;
