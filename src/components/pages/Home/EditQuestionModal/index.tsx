import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import CheckBox from '@/components/ui/CheckBox';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import { DropdownForm } from '@/components/ui/Dropdown';
import { useDisciplines } from '@/services/api/disciplines';
import { QuestionForm, QuestionSchema } from '@/validation/question.validation';

import { Answer } from '../QuestionItem';

type EditQuestionModalProps = {
  title: string;
  discipline: number;
  answer1: Answer;
  answer2: Answer;
  answer3: Answer;
  answer4: Answer;
  answer5: Answer;
  isOpen: boolean;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (data: QuestionForm) => void;
};

const EditQuestionModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  discipline,
  answer1,
  answer2,
  answer3,
  answer4,
  answer5,
}: EditQuestionModalProps) => {
  const { data } = useDisciplines({ name: '' });

  const { control, handleSubmit, setValue, reset } = useForm<QuestionForm>({
    resolver: zodResolver(QuestionSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      discipline: 0,
      answer1: { label: '', correct: false },
      answer2: { label: '', correct: false },
      answer3: { label: '', correct: false },
      answer4: { label: '', correct: false },
      answer5: { label: '', correct: false },
    },
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Reseta o formulário com os valores recebidos
      reset({
        title,
        discipline,
        answer1,
        answer2,
        answer3,
        answer4,
        answer5,
      });

      // Define qual resposta está marcada como correta
      if (answer1.correct) {
        setSelectedAnswer('answer1');
      } else if (answer2.correct) {
        setSelectedAnswer('answer2');
      } else if (answer3.correct) {
        setSelectedAnswer('answer3');
      } else if (answer4.correct) {
        setSelectedAnswer('answer4');
      } else if (answer5.correct) {
        setSelectedAnswer('answer5');
      } else {
        setSelectedAnswer('');
      }
    }
  }, [
    isOpen,
    title,
    discipline,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    reset,
  ]);

  const handleSelectAnswer = (answerKey: string) => {
    setSelectedAnswer(answerKey);

    // Atualiza todos os campos correct
    ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'].forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(`${key}.correct` as any, key === answerKey);
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-auto max-h-[90vh] w-[700px] flex-col overflow-hidden rounded-lg border-neutral-200 bg-white">
        <DefaultModalHeader title="Editar questão" />

        <div className="flex grow flex-col gap-4 overflow-y-auto p-4">
          <Input
            control={control}
            label="Título da questão"
            name="title"
            placeholder="Digite o título da questão"
          />

          <DropdownForm
            control={control}
            name="discipline"
            options={data || []}
            placeholder="Selecione uma disciplina"
          />

          <div className="mt-2 flex flex-col gap-3">
            <p className="text-lg font-semibold text-neutral-700">Respostas</p>

            {(
              ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] as const
            ).map((key, index) => (
              <div key={key} className="flex items-start gap-3">
                <span className="mt-3 text-lg font-medium text-neutral-600">
                  {String.fromCharCode(97 + index)})
                </span>

                <div className="flex-1">
                  <Input
                    control={control}
                    name={`${key}.label`}
                    placeholder={`Resposta ${index + 1}`}
                  />
                </div>

                <div className="mt-2">
                  <CheckBox
                    isSelected={selectedAnswer === key}
                    label="Correta"
                    onClick={() => handleSelectAnswer(key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DefaultModalFooter
          cancelText="Cancelar"
          confirmText="Salvar"
          handleCancel={onCancel}
          handleConfirm={handleSubmit(onConfirm)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default EditQuestionModal;
