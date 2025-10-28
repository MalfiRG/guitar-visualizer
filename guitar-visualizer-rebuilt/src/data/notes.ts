import type { Note } from '../types';

export const CHROMATIC_NOTES: Note[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

/**
 * Transpose a note by a given number of semitones
 */
export function transposeNote(note: Note, semitones: number): Note {
  const noteIndex = CHROMATIC_NOTES.indexOf(note);
  if (noteIndex === -1) {
    throw new Error(`Invalid note: ${note}`);
  }
  const newIndex = (noteIndex + semitones) % CHROMATIC_NOTES.length;
  return CHROMATIC_NOTES[newIndex < 0 ? newIndex + CHROMATIC_NOTES.length : newIndex];
}
