import { CHROMATIC_NOTES } from '../../data/notes';
import { cn } from '../../utils/cn';

interface RootNoteSelectorProps {
  rootNote: string;
  setRootNote: (note: string) => void;
}

export function RootNoteSelector({ rootNote, setRootNote }: RootNoteSelectorProps) {
  return (
    <div className="w-full mt-4">
      <div className="bg-white dark:bg-gray-900 p-3 md:p-4 lg:p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="flex flex-col gap-3">
          {/* Label */}
          <h3 className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 text-center">
            Root Note
          </h3>

          {/* Note buttons grid */}
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3">
            {CHROMATIC_NOTES.map((note) => (
              <button
                key={note}
                onClick={() => setRootNote(note)}
                className={cn(
                  'aspect-square rounded-lg font-bold text-sm md:text-base lg:text-lg',
                  'transition-all duration-200 transform',
                  'hover:scale-105 active:scale-95',
                  'border-2',
                  rootNote === note
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/50 scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500'
                )}
                aria-label={`Select ${note} as root note`}
                aria-pressed={rootNote === note}
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
