import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import { ThemeProvider } from './context/ThemeContext';
import '../app/i18n'; // Import i18n configuration
import * as ScreenOrientation from 'expo-screen-orientation';

export default function RootLayout() {
  // Allow both portrait and landscape orientations
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.unlockAsync();
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.ALL
      );
    }
    setOrientation();
  }, []);

  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
