import { useState, useMemo } from 'react';
import { Fretboard } from './components/features/Fretboard';
import { SettingsPanel } from './components/features/SettingsPanel';
import { ScaleInfo } from './components/features/ScaleInfo';
import { ThemeToggle } from './components/layout/ThemeToggle';
import { SCALES } from './data/scales';
import { TUNINGS } from './data/tunings';
import { useCustomTuning } from './hooks/useCustomTuning';

function App() {
  const [selectedScale, setSelectedScale] = useState('minor-pentatonic');
  const [rootNote, setRootNote] = useState('E');
  const [tuning, setTuning] = useState('standard-6');
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [showIntervals, setShowIntervals] = useState(false);

  const { customTuning, createCustomTuning, clearCustomTuning } = useCustomTuning();

  const currentScale = SCALES.find((s) => s.id === selectedScale) || SCALES[0];

  // Combine standard tunings with custom tuning
  const allTunings = useMemo(() => {
    return customTuning ? [...TUNINGS, customTuning] : TUNINGS;
  }, [customTuning]);

  const currentTuning = allTunings.find((t) => t.id === tuning) || allTunings[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #E1776D, #6CE0C7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Extended Range Guitar Scale Visualizer
              </h1>
              <p className="text-sm md:text-base" style={{ color: '#615655' }}>
                Explore scales and modes for 6, 7 and 8-string guitars - Perfect for any guitarist.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-6">
          {/* Fretboard - Shows first on mobile, second on desktop */}
          <main className="order-1 lg:order-2">
            <Fretboard
              scale={currentScale}
              rootNote={rootNote}
              tuning={currentTuning}
              showNoteNames={showNoteNames}
              showIntervals={showIntervals}
              onRootNoteChange={setRootNote}
            />
          </main>

          {/* Sidebar - Shows second on mobile, first on desktop */}
          <aside className="space-y-6 order-2 lg:order-1">
            <SettingsPanel
              selectedScale={selectedScale}
              setSelectedScale={setSelectedScale}
              rootNote={rootNote}
              setRootNote={setRootNote}
              tuning={tuning}
              setTuning={setTuning}
              showNoteNames={showNoteNames}
              setShowNoteNames={setShowNoteNames}
              showIntervals={showIntervals}
              setShowIntervals={setShowIntervals}
              currentTuning={currentTuning}
              allTunings={allTunings}
              customTuning={customTuning}
              onCreateCustomTuning={createCustomTuning}
              onClearCustomTuning={clearCustomTuning}
            />
            <ScaleInfo scale={currentScale} rootNote={rootNote} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
