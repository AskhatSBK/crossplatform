import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useStore } from '../store/useStore';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';

export const GroupsInput = () => {
  const { groups, setGroups } = useStore();
  const theme = useTheme();
  const { t } = useLocalization();
  const [inputValue, setInputValue] = useState(groups.toString());

  const handleChange = (text: string) => {
    setInputValue(text);
    
    if (text === '') return;

    const value = parseInt(text);
    if (isNaN(value)) return;

    // Allow any positive number, but suggest reasonable limits
    if (value < 1) {
      setGroups(1);
    } else if (value > 20) {
      setGroups(20);
    } else {
      setGroups(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue('2');
      setGroups(2);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{t('numberOfTeams')}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{t('chooseTeams')}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.inputBackground,
              color: theme.text,
            },
          ]}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleChange}
          onBlur={handleBlur}
          maxLength={2}
          placeholder="2"
          placeholderTextColor={theme.textSecondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: 80,
    textAlign: 'center',
    fontSize: 18,
  },
}); 