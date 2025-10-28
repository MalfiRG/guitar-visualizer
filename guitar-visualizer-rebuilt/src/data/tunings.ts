import type { Tuning } from '../types';

export const TUNINGS: Tuning[] = [
  // 6-String Tunings
  {
    id: 'standard-6',
    name: '6-String Standard (E Standard)',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    strings: 6,
  },
  {
    id: 'drop-d-6',
    name: '6-String Drop D',
    notes: ['D', 'A', 'D', 'G', 'B', 'E'],
    strings: 6,
  },
  {
    id: 'drop-c-6',
    name: '6-String Drop C',
    notes: ['C', 'G', 'C', 'F', 'A', 'D'],
    strings: 6,
  },
  {
    id: 'drop-b-6',
    name: '6-String Drop B',
    notes: ['B', 'F#', 'B', 'E', 'G#', 'C#'],
    strings: 6,
  },
  {
    id: 'drop-a-6',
    name: '6-String Drop A',
    notes: ['A', 'E', 'A', 'D', 'F#', 'B'],
    strings: 6,
  },
  {
    id: 'open-c-6',
    name: '6-String Open C (CGCGCE)',
    notes: ['C', 'G', 'C', 'G', 'C', 'E'],
    strings: 6,
  },

  // 7-String Tunings
  {
    id: 'standard-7',
    name: '7-String Standard (B Standard)',
    notes: ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
    strings: 7,
  },
  {
    id: 'drop-a-7',
    name: '7-String Drop A',
    notes: ['A', 'E', 'A', 'D', 'G', 'B', 'E'],
    strings: 7,
  },
  {
    id: 'drop-g-7',
    name: '7-String Drop G',
    notes: ['G', 'D', 'G', 'C', 'F', 'A', 'D'],
    strings: 7,
  },
  {
    id: 'drop-f-7',
    name: '7-String Drop F',
    notes: ['F', 'C', 'F', 'A#', 'D#', 'G', 'C'],
    strings: 7,
  },
  {
    id: 'a-standard-7',
    name: '7-String A Standard',
    notes: ['A', 'D', 'G', 'C', 'F', 'A', 'D'],
    strings: 7,
  },

  // 8-String Tunings
  {
    id: 'standard-8',
    name: '8-String Standard (F# Standard)',
    notes: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
    strings: 8,
  },
  {
    id: 'drop-e-8',
    name: '8-String Drop E',
    notes: ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
    strings: 8,
  },
  {
    id: 'drop-d-8',
    name: '8-String Drop D',
    notes: ['D', 'A', 'D', 'G', 'C', 'F', 'A', 'D'],
    strings: 8,
  },
  {
    id: 'meshuggah-8',
    name: '8-String Meshuggah (F Standard)',
    notes: ['F', 'A#', 'D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
    strings: 8,
  },
  {
    id: 'e-standard-8',
    name: '8-String E Standard',
    notes: ['E', 'A', 'D', 'G', 'C', 'F', 'A', 'D'],
    strings: 8,
  },
  {
    id: 'animals-8',
    name: '8-String Animals as Leaders (Drop E♭)',
    notes: ['D#', 'A#', 'D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
    strings: 8,
  },
];
