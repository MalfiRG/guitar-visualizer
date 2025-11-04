import { useState, useEffect } from 'react';
import type { Tuning, Note } from '../types';

const CUSTOM_TUNING_KEY = 'guitar-visualizer-custom-tuning';

export function useCustomTuning() {
  const [customTuning, setCustomTuning] = useState<Tuning | null>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_TUNING_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (customTuning) {
      localStorage.setItem(CUSTOM_TUNING_KEY, JSON.stringify(customTuning));
    } else {
      localStorage.removeItem(CUSTOM_TUNING_KEY);
    }
  }, [customTuning]);

  const createCustomTuning = (notes: Note[]) => {
    const tuning: Tuning = {
      id: 'custom',
      name: `Custom ${notes.length}-String (${notes.join(' ')})`,
      notes,
      strings: notes.length,
      isCustom: true,
    };
    setCustomTuning(tuning);
    return tuning;
  };

  const clearCustomTuning = () => {
    setCustomTuning(null);
  };

  return {
    customTuning,
    createCustomTuning,
    clearCustomTuning,
  };
}
