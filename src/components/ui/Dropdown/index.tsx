'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Icon } from '@/components/ui';
import { IDiscipline } from '@/interfaces/disciplines';
import colors from '@/theme/colors';

type DropdownFormProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: IDiscipline[];
  placeholder?: string;
};

export const DropdownForm = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = 'Selecione',
}: DropdownFormProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: IDiscipline) => {
    onChange(option.id);
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.id === value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        className="flex w-full flex-1 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
        </motion.div>
      </button>

      {isOpen && (
        <ul className="animate-slideDown absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map(option => (
            <li
              key={option.id}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
