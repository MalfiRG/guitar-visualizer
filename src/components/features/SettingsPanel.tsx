import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Label } from '../ui/Label';
import { SCALES } from '../../data/scales';
import { TUNINGS } from '../../data/tunings';
import { CHROMATIC_NOTES } from '../../data/notes';
import type { Tuning } from '../../types';
import { cn } from '../../utils/cn';

interface SettingsPanelProps {
  selectedScale: string;
  setSelectedScale: (value: string) => void;
  rootNote: string;
  setRootNote: (value: string) => void;
  tuning: string;
  setTuning: (value: string) => void;
  showNoteNames: boolean;
  setShowNoteNames: (value: boolean) => void;
  showIntervals: boolean;
  setShowIntervals: (value: boolean) => void;
  currentTuning: Tuning;
}

export function SettingsPanel({
  selectedScale,
  setSelectedScale,
  rootNote,
  setRootNote,
  tuning,
  setTuning,
  showNoteNames,
  setShowNoteNames,
  showIntervals,
  setShowIntervals,
  currentTuning,
}: SettingsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">
            Settings
          </CardTitle>
          {/* Collapse toggle button - only visible on mobile/tablet */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isExpanded ? 'Collapse settings' : 'Expand settings'}
          >
            <svg
              className={cn(
                'w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200',
                {
                  'rotate-180': !isExpanded,
                }
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </CardHeader>
      {/* Collapsible content - always shown on desktop, toggleable on mobile/tablet */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden',
          'lg:!block lg:!max-h-none lg:!opacity-100',
          {
            'max-h-0 opacity-0': !isExpanded,
            'max-h-[2000px] opacity-100': isExpanded,
          }
        )}
      >
        <CardContent className="space-y-6">
          {/* Scale Selection */}
          <div className="space-y-2">
            <Label htmlFor="scale-select" className="text-gray-700 dark:text-gray-300">
              Scale / Mode
            </Label>
            <Select value={selectedScale} onValueChange={setSelectedScale}>
              <SelectTrigger id="scale-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCALES.map((scale) => (
                  <SelectItem key={scale.id} value={scale.id}>
                    {scale.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Root Note Selection */}
          <div className="space-y-2">
            <Label htmlFor="root-note-select" className="text-gray-700 dark:text-gray-300">
              Root Note
            </Label>
            <Select value={rootNote} onValueChange={setRootNote}>
              <SelectTrigger id="root-note-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHROMATIC_NOTES.map((note) => (
                  <SelectItem key={note} value={note}>
                    {note}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tuning Selection */}
          <div className="space-y-2">
            <Label htmlFor="tuning-select" className="text-gray-700 dark:text-gray-300">
              Tuning
            </Label>
            <Select value={tuning} onValueChange={setTuning}>
              <SelectTrigger id="tuning-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem disabled value="6-string-header">
                  <span className="font-semibold text-gray-500">6-String</span>
                </SelectItem>
                {TUNINGS.filter((t) => t.strings === 6).map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}

                <SelectItem disabled value="7-string-header">
                  <span className="font-semibold text-gray-500 mt-2">7-String</span>
                </SelectItem>
                {TUNINGS.filter((t) => t.strings === 7).map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}

                <SelectItem disabled value="8-string-header">
                  <span className="font-semibold text-gray-500 mt-2">8-String</span>
                </SelectItem>
                {TUNINGS.filter((t) => t.strings === 8).map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {currentTuning.notes.join(' - ')}
            </p>
          </div>

          {/* Display Options */}
          <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="show-notes"
                className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                Show Note Names
              </Label>
              <Switch
                id="show-notes"
                checked={showNoteNames}
                onCheckedChange={(checked) => {
                  setShowNoteNames(checked);
                  if (checked) setShowIntervals(false);
                }}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="show-intervals"
                className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                Show Intervals
              </Label>
              <Switch
                id="show-intervals"
                checked={showIntervals}
                onCheckedChange={(checked) => {
                  setShowIntervals(checked);
                  if (checked) setShowNoteNames(false);
                }}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
