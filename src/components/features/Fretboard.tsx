import { useState } from 'react';
import type { Scale, Tuning } from '../../types';
import { getFretNote, getIntervalName } from '../../utils/fretboard';
import { cn } from '../../utils/cn';
import { useWindowWidth, getResponsiveFretConfig } from '../../utils/responsive';

interface FretboardProps {
  scale: Scale;
  rootNote: string;
  tuning: Tuning;
  showNoteNames: boolean;
  showIntervals: boolean;
  onRootNoteChange: (note: string) => void;
}

const TOTAL_FRETS = 24;

export function Fretboard({
  scale,
  rootNote,
  tuning,
  showNoteNames,
  showIntervals,
  onRootNoteChange,
}: FretboardProps) {
  const windowWidth = useWindowWidth();
  const config = getResponsiveFretConfig(windowWidth);
  const [fretOffset, setFretOffset] = useState(0);

  // Calculate visible fret range
  const visibleFretCount = config.fretCount + 1; // +1 to include the open string
  const maxOffset = Math.max(0, TOTAL_FRETS - config.fretCount);
  const startFret = fretOffset;
  const endFret = Math.min(startFret + config.fretCount, TOTAL_FRETS);

  const frets = Array.from({ length: visibleFretCount }, (_, i) => startFret + i);

  // Navigation handlers
  const handlePrevious = () => {
    setFretOffset((prev) => Math.max(0, prev - config.fretCount));
  };

  const handleNext = () => {
    setFretOffset((prev) => Math.min(maxOffset, prev + config.fretCount));
  };

  const canGoPrevious = fretOffset > 0;
  const canGoNext = fretOffset < maxOffset;

  return (
    <div className="w-full">
      {/* Navigation Controls (Mobile/Tablet only) */}
      {config.showNavigation && (
        <div className="flex items-center justify-between mb-4 gap-4">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
              'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md',
              'hover:from-emerald-600 hover:to-cyan-600 hover:shadow-lg',
              'disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
              'text-sm md:text-base'
            )}
          >
            ← Previous
          </button>
          <div className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
            Frets {startFret}-{endFret}
          </div>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
              'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md',
              'hover:from-emerald-600 hover:to-cyan-600 hover:shadow-lg',
              'disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
              'text-sm md:text-base'
            )}
          >
            Next →
          </button>
        </div>
      )}

      <div className="w-full overflow-x-auto lg:overflow-x-visible">
        <div className="bg-gradient-to-b from-amber-800 to-amber-900 p-4 md:p-5 lg:p-6 rounded-lg shadow-lg">
          {/* Fret markers */}
          <div className="flex mb-2">
            <div className="w-8 md:w-10 lg:w-12" /> {/* String labels space */}
            {frets.map((fret) => (
              <div
                key={fret}
                className="flex-1 text-center text-xs md:text-sm text-amber-200 font-semibold"
              >
                {fret}
              </div>
            ))}
          </div>

          {/* Strings */}
          {tuning.notes.map((openNote, stringIndex) => (
            <div key={stringIndex} className="flex items-center mb-3 md:mb-4 last:mb-0">
              {/* String label */}
              <div className="w-8 md:w-10 lg:w-12 text-amber-200 font-bold text-xs md:text-sm text-right pr-2 md:pr-3">
                {openNote}
              </div>

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
                      style={{ minHeight: config.minHeight }}
                    >
                      {/* Fret wire */}
                      {fret > 0 && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-500 dark:bg-gray-600" />
                      )}

                      {/* Note marker */}
                      {fretNote && (
                        <div
                          onClick={() => onRootNoteChange(fretNote.note)}
                          className={cn(
                            'relative z-10 rounded-md flex items-center justify-center font-bold transition-all duration-200',
                            'text-[10px] md:text-xs cursor-pointer border-2',
                            'w-full mx-1 py-1.5 md:py-2',
                            fretNote.isRoot &&
                              'bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/50 border-orange-700 hover:from-red-600 hover:to-orange-700 hover:shadow-xl hover:shadow-red-500/60 hover:scale-105',
                            !fretNote.isRoot &&
                              fretNote.isCharacteristic &&
                              'bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 shadow-md shadow-amber-500/40 border-yellow-600 hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105',
                            !fretNote.isRoot &&
                              !fretNote.isCharacteristic &&
                              'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/30 border-blue-600 hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105'
                          )}
                          title={`Click to set ${fretNote.note} as root note`}
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
                          <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 opacity-40" />
                        )}
                      {stringIndex === Math.floor(tuning.strings / 2) &&
                        [12, 24].includes(fret) && (
                          <>
                            <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 opacity-40 top-1/4" />
                            <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 opacity-40 bottom-1/4" />
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
    </div>
  );
}
