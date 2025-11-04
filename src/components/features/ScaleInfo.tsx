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
        <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">
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
                className="px-3 py-1.5 rounded-md text-white font-semibold text-sm shadow-md border-2"
                style={{
                  backgroundColor: index === 0 ? '#E1776D' : '#6CE0C7',
                  borderColor: index === 0 ? '#C55F55' : '#4DB59F',
                }}
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
                className="px-3 py-1.5 rounded-md text-white font-semibold text-sm shadow-md border-2"
                style={{
                  backgroundColor: '#6CE0C7',
                  borderColor: '#4DB59F',
                }}
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
