import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/useSettingsStore';

export const lightTheme = {
  background: '#FFFFFF',
  cardBackground: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  primary: '#007AFF',
  primaryLight: '#E3F2FD',
  accent: '#FF9500',
  border: '#DEE2E6',
  success: '#28A745',
  error: '#DC3545',
  shadow: 'rgba(0, 0, 0, 0.1)',
  inputBackground: '#FFFFFF',
  buttonText: '#FFFFFF',
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  isDark: false,
};

export const darkTheme = {
  background: '#1A1A1A',
  cardBackground: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  primary: '#0A84FF',
  primaryLight: '#1C3B5A',
  accent: '#FF9F0A',
  border: '#404040',
  success: '#32D74B',
  error: '#FF453A',
  shadow: 'rgba(0, 0, 0, 0.3)',
  inputBackground: '#2D2D2D',
  buttonText: '#FFFFFF',
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  isDark: true,
};

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettingsStore();

  if (themeMode === 'system') {
    return systemColorScheme === 'dark' ? darkTheme : lightTheme;
  }

  return themeMode === 'dark' ? darkTheme : lightTheme;
}; 