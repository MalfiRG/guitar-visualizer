import type { Note, Scale, FretNote } from '../types';
import { CHROMATIC_NOTES, transposeNote } from '../data/notes';

/**
 * Calculate the interval between two notes
 */
export function getInterval(note1: Note, note2: Note): number {
  const index1 = CHROMATIC_NOTES.indexOf(note1);
  const index2 = CHROMATIC_NOTES.indexOf(note2);

  if (index1 === -1 || index2 === -1) {
    throw new Error(`Invalid notes: ${note1}, ${note2}`);
  }

  let interval = index2 - index1;
  if (interval < 0) {
    interval += CHROMATIC_NOTES.length;
  }

  return interval;
}

/**
 * Check if a note is in a scale
 */
export function isNoteInScale(note: Note, rootNote: Note, scale: Scale): boolean {
  const interval = getInterval(rootNote, note);
  return scale.intervals.includes(interval);
}

/**
 * Get the note at a specific fret on a string
 */
export function getNoteAtFret(openStringNote: Note, fret: number): Note {
  return transposeNote(openStringNote, fret);
}

/**
 * Get the interval name for display
 */
export function getIntervalName(interval: number): string {
  const intervalNames: Record<number, string> = {
    0: 'R', // Root
    1: 'm2', // Minor 2nd
    2: 'M2', // Major 2nd
    3: 'm3', // Minor 3rd
    4: 'M3', // Major 3rd
    5: 'P4', // Perfect 4th
    6: 'TT', // Tritone
    7: 'P5', // Perfect 5th
    8: 'm6', // Minor 6th
    9: 'M6', // Major 6th
    10: 'm7', // Minor 7th
    11: 'M7', // Major 7th
  };

  return intervalNames[interval] || '';
}

/**
 * Calculate all notes on a fret for a given string
 */
export function getFretNote(
  openStringNote: Note,
  fret: number,
  rootNote: Note,
  scale: Scale
): FretNote | null {
  const note = getNoteAtFret(openStringNote, fret);

  if (!isNoteInScale(note, rootNote, scale)) {
    return null;
  }

  const interval = getInterval(rootNote, note);
  const isRoot = interval === 0;

  return {
    note,
    interval,
    isRoot,
  };
}
