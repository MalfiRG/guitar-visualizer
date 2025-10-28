import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Label } from '../ui/Label';
import { SCALES } from '../../data/scales';
import { TUNINGS } from '../../data/tunings';
import { CHROMATIC_NOTES } from '../../data/notes';
import type { Tuning } from '../../types';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 dark:text-white">Settings</CardTitle>
      </CardHeader>
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
              disabled={showIntervals}
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
              disabled={showNoteNames}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
