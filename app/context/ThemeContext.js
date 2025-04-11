import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
export const lightTheme = {
  primary: '#4a90e2',
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  card: '#ffffff',
  cardBorder: '#e0e0e0',
  input: '#f0f0f0',
  inputText: '#333333',
  button: '#4a90e2',
  buttonText: '#ffffff',
  error: '#ff3b30',
  success: '#34c759',
  warning: '#ff9500',
};

export const darkTheme = {
  primary: '#4a90e2',
  background: '#25292e',
  surface: '#3a3f47',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#3a3f47',
  card: '#3a3f47',
  cardBorder: '#4a4f57',
  input: '#3a3f47',
  inputText: '#ffffff',
  button: '#4a90e2',
  buttonText: '#ffffff',
  error: '#ff453a',
  success: '#32d74b',
  warning: '#ff9f0a',
};

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? darkTheme : lightTheme);
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Update theme when system theme changes
  useEffect(() => {
    setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 