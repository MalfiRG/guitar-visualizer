import { useState } from 'react';
import { Fretboard } from './components/features/Fretboard';
import { SettingsPanel } from './components/features/SettingsPanel';
import { ScaleInfo } from './components/features/ScaleInfo';
import { ThemeToggle } from './components/layout/ThemeToggle';
import { SCALES } from './data/scales';
import { TUNINGS } from './data/tunings';

function App() {
  const [selectedScale, setSelectedScale] = useState('minor-pentatonic');
  const [rootNote, setRootNote] = useState('E');
  const [tuning, setTuning] = useState('standard-7');
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [showIntervals, setShowIntervals] = useState(false);

  const currentScale = SCALES.find((s) => s.id === selectedScale) || SCALES[0];
  const currentTuning = TUNINGS.find((t) => t.id === tuning) || TUNINGS[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Extended Range Guitar Scale Visualizer
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore scales and modes for 6, 7 and 8-string guitars - Perfect for progressive
                metal & djent
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-6">
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
            />
            <ScaleInfo scale={currentScale} rootNote={rootNote} />
          </aside>

          {/* Fretboard */}
          <main>
            <Fretboard
              scale={currentScale}
              rootNote={rootNote}
              tuning={currentTuning}
              showNoteNames={showNoteNames}
              showIntervals={showIntervals}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
