import { useState } from 'react';
import { CHROMATIC_NOTES } from '../../data/notes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Label } from '../ui/Label';
import type { Note } from '../../types';

interface CustomTuningInputProps {
  onSave: (notes: Note[]) => void;
  onCancel: () => void;
}

export function CustomTuningInput({ onSave, onCancel }: CustomTuningInputProps) {
  const [stringCount, setStringCount] = useState<6 | 7 | 8>(6);
  const [notes, setNotes] = useState<Note[]>(Array(6).fill('E') as Note[]);

  const handleStringCountChange = (count: 6 | 7 | 8) => {
    setStringCount(count);
    const newNotes = Array(count).fill('E') as Note[];
    // Preserve existing notes
    for (let i = 0; i < Math.min(count, notes.length); i++) {
      newNotes[i] = notes[i];
    }
    setNotes(newNotes);
  };

  const handleNoteChange = (index: number, note: Note) => {
    const newNotes = [...notes];
    newNotes[index] = note;
    setNotes(newNotes);
  };

  const handleSave = () => {
    onSave(notes);
  };

  return (
    <div className="space-y-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Tuning</h3>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Cancel
        </button>
      </div>

      {/* String Count Selector */}
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-gray-300">Number of Strings</Label>
        <div className="flex gap-2">
          {([6, 7, 8] as const).map((count) => (
            <button
              key={count}
              onClick={() => handleStringCountChange(count)}
              className="flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-200 text-white shadow-md"
              style={{
                backgroundColor: stringCount === count ? '#E1776D' : '#9CA3AF',
              }}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Note Selectors */}
      <div className="space-y-3">
        <Label className="text-gray-700 dark:text-gray-300">String Notes (Low to High)</Label>
        <div className="grid grid-cols-2 gap-3">
          {notes.map((note, index) => (
            <div key={index} className="space-y-1">
              <Label
                htmlFor={`string-${index}`}
                className="text-xs text-gray-600 dark:text-gray-400"
              >
                String {index + 1}
              </Label>
              <Select value={note} onValueChange={(value) => handleNoteChange(index, value)}>
                <SelectTrigger id={`string-${index}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHROMATIC_NOTES.map((chromNote) => (
                    <SelectItem key={chromNote} value={chromNote}>
                      {chromNote}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-white shadow-md hover:shadow-lg"
        style={{ backgroundColor: '#6CE0C7' }}
      >
        Save Custom Tuning
      </button>
    </div>
  );
}
