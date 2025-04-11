# Cross-Platform Mobile App

This is a React Native application built with Expo that demonstrates responsive UI design and layout implementation.

## Features

- Responsive layout that adapts to different screen sizes
- Automatic orientation handling based on device rotation
- Scrollable content with both horizontal and vertical scrolling
- Grid layout that adjusts based on screen width
- Clean and modular code structure

## Screenshots

(Screenshots will be added after testing on different devices)

## Requirements

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crossplatform.git
cd crossplatform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your device:
   - Scan the QR code with the Expo Go app on your device
   - Press 'a' to run on an Android emulator
   - Press 'i' to run on an iOS simulator

## Project Structure

- `app/` - Contains the main application code
  - `index.tsx` - Main home screen with responsive layout and automatic orientation handling
  - `_layout.tsx` - Root layout component

## Implementation Details

### Responsive Design

The app uses React Native's responsive design features to adapt to different screen sizes:

- `useWindowDimensions` hook to get current screen dimensions
- Dynamic layout adjustments based on screen width
- Different layouts for portrait and landscape orientations

### Automatic Orientation Handling

The app automatically responds to device orientation changes:

- Uses `Dimensions.addEventListener` to detect orientation changes
- Adjusts layout and UI elements based on the current orientation
- Shows different content in portrait vs landscape mode
- No manual controls needed - simply rotate your device

### Layout Components

- `ScrollView` for horizontal scrolling featured items
- `FlatList` for efficient vertical scrolling of items
- Responsive grid layout that adjusts columns based on screen width

### Orientation Support

- Detects orientation changes using `Dimensions.addEventListener`
- Adjusts layout and UI elements based on orientation
- Shows different content in portrait vs landscape mode
- Automatically responds to device rotation

## Assignment Requirements

This project was created as part of Assignment 3 - UI Design and Layout Implementation, adapting the Flutter assignment to React Native. It meets all the requirements:

- ✅ Main screen fully designed and implemented
- ✅ Scrollable list and grid of items
- ✅ Layout adapts to small, medium, and large screens
- ✅ Layout adapts to portrait and landscape orientations
- ✅ Clean and modular code structure

## License

MIT
