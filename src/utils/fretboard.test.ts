import { describe, it, expect } from 'vitest';
import { transposeNote } from '../data/notes';
import { getInterval, isNoteInScale, getNoteAtFret, getIntervalName } from './fretboard';
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
});
