'use client';

import { useState } from 'react';

import colors from '@/theme/colors';

type Props = {
  isActive?: boolean;
  onChange?: () => Promise<void>;
};

const Switch = ({ isActive, onChange }: Props) => {
  const [enabled, setEnabled] = useState(isActive || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setEnabled(!enabled);
      setIsLoading(true);
      if (onChange) {
        await onChange();
      }
      setIsLoading(false);
    } catch {
      setEnabled(!enabled);
      setIsLoading(false);
    }
  };

  return (
    <button
      aria-label="Toggle Switch"
      className="relative flex w-10 cursor-pointer rounded-full p-0.5 transition"
      disabled={isLoading}
      style={{
        backgroundColor: enabled ? colors.alert.success : colors.neutral[200],
      }}
      type="button"
      onClick={handleToggle}
    >
      <div
        className="h-5 w-5 rounded-full bg-white transition-transform"
        style={{
          transform: enabled ? 'translateX(80%)' : 'translateX(0)',
        }}
      />
    </button>
  );
};

export default Switch;
