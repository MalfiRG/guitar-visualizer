import { describe, it, expect } from 'vitest';
import { transposeNote } from '../data/notes';
import {
  getInterval,
  isNoteInScale,
  getNoteAtFret,
  getIntervalName,
  getFretNote,
} from './fretboard';
import { SCALES } from '../data/scales';

describe('Fretboard Utils', () => {
  describe('getInterval', () => {
    it('should calculate interval between two notes', () => {
      expect(getInterval('C', 'E')).toBe(4);
      expect(getInterval('E', 'A')).toBe(5);
      expect(getInterval('A', 'C')).toBe(3);
    });

    it('should handle wrapping around octave', () => {
      expect(getInterval('B', 'C')).toBe(1);
      expect(getInterval('G', 'F')).toBe(10);
    });
  });

  describe('isNoteInScale', () => {
    it('should check if note is in minor pentatonic scale', () => {
      const minorPentatonic = SCALES.find((s) => s.id === 'minor-pentatonic')!;

      expect(isNoteInScale('E', 'E', minorPentatonic)).toBe(true); // Root
      expect(isNoteInScale('G', 'E', minorPentatonic)).toBe(true); // Minor 3rd
      expect(isNoteInScale('A', 'E', minorPentatonic)).toBe(true); // 4th
      expect(isNoteInScale('F', 'E', minorPentatonic)).toBe(false); // Not in scale
    });
  });

  describe('getNoteAtFret', () => {
    it('should get correct note at fret', () => {
      expect(getNoteAtFret('E', 0)).toBe('E');
      expect(getNoteAtFret('E', 1)).toBe('F');
      expect(getNoteAtFret('E', 5)).toBe('A');
      expect(getNoteAtFret('A', 7)).toBe('E');
    });
  });

  describe('getIntervalName', () => {
    it('should return correct interval names', () => {
      expect(getIntervalName(0)).toBe('R');
      expect(getIntervalName(3)).toBe('m3');
      expect(getIntervalName(5)).toBe('P4');
      expect(getIntervalName(7)).toBe('P5');
    });
  });

  describe('transposeNote', () => {
    it('should transpose notes correctly', () => {
      expect(transposeNote('C', 2)).toBe('D');
      expect(transposeNote('E', 5)).toBe('A');
      expect(transposeNote('A', 7)).toBe('E');
    });
  });

  describe('getFretNote', () => {
    it('should identify root notes correctly', () => {
      const minorPentatonic = SCALES.find((s) => s.id === 'minor-pentatonic')!;
      const fretNote = getFretNote('E', 0, 'E', minorPentatonic);

      expect(fretNote).not.toBeNull();
      expect(fretNote?.isRoot).toBe(true);
      expect(fretNote?.note).toBe('E');
    });

    it('should identify scale notes correctly', () => {
      const minorPentatonic = SCALES.find((s) => s.id === 'minor-pentatonic')!;
      // G is the minor 3rd (interval 3), which is in the scale
      const fretNote = getFretNote('E', 3, 'E', minorPentatonic);

      expect(fretNote).not.toBeNull();
      expect(fretNote?.isRoot).toBe(false);
      expect(fretNote?.interval).toBe(3);
    });

    it('should identify non-root scale notes', () => {
      const minorPentatonic = SCALES.find((s) => s.id === 'minor-pentatonic')!;
      // A is the perfect 4th (interval 5), in the scale but not root
      const fretNote = getFretNote('E', 5, 'E', minorPentatonic);

      expect(fretNote).not.toBeNull();
      expect(fretNote?.isRoot).toBe(false);
      expect(fretNote?.interval).toBe(5);
    });

    it('should return null for notes not in scale', () => {
      const minorPentatonic = SCALES.find((s) => s.id === 'minor-pentatonic')!;
      // F is not in E minor pentatonic
      const fretNote = getFretNote('E', 1, 'E', minorPentatonic);

      expect(fretNote).toBeNull();
    });
  });
});
