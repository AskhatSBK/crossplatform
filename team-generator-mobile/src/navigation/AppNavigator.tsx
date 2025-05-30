import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { TeamGeneratorScreen } from '../screens/TeamGeneratorScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { HistoryScreen } from '../screens/HistoryScreen';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
  const theme = useTheme();
  const { t } = useLocalization();
  const { user, isGuest } = useAuth();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          drawerStyle: {
            backgroundColor: theme.background,
            width: Platform.OS === 'web' ? 560 : '75%',
          },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.text,
          drawerLabelStyle: {
            marginLeft: 0,
            fontSize: 16,
          },
          drawerItemStyle: {
            paddingVertical: 8,
            paddingHorizontal: 16,
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: t('home'),
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="TeamGenerator" 
          component={TeamGeneratorScreen}
          options={{
            title: t('generateTeams'),
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        {!isGuest && user && (
          <Drawer.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              title: t('profile') ? t('profile') : 'Profile',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        )}
        {!isGuest && (
          <Drawer.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              title: t('settings'),
              drawerIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
        )}
        <Drawer.Screen 
          name="About" 
          component={AboutScreen}
          options={{
            title: t('about'),
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="History" 
          component={HistoryScreen}
          options={{
            title: 'History',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}; 