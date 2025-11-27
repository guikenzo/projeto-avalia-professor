'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Icon } from '@/components/ui';
import { IDiscipline } from '@/interfaces/disciplines';
import { useEditQuestion } from '@/services/api/questions';
import colors from '@/theme/colors';

import EditQuestionModal from '../EditQuestionModal';
import { QuestionForm } from '@/validation/question.validation';

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

  return (
    <>
      <div className="w-full rounded-lg bg-white p-3">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="flex-1 select-none text-2xl font-semibold"
            style={{ color: colors.neutral[80] }}
          >
            {`${questionText} - ${discipline.name} (${date})`}
          </span>

          <div className="flex items-center justify-center gap-3">
            <div
              className="cursor-pointer"
              onClick={() => setEditModalOpen(true)}
            >
              <Icon color={colors.neutral[60]} name="EditIcon" size={24} />
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
            </motion.div>
          </div>
        </div>

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
                className="mt-3 flex flex-col gap-1 pl-2"
                exit={{ y: 15 }}
                initial={{ y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <p
                  className="select-none text-2xl font-normal"
                  style={{
                    color: answer1.correct
                      ? colors.alert.success.primary
                      : colors.neutral[80],
                  }}
                >
                  a) {answer1.label}
                </p>

                <p
                  className="select-none text-2xl font-normal"
                  style={{
                    color: answer2.correct
                      ? colors.alert.success.primary
                      : colors.neutral[80],
                  }}
                >
                  b) {answer2.label}
                </p>

                <p
                  className="select-none text-2xl font-normal"
                  style={{
                    color: answer3.correct
                      ? colors.alert.success.primary
                      : colors.neutral[80],
                  }}
                >
                  c) {answer3.label}
                </p>

                <p
                  className="select-none text-2xl font-normal"
                  style={{
                    color: answer4.correct
                      ? colors.alert.success.primary
                      : colors.neutral[80],
                  }}
                >
                  d) {answer4.label}
                </p>

                <p
                  className="select-none text-2xl font-normal"
                  style={{
                    color: answer5.correct
                      ? colors.alert.success.primary
                      : colors.neutral[80],
                  }}
                >
                  e) {answer5.label}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
        onConfirm={onSubmit} // ✅ Corrigido: remove a arrow function desnecessária
      />
    </>
  );
};

export default QuestionItem;
