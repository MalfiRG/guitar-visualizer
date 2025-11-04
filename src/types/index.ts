export type Note = string;

export interface Scale {
  id: string;
  name: string;
  intervals: number[];
  characteristicIntervals?: number[]; // Intervals that distinguish this scale
  description: string;
  genre: string;
}

export interface Tuning {
  id: string;
  name: string;
  notes: Note[];
  strings: number;
  isCustom?: boolean;
}

export interface FretNote {
  note: Note;
  interval: number;
  isRoot: boolean;
  isCharacteristic: boolean;
}
