import type { Scale } from '../types';

export const SCALES: Scale[] = [
  {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    characteristicIntervals: [3, 10], // m3 and m7 define the minor sound
    description: 'The foundation of rock, metal, and blues. Essential for soloing.',
    genre: 'Universal',
  },
  {
    id: 'major-pentatonic',
    name: 'Major Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    characteristicIntervals: [4, 9], // M3 and M6 define the major brightness
    description: 'Bright and uplifting. Great for melodic passages.',
    genre: 'Rock/Metal/Blues/Country',
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor (Aeolian)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    characteristicIntervals: [3, 8], // m3 and m6 define natural minor
    description: 'The most common minor scale. Dark and melancholic.',
    genre: 'Universal',
  },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    characteristicIntervals: [11], // M7 is the exotic, neoclassical sound
    description: 'Creates exotic, neoclassical sounds. Popular in metal.',
    genre: 'Neoclassical/Power Metal',
  },
  {
    id: 'phrygian',
    name: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    characteristicIntervals: [1], // m2 is the Spanish/Middle Eastern flavor
    description: 'Spanish/Middle Eastern flavor. Essential for metal riffs.',
    genre: 'Thrash/Death Metal; Also popular for flamenco and Middle Eastern fusion',
  },
  {
    id: 'phrygian-dominant',
    name: 'Phrygian Dominant',
    intervals: [0, 1, 4, 5, 7, 8, 10],
    characteristicIntervals: [1, 4], // m2 + M3 creates the exotic dominant sound
    description: 'Exotic and dark. Perfect for modern progressive metal.',
    genre: 'Progressive Metal, middle eastern/gypsy jazz',
  },
  {
    id: 'locrian',
    name: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    characteristicIntervals: [6], // dim5 (tritone) creates the unstable sound
    description: 'Unstable and dissonant. Great for creating tension.',
    genre: 'Technical Metal',
  },
  {
    id: 'dorian',
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    characteristicIntervals: [9], // M6 distinguishes it from natural minor
    description: 'Minor with a major sixth. Jazzy and sophisticated.',
    genre: 'Progressive Rock/Jazz',
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    characteristicIntervals: [10], // m7 gives it the bluesy, rock flavor
    description: 'Bluesy major scale. Common in rock and metal.',
    genre: 'Rock/Blues, funk, jam-band styles',
  },
  {
    id: 'whole-tone',
    name: 'Whole Tone',
    intervals: [0, 2, 4, 6, 8, 10],
    characteristicIntervals: [2, 4, 6, 8, 10], // All whole steps create the ambiguous sound
    description: 'Ethereal and ambiguous. Creates dream-like atmospheres.',
    genre: 'Experimental/Ambient',
  },
  {
    id: 'diminished',
    name: 'Diminished (Half-Whole)',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    characteristicIntervals: [1, 3, 6, 9], // Alternating pattern creates symmetry
    description: 'Symmetrical and tense. Great for technical passages.',
    genre: 'Jazz/Technical Metal',
  },
  {
    id: 'chromatic',
    name: 'Chromatic',
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    characteristicIntervals: [], // No characteristic notes - all notes are equal
    description: 'All 12 notes. For exploring the full tonal palette.',
    genre: 'Universal',
  },
];
