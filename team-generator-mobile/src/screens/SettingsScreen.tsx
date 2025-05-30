import React from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/theme';
import { useSettingsStore } from '../store/useSettingsStore';
import { useLocalization } from '../i18n/useLocalization';
import { commonStyles } from '../theme/styles';
import { GuestBanner } from '../components/GuestBanner';
import { useAuth } from '../auth/AuthContext';

export const SettingsScreen = () => {
  const theme = useTheme();
  const { t } = useLocalization();
  const { themeMode, setThemeMode, language, setLanguage } = useSettingsStore();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isSmallScreen = width < 360;
  const { user, isGuest } = useAuth();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'kk', label: 'Қазақша' },
  ] as const;

  return (
    <>
      <GuestBanner />
      <ScrollView 
        style={[commonStyles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={[
          commonStyles.content,
          isTablet && commonStyles.contentTablet
        ]}
      >
        <View style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: theme.cardBackground }
        ]}>
          <Text style={[
            commonStyles.subtitle,
            isTablet && commonStyles.subtitleTablet,
            { color: theme.text }
          ]}>
            {t('theme')}
          </Text>
          {isGuest || !user ? (
            <Text style={{ color: theme.error, marginBottom: 16 }}>Please log in to access settings.</Text>
          ) : (
            <View style={[
              styles.settingItem,
              { borderBottomColor: theme.border }
            ]}>
              <Text style={[
                commonStyles.text,
                isTablet && commonStyles.textTablet,
                { color: theme.text }
              ]}>
                {t('darkTheme')}
              </Text>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={themeMode === 'dark' ? theme.primary : '#f4f3f4'}
              />
            </View>
          )}
        </View>

        <View style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: theme.cardBackground }
        ]}>
          <Text style={[
            commonStyles.subtitle,
            isTablet && commonStyles.subtitleTablet,
            { color: theme.text }
          ]}>
            {t('language')}
          </Text>
          {isGuest || !user ? (
            <Text style={{ color: theme.error, marginBottom: 16 }}>Please log in to access settings.</Text>
          ) : (
            <View style={[
              styles.languageOptions,
              isTablet && styles.languageOptionsTablet
            ]}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    { backgroundColor: language === lang.code ? theme.primary : 'transparent' },
                    isSmallScreen && styles.languageOptionSmall
                  ]}
                  onPress={() => setLanguage(lang.code)}
                >
                  <Text
                    style={[
                      commonStyles.text,
                      isTablet && commonStyles.textTablet,
                      isSmallScreen && styles.languageTextSmall,
                      { color: language === lang.code ? '#FFFFFF' : theme.text }
                    ]}
                  >
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  languageOptions: {
    gap: 8,
  },
  languageOptionsTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  languageOptionSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  languageTextSmall: {
    fontSize: 14,
  },
}); 