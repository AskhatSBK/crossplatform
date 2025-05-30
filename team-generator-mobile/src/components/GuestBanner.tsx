import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/theme';

export const GuestBanner = ({ onPressLogin }: { onPressLogin?: () => void }) => {
  const { isGuest } = useAuth();
  const theme = useTheme();
  if (!isGuest) return null;
  return (
    <TouchableOpacity onPress={onPressLogin} activeOpacity={0.8}>
      <View style={[styles.banner, { backgroundColor: theme.error }]}> 
        <Text style={[styles.text, { color: '#fff' }]}>You are in Guest Mode. Login to access all features.</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 