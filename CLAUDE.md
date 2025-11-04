# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Extended Range Guitar Scale Visualizer - A React/TypeScript web app for visualizing musical scales on 6, 7, and 8-string guitars. Built with Vite, Tailwind CSS v4, and Radix UI primitives. Deployed on Vercel.

## Common Commands

### Development
```bash
npm run dev              # Start dev server on http://localhost:5173
npm run build            # Type check + production build
npm run preview          # Preview production build locally
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format all src files with Prettier
npm run format:check     # Check formatting without writing
```

### Testing
```bash
npm run test             # Run Vitest in watch mode
npm run test:run         # Run tests once (used in CI)
npm run test:ui          # Open Vitest UI
npm test -- fretboard    # Run specific test file (e.g., fretboard.test.ts)
```

## Architecture Overview

### Core Music Theory System

The app's foundation is in `src/utils/fretboard.ts` and `src/data/notes.ts`. All music calculations are pure functions:

- **Note transposition**: `transposeNote(note, semitones)` uses modular arithmetic on the chromatic scale
- **Interval calculation**: `getInterval(note1, note2)` computes semitone distance
- **Scale matching**: `isNoteInScale(note, rootNote, scale)` checks if a note belongs to a scale
- **Fretboard mapping**: `getFretNote()` returns `FretNote | null` for each fret position

**Key insight**: Scales are defined by interval arrays (e.g., `[0, 3, 5, 7, 10]` for minor pentatonic). The fretboard renderer calculates 24 frets × up to 8 strings = 192 positions on each render.

### State Management

The app uses **local React state** (no Redux/Context):
- Root state lives in `App.tsx` (selectedScale, rootNote, tuning, display toggles)
- State is passed down via props to `SettingsPanel`, `Fretboard`, and `ScaleInfo`
- **Important**: `showNoteNames` and `showIntervals` are mutually exclusive (see SettingsPanel.tsx:180-206)

### Responsive Fretboard Rendering

The fretboard adapts to screen size via `src/utils/responsive.ts`:
- **Mobile (<640px)**: Shows 12 frets with navigation buttons
- **Tablet (768-1024px)**: Shows 18 frets with navigation
- **Desktop (>1024px)**: Shows all 24 frets, no navigation needed

The `useWindowWidth()` hook tracks window size, and `getResponsiveFretConfig()` returns display parameters. Fretboard.tsx:26 maintains `fretOffset` state for pagination on smaller screens.

### Data-Driven Design

All musical data lives in `src/data/`:
- **scales.ts**: 12 scale definitions with intervals, descriptions, and genre tags
- **tunings.ts**: 17 tunings grouped by string count (6/7/8-string)
- **notes.ts**: Chromatic scale array and transposition logic

To add a new scale: Add an object to `SCALES` array with `id`, `name`, `intervals[]`, `description`, and `genre`.

To add a new tuning: Add an object to `TUNINGS` array with `id`, `name`, `notes[]` (low to high), and `strings` count.

### Component Architecture

- **`components/ui/`**: Radix UI wrapper components (Select, Switch, Card, Label) with Tailwind styling
- **`components/layout/`**: Layout-level components (ThemeToggle)
- **`components/features/`**: Domain-specific components:
  - **Fretboard**: Renders the interactive guitar neck (most complex component)
  - **SettingsPanel**: Collapsible on mobile, always visible on desktop
  - **ScaleInfo**: Displays scale description and genre

### Theme System

Dark/light mode via `src/hooks/useTheme.ts`:
- Reads from `localStorage` → falls back to system preference
- Toggles `dark` class on `<html>` element (Tailwind's class strategy)
- Persists changes automatically

## Development Notes

### Tailwind CSS v4

This project uses **Tailwind v4** with the new PostCSS plugin:
- Config in `tailwind.config.js` (not `tailwind.config.ts`)
- Uses `@import 'tailwindcss'` in `src/index.css` (not `@tailwind` directives)
- Custom dark mode variant: `@custom-variant dark (&:where(.dark, .dark *))`

### TypeScript Configuration

Uses TypeScript 5.9 with project references:
- `tsconfig.json`: Root config with references to app and node configs
- `tsconfig.app.json`: App source code settings
- `tsconfig.node.json`: Vite config file settings

### CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to main:
1. Tests on Node 20.x and 22.x matrix
2. Lints, formats, tests, and builds
3. Notifies Vercel for deployment

Vercel deployment is configured via `vercel.json` (framework detection: Vite).

### Adding New Features

When adding scales or modes:
1. Add scale definition to `src/data/scales.ts`
2. No other changes needed - UI updates automatically

When adding tunings:
1. Add tuning to `src/data/tunings.ts`
2. Ensure `strings` matches `notes.length`
3. Use sharps (not flats) for consistency

When modifying fretboard calculations:
1. Update `src/utils/fretboard.ts`
2. Add tests to `src/utils/fretboard.test.ts`
3. Run `npm test` to verify

### Common Patterns

**Conditional classes**: Use `cn()` utility (combines `clsx` + `tailwind-merge`):
```tsx
className={cn('base-classes', { 'conditional': isTrue })}
```

**Gradients**: Brand colors use emerald-to-cyan gradient:
```tsx
className="bg-gradient-to-r from-emerald-500 to-cyan-500"
```

**Responsive utilities**: Tailwind breakpoints match the responsive config:
- `md:` - tablet (768px+)
- `lg:` - desktop (1024px+)
