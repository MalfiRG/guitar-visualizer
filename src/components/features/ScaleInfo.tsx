import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { Scale } from '../../types';
import { transposeNote } from '../../data/notes';

interface ScaleInfoProps {
  scale: Scale;
  rootNote: string;
}

export function ScaleInfo({ scale, rootNote }: ScaleInfoProps) {
  const scaleNotes = scale.intervals.map((interval) => transposeNote(rootNote, interval));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 dark:text-white">
          {rootNote} {scale.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scale Description */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{scale.description}</p>
        </div>

        {/* Genre */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Genre</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{scale.genre}</p>
        </div>

        {/* Scale Notes */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Notes in Scale
          </h4>
          <div className="flex flex-wrap gap-2">
            {scaleNotes.map((note, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? 'px-3 py-1.5 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-semibold text-sm shadow-md'
                    : 'px-3 py-1.5 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-medium text-sm shadow-sm'
                }
              >
                {note}
              </div>
            ))}
          </div>
        </div>

        {/* Intervals */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Intervals</h4>
          <div className="flex flex-wrap gap-2">
            {scale.intervals.map((interval, index) => (
              <div
                key={index}
                className="px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-mono text-sm"
              >
                {interval}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
