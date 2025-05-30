import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/theme';
import { useNetworkStatus } from '../context/NetworkStatusContext';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';

export const RegisterScreen = ({ onGoToLogin }: { onGoToLogin: () => void }) => {
  const { register } = useAuth();
  const theme = useTheme();
  const { isOnline } = useNetworkStatus();
  const { t } = useLocalization();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name || !surname) {
      Alert.alert(t('error'), t('fillAllFields'));
      return;
    }
    if (password.length < 6) {
      Alert.alert(t('error'), t('passwordMinLength'));
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name, surname);
    } catch (e: any) {
      Alert.alert(t('registrationError'), e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', padding: 24 }]}> 
      <Text style={[styles.title, { color: theme.text }]}>{t('register')}</Text>
      {!isOnline && (
        <Text style={{ color: theme.error, marginBottom: 16 }}>{t('offlineRegistrationDisabled')}</Text>
      )}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder={t('name')}
        placeholderTextColor={theme.textSecondary}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
        placeholder={t('surname')}
        placeholderTextColor={theme.textSecondary}
        value={surname}
        onChangeText={setSurname}
      />
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
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleRegister} disabled={loading || !isOnline}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('register')}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.cardBackground, marginTop: 8 }]} onPress={onGoToLogin}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>{t('alreadyHaveAccount')}</Text>
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