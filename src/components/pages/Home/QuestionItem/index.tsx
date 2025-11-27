'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Icon } from '@/components/ui';
import { IDiscipline } from '@/interfaces/disciplines';
import { useEditQuestion } from '@/services/api/questions';
import colors from '@/theme/colors';
import { QuestionForm } from '@/validation/question.validation';

import EditQuestionModal from '../EditQuestionModal';

export type Answer = {
  label: string;
  correct: boolean;
};

type QuestionItemProps = {
  questionId: number;
  questionText: string;
  discipline: IDiscipline;
  answer1: Answer;
  answer2: Answer;
  answer3: Answer;
  answer4: Answer;
  answer5: Answer;
  date?: string;
};

const QuestionItem = ({
  questionId,
  discipline,
  questionText,
  answer1,
  answer2,
  answer3,
  answer4,
  answer5,
  date,
}: QuestionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { mutateAsync: editQuestion } = useEditQuestion();

  const onSubmit = async (data: QuestionForm) => {
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

    await editQuestion({ id: questionId, form });
    setEditModalOpen(false);
  };

  const answers = [answer1, answer2, answer3, answer4, answer5];
  const answerLabels = ['a', 'b', 'c', 'd', 'e'];

  return (
    <>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          {/* Header da questão */}
          <div
            className="flex w-full cursor-pointer items-start justify-between gap-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex-1">
              <h3
                className="mb-2 select-none text-lg font-semibold leading-tight"
                style={{ color: colors.neutral[80] }}
              >
                {questionText}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 font-medium"
                  style={{
                    backgroundColor: colors.primary[100] || '#EEF2FF',
                    color: colors.neutral.white || '#4F46E5',
                  }}
                >
                  {discipline.name}
                </span>

                {date && (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 font-medium"
                    style={{
                      backgroundColor: colors.neutral[20] || '#F5F5F5',
                      color: colors.neutral[60] || '#737373',
                    }}
                  >
                    {date}
                  </span>
                )}
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2">
              <motion.button
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={e => {
                  e.stopPropagation();
                  setEditModalOpen(true);
                }}
              >
                <Icon color={colors.neutral[60]} name="EditIcon" size={24} />
              </motion.button>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="p-2"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
              </motion.div>
            </div>
          </div>

          {/* Respostas expandíveis */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                animate={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{ y: 0 }}
                  className="mt-4 border-t pt-4"
                  exit={{ y: -10 }}
                  initial={{ y: -10 }}
                  style={{ borderColor: colors.neutral[20] || '#E5E5E5' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="space-y-2">
                    {answers.map((answer, index) => (
                      <motion.div
                        key={index}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3 rounded-lg p-3 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        style={{
                          backgroundColor: answer.correct
                            ? colors.alert?.success?.primary || '#F0FDF4'
                            : 'transparent',
                        }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                          style={{
                            backgroundColor: answer.correct
                              ? colors.alert?.success?.primary || '#22C55E'
                              : colors.neutral[20] || '#E5E5E5',
                            color: answer.correct
                              ? 'white'
                              : colors.neutral[60] || '#404040',
                          }}
                        >
                          {answerLabels[index]}
                        </span>

                        <p
                          className="flex-1 select-none text-base leading-relaxed"
                          style={{
                            color: answer.correct
                              ? colors.neutral.white || '#166534'
                              : colors.neutral[80],
                            fontWeight: answer.correct ? 600 : 400,
                          }}
                        >
                          {answer.label}
                        </p>

                        {answer.correct && (
                          <motion.span
                            animate={{ scale: 1 }}
                            className="shrink-0 rounded px-2 py-1 text-xs font-semibold"
                            initial={{ scale: 0 }}
                            style={{
                              backgroundColor:
                                colors.alert?.success?.primary || '#22C55E',
                              color: 'white',
                            }}
                            transition={{ delay: 0.2, type: 'spring' }}
                          >
                            Correta
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <EditQuestionModal
        answer1={answer1}
        answer2={answer2}
        answer3={answer3}
        answer4={answer4}
        answer5={answer5}
        discipline={discipline.id}
        isOpen={editModalOpen}
        title={questionText}
        onCancel={() => setEditModalOpen(false)}
        onConfirm={onSubmit}
      />
    </>
  );
};

export default QuestionItem;
