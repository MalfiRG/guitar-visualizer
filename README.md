# Extended Range Guitar Scale Visualizer

A modern, modular web application for visualizing guitar scales on 6, 7, and 8-string guitars. Perfect for progressive metal, djent, and extended range guitar players.

## Features

- **Multiple Scales**: 12 different scales and modes including minor pentatonic, harmonic minor, phrygian dominant, and more
- **Extended Range Support**: Visualize scales on 6, 7, and 8-string guitars
- **17 Tunings**: Including standard tunings and popular drop tunings for each string count
- **Interactive Fretboard**: 24-fret visualization with highlighted scale notes
- **Display Modes**: Toggle between note names and interval notation
- **Dark Mode**: Built-in dark/light theme switching
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Vitest** - Unit testing framework
- **ESLint + Prettier** - Code quality and formatting

## Project Structure

```
guitar-visualizer-rebuilt/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Switch, Select, Card, etc.)
│   │   ├── layout/          # Layout components (ThemeToggle)
│   │   └── features/        # Feature components (Fretboard, SettingsPanel, ScaleInfo)
│   ├── data/                # Scale, tuning, and note data
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions (fretboard calculations, etc.)
│   ├── hooks/               # Custom React hooks (useTheme)
│   └── test/                # Test setup and utilities
├── .github/workflows/       # GitHub Actions CI/CD
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd guitar-visualizer-rebuilt

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI

## Testing

The project includes comprehensive unit tests for utility functions:

```bash
npm run test:run
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will auto-detect Vite and configure build settings
4. Deploy!

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload it to your hosting provider
```

## CI/CD

GitHub Actions workflow automatically:
- Runs linting and formatting checks
- Executes all tests
- Builds the project
- Deploys to Vercel (on main branch)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes!

## Acknowledgments

- Built with modern React and TypeScript best practices
- Inspired by the needs of extended range guitar players
- Designed for progressive metal and djent guitarists
