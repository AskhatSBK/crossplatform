# Team Generator Mobile

A cross-platform mobile app built with React Native and Expo for quickly generating balanced, random teams for any activity. The app supports authentication, history tracking, multiple languages, and theme customization.

## Features

- **Random Team Generation**: Enter names and generate fair, random teams for sports, classrooms, or projects.
- **Authentication**: Register, log in, or use guest mode. User data is synced with Firebase.
- **History**: View your previous team generations, stored locally and in the cloud.
- **Profile**: Manage your account, theme, and language preferences.
- **Settings**: Switch between light/dark themes and choose from English, Russian, or Kazakh languages.
- **Offline Support**: Use the app and save history even when offline; data syncs when back online.
- **Responsive Design**: Optimized for phones and tablets.

## Screenshots
<!-- Add screenshots here if available -->

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd team-generator/team-generator-mobile
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the Expo development server:
   ```sh
   npm start
   # or
   yarn start
   ```
4. Run on your device:
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`

## Project Structure

- `src/screens/` — Main app screens (Home, Team Generator, History, Profile, Settings, About, etc.)
- `src/components/` — Reusable UI components
- `src/auth/` — Authentication context and logic
- `src/firebase/` — Firebase configuration
- `src/store/` — Zustand state management
- `src/i18n/` — Internationalization (English, Russian, Kazakh)
- `src/theme/` — Theme and style definitions
- `src/utils/` — Utility functions

## Configuration

Firebase is pre-configured in `src/firebase/config.tsx`. If you want to use your own Firebase project, update the credentials in that file.

## Scripts
- `npm start` — Start Expo server
- `npm run android` — Run on Android device/emulator
- `npm run ios` — Run on iOS simulator
- `npm run web` — Run in web browser

## Technologies Used
- React Native
- Expo
- TypeScript
- Firebase (Auth, Realtime Database, Analytics)
- Zustand (state management)

## Internationalization
Supported languages:
- English
- Russian
- Kazakh

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](../LICENSE)

## Acknowledgements
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [React Native](https://reactnative.dev/) 