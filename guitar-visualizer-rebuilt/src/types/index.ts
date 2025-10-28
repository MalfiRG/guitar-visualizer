export type Note = string;

export interface Scale {
  id: string;
  name: string;
  intervals: number[];
  description: string;
  genre: string;
}

export interface Tuning {
  id: string;
  name: string;
  notes: Note[];
  strings: number;
}

export interface FretNote {
  note: Note;
  interval: number;
  isRoot: boolean;
}
