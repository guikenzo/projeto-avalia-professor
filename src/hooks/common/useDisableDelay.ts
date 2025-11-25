'use client';

import { useState } from 'react';

export const useDisableDelay = () => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithDelay = async (func: () => void | Promise<void>) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await func();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return { executeWithDelay, isLoading };
};
