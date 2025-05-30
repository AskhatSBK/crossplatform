import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useNetworkStatus } from '../context/NetworkStatusContext';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';

export const LoginScreen = ({ onGoToRegister }: { onGoToRegister: () => void }) => {
  const { login, enterGuestMode } = useAuth();
  const theme = useTheme();
  const { isOnline } = useNetworkStatus();
  const { t } = useLocalization();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('enterEmailPassword'));
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      Alert.alert(t('loginError'), e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', padding: 24 }]}> 
      <Text style={[styles.title, { color: theme.text }]}>{t('login')}</Text>
      {!isOnline && (
        <Text style={{ color: theme.error, marginBottom: 16 }}>{t('offlineLoginDisabled')}</Text>
      )}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder={t('email')}
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder={t('password')}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleLogin} disabled={loading || !isOnline}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('login')}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.cardBackground, marginTop: 8 }]} onPress={onGoToRegister} disabled={!isOnline}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>{t('dontHaveAccount')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.error, marginTop: 24 }]} onPress={enterGuestMode}>
        <Text style={styles.buttonText}>{t('continueAsGuest')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    maxWidth: 340,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 