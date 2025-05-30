import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useStore } from '../store/useStore';
import { useTheme } from '../theme/theme';
import { useLocalization } from '../i18n/useLocalization';

export const Items = () => {
  const { items, setItems } = useStore();
  const [inputText, setInputText] = useState(items.join('\n'));
  const theme = useTheme();
  const { t } = useLocalization();

  const handleTextChange = (text: string) => {
    setInputText(text);
    // Split by newline and filter out empty lines
    const newItems = text
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{t('teamMembers')}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{t('enterNames')}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
        multiline
        placeholder={t('typeNames')}
        placeholderTextColor={theme.textSecondary}
        value={inputText}
        onChangeText={handleTextChange}
        textAlignVertical="top"
      />
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
}); 