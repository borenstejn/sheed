# SHEED E2E Tests (Maestro)

End-to-end tests using [Maestro](https://maestro.mobile.dev/).

## Prerequisites

Install Maestro CLI:
```bash
# macOS
curl -Ls "https://get.maestro.mobile.dev" | bash

# or via Homebrew
brew install maestro
```

## Running Tests

### iOS Simulator
```bash
# Start Expo dev build
npx expo run:ios

# Run all E2E tests
maestro test e2e/

# Run specific flow
maestro test e2e/app-launch.yaml
```

### Android Emulator
```bash
# Start Expo dev build
npx expo run:android

# Run all E2E tests
maestro test e2e/
```

## Writing Tests

Maestro uses YAML flows. See examples in this directory.

Key commands:
- `launchApp` - Start the app
- `tapOn` - Tap an element by text or id
- `assertVisible` - Check element is visible
- `inputText` - Type text into a field
- `scroll` - Scroll the screen
- `takeScreenshot` - Capture screenshot

## Test Files

- `app-launch.yaml` - Sanity check that app starts
- `.maestro/config.yaml` - Global configuration
