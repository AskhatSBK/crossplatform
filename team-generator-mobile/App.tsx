import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, useColorScheme, Button, View, TouchableOpacity } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useSettingsStore } from './src/store/useSettingsStore';
import { useTheme } from './src/theme/theme';
import { useAuth, AuthProvider } from './src/auth/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { GuestBanner } from './src/components/GuestBanner';
import { NetworkStatusProvider, useNetworkStatus } from './src/context/NetworkStatusContext';
import { OfflineBanner } from './src/components/OfflineBanner';
import { useStore } from './src/store/useStore';
import { MaterialIcons } from '@expo/vector-icons';

function MainApp() {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettingsStore();
  const theme = useTheme();
  const { user, isGuest, loading, exitGuestMode } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const { loadFromStorage, syncTeamsToFirebase, syncing } = useStore();
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    // Initialize settings from storage
    useSettingsStore.getState().loadSettings();
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (isOnline && user) {
      syncTeamsToFirebase(user);
    }
  }, [isOnline, user]);

  const handlePressLogin = useCallback(() => {
    exitGuestMode();
    setShowRegister(false);
  }, [exitGuestMode]);

  console.log('user:', user, 'isGuest:', isGuest, 'loading:', loading, 'showRegister:', showRegister);

  if (loading) return null;

  if (!user && !isGuest) {
    return showRegister ? (
      <RegisterScreen onGoToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginScreen onGoToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: 1000 }}>
        <OfflineBanner />
      </View>
      <GuestBanner onPressLogin={handlePressLogin} />
      {isOnline && user && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => syncTeamsToFirebase(user)}
          disabled={syncing}
          style={{ position: 'absolute', bottom: 32, right: 24, zIndex: 100 }}
        >
          <View style={{
            backgroundColor: syncing ? '#aaa' : theme.primary,
            borderRadius: 28,
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
          }}>
            <MaterialIcons
              name={syncing ? 'sync' : 'sync'}
              size={32}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      )}
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <NetworkStatusProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </NetworkStatusProvider>
  );
}
