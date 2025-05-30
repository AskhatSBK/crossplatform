import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useSettingsStore } from '../store/useSettingsStore';
import { useTheme } from '../theme/theme';
import { commonStyles } from '../theme/styles';
import { GuestBanner } from '../components/GuestBanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/config';
import { ref, get } from 'firebase/database';
import { useNetworkStatus } from '../context/NetworkStatusContext';

export const ProfileScreen = () => {
  const { user, logout, updateUserPreferences, isGuest } = useAuth();
  const { themeMode, setThemeMode, language, setLanguage } = useSettingsStore();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallScreen = width < 360;
  const [loading, setLoading] = useState(false);
  const [entryCount, setEntryCount] = useState<number>(0);
  const { isOnline } = useNetworkStatus();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'kk', label: 'Қазақша' },
  ];

  useEffect(() => {
    const fetchEntryCount = async () => {
      if (isGuest || !user) {
        setEntryCount(0);
        return;
      }
      if (isOnline) {
        // Fetch from Firebase
        const teamsRef = ref(db, `users/${user.uid}/teams`);
        const snapshot = await get(teamsRef);
        const data = snapshot.val();
        if (data && data.teams) {
          setEntryCount(Array.isArray(data.teams) ? data.teams.length : Object.keys(data.teams).length);
        } else {
          setEntryCount(0);
        }
      } else {
        // Fetch from AsyncStorage
        const local = await AsyncStorage.getItem('teamState');
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed && parsed.history) {
            setEntryCount(parsed.history.length);
          } else if (parsed && parsed.teams) {
            setEntryCount(parsed.teams.length);
          } else {
            setEntryCount(0);
          }
        } else {
          setEntryCount(0);
        }
      }
    };
    fetchEntryCount();
  }, [isGuest, user, isOnline]);

  const handleThemeChange = async (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    if (user) {
      setLoading(true);
      await updateUserPreferences({ theme: mode, language });
      setLoading(false);
    }
  };

  const handleLanguageChange = async (lang: 'en' | 'ru' | 'kk') => {
    setLanguage(lang);
    if (user) {
      setLoading(true);
      await updateUserPreferences({ theme: themeMode === 'dark' ? 'dark' : 'light', language: lang });
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      Alert.alert('Logout Error', e.message);
    }
  };

  return (
    <>
      <GuestBanner />
      <View style={[commonStyles.container, { backgroundColor: theme.background, padding: 24 }]}> 
        <View style={[commonStyles.card, { backgroundColor: theme.cardBackground }]}> 
          <Text style={[commonStyles.subtitle, { color: theme.text }]}>Profile</Text>
          {isGuest || !user ? (
            <Text style={{ color: theme.error, marginBottom: 16 }}>Please log in to access your profile.</Text>
          ) : (
            <>
              <Text style={[commonStyles.text, { color: theme.textSecondary, marginBottom: 16 }]}>Email: {user?.email}</Text>
              <Text style={[commonStyles.text, { color: theme.textSecondary, marginBottom: 16 }]}>Saved Teams: {entryCount}</Text>
              <Text style={[commonStyles.text, { color: theme.text, marginBottom: 8 }]}>Theme</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: themeMode === 'light' ? theme.primary : theme.cardBackground, borderRadius: 8 }}
                  onPress={() => handleThemeChange('light')}
                  disabled={loading}
                >
                  <Text style={{ color: themeMode === 'light' ? '#fff' : theme.text }}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: themeMode === 'dark' ? theme.primary : theme.cardBackground, borderRadius: 8 }}
                  onPress={() => handleThemeChange('dark')}
                  disabled={loading}
                >
                  <Text style={{ color: themeMode === 'dark' ? '#fff' : theme.text }}>Dark</Text>
                </TouchableOpacity>
              </View>
              <Text style={[commonStyles.text, { color: theme.text, marginBottom: 8 }]}>Language</Text>
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={{ padding: 10, backgroundColor: language === lang.code ? theme.primary : theme.cardBackground, borderRadius: 8 }}
                    onPress={() => handleLanguageChange(lang.code as any)}
                    disabled={loading}
                  >
                    <Text style={{ color: language === lang.code ? '#fff' : theme.text }}>{lang.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={{ padding: 12, backgroundColor: theme.error, borderRadius: 8, alignItems: 'center' }}
                onPress={handleLogout}
                disabled={loading}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
}; 