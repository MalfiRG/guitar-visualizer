import type { Scale, Tuning } from '../../types';
import { getFretNote, getIntervalName } from '../../utils/fretboard';
import { cn } from '../../utils/cn';

interface FretboardProps {
  scale: Scale;
  rootNote: string;
  tuning: Tuning;
  showNoteNames: boolean;
  showIntervals: boolean;
}

const FRET_COUNT = 24;

export function Fretboard({
  scale,
  rootNote,
  tuning,
  showNoteNames,
  showIntervals,
}: FretboardProps) {
  const frets = Array.from({ length: FRET_COUNT + 1 }, (_, i) => i);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px] bg-gradient-to-b from-amber-800 to-amber-900 p-6 rounded-lg shadow-lg">
        {/* Fret markers */}
        <div className="flex mb-2">
          <div className="w-12" /> {/* String labels space */}
          {frets.map((fret) => (
            <div key={fret} className="flex-1 text-center text-xs text-amber-200 font-semibold">
              {fret}
            </div>
          ))}
        </div>

        {/* Strings */}
        {tuning.notes.map((openNote, stringIndex) => (
          <div key={stringIndex} className="flex items-center mb-4 last:mb-0">
            {/* String label */}
            <div className="w-12 text-amber-200 font-bold text-sm text-right pr-3">{openNote}</div>

            {/* Frets */}
            <div className="flex-1 flex relative">
              {/* String line */}
              <div
                className={cn(
                  'absolute top-1/2 left-0 right-0 transform -translate-y-1/2',
                  'bg-gray-400 dark:bg-gray-500'
                )}
                style={{
                  height: stringIndex === 0 ? '3px' : `${4 - stringIndex * 0.3}px`,
                }}
              />

              {/* Fret positions */}
              {frets.map((fret) => {
                const fretNote = getFretNote(openNote, fret, rootNote, scale);

                return (
                  <div
                    key={fret}
                    className="flex-1 flex items-center justify-center relative"
                    style={{ minHeight: '48px' }}
                  >
                    {/* Fret wire */}
                    {fret > 0 && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-500 dark:bg-gray-600" />
                    )}

                    {/* Note marker */}
                    {fretNote && (
                      <div
                        className={cn(
                          'relative z-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200',
                          fretNote.isRoot
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 w-10 h-10'
                            : 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-md shadow-cyan-500/30 w-8 h-8',
                          'hover:scale-110 cursor-pointer'
                        )}
                      >
                        {showIntervals
                          ? getIntervalName(fretNote.interval)
                          : showNoteNames
                            ? fretNote.note
                            : ''}
                      </div>
                    )}

                    {/* Fret markers (dots) */}
                    {stringIndex === Math.floor(tuning.strings / 2) &&
                      [3, 5, 7, 9, 15, 17, 19, 21].includes(fret) && (
                        <div className="absolute w-2 h-2 rounded-full bg-amber-300 opacity-40" />
                      )}
                    {stringIndex === Math.floor(tuning.strings / 2) && [12, 24].includes(fret) && (
                      <>
                        <div className="absolute w-2 h-2 rounded-full bg-amber-300 opacity-40 top-1/4" />
                        <div className="absolute w-2 h-2 rounded-full bg-amber-300 opacity-40 bottom-1/4" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
