'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Icon } from '@/components/ui';
import CheckBox from '@/components/ui/CheckBox';
import { IDiscipline } from '@/interfaces/disciplines';
import colors from '@/theme/colors';

export type Answer = {
  label: string;
  correct: boolean;
};

type QuestionItemWithCheckboxProps = {
  questionText: string;
  discipline: IDiscipline;
  answer1: Answer;
  answer2: Answer;
  answer3: Answer;
  answer4: Answer;
  answer5: Answer;
  date?: string;
  isSelected: boolean;
  onToggle: () => void;
};

const QuestionItemWithCheckbox = ({
  discipline,
  questionText,
  answer1,
  answer2,
  answer3,
  answer4,
  answer5,
  date,
  isSelected,
  onToggle,
}: QuestionItemWithCheckboxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const answers = [answer1, answer2, answer3, answer4, answer5];
  const answerLabels = ['a', 'b', 'c', 'd', 'e'];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full gap-4 rounded-xl bg-white p-4 shadow-sm transition-all"
      initial={{ opacity: 0, y: 20 }}
      style={{
        borderWidth: 3,
        borderColor: isSelected ? colors.primary[100] : 'transparent',
        borderStyle: 'solid',
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Checkbox de seleção */}
      <div className="flex items-start pt-1">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox isSelected={isSelected} label="" onClick={onToggle} />
        </motion.div>
      </div>

      {/* Conteúdo da questão */}
      <div className="min-w-0 flex-1">
        <div
          className="flex w-full cursor-pointer items-start justify-between gap-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="min-w-0 flex-1">
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

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="shrink-0 p-2"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Icon color={colors.neutral[80]} name="ChevronIcon" size={20} />
          </motion.div>
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
                            : colors.neutral[80] || '#404040',
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
  );
};

export default QuestionItemWithCheckbox;
