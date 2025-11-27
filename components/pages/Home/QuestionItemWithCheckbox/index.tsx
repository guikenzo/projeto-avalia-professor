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

  return (
    <div
      className="flex w-full gap-3 rounded-lg bg-white p-3"
      style={{
        border: isSelected
          ? `2px solid ${colors.primary[100]}`
          : '2px solid transparent',
      }}
    >
      {/* Checkbox de seleção */}
      <div className="flex items-start pt-1">
        <CheckBox isSelected={isSelected} label="" onClick={onToggle} />
      </div>

      {/* Conteúdo da questão */}
      <div className="flex-1">
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

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
          </motion.div>
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
    </div>
  );
};

export default QuestionItemWithCheckbox;
