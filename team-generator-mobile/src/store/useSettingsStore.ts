import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'ru' | 'kk';
export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  language: Language;
  themeMode: ThemeMode;
  setLanguage: (language: Language) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'kk',
  themeMode: 'system',
  setLanguage: (language) => set({ language }),
  setThemeMode: (themeMode) => set({ themeMode }),
  loadSettings: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      const savedThemeMode = await AsyncStorage.getItem('themeMode');
      
      if (savedLanguage) {
        set({ language: savedLanguage as Language });
      }
      if (savedThemeMode) {
        set({ themeMode: savedThemeMode as ThemeMode });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  },
}));

// Subscribe to changes and save to AsyncStorage
useSettingsStore.subscribe((state) => {
  AsyncStorage.setItem('language', state.language);
  AsyncStorage.setItem('themeMode', state.themeMode);
}); 